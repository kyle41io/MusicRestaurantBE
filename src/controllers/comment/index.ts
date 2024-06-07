import express, { Request, Response, Application } from "express";
import { authSignIn } from "@/models/auth";
import {
  readCommentFromPlaylist_UserSort,
  readCommentFromUserAndPlaylist_TimeSort,
  readCommentFromUser_PlaylistSort,
  makeComment,
  deleteComment,
  UpdateComment,
} from "@/models/comment";
import dotenv from "dotenv";
import { userIdFromAuth } from "@/validations/JWT.validate";
dotenv.config();
const secretKey = `${process.env.PASSWORD_KEY}`;

export const makeCommentController = express.Router({ mergeParams: true });

export const readCommentController_TimeSort = express.Router({
  mergeParams: true,
});
export const readCommentController_UserSort = express.Router({
  mergeParams: true,
});
export const readCommentController_PlaylistSort = express.Router({
  mergeParams: true,
});

export const editCommentController = express.Router({ mergeParams: true });
export const deleteCommentController = express.Router({ mergeParams: true });
makeCommentController.use(async (req: Request, res: Response) => {
  const a = req.body;
  const result = await makeComment(req.body);
  if (result.success) return res.status(200).send(result.data);
  else return res.status(400).send({ message: result.message });
});

readCommentController_TimeSort.use(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId) ? parseInt(req.params.userId) : 0;
  const playlistId = parseInt(req.params.playlistId)
    ? parseInt(req.params.playlistId)
    : 0;
  const sort = req.query.sort as "DESC" | "ASC";
  const page = parseInt(req.query.page as string);

  const result = await readCommentFromUserAndPlaylist_TimeSort({
    page,
    playlistId,
    sort,
    userId,
  });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(204).send({});
});

readCommentController_UserSort.use(async (req: Request, res: Response) => {
  // const userId = parseInt(req.params.userId)? parseInt(req.params.userId) : 0;
  const playlistId = parseInt(req.params.playlisttId)
    ? parseInt(req.params.playlisttId)
    : 0;
  const sort = req.query.sort as "DESC" | "ASC";
  const page = parseInt(req.query.page as string);

  const result = await readCommentFromPlaylist_UserSort({
    page,
    playlistId,
    sort,
  });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(204).send({});
});
readCommentController_PlaylistSort.use(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId) ? parseInt(req.params.userId) : 0;
  // const playlistId = parseInt(req.params.playlistId)? parseInt(req.params.playlistId) : 0;
  const sort = req.query.sort as "DESC" | "ASC";
  const page = parseInt(req.query.page as string);

  const result = await readCommentFromUser_PlaylistSort({ page, sort, userId });
  if (result.success) return res.status(200).send(result.data);
  else return res.status(204).send({});
});
// put and delete

editCommentController.use(async (req: Request, res: Response) => {
  // check by middleware before for userId, playlistId,content,id
  const { userId, id, playlistId, content } = req.body;
  const result = await UpdateComment(req.body);
  if (result.success) return res.status(200).send({ message: result.message });
  else return res.status(401).send({ message: result.message });
});

deleteCommentController.use(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) ? parseInt(req.params.id) : 0;
  // const playlistId = parseInt(req.params.playlistId)? parseInt(req.params.playlistId) : 0;
  const tokenAuthen = req.headers.authorization;
  const infor = userIdFromAuth(tokenAuthen) as { userId: number };
  const userId = infor.userId;
  const result = await deleteComment({ userId, id });
  if (result.success) return res.status(200).send({ message: result.message });
  else return res.status(204).send({});
});
