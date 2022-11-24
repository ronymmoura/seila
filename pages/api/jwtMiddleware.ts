import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = 'E882mwxh@1991';
const EXPIRATION = 5000;

export function getUserId(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization!;
    const decryptedToken = jwt.verify(token, JWT_SECRET) as any;

    if (!decryptedToken.id) return res.status(401).json('Sessão inválida.');

    return decryptedToken.id;
  } catch (e: any) {
    if (e.message === 'jwt expired') return res.status(401).json(e.message);

    return res.status(500).json(e.message);
  }
}

export function generateJwtToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION });
}
