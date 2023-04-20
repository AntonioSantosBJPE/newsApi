import { Router } from "express";
import * as tagsController from "../controllers/tags.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import { validatePermissionUserAdminMiddleware } from "../middlewares/global/validateUserAdmin.middleware";
import { validateNewsOwnerdMiddleware } from "../middlewares/news/validateNewsOwner.middleware";
import { CreateTagsSchema } from "../schemas/tags.schemas";

export const tagsRoutes: Router = Router();

tagsRoutes.post(
  "",
  validateTokenJwtMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  tagsController.createTagsController
);

tagsRoutes.get("", tagsController.retrieveTagsController);

tagsRoutes.delete(
  "",
  validateTokenJwtMiddleware,
  validatePermissionUserAdminMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  tagsController.deleteTagsController
);

tagsRoutes.post(
  "/news/:id/",
  validateTokenJwtMiddleware,
  validateNewsOwnerdMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  tagsController.addTagsInNewsController
);

tagsRoutes.delete(
  "/news/:id/",
  validateTokenJwtMiddleware,
  validateNewsOwnerdMiddleware,
  validateBodyMiddleware(CreateTagsSchema),
  tagsController.removeTagsInNewsController
);
