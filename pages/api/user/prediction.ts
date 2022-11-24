import type { NextApiRequest, NextApiResponse } from 'next';
import { startOfMonth } from 'date-fns';
import { getCards, getPurchasesByCardId, getRecurrentBills } from '@lib';
import { getUserId } from '../jwtMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const cards = await getCards(userId);
    const today = new Date();

    let predictions: any[] = [];

    for (let i = 0; i <= 11; i++) {
      const date = startOfMonth(new Date(today.getFullYear(), today.getMonth() + i, today.getDay()));

      if (predictions.filter((x) => x.date === date)) {
        predictions.push({ date, purchases: [] });
      }

      const purchases: any[] = [];

      // Get recurrent bills ==============================================================================
      const recurrentBill = await getRecurrentBills(userId);
      for (let bill of recurrentBill) {
        purchases.push(bill);
      }

      // Get cards purchases ==============================================================================
      for (let card of cards) {
        const cardPurchases = await getPurchasesByCardId(card.id);

        cardPurchases.forEach((purchase) => {
          let paidInstallments = purchase.paidInstallments!;

          if (purchase.numberOfInstallments! > 0) {
            paidInstallments += i;

            purchase = {
              ...purchase,
              paidInstallments
            };

            if (paidInstallments <= purchase.numberOfInstallments! && paidInstallments + i > 0) purchases.push(purchase);
          }

          if (
            purchase.numberOfInstallments === 0 &&
            purchase.date.getMonth() === date.getMonth() &&
            purchase.date.getFullYear() === date.getFullYear()
          ) {
            purchases.push(purchase);
          }
        });

        predictions.filter((x) => x.date === date)[0].purchases = purchases;
      }
    }

    return res.status(200).json(predictions);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
