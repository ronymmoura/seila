import { Item } from "@prisma/client";
import { prisma } from "../prisma";

export const ItemsRepository = {
  async get(id: string) {
    const category = await prisma.item.findUniqueOrThrow({
      where: { id },
    });

    return category;
  },

  async list() {
    const Items = await prisma.item.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        ItemHistory: true,
      },
    });

    return Items;
  },

  async create(data: Item) {
    const category = await prisma.item.create({ data });

    return category;
  },

  async update(data: Item) {
    const category = await prisma.item.update({
      data,
      where: { id: data.id },
    });

    return category;
  },

  async delete(id: string) {
    await prisma.item.delete({
      where: { id },
    });
  },
};
