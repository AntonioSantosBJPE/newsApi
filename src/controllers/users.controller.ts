import { Request, Response } from "express";
import {
  iUserCreate,
  iUserLogin,
  iUserReturnCreated,
  iUserReturnList,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { loginUsersService } from "../services/users/loginUsers.service";
import { retrieveProfileUserService } from "../services/users/retrieveProfileUser.service";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";

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

export const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listUsers: iUserReturnList = await retrieveUsersService();
  return res.status(200).json(listUsers);
};

export const retrieveProfileUserContoller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  const userProfile = await retrieveProfileUserService(userId);
  return res.status(200).json(userProfile);
};
