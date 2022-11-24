import type { NextApiRequest, NextApiResponse } from 'next';
import { createBill, editBill, deleteBill } from '@lib';
import { getUserId } from '../../jwtMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;
    const { billId } = req.query;

    const { description, value, dueDate } = req.body;

    switch (method) {
      case 'POST':
        await createBill(description, value, dueDate, userId);
        return res.status(200).json('Pagamento incluído com sucesso.');
      case 'PUT':
        await editBill(+billId, description, value, dueDate, userId);
        return res.status(200).json('Pagamento editado com sucesso.');
      case 'DELETE':
        await deleteBill(+billId);
        return res.status(200).json('Pagamento excluído com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
