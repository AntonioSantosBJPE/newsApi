import { Request, Response } from "express";
import { createUsersService } from "../services/users/createUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser: any = await createUsersService(req.body);
  return res.status(201).json(newUser);
};
