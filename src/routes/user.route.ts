import express, { Request, Response, Application } from "express";
import {
  userNewController,
  userEditController,
  userDeleteController,
  userGetControllerId,
} from "@/controllers/user/index.controller";
import { authMutateBody } from "@/middlewares/authentication";
const userRoute = express.Router({ mergeParams: true });
import { schemaBodys, schemaParams } from "@/validations/validateGeneral";
import { validateBody } from "@/middlewares/validateBody";
import { validateParams } from "@/middlewares/validateParams";
import { validateUsernameExist } from "@/middlewares/RecordExist.middleware";

userRoute.get(
  "/api/users/:id",
  validateParams(schemaParams.idCheck),
  userGetControllerId
);

userRoute.put(
  "/api/users",
  validateBody(schemaBodys.nameAndPassword),
  validateBody(schemaBodys.imageCheck),
  authMutateBody,
  userEditController
);
userRoute.delete("/api/users", userDeleteController);

export default userRoute;
