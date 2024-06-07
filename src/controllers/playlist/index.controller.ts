import express, { Request, Response, Application } from "express";
import {
  playListMaking,
  readPlaylistById,
  readAllPlaylistTimeSortFromUser,
  readAllPlaylistTimeTop,
  deletePlaylistId,
  updatePlaylistId,
} from "@/models/playlist";
import { userIdFromAuth } from "@/validations/JWT.validate";
export const playlistNewController = express.Router({ mergeParams: true });

export const playlistGetController = express.Router({ mergeParams: true });
export const playlistUserControllerReadTime = express.Router({
  mergeParams: true,
});
export const playlistUserControllerReadUser = express.Router({
  mergeParams: true,
});

export const playlistEditController = express.Router({ mergeParams: true });
export const playlistDeleteController = express.Router({ mergeParams: true });

playlistGetController.use(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) ? parseInt(req.params.id) : 0;
  const result = await readPlaylistById(id);
  if (result.success) return res.status(200).send(result.data);
  else return res.status(204).send({});
});

playlistUserControllerReadTime.use(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  const sort = req.params.sort;
  const sortCast = sort === "DESC" ? sort : "ASC";

  const page = parseInt(req.query.page as string);
  if (userId) {
    const result = await readAllPlaylistTimeSortFromUser({
      userId,
      sort: sortCast,
      page,
    });
    if (result.success) return res.status(200).send(result.data);
    else return res.status(204).send({});
  }
  const result = await readAllPlaylistTimeTop({
    sort: sortCast,
    page,
  });
  if (result.success) return res.status(200).send(result.data);
  else res.status(204).send({});
});

playlistNewController.use(async (req: Request, res: Response) => {
  const result = await playListMaking(req.body);
  res.status(201).send(result.data);
});

playlistDeleteController.use(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const tokenAuthen = req.headers.authorization;
  const infor = userIdFromAuth(tokenAuthen) as { userId: number };
  const userId = infor.userId;
  const result = await deletePlaylistId({ userId, id });
  if (result.success) return res.status(200).send({ message: result.message });
  else res.status(404).send({ message: result.message });
});

playlistEditController.use(async (req: Request, res: Response) => {
  const { playlistName, id, songList, image, userId } = req.body;
  const result = await updatePlaylistId({
    playlistName,
    id,
    songList,
    image,
    userId,
  });
  if (result.success) return res.status(200).send({ message: result.message });
  else res.status(404).send({ message: result.message });
});
