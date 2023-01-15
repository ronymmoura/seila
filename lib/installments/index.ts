import { prisma } from '../../db';

export async function getPurchaseInstallments(purchaseId: number) {
  const installments = await prisma.installment.findMany({ where: { purchaseId }, orderBy: { number: 'asc' } });

  return installments;
}

export async function createInstallment(purchaseId: number, isPaid: boolean, number: number, paymentDate: Date, value: number) {
  await prisma.installment.create({
    data: {
      purchaseId,
      isPaid,
      number,
      paymentDate,
      value
    }
  });
}

export async function deleteInstallments(purchaseId: number) {
  await prisma.installment.deleteMany({
    where: {
      purchaseId
    }
  });
}

export async function editInstallmentPaid(installmentId: number, isPaid: boolean) {
  const installment = await prisma.installment.updateMany({
    where: {
      id: installmentId
    },
    data: {
      isPaid: isPaid
    }
  });

  return installment;
}
