import { Prisma } from "@prisma/client";
import { iTagsCreate } from "../../interfaces/tags.interfaces";
import { prisma } from "../../server";

export const deleteTagsService = async (
  payload: iTagsCreate
): Promise<void> => {
  const tagsPayload: string[] = payload.tags.map((name) => name.toUpperCase());

  const deleteTag: Prisma.BatchPayload = await prisma.tag.deleteMany({
    where: {
      name: { in: tagsPayload },
    },
  });
};
