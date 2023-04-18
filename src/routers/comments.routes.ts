import { Router } from "express";
import {
  createCommentsController,
  listAllCommentsByNewsController,
  listAllCommentsController,
} from "../controllers/comments.contoller";
import { validateBodyMiddleware } from "../middlewares/global/validateBody.middleware";
import { validateTokenJwtMiddleware } from "../middlewares/global/validateTokenJwt.middlewares";
import { validateNewsIdMiddleware } from "../middlewares/news/validateNewsId.middleware";
import { CommentsCreateSchema } from "../schemas/comments.schemas";

export const commentsRoutes: Router = Router();

commentsRoutes.post(
  "/news/:id/",
  validateTokenJwtMiddleware,
  validateNewsIdMiddleware,
  validateBodyMiddleware(CommentsCreateSchema),
  createCommentsController
);

commentsRoutes.get(
  "/news/:id/",
  validateNewsIdMiddleware,
  listAllCommentsByNewsController
);

commentsRoutes.get("", listAllCommentsController);
