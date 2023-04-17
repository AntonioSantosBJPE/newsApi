import { AppError } from "../../errors";
import { iUserLoginrefresh } from "../../interfaces/users.interfaces";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import "dotenv/config";
import { Request } from "express";

export const loginRefreshUsersService = async (
  payload: iUserLoginrefresh,
  req: Request
): Promise<string> => {
  //const refreshToken = req.cookies.refreshToken;

  verify(
    payload.token,
    String(process.env.SECRET_KEY),
    (error: VerifyErrors | null, decoded: any) => {
      if (error) {
        throw new AppError("jwt refresh expired", 401);
      }
      req.userTokenInfos = {
        email: decoded.email,
        id: decoded.sub,
        admin: decoded.admin,
      };
      return;
    }
  );

  const accessToken: string = sign(
    {
      email: req.userTokenInfos!.email,
      admin: req.userTokenInfos!.admin,
      type: "access",
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE || "1h",
      subject: String(req.userTokenInfos!.id),
    }
  );

  return accessToken;
};
