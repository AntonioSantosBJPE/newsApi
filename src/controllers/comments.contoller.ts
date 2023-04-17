import { Request, Response } from "express";
import {
  iCommentsCreateBody,
  iCommentsCreateReturn,
} from "../interfaces/comments.interfaces";
import { IuserTokenInfos } from "../interfaces/users.interfaces";
import { createCommentsService } from "../services/comments/createComments.service";

export const createCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newsId: string = req.params.id;
  const body: iCommentsCreateBody = req.body;
  const userInfos: IuserTokenInfos = req.userTokenInfos;
  const newComments: iCommentsCreateReturn = await createCommentsService(
    body,
    newsId,
    userInfos
  );
  return res.status(201).json(newComments);
};
