import express, { Application } from "express";
const authRoute = express.Router({ mergeParams: true });
import {
  authControllerSignin,
  authControllerGet,
} from "@/controllers/auth/index.controller";
import { schemaBodys } from "@/validations/validateGeneral";
import { validateBody } from "@/middlewares/validateBody";
import { validateUsernameExist } from "@/middlewares/RecordExist.middleware";
import { userNewController } from "@/controllers/user/index.controller";

authRoute.post(
  "/api/auth",
  validateBody(schemaBodys.usernameAndPassword),
  authControllerSignin
);
authRoute.post(
  "/api/auth/new",
  validateBody(schemaBodys.nameAndPassword),
  validateBody(schemaBodys.usernameCheck),
  validateBody(schemaBodys.imageCheck),
  validateUsernameExist,
  userNewController
);

export default authRoute;
