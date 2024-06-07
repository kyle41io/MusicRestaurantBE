import express, { Request, Response, Application } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import musicInforRoute from "./musicInfor.route";
import streamRoute from "./stream.route";
import commentRoute from "./comment.route";
import playlistRoute from "./playlist.route";
import likeRoute from "./like.route";
import { requireAuth } from "@/middlewares/authentication";
import { SwaggerRoute } from "./swagger.route";
import roomRoute from "./room.route";
const expressRoute= express.Router({mergeParams: true});

// expressRoute.use(authRoute);
// expressRoute.use(userRoute);
// expressRoute.use(musicInforRoute);
// expressRoute.use(streamRoute);
// expressRoute.use(commentRoute);
// expressRoute.use(playlistRoute);
// expressRoute.use(likeRoute);

const defaultRoutes = [
  userRoute,
  musicInforRoute,
  streamRoute,
  commentRoute,
  playlistRoute,
  likeRoute,
  roomRoute
];

const noAuthRoutes = [authRoute,SwaggerRoute];
noAuthRoutes.forEach((route) =>  expressRoute.use(route))

  defaultRoutes.forEach((route) => {
    route.use(requireAuth)
    expressRoute.use(route);
  })

export default expressRoute;
