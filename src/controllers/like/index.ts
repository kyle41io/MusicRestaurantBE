import {
  makeNewLike,
  removeLike,
  readPlaylistFromUserLike,
  readUserLikePlaylist,
} from "@/models/like";
import { userIdFromAuth } from "@/validations/JWT.validate";
import express, { Request, Response, Application } from "express";
export const makeLikeController = express.Router({ mergeParams: true });

export const readLikeController_User = express.Router({
  mergeParams: true,
});
export const readLikeController_Playlist = express.Router({
  mergeParams: true,
});

export const deleteLikeController = express.Router({ mergeParams: true });

readLikeController_User.use(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId) ? parseInt(req.params.userId) : 0;
  const sort = req.query.sort as "DESC" | "ASC";
  const page = parseInt(req.query.page as string);

  const result = await readUserLikePlaylist({ userId, page, sort });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(400).send({ message: result.message });
});

readLikeController_Playlist.use(async (req: Request, res: Response) => {
  const playlistId = parseInt(req.params.playlistId)
    ? parseInt(req.params.playlistId)
    : 0;
  const sort = req.query.sort as "DESC" | "ASC";
  const page = parseInt(req.query.page as string);

  const result = await readPlaylistFromUserLike({ playlistId, page, sort });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(400).send({ message: result.message });
});

makeLikeController.use(async (req: Request, res: Response) => {
  const { userId, playlistId } = req.body;
  const result = await makeNewLike({ userId, playlistId });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(400).send({ message: result.message });
});

deleteLikeController.use(async (req: Request, res: Response) => {
  const tokenAuthen = req.headers.authorization;
  const infor = userIdFromAuth(tokenAuthen) as { userId: number };
  const userId = infor.userId;
  const id = parseInt(req.params.id) ? parseInt(req.params.id) : 0;
  const result = await removeLike({ userId, id });
  if (result.success) return res.status(200).send(result.message);
  else return res.status(401).send({ message: result.message });
});
