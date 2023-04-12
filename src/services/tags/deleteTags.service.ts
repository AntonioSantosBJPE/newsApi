import { Prisma } from "@prisma/client";
import { iTagsDelete } from "../../interfaces/tags.interfaces";
import { prisma } from "../../server";

export const deleteTagsService = async (
  listTagsId: iTagsDelete
): Promise<void> => {
  const deleteTag: Prisma.BatchPayload = await prisma.tag.deleteMany({
    where: {
      id: { in: listTagsId.ids },
    },
  });
};
