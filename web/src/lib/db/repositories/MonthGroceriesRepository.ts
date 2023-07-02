import { MonthGroceries } from "@prisma/client";
import { prisma } from "../prisma";

export class MonthGroceriesRepository {
  public async get(id: number) {
    const item = await prisma.monthGroceries.findUniqueOrThrow({
      where: { id },
    });

    return item;
  }

  public async list() {
    const items = await prisma.monthGroceries.findMany({
      orderBy: {
        month: "desc",
      },
      include: {
        itemHistory: true,
      },
    });

    return items;
  }

  public async getLast() {
    const items = await prisma.monthGroceries.findFirstOrThrow({
      orderBy: {
        month: "desc",
      },
      include: {
        itemHistory: {
          include: {
            item: true,
          },
        },
      },
    });

    return items;
  }

  public async create(data: MonthGroceries) {
    const category = await prisma.monthGroceries.create({ data });

    return category;
  }

  public async update(data: MonthGroceries) {
    const category = await prisma.monthGroceries.update({
      data,
      where: { id: data.id },
    });

    return category;
  }

  public async delete(id: number) {
    await prisma.monthGroceries.delete({
      where: { id },
    });
  }
}
