import express, { Request, Response, Application } from "express";
const streamRoute = express.Router({ mergeParams: true });
import {
  streamController,
  streamControllerpost,
} from "@/controllers/stream/index.controller";
import {
  checkYoutubeId,
  checkYoutubeIdList,
} from "@/middlewares/youtube.middleware";
// should return {success: boolean, data? , message?}
// streamRoute.get("/api/stream", priviledgeMiddleware, streamController);
streamRoute.get(
  "/api/streams/:songId",
  checkYoutubeId,
  streamController
);

// streamRoute.put('/stream',streamMiddleware,streamController)
// streamRoute.delete('/stream',streamMiddleware,streamController)

export default streamRoute;
