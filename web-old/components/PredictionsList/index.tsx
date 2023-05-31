'use client';

import { Money } from '@components';
import { Prediction } from '@core/domain/prediction/prediction.model';
import { Purchase, RecurrentBill } from '@prisma/client';
import { format } from 'date-fns';
//import { Prediction, PredictionPurchase, PredictionPurchases } from '@';
import { useState } from 'react';
import { FaCalendar, FaChevronRight } from 'react-icons/fa';

interface IProps {
  predictions: Prediction[];
}

export const PredictionsList: React.FC<IProps> = ({ predictions }) => {
  const [SelectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectPrediction = (date: Date) => {
    date === SelectedDate ? setSelectedDate(null) : setSelectedDate(date);
  };

  return (
    <section className="my-5 rounded-md bg-slate-200 p-3 text-[#2E323B]">
      <h1 className="mb-2 text-3xl font-semibold">Previsão</h1>

      <div className="flex flex-col space-y-2">
        {predictions?.map((prediction: Prediction, index: number) => (
          <div key={index} className="rounded-md bg-white">
            <div
              className="flex flex-row items-center rounded-md p-2 hover:cursor-pointer hover:bg-slate-100"
              onClick={() => handleSelectPrediction(prediction.date)}
            >
              <div className="mr-2 flex flex-1 flex-row font-light">
                <FaCalendar className="mr-1 h-5 w-5 text-emerald-500" />
                {format(new Date(prediction.date), 'MMM/yyyy')}
              </div>

              <div className="text-xl">
                <Money value={prediction.total} />
              </div>

              <FaChevronRight className="mx-2 h-full w-5 text-slate-400" />
            </div>

            {prediction.date === SelectedDate && (
              <div className="space-y-4 p-2">
                {prediction.sections
                  .filter((x) => x.purchases.length > 0)
                  .map((section, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="text-lg font-semibold">{section.name}</div>

                      {section.purchases.map((purchase: PredictionPurchase) => (
                        <div key={purchase.id} className="flex flex-row space-x-6 rounded-md bg-slate-200 px-2 py-1">
                          <div className="flex-1">{purchase.description}</div>

                          <div>
                            {purchase.installments &&
                              purchase.installments
                                .filter((installment) => {
                                  const installmentPayDate = new Date(installment.paymentDate!);
                                  const predictionDate = new Date(prediction.date);

                                  return (
                                    installmentPayDate.getMonth() === predictionDate.getMonth() &&
                                    installmentPayDate.getFullYear() === predictionDate.getFullYear()
                                  );
                                })
                                .map((installment) => (
                                  <div key={installment.id}>
                                    {installment.number} / {purchase.numberOfInstallments}
                                  </div>
                                ))}
                          </div>

                          <div>
                            <Money value={+(purchase.installmentValue || purchase.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
