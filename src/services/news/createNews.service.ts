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
  const createNews = await prisma.news.create({
    data: {
      ...payload,
      author: { connect: { id: Number(authorId) } },
    },
    include: {
      author: true,
    },
  });

  const responseNewsCreatedSerializer =
    ReturnNewsCreatedSchema.parse(createNews);
  return responseNewsCreatedSerializer;
};
