//import { editInstallmentPaid, getPurchaseInstallments } from '@core';
import { NextApiRequest, NextApiResponse } from 'next';
//import { getUserId } from 'pages/api/jwtMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // try {
  //   const userId = getUserId(req, res);
  //   const { method } = req;
  //   const { purchaseId, installmentId, isPaid } = req.query;
  //   switch (method) {
  //     case 'PUT':
  //       await editInstallmentPaid(+installmentId, isPaid === 'true');
  //       const installments = await getPurchaseInstallments(+purchaseId);
  //       return res.status(200).json(installments);
  //   }
  // } catch (e: any) {
  //   return res.status(500).json(e.message);
  // }
}
