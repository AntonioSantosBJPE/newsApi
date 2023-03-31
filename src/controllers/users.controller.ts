import { Request, Response } from "express";
import {
  iUserCreate,
  iUserLogin,
  iUserReturnCreated,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { loginUsersService } from "../services/users/loginUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iUserCreate = req.body;
  const newUser: iUserReturnCreated = await createUsersService(body);
  return res.status(201).json(newUser);
};

export const loginUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iUserLogin = req.body;
  const token: string = await loginUsersService(body);
  return res.status(200).json({ token });
};
