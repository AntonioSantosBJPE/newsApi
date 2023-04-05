import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  loginUsersController,
  retrieveProfileUserContoller,
  retrieveUsersController,
  updateUserController,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validatePermissionUserIdMiddleware } from "../middlewares/users/validatePermissionUserId.middlewares";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import {
  UserCreateSchema,
  UserLoginSchema,
  UserUpdateSchema,
} from "../schemas/users.schemas";
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
  validatePermissionUserIdMiddleware,
  deleteUserController
);

usersRoutes.patch(
  "/:id/",
  validateTokenJwtMiddleware,
  validatePermissionUserIdMiddleware,
  validateBodyMiddleware(UserUpdateSchema),
  updateUserController
);
