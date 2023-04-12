import { Tag } from "@prisma/client";
import { Request, Response } from "express";
import { iTagsCreate, iTagsDelete } from "../interfaces/tags.interfaces";
import { createTagsService } from "../services/tags/createTags.service";
import { deleteTagsService } from "../services/tags/deleteTags.service";
import { retrieveTagsService } from "../services/tags/retrieveTags.service";

export const createTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iTagsCreate = req.body;
  const tagsCreated: Tag[] = await createTagsService(body);
  return res.status(201).json(tagsCreated);
};

export const retrieveTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listTags: Tag[] = await retrieveTagsService();
  return res.status(200).json(listTags);
};

export const deleteTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listTagsId: iTagsDelete = req.body;
  await deleteTagsService(listTagsId);
  return res.status(204).json();
};
