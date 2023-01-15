import { RecurrentBill, Purchase, Installment } from '@prisma/client';

export type PredictionPurchase = RecurrentBill & Purchase & { installments: Installment[] };
export type PredictionPurchases = RecurrentBill[] & Purchase[];
export type PredictionSection = { name: string; purchases: PredictionPurchases };

export type Prediction = {
  date: Date;
  total: number;
  sections: PredictionSection[];
};
