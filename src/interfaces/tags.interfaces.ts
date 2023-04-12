import { z } from "zod";
import { CreateTagsSchema } from "../schemas/tags.schemas";

export interface iTagsCreateList {
  name: string;
}

export type iTagsCreate = z.infer<typeof CreateTagsSchema>;
