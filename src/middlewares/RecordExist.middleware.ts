import { Request, Response } from "express";
import {
  usernameExist,
  playlistExist,
  likeExist,
} from "@/validations/RecordExist.validate";

export const validateUsernameExist = async (
  req: Request,
  res: Response,
  next: any
) => {
  const username = req.body.username;
  const checkExist = await usernameExist(username);
  if (checkExist) return res.status(400).send({ message: "Username exist" });
  return next();
};

export const validatePlaylistExist = async (
  req: Request,
  res: Response,
  next: any
) => {
  const playlistId = req.body.playlistId;
  const checkExist = await playlistExist(playlistId);
  if (!checkExist)
    return res.status(400).send({ message: "No playlist to comment" });
  return next();
};

export const validateLikeExist = async (
  req: Request,
  res: Response,
  next: any
) => {
  // userId and playListId
  const checkExist = await likeExist(req.body);
  if (!checkExist) return res.status(204).send({});
  return next();
};
