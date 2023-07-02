import { Category } from "@prisma/client";
import { prisma } from "../prisma";

export class CategoriesRepository {
  public async get(id: number) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
    });

    return category;
  }

  public async list() {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }

  public async create(data: Category) {
    const category = await prisma.category.create({ data });

    return category;
  }

  public async update(data: Category) {
    const category = await prisma.category.update({
      data,
      where: { id: data.id },
    });

    return category;
  }

  public async delete(id: number) {
    await prisma.category.delete({
      where: { id },
    });
  }
}
