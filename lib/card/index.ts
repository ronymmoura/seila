import { Card } from '@prisma/client';
import { getPurchasesByCardId } from '@lib';
import { prisma } from '../../db';

export async function getCards(userId: number) {
  let cards = await prisma.card.findMany({ where: { userId } });

  const parsedCards = await Promise.all(
    cards.map(async (card: Card) => {
      const purchases = await getPurchasesByCardId(card.id);

      card.monthTotal = purchases.reduce((sum, current) => {
        let value = +current.value;

        if (current.installments.length > 0) {
          value = current.installments.reduce((sum, current) => sum + (current.paymentDate <= new Date() && current.isPaid ? +current.value : 0), 0);
        }

        return sum + value;
      }, 0);

      return card;
    })
  );

  return parsedCards;
}

export async function getCardById(id: number) {
  let card = await prisma.card.findFirst({ where: { id } });

  const purchases = await getPurchasesByCardId(card.id);

  card.monthTotal = purchases.reduce((sum, current) => {
    let value = +current.value;

    if (current.installments.length > 0) {
      value = current.installments.reduce((sum, current) => sum + (current.paymentDate <= new Date() ? +current.value : 0), 0);
    }

    return sum + value;
  }, 0);

  return card;
}

export async function createCard(name: string, number: string, dueDate: Date, closingDate: number, color: string, userId: number) {
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

export async function deleteCard(userId: number, cardId: number) {
  const purchases = await prisma.purchase.findMany({ where: { cardId, card: { id: cardId } } });

  for (let purchase of purchases) {
    await prisma.installment.deleteMany({ where: { purchaseId: purchase.id } });
    await prisma.purchase.deleteMany({ where: { id: purchase.id } });
  }

  return await prisma.card.deleteMany({ where: { id: cardId, userId } });
}
