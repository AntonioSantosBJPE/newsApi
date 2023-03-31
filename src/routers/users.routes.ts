import { Router } from "express";
import { createUsersController } from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { UserCreateSchema } from "../schemas/users.schemas";
export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateBodyMiddleware(UserCreateSchema),
  createUsersController
);
