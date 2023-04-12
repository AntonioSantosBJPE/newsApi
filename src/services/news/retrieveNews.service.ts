import { Request } from "express";
import { iReturnListNews } from "../../interfaces/news.interfaces";
import { ReturnListNewsSchema } from "../../schemas/news.schemas";
import { prisma } from "../../server";

export const retrieveNewsService = async (
  req: Request
): Promise<iReturnListNews> => {
  const ordeBy = req.query.ordeBy
    ? req.query.ordeBy.toString().toLowerCase()
    : "asc";
  

  const listNews = await prisma.news.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const responseListNewsSerializer = ReturnListNewsSchema.parse(listNews);
  return responseListNewsSerializer;
};
