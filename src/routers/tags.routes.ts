import { Router } from "express";
import {
  createTagsController,
  deleteTagsController,
  retrieveTagsController,
} from "../controllers/tags.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import { validatePermissionUserAdminMiddleware } from "../middlewares/global/validateUserAdmin.middleware";
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
  validateBodyMiddleware(DeleteTagsSchema),
  deleteTagsController
);
