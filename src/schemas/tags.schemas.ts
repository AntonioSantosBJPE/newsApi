import { z } from "zod";

export const CreateTagsSchema = z.object({
  tags: z.array(z.string()),
});
