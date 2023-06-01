import { ItemHistory } from "@prisma/client";
import { prisma } from "../prisma";

export const ItemHistoryRepository = {
  async get(id: string) {
    const item = await prisma.itemHistory.findUniqueOrThrow({
      where: { id },
    });

    return item;
  },

  async list() {
    const items = await prisma.itemHistory.findMany();

    return items;
  },

  async create(data: ItemHistory) {
    const category = await prisma.itemHistory.create({ data });

    return category;
  },

  async update(data: ItemHistory) {
    const category = await prisma.itemHistory.update({
      data,
      where: { id: data.id },
    });

    return category;
  },

  async delete(id: string) {
    await prisma.itemHistory.delete({
      where: { id },
    });
  },

  async deleteByItemIdMonthGroceriesId(
    itemId: string,
    monthGroceriesId: string
  ) {
    await prisma.itemHistory.deleteMany({
      where: { itemId, monthGroceriesId },
    });
  },
};
