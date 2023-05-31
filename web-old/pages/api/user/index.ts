// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../@core/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'POST') {
      const { name, email, password } = req.body;
      await createUser(name, email, password);

      return res.status(200).json({ name: 'Usuário criado com sucesso!' });
    }
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
