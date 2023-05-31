import { prisma } from '@db';

export class InstallmentRepository {
  async create(purchaseId: number, isPaid: boolean, number: number, paymentDate: Date, value: number) {
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

  async getByPurchaseId(purchaseId: number) {
    const installments = await prisma.installment.findMany({ where: { purchaseId }, orderBy: { number: 'asc' } });

    return installments;
  }

  async deleteByPurchaseId(purchaseId: number) {
    await prisma.installment.deleteMany({
      where: {
        purchaseId
      }
    });
  }

  async editInstallmentPaid(installmentId: number, isPaid: boolean) {
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
}
