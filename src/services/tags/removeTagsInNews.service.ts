import { Prisma } from "@prisma/client";
import { iTagsCreate } from "../../interfaces/tags.interfaces";
import { prisma } from "../../server";

export const removeTagsInNewsService = async (
  payload: iTagsCreate,
  newsId: string
): Promise<void> => {
  const tagsPayload: string[] = payload.tags.map((name) => name.toUpperCase());

  const findRelationsNewsTags = await prisma.tagsNews.findMany({
    where: {
      newsId: Number(newsId),
    },
    include: {
      tag: true,
    },
  });

  const filterTagsExistsInNews = findRelationsNewsTags.filter((item) =>
    tagsPayload.includes(item.tag.name)
  );

  const findTagsExistsInNews: number[] = filterTagsExistsInNews.map(
    (item) => item.id
  );

  const deleteTag: Prisma.BatchPayload = await prisma.tagsNews.deleteMany({
    where: {
      id: { in: findTagsExistsInNews },
    },
  });
};
