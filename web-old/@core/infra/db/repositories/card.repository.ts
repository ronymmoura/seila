import { prisma } from '@db';

export class CardRepository {
  async get(id: number) {
    const card = await prisma.card.findFirst({ where: { id } });

    return card;
  }

  async getAllByUserId(userId: number) {
    let cards = await prisma.card.findMany({ where: { userId } });

    return cards;
  }

  async create(name: string, number: string, dueDate: Date, closingDate: number, color: string, userId: number) {
    return await prisma.card.create({
      data: {
        name,
        number,
        userId,
        dueDate,
        closingDate,
        color
      }
    });
  }

  async delete(id: number) {
    return await prisma.card.deleteMany({ where: { id } });
  }
}
