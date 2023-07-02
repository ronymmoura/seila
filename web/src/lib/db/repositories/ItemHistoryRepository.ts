import { ItemHistory } from "@prisma/client";
import { prisma } from "../prisma";

export class ItemHistoryRepository {
  public async get(id: number) {
    const item = await prisma.itemHistory.findUniqueOrThrow({
      where: { id },
    });

    return item;
  }

  public async list() {
    const items = await prisma.itemHistory.findMany();
    return items;
  }

  public async create(data: ItemHistory) {
    const category = await prisma.itemHistory.create({ data });
    return category;
  }

  public async update(data: ItemHistory) {
    const category = await prisma.itemHistory.update({
      data,
      where: { id: data.id },
    });

    return category;
  }

  public async delete(id: number) {
    await prisma.itemHistory.delete({
      where: { id },
    });
  }

  public async deleteByItemIdMonthGroceriesId(
    itemId: number,
    monthGroceriesId: number
  ) {
    await prisma.itemHistory.deleteMany({
      where: { itemId, monthGroceriesId },
    });
  }
}
