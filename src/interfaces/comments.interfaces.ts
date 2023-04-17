import { z } from "zod";
import {
  CommentsCreateReturnSchema,
  CommentsCreateSchema,
} from "../schemas/comments.schemas";

export type iCommentsCreateBody = z.infer<typeof CommentsCreateSchema>;
export type iCommentsCreateReturn = z.infer<typeof CommentsCreateReturnSchema>;
