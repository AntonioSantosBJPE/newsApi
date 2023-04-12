import { AppError } from "../../errors";
import { iReturnNewsCreated } from "../../interfaces/news.interfaces";
import { ReturnNewsCreatedSchema } from "../../schemas/news.schemas";
import { prisma } from "../../server";

export const retrieveNewsByIdService = async (
  news_id: string
): Promise<iReturnNewsCreated> => {
  if (isNaN(Number(news_id))) {
    throw new AppError("News not found", 404);
  }

  const find_news = await prisma.news.findUnique({
    where: {
      id: Number(news_id),
    },
    include: {
      author: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!find_news) {
    throw new AppError("News not found", 404);
  }

  if (find_news.published === false) {
    throw new AppError("News not found", 404);
  }

  const responseNewsSerializer: iReturnNewsCreated =
    ReturnNewsCreatedSchema.parse(find_news);
  return responseNewsSerializer;
};
