import { Request, Response } from "express";
import {
  iCommentsCreateBody,
  iCommentsCreateReturn,
  iCommentsListReturn,
} from "../interfaces/comments.interfaces";
import { IuserTokenInfos } from "../interfaces/users.interfaces";
import { createCommentsService } from "../services/comments/createComments.service";
import { deleteCommentsByIdService } from "../services/comments/deleteCommentsById.service";
import { listAllCommentsService } from "../services/comments/listAllComments.service";
import { listAllCommentsBynewsService } from "../services/comments/listAllCommentsByNews.service";

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

export const listAllCommentsByNewsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newsId: string = req.params.id;
  const listComments: iCommentsListReturn = await listAllCommentsBynewsService(
    newsId
  );
  return res.status(200).json(listComments);
};

export const listAllCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listComments: iCommentsListReturn = await listAllCommentsService();
  return res.status(200).json(listComments);
};

export const deleteCommentsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId: string = req.params.id;
  await deleteCommentsByIdService(commentId);
  return res.status(204).json();
};
