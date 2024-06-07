import express, { Request, Response, Application } from "express";
const commentRoute = express.Router({ mergeParams: true });
import {
  makeCommentController,
  readCommentController_UserSort,
  readCommentController_TimeSort,
  readCommentController_PlaylistSort,
  editCommentController,
  deleteCommentController,
} from "@/controllers/comment";
import { validateBody } from "@/middlewares/validateBody";
import { validateParams } from "@/middlewares/validateParams";
import { validateQuery } from "@/middlewares/validateQuery";
import {
  schemaBodys,
  schemaParams,
  schemaQuerys,
} from "@/validations/validateGeneral";
import { authMutateBody } from "@/middlewares/authentication";
import { validatePlaylistExist } from "@/middlewares/RecordExist.middleware";

commentRoute.get(
  "/api/comments/user/:userId/playlist/:playlistId/time",
  validateParams(schemaParams.playlistIdCheck),
  validateParams(schemaParams.userIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  readCommentController_TimeSort
);

commentRoute.get(
  "/api/comments/user/:userId/playlist/:playlistId/playlist",
  // validateParams(schemaParams.playlistIdCheck),
  validateParams(schemaParams.userIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  readCommentController_PlaylistSort
);

commentRoute.post(
  "/api/comments",
  validateBody(schemaBodys.contentCheck),
  validateBody(schemaBodys.playlistIdCheck),
  validatePlaylistExist,
  authMutateBody,
  makeCommentController
);
commentRoute.put(
  "/api/comments",
  validateBody(schemaBodys.playlistIdCheck),
  validateBody(schemaBodys.contentCheck),
  validateBody(schemaBodys.idCheck),
  authMutateBody,
  editCommentController
);
commentRoute.delete(
  "/api/comments/:id",
  validateParams(schemaParams.idCheck),
  deleteCommentController
);

export default commentRoute;
