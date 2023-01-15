import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { api } from '@helpers';
import { PredictionsList, Page, Money } from '@components';
import { Prediction } from '@lib';

const Home: NextPage<any> = () => {
  const [Predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await loadPredictions();
    })();
  }, []);

  const loadPredictions = async () => {
    const predictions = await api<Prediction[]>('/api/user/prediction', 'GET');
    setPredictions(predictions);
  };

  return (
    <Page>
      {Predictions && Predictions.length > 0 && (
        <>
          <section className="mb-10">
            <h3 className="text-lg">Total do mês</h3>
            <h1 className="text-5xl">{Predictions && <Money value={Predictions[0].total} />}</h1>
          </section>

          <PredictionsList predictions={Predictions} />
        </>
      )}
    </Page>
  );
};

export default Home;
