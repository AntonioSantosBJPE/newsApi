import { z } from "zod";
import {
  NewsCreateSchema,
  NewsUpdateSchema,
  ReturnListNewsSchema,
  ReturnNewsCreatedSchema,
} from "../schemas/news.schemas";

export type iNewsCreate = z.infer<typeof NewsCreateSchema>;
export type iNewsUpdate = z.infer<typeof NewsUpdateSchema>;
export type iReturnNewsCreated = z.infer<typeof ReturnNewsCreatedSchema>;
export type iReturnListNews = z.infer<typeof ReturnListNewsSchema>;
