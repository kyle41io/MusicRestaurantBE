import express, { Request, Response, Application } from "express";
import { makeUser, editUser, deleteUser, readUserId } from "@/models/user";
import { userIdFromAuth } from "@/validations/JWT.validate";

export const userNewController = express.Router({ mergeParams: true });
export const userGetControllerId = express.Router({ mergeParams: true });
export const userEditController = express.Router({ mergeParams: true });
export const userDeleteController = express.Router({ mergeParams: true });
const secretKey = `${process.env.PASSWORD_KEY}`;

userGetControllerId.use(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const result = await readUserId(id);
  if (result.success) return res.status(200).send(result.data);
  else return res.status(204).send({});
});

userNewController.use(async (req: Request, res: Response) => {
  const { username, name, password, image } = req.body;
  const result = await makeUser({ name, password, username, avatar: image });
  if (result.success) return res.status(201).send(result.data);
  else return res.status(401).send({ message: result.message });
});

userEditController.use(async (req: Request, res: Response) => {
  const { username, name, password, userId, image } = req.body;
  const tokenAuthen = req.headers.authorization;
  // allow authenticate user to make playlist, Music Restaurant, search music

  const result = await editUser({
    name,
    password,
    username,
    id: userId,
    avatar: image,
  });
  if (result.success) return res.status(201).send(result.data);
  else return res.status(401).send({ message: result.message });
});

userDeleteController.use(async (req: Request, res: Response) => {
  const tokenAuthen = req.headers.authorization;
  const infor = userIdFromAuth(tokenAuthen) as { userId: number };
  const result = await deleteUser(infor.userId);
  if (result.success) return res.status(200).send({ message: result.message });
  else return res.status(404).send({ message: result.message });
});
