import { Item, ItemHistory, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ItemHistoryRepository } from "./ItemHistoryRepository";

export class ItemsRepository {
  public async get(id: number) {
    const category = await prisma.item.findUniqueOrThrow({
      where: { id },
    });

    return category;
  }

  public async list() {
    const Items = await prisma.item.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        itemHistory: {
          include: {
            item: true,
          },
        },
      },
    });

    return Items;
  }

  public async create(data: Item) {
    data.name = data.name.toUpperCase();

    let existingItem = await prisma.item.findFirst({
      where: { name: data.name },
    });

    if (!existingItem) {
      existingItem = await prisma.item.create({ data });
    }

    new ItemHistoryRepository().create({
      monthGroceriesId: data.monthGroceriesId,
      brand: "",
      quantity: 0,
      itemId: existingItem.id,
      value: new Prisma.Decimal(0),
    } as ItemHistory);
  }

  public async update(data: Item) {
    data.name = data.name.toUpperCase();

    const category = await prisma.item.update({
      data,
      where: { id: data.id },
    });

    return category;
  }

  public async delete(id: number) {
    await prisma.itemHistory.deleteMany({ where: { itemId: id } });
    await prisma.item.delete({
      where: { id },
    });
  }
}
