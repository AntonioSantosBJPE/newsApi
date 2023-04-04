import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  loginUsersController,
  retrieveProfileUserContoller,
  retrieveUsersController,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validatePermissionIdMiddleware } from "../middlewares/global/validatePermissionId.middlewares";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
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

usersRoutes.get("", validateTokenJwtMiddleware, retrieveUsersController);

usersRoutes.get(
  "/profile/:id/",
  validateTokenJwtMiddleware,
  retrieveProfileUserContoller
);

usersRoutes.delete(
  "/:id/",
  validateTokenJwtMiddleware,
  validatePermissionIdMiddleware,
  deleteUserController
);
