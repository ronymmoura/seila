import { getCardById, createInstallment, deleteInstallments } from '@lib';
import { addMonths, endOfMonth, parseISO, startOfMonth } from 'date-fns';
import { prisma } from '../../db';

export async function getPurchasesByCardId(cardId: number) {
  let purchases = await prisma.purchase.findMany({
    where: { AND: { cardId } },
    include: { installments: {} }
  });

  purchases = purchases.filter((purchase) => {
    if (purchase.numberOfInstallments > 0) return purchase.paidInstallments! < purchase.numberOfInstallments! || purchase.date === new Date();

    return purchase;
  });

  return purchases;
}

export async function getPurchasesByCardIdMonth(cardId: number, date: Date) {
  return await prisma.purchase.findMany({
    where: { AND: { cardId, date: { gte: startOfMonth(date), lte: endOfMonth(date) } } }
  });
}

export async function createPurchase(
  description: string,
  date: Date,
  value: number,
  categoryId: number,
  installmentValue: number,
  numberOfInstallments: number,
  paidInstallments: number,
  cardId: number
) {
  const purchase = await prisma.purchase.create({
    data: {
      description,
      date,
      value,
      categoryId,
      installmentValue,
      numberOfInstallments,
      paidInstallments,
      cardId
    }
  });

  if (numberOfInstallments > 0) {
    const card = await getCardById(cardId);
    const closedMonth = card.closingDate < new Date().getDay();
    const indexStart = closedMonth ? 1 : 0;

    for (let i = indexStart; i <= numberOfInstallments; i++) {
      let purchaseDate = date;
      purchaseDate = addMonths(new Date(purchaseDate), i);

      await createInstallment(purchase.id, i <= paidInstallments, i, purchaseDate, +installmentValue!);
    }
  }

  return purchase;
}

export async function editPurchase(
  id: number,
  description: string,
  date: Date,
  value: number,
  categoryId: number,
  installmentValue: number,
  numberOfInstallments: number,
  paidInstallments: number,
  cardId: number
) {
  await deleteInstallments(id);

  if (numberOfInstallments > 0) {
    for (let i = 1; i <= numberOfInstallments; i++) {
      let purchaseDate = date;
      purchaseDate = addMonths(new Date(purchaseDate), i);

      await createInstallment(id, i <= paidInstallments, i, purchaseDate, +installmentValue!);
    }
  }

  return await prisma.purchase.update({
    where: {
      id
    },
    data: {
      id,
      description,
      date,
      value,
      categoryId,
      installmentValue,
      numberOfInstallments,
      paidInstallments,
      cardId
    }
  });
}

export async function deletePurchase(id: number) {
  await prisma.installment.deleteMany({ where: { purchaseId: id } });
  return await prisma.purchase.delete({ where: { id } });
}
