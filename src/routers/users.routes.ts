import { Router } from "express";
import { createUsersController } from "../controllers/users.controller";
export const usersRoutes: Router = Router();

usersRoutes.post("", createUsersController);
