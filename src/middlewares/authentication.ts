import express, { Request, Response, Application } from "express";
import {
  encryptAuth,
  userIdFromAuth,
} from "@/validations/JWT.validate";

import dotenv from "dotenv";
dotenv.config();
const secretKey = `${process.env.PASSWORD_KEY}`;

export const requireAuth = express.Router({ mergeParams: true });
// export const authUpdate = express.Router({ mergeParams: true });
export const authMutateBody = express.Router({ mergeParams: true });

requireAuth.use(async (req: Request, res: Response, next) => {
  const tokenAuthen = req.headers.authorization;
  // allow authenticate user to make playlist, stream music, search music

  const result = encryptAuth(tokenAuthen);
  if (result.success) return next();
  else return res.status(401).send({ message: result.message });
});


// authUpdate.use(async (req: Request, res: Response, next) => {
//   const userIdRequest = req.query.userId as string;
//   const tokenAuthen = req.headers.authorization;
//   const result = checkAllowUpdateAuth({ token: tokenAuthen, userIdRequest });
//   if (result.success) return next();
//   else return res.status(401).send({ message: result.message });
// });

authMutateBody.use(async (req: Request, res: Response, next) => {
  const tokenAuthen = req.headers.authorization;
  const infor = userIdFromAuth(tokenAuthen) as { userId: number };
  if (infor) {
    req.body.userId = infor.userId;
    return next();
  } else return res.status(401).send({ message: "Something wrong" });
});
