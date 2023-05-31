import type { NextApiRequest, NextApiResponse } from 'next';
import { createPurchase, getPurchasesByCardId } from '../../../../../@core/purchase';
import { getUserId } from '../../../jwtMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;
    const { cardId } = req.query;

    switch (method) {
      case 'GET':
        const purchases = await getPurchasesByCardId(+cardId);
        return res.status(200).json(purchases);
      case 'POST':
        const { description, date, value, categoryId, installmentValue, numberOfInstallments, paidInstallments } = req.body;
        await createPurchase(description, date, value, categoryId, installmentValue, numberOfInstallments, paidInstallments, +cardId);
        return res.status(200).json('Registro criado com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
