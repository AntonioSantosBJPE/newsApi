import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import { IuserTokenInfos } from "../../interfaces/users.interfaces";

export const validatePermissionIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userIdParams: string = req.params.id;
  const userInfosToken: IuserTokenInfos = req.userTokenInfos;

  if (userIdParams !== userInfosToken.id) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};
