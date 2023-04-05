import { z } from "zod";

export const NewsSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().max(80),
  content: z.string(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.number(),
});

export const NewsCreateSchema = z.object({
  title: z.string().max(80),
  content: z.string(),
});

const authorSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(80),
  email: z.string().email().max(80),
});

export const ReturnNewsCreatedSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().max(80),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: authorSchema,
});

export const ReturnListNewsSchema = ReturnNewsCreatedSchema.array();
