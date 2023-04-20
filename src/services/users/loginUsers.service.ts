import { Response } from "express";
import { User } from "@prisma/client";
import { prisma } from "../../server";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import * as usersInterfaces from "../../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";
import * as logics from "./logics";
import "dotenv/config";

export const loginUsersService = async (
  payload: usersInterfaces.iUserLogin,
  res: Response
): Promise<usersInterfaces.iUserTokensResponse> => {
  const findUser: User | null = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  logics.validateFindUser(findUser, "Invalid credentials", 401);

  const passwordMatch: boolean = await compare(
    payload.password,
    findUser!.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken: string = sign(
    {
      email: findUser!.email,
      admin: findUser!.isAdmin,
      type: "access",
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFE || "1h",
      subject: String(findUser!.id),
    }
  );

  const refreshToken: string = sign(
    {
      email: findUser!.email,
      admin: findUser!.isAdmin,
      type: "refresh",
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE || "7d",
      subject: String(findUser!.id),
    }
  );

  return { accessToken, refreshToken };
};
