import express, { Request, Response, Application } from "express";
import {
  makeLikeController,
  deleteLikeController,
  readLikeController_Playlist,
  readLikeController_User,
} from "@/controllers/like";
import { validateLikeExist } from "@/middlewares/RecordExist.middleware";
const likeRoute = express.Router({ mergeParams: true });
import { validateBody } from "@/middlewares/validateBody";
import { validateUsernameExist } from "@/middlewares/RecordExist.middleware";
import { validateParams } from "@/middlewares/validateParams";
import {
  schemaParams,
  schemaBodys,
  schemaQuerys,
} from "@/validations/validateGeneral";
import { validateQuery } from "@/middlewares/validateQuery";
import { authMutateBody } from "@/middlewares/authentication";

likeRoute.get(
  "/api/likes/:playlistId/playlist",
  validateParams(schemaParams.playlistIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  readLikeController_Playlist
);

likeRoute.get(
  "/api/likes/:userId/user",
  validateParams(schemaParams.userIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  readLikeController_User
);

likeRoute.post(
  "/api/likes",
  authMutateBody,
  validateLikeExist,
  makeLikeController
);

likeRoute.delete(
  "/api/likes/:id",
  validateParams(schemaParams.idCheck),
  deleteLikeController
);

export default likeRoute;
