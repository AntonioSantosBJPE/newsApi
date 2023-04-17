import {
  iCommentsCreateBody,
  iCommentsCreateReturn,
} from "../../interfaces/comments.interfaces";
import { IuserTokenInfos } from "../../interfaces/users.interfaces";
import { CommentsCreateReturnSchema } from "../../schemas/comments.schemas";
import { prisma } from "../../server";

export const createCommentsService = async (
  payload: iCommentsCreateBody,
  newsId: string,
  userInfos: IuserTokenInfos
): Promise<iCommentsCreateReturn> => {
  const newComment = await prisma.newsComments.create({
    data: {
      message: payload.message!,
      newsId: Number(newsId),
      userId: Number(userInfos.id),
    },
    include: {
      user: true,
    },
  });

  const response: iCommentsCreateReturn =
    CommentsCreateReturnSchema.parse(newComment);
  return response;
};
