import { prisma } from "../../server";
import { User } from "@prisma/client";
import { iUserReturnUpdated } from "../../interfaces/users.interfaces";
import { UserReturnCreatedSchema } from "../../schemas/users.schemas";
import { hash } from "bcryptjs";
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
    },
  });

  const responseNewsSerializer: iReturnNewsCreated =
    ReturnNewsCreatedSchema.parse(updatedNews);
  return responseNewsSerializer;
  //   if (payload.password) {
  //     payload.password = await hash(payload.password, 10);
  //   }
  //   const updateUser: User = await prisma.user.update({
  //     where: {
  //       id: Number(userIdParams),
  //     },
  //     data: {
  //       ...payload,
  //     },
  //   });
  //   const responseUserSerializer = UserReturnCreatedSchema.parse(updateUser);
  //   return responseUserSerializer;
};
