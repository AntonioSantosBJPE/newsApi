import { iReturnListNews } from "../../interfaces/news.interfaces";
import { ReturnListNewsSchema } from "../../schemas/news.schemas";
import { prisma } from "../../server";

export const retrieveNewsService = async (): Promise<iReturnListNews> => {
  const listNews = await prisma.news.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      published: true,
    },
    include: {
      author: true,
    },
  });

  const responseListNewsSerializer = ReturnListNewsSchema.parse(listNews);
  return responseListNewsSerializer;
};
