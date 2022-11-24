import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { api } from '@helpers';
import { PredictionsList, Page } from '@components';

const Home: NextPage<any> = () => {
  const [Predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await loadPredictions();
    })();
  }, []);

  const loadPredictions = async () => {
    const predictions = await api<any>('/api/user/prediction', 'GET');
    setPredictions(predictions);
  };

  return (
    <Page>
      <section className="mb-10">
        <h3 className="text-lg">Total</h3>
        <h1 className="text-5xl">
          {Predictions && (
            <>
              R${' '}
              {Predictions[0]?.purchases
                .reduce(
                  (sum: number, current: any) =>
                    sum +
                    (current.installmentValue > 0 ? +current.installmentValue : +current.value!),
                  0
                )
                .toLocaleString('pt-br', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
            </>
          )}
        </h1>
      </section>

      <PredictionsList predictions={Predictions} />
    </Page>
  );
};

export default Home;
