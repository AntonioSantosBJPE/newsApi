import { Request, Response } from "express";
import {
  iNewsCreate,
  iReturnListNews,
  iReturnNewsCreated,
} from "../interfaces/news.interfaces";
import { createNewsService } from "../services/news/createNews.service";
import { retrieveNewsService } from "../services/news/retrieveNews.service";

export const createNewsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const authorId: string = req.userTokenInfos.id;
  const body: iNewsCreate = req.body;
  const newsCreated: iReturnNewsCreated = await createNewsService(
    authorId,
    body
  );
  return res.status(201).json(newsCreated);
};

export const retrieveNewsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newsList: iReturnListNews = await retrieveNewsService();
  return res.status(200).json(newsList);
};
