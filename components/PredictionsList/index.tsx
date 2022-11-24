import { Purchase } from '@prisma/client';
import { format } from 'date-fns';

interface IProps {
  predictions: any[];
}

export const PredictionsList: React.FC<IProps> = ({ predictions }) => {
  return (
    <section className="my-5 rounded-md bg-slate-200 p-3 text-[#2E323B]">
      <h1 className="mb-2 text-3xl font-semibold">Previsão</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-6">
        {predictions?.map((prediction: any, index: number) => (
          <div key={index} className="">
            <div className="font-light">{format(new Date(prediction.date), 'dd/MM/yyyy')}</div>
            <div className="text-xl">
              R${' '}
              {Number(
                prediction.purchases.reduce(
                  (sum: number, current: Purchase) =>
                    sum +
                    (+current.installmentValue! > 0 ? +current.installmentValue! : +current.value),
                  0
                )
              ).toLocaleString('pt-br', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
