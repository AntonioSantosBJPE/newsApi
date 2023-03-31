import { Request, Response } from "express";
import {
  iUserCreate,
  iUserReturnCreated,
} from "../interfaces/users.interfaces";
import { createUsersService } from "../services/users/createUsers.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: iUserCreate = req.body;
  const newUser: iUserReturnCreated = await createUsersService(body);
  return res.status(201).json(newUser);
};
