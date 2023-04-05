import { Request, Response } from "express";
import {
  iNewsCreate,
  iReturnListNews,
  iReturnNewsCreated,
} from "../interfaces/news.interfaces";
import { createNewsService } from "../services/news/createNews.service";
import { deleteNewsService } from "../services/news/deleteNews.service";
import { retrieveNewsService } from "../services/news/retrieveNews.service";
import { retrieveNewsByIdService } from "../services/news/retrieveNewsById.service";

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

export const retrieveNewsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const news_id: string = req.params.id;
  const news: iReturnNewsCreated = await retrieveNewsByIdService(news_id);
  return res.status(200).json(news);
};

export const deleteNewsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const news_id: string = req.params.id;
  await deleteNewsService(news_id);
  return res.status(204).json();
};
