import {
  iCommentsCreateBody,
  iCommentsCreateReturn,
} from "../../interfaces/comments.interfaces";
import { CommentsCreateReturnSchema } from "../../schemas/comments.schemas";
import { prisma } from "../../server";

export const updateCommentsService = async (
  payload: iCommentsCreateBody,
  commentId: string
): Promise<iCommentsCreateReturn> => {
  const updateComment = await prisma.newsComments.update({
    where: {
      id: Number(commentId),
    },
    data: {
      message: payload.message!,
    },
    include: {
      user: true,
    },
  });

  const response: iCommentsCreateReturn =
    CommentsCreateReturnSchema.parse(updateComment);
  return response;
};
