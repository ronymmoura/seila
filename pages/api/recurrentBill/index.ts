import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserId } from '../jwtMiddleware';
import { createBill, getRecurrentBills } from '../../../lib/recurrentBill';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;

    switch (method) {
      case 'GET':
        const cards = await getRecurrentBills(userId);
        return res.status(200).json(cards);
      case 'POST':
        const { description, value, dueDate } = req.body;
        await createBill(description, value, dueDate, userId);
        return res.status(200).json('Pagamento criado com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
