import { Router } from "express";
import {
  createNewsController,
  deleteNewsController,
  retrieveNewsByIdController,
  retrieveNewsController,
} from "../controllers/news.controller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import { validateNewsOwnerdMiddleware } from "../middlewares/news/validateNewsOwner.middleware";
import { NewsCreateSchema } from "../schemas/news.schemas";

export const newsRoutes: Router = Router();

newsRoutes.post(
  "",
  validateTokenJwtMiddleware,
  validateBodyMiddleware(NewsCreateSchema),
  createNewsController
);

newsRoutes.get("", retrieveNewsController);

newsRoutes.get("/:id/", retrieveNewsByIdController);

newsRoutes.delete(
  "/:id/",
  validateTokenJwtMiddleware,
  validateNewsOwnerdMiddleware,
  deleteNewsController
);
