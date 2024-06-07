import express, { Request, Response, Application } from "express";
const musicInforRoute = express.Router({ mergeParams: true });
import {
  musicSearchController,
  musicDownloadController,
} from "@/controllers/musicInfor/index.controller";
import { checkYoutubeId } from "@/middlewares/youtube.middleware";
import { schemaQuerys, schemaParams } from "@/validations/validateGeneral";
import { validateQuery } from "@/middlewares/validateQuery";
import { validateParams } from "@/middlewares/validateParams";
// should return {success: boolean, data? , message?}
musicInforRoute.get(
  "/api/musics",
  validateQuery(schemaQuerys.pageCheck),
  validateQuery(schemaQuerys.searchCheck),
  musicSearchController
);
musicInforRoute.get(
  "/api/musics/:songId",
  checkYoutubeId,
  musicDownloadController
);
// musicInforRoute.put("/api/music" , musicSearchController);
// musicInforRoute.delete("/api/music" , musicSearchController);

export default musicInforRoute;
