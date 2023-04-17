import {
  iNewsCreate,
  iReturnNewsCreated,
} from "../../interfaces/news.interfaces";
import { ReturnNewsCreatedSchema } from "../../schemas/news.schemas";
import { prisma } from "../../server";

export const createNewsService = async (
  authorId: string,
  payload: iNewsCreate
): Promise<iReturnNewsCreated> => {
  const { tags, ...dataCreateNews } = payload;
  const tagsUpper = tags.map((name) => name.toUpperCase());

  const createNews = await prisma.news.create({
    data: {
      ...dataCreateNews,
      author: { connect: { id: Number(authorId) } },
    },
  });

  const createdRelationsNewsTags = tagsUpper.map(async (name) => {
    return await prisma.tagsNews.create({
      data: {
        news: {
          connect: {
            id: createNews.id,
          },
        },
        tag: {
          connectOrCreate: {
            where: {
              name,
            },
            create: {
              name,
            },
          },
        },
      },
    });
  });

  await Promise.all(createdRelationsNewsTags);

  const find_news = await prisma.news.findUnique({
    where: {
      id: createNews.id,
    },
    include: {
      author: true,
      tagsList: {
        include: {
          tag: true,
        },
      },
    },
  });

  const responseNewsCreatedSerializer =
    ReturnNewsCreatedSchema.parse(find_news);
  return responseNewsCreatedSerializer;
};
