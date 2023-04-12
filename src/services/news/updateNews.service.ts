import { prisma } from "../../server";
import { ReturnNewsCreatedSchema } from "../../schemas/news.schemas";
import { iReturnNewsCreated } from "../../interfaces/news.interfaces";

export const updateNewsService = async (
  newsIdParams: string,
  payload: any
): Promise<iReturnNewsCreated> => {
  const updatedNews = await prisma.news.update({
    where: {
      id: Number(newsIdParams),
    },
    data: {
      ...payload,
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

  const responseNewsSerializer: iReturnNewsCreated =
    ReturnNewsCreatedSchema.parse(updatedNews);
  return responseNewsSerializer;
};
