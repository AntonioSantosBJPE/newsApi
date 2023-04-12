import { z } from "zod";
const typeOptions: any = [
  "Outros",
  "Política",
  "Economia",
  "Cultura",
  "Segurança",
  "Saúde",
  "Educação",
  "Esportes",
  "Tecnologia",
];
export const NewsSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().max(80),
  subTitle: z.string(),
  content: z.string(),
  type: z.enum(typeOptions),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.number(),
});

export const NewsCreateSchema = NewsSchema.omit({
  id: true,
  published: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
});

export const NewsUpdateSchema = NewsCreateSchema.partial();

const authorSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(80),
  email: z.string().email().max(80),
});

export const ReturnNewsCreatedSchema = NewsSchema.extend({
  author: authorSchema,
});

export const ReturnListNewsSchema = ReturnNewsCreatedSchema.array();
