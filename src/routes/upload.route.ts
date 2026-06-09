import crypto from "crypto";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const uploadRoute = express.Router({ mergeParams: true });

const signCloudinaryParams = (params: Record<string, string | number>) => {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) throw new Error("CLOUDINARY_API_SECRET is missing");

  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
};

uploadRoute.post(
  "/api/uploads/cloudinary-signature",
  (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    const token = auth?.replace(/^Bearer\s+/i, "");
    let user: { userId?: number } | null = null;

    try {
      user = jwt.verify(token || "", `${process.env.PASSWORD_KEY}`) as {
        userId?: number;
      };
    } catch {
      user = null;
    }

    if (!user?.userId) {
      return res.status(401).send({ message: "Sign in before uploading" });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    if (!cloudName || !apiKey || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).send({ message: "Cloudinary is not configured" });
    }

    const folder = `music-restaurant/users/${user.userId}`;
    const timestamp = Math.round(Date.now() / 1000);
    const signature = signCloudinaryParams({ folder, timestamp });

    return res.status(200).send({
      apiKey,
      cloudName,
      folder,
      signature,
      timestamp,
    });
  }
);

export default uploadRoute;
