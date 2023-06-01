import { Category } from "@prisma/client";
import { prisma } from "../prisma";

export const CategoriesRepository = {
  async get(id: string) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
    });

    return category;
  },

  async list() {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  },

  async create(data: Category) {
    const category = await prisma.category.create({ data });

    return category;
  },

  async update(data: Category) {
    const category = await prisma.category.update({
      data,
      where: { id: data.id },
    });

    return category;
  },

  async delete(id: string) {
    await prisma.category.delete({
      where: { id },
    });
  },
};
