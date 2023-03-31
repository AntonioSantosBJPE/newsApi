import { hash } from "bcryptjs";
import { AppError } from "../../errors";
import { UserReturnCreatedSchema } from "../../schemas/users.schemas";
import { prisma } from "../../server";

export const createUsersService = async (payload: any): Promise<any> => {
  const findEmailUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (findEmailUser) {
    throw new AppError("Email already exists", 409);
  } else {
    payload.password = await hash(payload.password, 10);
    const user = await prisma.user.create({
      data: {
        ...payload,
      },
    });
    const responseUser = UserReturnCreatedSchema.parse(user);
    return responseUser;
  }
};
