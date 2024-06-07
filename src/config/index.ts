import express, { Request, Response, Application } from "express";
import configBasic from "./expressBasic";
import configCors from "./cors";
import errorHandler from "./errorException";
const configApp = express.Router({ mergeParams: true });
configApp.use(configBasic);
configApp.use(configCors);
configApp.use(errorHandler);
export default configApp;
