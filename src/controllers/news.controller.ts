import { Request, Response } from "express";
import { iNewsCreate, iReturnNewsCreated } from "../interfaces/news.interfaces";
import { createNewsService } from "../services/news/createNews.service";

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
