import { prisma } from '@db';
import { addMonths, endOfMonth, parseISO, startOfMonth } from 'date-fns';

export class PurchaseRepository {
  async getByCardId(cardId: number) {
    let purchases = await prisma.purchase.findMany({
      where: { AND: { cardId } },
      include: { installments: { orderBy: { paymentDate: 'asc' } } }
    });

    return purchases;
  }

  async getPurchasesByCardIdMonth(cardId: number, date: Date) {
    return await prisma.purchase.findMany({
      where: {
        AND: {
          cardId,
          date: {
            gte: startOfMonth(date),
            lte: endOfMonth(date)
          }
        }
      }
    });
  }

  async create(
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

    // if (numberOfInstallments > 0) {
    //   const card = await getCardById(cardId);
    //   const closedMonth = card.closingDate < new Date().getDay();
    //   const indexStart = closedMonth ? 1 : 0;

    //   for (let i = indexStart; i <= numberOfInstallments; i++) {
    //     let purchaseDate = date;
    //     purchaseDate = addMonths(new Date(purchaseDate), i);

    //     await createInstallment(purchase.id, i <= paidInstallments, i, purchaseDate, +installmentValue!);
    //   }
    // }

    return purchase;
  }

  async edit(
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
    //await deleteInstallments(id);

    // if (numberOfInstallments > 0) {
    //   for (let i = 1; i <= numberOfInstallments; i++) {
    //     let purchaseDate = date;
    //     purchaseDate = addMonths(new Date(purchaseDate), i);

    //     await createInstallment(id, i <= paidInstallments, i, purchaseDate, +installmentValue!);
    //   }
    // }

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
}
