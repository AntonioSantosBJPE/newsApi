import { Tag } from "@prisma/client";
import { Request, Response } from "express";
import { iTagsCreate } from "../interfaces/tags.interfaces";
import { createTagsService } from "../services/tags/createTags.service";
import { retrieveTagsService } from "../services/tags/retrieveTags.service";

export const createTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iTagsCreate = req.body;
  const tagsCreated: (Tag | null)[] = await createTagsService(body);
  return res.status(201).json(tagsCreated);
};

export const retrieveTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listTags: Tag[] = await retrieveTagsService();
  return res.status(201).json(listTags);
};
