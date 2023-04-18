import { Router } from "express";
import {
  createCommentsController,
  deleteCommentsByIdController,
  listAllCommentsByNewsController,
  listAllCommentsController,
} from "../controllers/comments.contoller";
import { validateCommentOwnerdMiddleware } from "../middlewares/comments/validateCommentOwner.middleware";
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

commentsRoutes.delete(
  "/:id/",
  validateTokenJwtMiddleware,
  validateCommentOwnerdMiddleware,
  deleteCommentsByIdController
);
