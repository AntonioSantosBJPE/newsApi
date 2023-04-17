import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(80),
  email: z.string().email().max(80),
  password: z.string().max(120),
  isAdmin: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});

export const UserCreateSchema = z.object({
  name: z.string().max(80),
  email: z.string().email().max(80),
  password: z.string().max(120),
  isAdmin: z.boolean().optional().default(false),
});

export const UserUpdateSchema = z.object({
  name: z.string().max(80).optional(),
  password: z.string().max(120).optional(),
});

export const UserReturnCreatedSchema = UserSchema.omit({
  password: true,
  isDeleted: true,
});

export const UserReturnUpdatedSchema = UserReturnCreatedSchema;

export const UserReturnListSchema = UserReturnCreatedSchema.array();

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserLoginRefreshSchema = z.object({
  token: z.string(),
});
