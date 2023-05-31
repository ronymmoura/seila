import type { NextApiRequest, NextApiResponse } from 'next';
import { createPurchase, deletePurchase, editPurchase, getPurchasesByCardId } from '../../../../../../@core/purchase';
import { getUserId } from '../../../../jwtMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;
    const { purchaseId } = req.query;
    const { cardId, description, date, value, categoryId, installmentValue, numberOfInstallments, paidInstallments } = req.body;

    switch (method) {
      case 'PUT':
        const purchases = await editPurchase(
          +purchaseId,
          description,
          date,
          value,
          categoryId,
          installmentValue,
          numberOfInstallments,
          paidInstallments,
          cardId
        );
        return res.status(200).json(purchases);
      case 'DELETE':
        await deletePurchase(+purchaseId);
        return res.status(200).json('Compra excluída com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
