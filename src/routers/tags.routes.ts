import { Router } from "express";
import { createTagsController } from "../controllers/tags.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { CreateTagsSchema } from "../schemas/tags.schemas";

export const tagsRoutes: Router = Router();

tagsRoutes.post(
  "",
  validateBodyMiddleware(CreateTagsSchema),
  createTagsController
);
