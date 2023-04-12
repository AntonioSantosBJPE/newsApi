import { z } from "zod";
import { CreateTagsSchema, DeleteTagsSchema } from "../schemas/tags.schemas";

export interface iTagsCreateList {
  name: string;
}

export type iTagsCreate = z.infer<typeof CreateTagsSchema>;
export type iTagsDelete = z.infer<typeof DeleteTagsSchema>;
