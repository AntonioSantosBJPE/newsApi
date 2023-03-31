import { User } from "@prisma/client";
import { prisma } from "../../server";
import { compare, hash } from "bcryptjs";
import { AppError } from "../../errors";
import { iUserLogin } from "../../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";

export const loginUsersService = async (
  payload: iUserLogin
): Promise<string> => {
  const findUser: User | null = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!findUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    payload.password,
    findUser.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    {
      email: findUser.email,
      admin: findUser.isAdmin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(findUser.id),
    }
  );

  return token;
};
