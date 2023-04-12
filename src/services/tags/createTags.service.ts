import { Prisma, Tag } from "@prisma/client";
import { iTagsCreate, iTagsCreateList } from "../../interfaces/tags.interfaces";
import { prisma } from "../../server";

export const createTagsService = async (
  payload: iTagsCreate
): Promise<Tag[]> => {
  const tagsToCreate = payload.tags.map((name) => {
    return name.toUpperCase();
  });

  const data: iTagsCreateList[] = tagsToCreate.map((name: string) => {
    return { name };
  });

  const createManyTags: Prisma.BatchPayload = await prisma.tag.createMany({
    data,
    skipDuplicates: true,
  });

  const response: Tag[] = await prisma.tag.findMany({
    where: {
      name: { in: tagsToCreate },
    },
  });
  return response;
};
