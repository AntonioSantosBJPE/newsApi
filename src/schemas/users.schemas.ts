import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(80),
  email: z.string().email().max(80),
  password: z.string().max(120),
  isAdmin: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
});

export const UserCreateSchema = z.object({
  name: z.string().max(80),
  email: z.string().email().max(80),
  password: z.string().max(120),
  isAdmin: z.boolean().optional(),
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