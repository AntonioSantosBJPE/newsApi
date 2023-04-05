import { z } from "zod";
import {
  NewsCreateSchema,
  ReturnListNewsSchema,
  ReturnNewsCreatedSchema,
} from "../schemas/news.schemas";

export type iNewsCreate = z.infer<typeof NewsCreateSchema>;
export type iReturnNewsCreated = z.infer<typeof ReturnNewsCreatedSchema>;
export type iReturnListNews = z.infer<typeof ReturnListNewsSchema>;
