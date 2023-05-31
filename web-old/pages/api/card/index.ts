import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserId } from '../jwtMiddleware';
import { createCard, deleteCard, getCards } from '../../../@core/card';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;

    switch (method) {
      case 'GET':
        const cards = await getCards(userId);
        return res.status(200).json(cards);
      case 'POST':
        const { name, number, dueDate, closingDate, color } = req.body;
        await createCard(name, number, dueDate, closingDate, color, userId);
        return res.status(200).json('Cartão criado com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
