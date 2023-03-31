import { User } from "@prisma/client";
import { prisma } from "../../server";
import { hash } from "bcryptjs";
import { AppError } from "../../errors";
import {
  iUserCreate,
  iUserReturnCreated,
} from "../../interfaces/users.interfaces";
import { UserReturnCreatedSchema } from "../../schemas/users.schemas";

export const createUsersService = async (
  payload: iUserCreate
): Promise<iUserReturnCreated> => {
  const findEmailUser: User | null = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (findEmailUser) {
    throw new AppError("Email already exists", 409);
  }

  payload.password = await hash(payload.password, 10);
  const user: User = await prisma.user.create({
    data: {
      ...payload,
    },
  });
  const responseUser: iUserReturnCreated = UserReturnCreatedSchema.parse(user);
  return responseUser;
};
