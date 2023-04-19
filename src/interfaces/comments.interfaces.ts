import { z } from "zod";
import {
  CommentsCreateReturnSchema,
  CommentsCreateSchema,
  listCommentsReturn,
} from "../schemas/comments.schemas";

export type iCommentsCreateBody = z.infer<typeof CommentsCreateSchema>;
export type iCommentsCreateReturn = z.infer<typeof CommentsCreateReturnSchema>;
export type iCommentsListReturn = z.infer<typeof listCommentsReturn>;
