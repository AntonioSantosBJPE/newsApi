import { Prisma, Tag } from "@prisma/client";
import { iTagsCreate, iTagsCreateList } from "../../interfaces/tags.interfaces";
import { prisma } from "../../server";

export const createTagsService = async (
  payload: iTagsCreate
): Promise<(Tag | null)[]> => {
  const data: iTagsCreateList[] = payload.tags.map((name: string) => {
    return { name: name.toUpperCase() };
  });

  const createManyTags: Prisma.BatchPayload = await prisma.tag.createMany({
    data,
    skipDuplicates: true,
  });

  const findListTagsCreated: Promise<Tag | null>[] = payload.tags.map(
    async (name: string) => {
      return await prisma.tag.findUnique({
        where: {
          name: name.toUpperCase(),
        },
      });
    }
  );

  const response: (Tag | null)[] = await Promise.all([...findListTagsCreated]);
  return response;
};
