import { z } from "zod";
import {
  NewsCreateSchema,
  ReturnNewsCreatedSchema,
} from "../schemas/news.schemas";

export type iNewsCreate = z.infer<typeof NewsCreateSchema>;
export type iReturnNewsCreated = z.infer<typeof ReturnNewsCreatedSchema>;
