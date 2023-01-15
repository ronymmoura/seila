import type { NextApiRequest, NextApiResponse } from 'next';
import { startOfMonth } from 'date-fns';
import { getCards, getPurchasesByCardId, getRecurrentBills, PredictionSection } from '@lib';
import { getUserId } from '../jwtMiddleware';
import { Purchase, RecurrentBill } from '@prisma/client';
import { Prediction } from '@lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const cards = await getCards(userId);
    const today = new Date();

    let predictions: Prediction[] = [];

    for (let i = 0; i <= 11; i++) {
      const date = startOfMonth(new Date(today.getFullYear(), today.getMonth() + i, today.getDay()));
      const prediction: Prediction = {
        date,
        total: 0,
        sections: []
      };

      // Get recurrent bills ==============================================================================
      let section: PredictionSection = {
        name: 'Compras Recorrentes',
        purchases: []
      };

      const recurrentBill = await getRecurrentBills(userId);
      for (let bill of recurrentBill) {
        prediction.total += +bill.value;
        section.purchases.push(bill);
      }

      prediction.sections.push(section);
      section = null;

      // Get cards purchases ==============================================================================
      for (let card of cards) {
        section = {
          name: card.name,
          purchases: []
        };

        const cardPurchases = await getPurchasesByCardId(card.id);

        cardPurchases.forEach((purchase) => {
          let paidInstallments = purchase.installments.reduce((sum, current) => {
            return sum + (current.isPaid && 1);
          }, 0);

          purchase.paidInstallments = paidInstallments;

          if (
            purchase.installments.length === 0 &&
            purchase.date.getMonth() === date.getMonth() &&
            purchase.date.getFullYear() === date.getFullYear()
          ) {
            prediction.total += +purchase.value;
            section.purchases.push(purchase);
          }

          if (
            purchase.installments.length > 0 &&
            purchase.installments.some(
              (installment) => installment.paymentDate.getMonth() === date.getMonth() && installment.paymentDate.getFullYear() === date.getFullYear()
            )
          ) {
            prediction.total += +purchase.installmentValue;
            section.purchases.push(purchase);
          }

          // let paidInstallments = purchase.paidInstallments!;

          // if (purchase.numberOfInstallments! > 0) {
          //   paidInstallments += i;

          //   purchase = {
          //     ...purchase,
          //     paidInstallments
          //   };

          //   if (paidInstallments <= purchase.numberOfInstallments! && paidInstallments + i > 0) {
          //     prediction.total += +purchase.installmentValue;
          //     section.purchases.push(purchase);
          //   }
          // }

          // if (
          //   purchase.numberOfInstallments === 0 &&
          //   purchase.date.getMonth() === date.getMonth() &&
          //   purchase.date.getFullYear() === date.getFullYear()
          // ) {
          //   prediction.total += +purchase.value;
          //   section.purchases.push(purchase);
          // }
        });

        prediction.sections.push(section);
        section = null;
      }

      predictions.push(prediction);
    }

    return res.status(200).json(predictions);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
