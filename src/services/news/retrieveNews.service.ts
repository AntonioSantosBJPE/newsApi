import { Prisma } from "@prisma/client";
import { Request } from "express";
import {
  iReturnListNews,
  iReturnListNewsPagination,
} from "../../interfaces/news.interfaces";
import { ReturnListNewsSchema } from "../../schemas/news.schemas";
import { prisma } from "../../server";
import "dotenv/config";
import { createUrlsPagination } from "./logics/createUrlsPagination";
import { validateQuerysPagination } from "./logics/validateQuerysPagination";

const typeOptions: string[] = [
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

export const retrieveNewsService = async (
  req: Request
): Promise<iReturnListNewsPagination> => {
  const typeFilter: string | undefined = req.query.typeNews?.toString();

  let conditionsWherePrisma: Prisma.NewsWhereInput;
  if (typeFilter && typeOptions.includes(typeFilter)) {
    conditionsWherePrisma = {
      published: true,
      type: typeFilter,
    };
  } else {
    conditionsWherePrisma = {
      published: true,
    };
  }

  const countNewsFilter: number = await prisma.news.count({
    where: {
      ...conditionsWherePrisma,
    },
  });

  const { perPage, page, pageInitial, orderBy } = validateQuerysPagination(
    req,
    countNewsFilter
  );

  const { urlNextPage, urlPreviousPage } = createUrlsPagination(
    perPage,
    pageInitial,
    orderBy,
    countNewsFilter,
    typeFilter,
    typeOptions
  );

  const listNews = await prisma.news.findMany({
    take: perPage,
    skip: page,
    where: {
      ...conditionsWherePrisma,
    },
    include: {
      author: true,
      tagsList: {
        include: {
          tag: true,
        },
      },
      commentsList: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: orderBy as Prisma.SortOrder,
    },
  });

  const responseListNewsSerializer = ReturnListNewsSchema.parse(listNews);

  const output: iReturnListNewsPagination = {
    previousPage: urlPreviousPage,
    nextPage: urlNextPage,
    count: countNewsFilter,
    news: responseListNewsSerializer,
  };
  return output;
};
