import { z } from "zod";
import {
  UserCreateSchema,
  UserLoginSchema,
  UserReturnCreatedSchema,
  UserReturnListSchema,
  UserReturnUpdatedSchema,
  UserUpdateSchema,
} from "../schemas/users.schemas";

export type iUserCreate = z.infer<typeof UserCreateSchema>;
export type iUserReturnCreated = z.infer<typeof UserReturnCreatedSchema>;
export type iUserUpdate = z.infer<typeof UserUpdateSchema>;
export type iUserReturnUpdated = z.infer<typeof UserReturnUpdatedSchema>;
export type iUserReturnList = z.infer<typeof UserReturnListSchema>;

export type iUserLogin = z.infer<typeof UserLoginSchema>;

export interface IuserTokenInfos {
  email: string;
  id: string;
  admin: boolean;
}