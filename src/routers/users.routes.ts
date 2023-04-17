import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  loginRefreshUsersController,
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
  UserLoginRefreshSchema,
  UserLoginSchema,
  UserUpdateSchema,
} from "../schemas/users.schemas";
import { validatePermissionUserAdminMiddleware } from "../middlewares/global/validateUserAdmin.middleware";
export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateBodyMiddleware(UserCreateSchema),
  createUsersController
);

usersRoutes.post(
  "/login/",
  validateBodyMiddleware(UserLoginSchema),
  loginUsersController
);

usersRoutes.post(
  "/login/refresh-token/",
  validateBodyMiddleware(UserLoginRefreshSchema),
  loginRefreshUsersController
);

usersRoutes.get(
  "",
  validateTokenJwtMiddleware,
  validatePermissionUserAdminMiddleware,
  retrieveUsersController
);

usersRoutes.get(
  "/profile/:id/",
  validateTokenJwtMiddleware,
  validatePermissionUserIdMiddleware,
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
