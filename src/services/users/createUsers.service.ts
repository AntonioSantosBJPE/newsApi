import { hash } from "bcryptjs";
import { prisma } from "../../server";

export const createUsersService = async (payload: any): Promise<any> => {
  payload.password = await hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      ...payload,
    },
  });
  return user;
};
