import express, { Request, Response, Application } from "express";
import {
  playlistGetController,
  playlistNewController,
  playlistUserControllerReadTime,
  playlistDeleteController,
  playlistEditController,
} from "@/controllers/playlist/index.controller";
import { authMutateBody } from "@/middlewares/authentication";
const playlistRoute = express.Router({ mergeParams: true });
import {
  schemaBodys,
  schemaQuerys,
  schemaParams,
} from "@/validations/validateGeneral";
import { validateBody } from "@/middlewares/validateBody";
import { validateQuery } from "@/middlewares/validateQuery";
import { validateParams } from "@/middlewares/validateParams";
import { validateUsernameExist } from "@/middlewares/RecordExist.middleware";
import { validateYoutubeSongList } from "@/validations/youtube.validate";
import { checkYoutubeIdList } from "@/middlewares/youtube.middleware";

playlistRoute.get(
  "/api/playlists",
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  playlistUserControllerReadTime
);

playlistRoute.get(
  "/api/users/:userId/playlists",
  validateParams(schemaParams.userIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  playlistUserControllerReadTime
);

playlistRoute.get(
  "/api/playlists/:id",
  validateParams(schemaParams.idCheck),
  playlistGetController
);

// playlistRoute.get( // use this
//   "/api/playlist/:userId/view",
//   validateParams(schemaParams.userIdCheck),
//   validateQuery(schemaQuerys.pageCheck),
//   validateQuery(schemaQuerys.sortCheck),
//   playlistGetController
// );

playlistRoute.get(
  "/api/playlists/:userId/time",
  validateParams(schemaParams.userIdCheck),
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.sortCheck),
  playlistUserControllerReadTime
);

// playlistRoute.get( // use this
//   "/api/playlists/:userId/user",
//   validateParams(schemaParams.userIdCheck),
//   validateQuery(schemaQuerys.pageCheck),
//   validateQuery(schemaQuerys.sortCheck),
//   playlistUserControllerReadTime
// );

// playlistRoute.get( // use this
//   "/api/playlist/:userId/view",
//   validateParams(schemaParams.userIdCheck),
//   validateParams(schemaQuerys.sortCheck),
//   validateQuery(schemaQuerys.pageCheck),
//   playlistUserControllerReadTime
// );

playlistRoute.post(
  "/api/playlists",
  validateBody(schemaBodys.playlistNameCheck),
  validateBody(schemaBodys.imageCheck),
  validateBody(schemaBodys.songListCheck),
  // authMutateBody,
  // checkYoutubeIdList,
  playlistNewController
);

playlistRoute.put(
  "/api/playlists",
  validateBody(schemaBodys.playlistNameCheck),
  validateBody(schemaBodys.imageCheck),
  validateBody(schemaBodys.songListCheck),
  validateBody(schemaBodys.idCheck),
  authMutateBody,
  checkYoutubeIdList,
  playlistEditController
);
playlistRoute.put(
  "/api/playlists/:id",
  validateParams(schemaParams.idCheck),
  (req, res, next) => {
    req.body.id = parseInt(req.params.id);
    next();
  },
  validateBody(schemaBodys.playlistNameCheck),
  validateBody(schemaBodys.imageCheck),
  validateBody(schemaBodys.songListCheck),
  validateBody(schemaBodys.idCheck),
  authMutateBody,
  checkYoutubeIdList,
  playlistEditController
);
playlistRoute.delete(
  "/api/playlists/:id",
  validateParams(schemaParams.idCheck),
  playlistDeleteController
);

export default playlistRoute;
