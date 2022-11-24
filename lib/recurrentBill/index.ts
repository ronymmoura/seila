import { prisma } from '../../db';

export async function getRecurrentBills(userId: number) {
  return await prisma.recurrentBill.findMany({ where: { userId } });
}

export async function createBill(
  description: string,
  value: number,
  dueDate: Date,
  userId: number
) {
  return await prisma.recurrentBill.create({
    data: {
      description,
      value,
      dueDate,
      userId
    }
  });
}

export async function editBill(
  id: number,
  description: string,
  value: number,
  dueDate: Date,
  userId: number
) {
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

export async function deleteBill(id: number) {
  return await prisma.recurrentBill.delete({ where: { id } });
}
