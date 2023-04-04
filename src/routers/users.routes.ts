import { Router } from "express";
import {
  createUsersController,
  loginUsersController,
  retrieveUsersController,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { UserCreateSchema, UserLoginSchema } from "../schemas/users.schemas";
export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateBodyMiddleware(UserCreateSchema),
  createUsersController
);

usersRoutes.post(
  "/auth/",
  validateBodyMiddleware(UserLoginSchema),
  loginUsersController
);

usersRoutes.get("", retrieveUsersController);
