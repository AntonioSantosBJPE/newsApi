import { Router } from "express";
import {
  addTagsInNewsController,
  createTagsController,
  deleteTagsController,
  removeTagsInNewsController,
  retrieveTagsController,
} from "../controllers/tags.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import { validatePermissionUserAdminMiddleware } from "../middlewares/global/validateUserAdmin.middleware";
import { validateNewsOwnerdMiddleware } from "../middlewares/news/validateNewsOwner.middleware";
import { CreateTagsSchema, DeleteTagsSchema } from "../schemas/tags.schemas";

export const tagsRoutes: Router = Router();

tagsRoutes.post(
  "",
  validateTokenJwtMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  createTagsController
);

tagsRoutes.get("", retrieveTagsController);

tagsRoutes.delete(
  "",
  validateTokenJwtMiddleware,
  validatePermissionUserAdminMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  deleteTagsController
);

tagsRoutes.post(
  "/news/:id/",
  validateTokenJwtMiddleware,
  validateNewsOwnerdMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  addTagsInNewsController
);

tagsRoutes.delete(
  "/news/:id/",
  validateTokenJwtMiddleware,
  validateNewsOwnerdMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  removeTagsInNewsController
);
