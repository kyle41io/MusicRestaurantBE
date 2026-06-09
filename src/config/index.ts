import express, { Request, Response, Application } from "express";
import configBasic from "./expressBasic";
import configCors from "./cors";
const configApp = express.Router({ mergeParams: true });
configApp.use(configBasic);
configApp.use(configCors);
export default configApp;
