import { User } from "@prisma/client";
import { prisma } from "../../server";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import {
  iUserLogin,
  iUserTokensResponse,
} from "../../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";
import { validateFindUser } from "./logics.service";
import "dotenv/config";
import { Response } from "express";

export const loginUsersService = async (
  payload: iUserLogin,
  res: Response
): Promise<iUserTokensResponse> => {
  const findUser: User | null = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  validateFindUser(findUser, "Invalid credentials", 401);

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

  //res.cookie("refreshToken", refreshToken, { httpOnly: true });
  return { accessToken, refreshToken };
};
