// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../@core/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    const accessToken = await login(email, password);

    if (accessToken) return res.status(200).json({ accessToken });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}
