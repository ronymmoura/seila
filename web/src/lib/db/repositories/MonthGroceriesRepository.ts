import { MonthGroceries } from "@prisma/client";
import { prisma } from "../prisma";

export const MonthGroceriesRepository = {
  async get(id: string) {
    const item = await prisma.monthGroceries.findUniqueOrThrow({
      where: { id },
    });

    return item;
  },

  async list() {
    const items = await prisma.monthGroceries.findMany({
      orderBy: {
        month: "desc",
      },
    });

    return items;
  },

  async create(data: MonthGroceries) {
    const category = await prisma.monthGroceries.create({ data });

    return category;
  },

  async update(data: MonthGroceries) {
    const category = await prisma.monthGroceries.update({
      data,
      where: { id: data.id },
    });

    return category;
  },

  async delete(id: string) {
    await prisma.monthGroceries.delete({
      where: { id },
    });
  },
};
