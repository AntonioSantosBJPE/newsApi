import { z } from "zod";
import {
  NewsCreateSchema,
  NewsReturnFullInfos,
  NewsUpdateSchema,
  ReturnListNewsSchema,
  ReturnNewsCreatedSchema,
} from "../schemas/news.schemas";

export type iNewsCreate = z.infer<typeof NewsCreateSchema>;
export type iNewsUpdate = z.infer<typeof NewsUpdateSchema>;
export type iReturnNewsCreated = z.infer<typeof ReturnNewsCreatedSchema>;
export type iReturnListNews = z.infer<typeof ReturnListNewsSchema>;
export type iReturnNewsFullInfos = z.infer<typeof NewsReturnFullInfos>;

export interface iCreateUrlsPagination {
  urlNextPage: string | null;
  urlPreviousPage: string | null;
}

export interface iValidateQuerysPagination {
  perPage: number;
  page: number;
  pageInitial: number;
  orderBy: string;
}

export interface iReturnListNewsPagination {
  previousPage: string | null;
  nextPage: string | null;
  count: number;
  news: iReturnListNews;
}
