import { Request, Response } from "express";
import {
  iUserCreate,
  iUserLogin,
  iUserLoginrefresh,
  iUserReturnCreated,
  iUserReturnList,
  iUserReturnUpdated,
  iUserTokensResponse,
  iUserUpdate,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { loginRefreshUsersService } from "../services/users/loginRefreshUser.service";
import { loginUsersService } from "../services/users/loginUsers.service";
import { retrieveProfileUserService } from "../services/users/retrieveProfileUser.service";
import { retrieveUsersService } from "../services/users/retrieveUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

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
  const tokens: iUserTokensResponse = await loginUsersService(body, res);
  return res.status(200).json(tokens);
};

export const loginRefreshUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iUserLoginrefresh = req.body;
  const token: string = await loginRefreshUsersService(body, req);
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

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  await deleteUserService(userId);
  return res.status(204).json();
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userIdParams: string = req.params.id;
  const body: iUserUpdate = req.body;
  const updateUser: iUserReturnUpdated = await updateUserService(
    userIdParams,
    body
  );
  return res.status(200).json(updateUser);
};
