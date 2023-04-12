import { Tag } from "@prisma/client";
import { Request, Response } from "express";
import { iTagsCreate } from "../interfaces/tags.interfaces";
import { createTagsService } from "../services/tags/createTags.service";

export const createTagsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iTagsCreate = req.body;
  const newsCreated: (Tag | null)[] = await createTagsService(body);
  return res.status(201).json(newsCreated);
};
