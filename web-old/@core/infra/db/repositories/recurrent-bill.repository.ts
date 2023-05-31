import { prisma } from '@db';

export class RecurrentBillRepository {
  async getByUserId(userId: number) {
    return await prisma.recurrentBill.findMany({ where: { userId } });
  }

  async create(description: string, value: number, dueDate: Date, userId: number) {
    return await prisma.recurrentBill.create({
      data: {
        description,
        value,
        dueDate,
        userId
      }
    });
  }

  async edit(id: number, description: string, value: number, dueDate: Date, userId: number) {
    return await prisma.recurrentBill.update({
      where: {
        id
      },
      data: {
        id,
        description,
        value,
        dueDate,
        userId
      }
    });
  }

  async delete(id: number) {
    return await prisma.recurrentBill.delete({ where: { id } });
  }
}
