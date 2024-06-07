import express, { Request, Response, Application } from "express";
import {
  userNewController,
  userEditController,
} from "@/controllers/user/index.controller";
const roomRoute = express.Router({ mergeParams: true });
import { schemaBodys, schemaQuerys } from "@/validations/validateGeneral";
import { validateBody } from "@/middlewares/validateBody";
import { validateUsernameExist } from "@/middlewares/RecordExist.middleware";

// should return {success: boolean, data? , message?}
// roomRoute.post("/api/user", validateBody(schemas.nameAndPassword),validateUsernameExist, userNewController);

export default roomRoute;
