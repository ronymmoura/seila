import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserId } from '../../jwtMiddleware';
import { createCard, deleteCard, getCards } from '../../../../@core/card';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = getUserId(req, res);

    const { method } = req;

    switch (method) {
      case 'DELETE':
        const { cardId } = req.query;
        await deleteCard(userId, +cardId);
        return res.status(200).json('Cartão apagado com sucesso.');
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
