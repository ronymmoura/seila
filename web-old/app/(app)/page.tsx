import { api } from '@helpers';
import { PredictionsList, Money } from '@components';
import { PredictionService } from '@core/domain/prediction';
import { getServerSession } from 'next-auth';

export default async function Home() {
  //const session = await getServerSession(authOptions);

  //console.log({ session });

  const predictions = [];

  return (
    <>
      {predictions?.length > 0 && (
        <>
          <section className="mb-10">
            <h3 className="text-lg">Total do mês</h3>
            {/* <h1 className="text-5xl">{<Money value={predictions[0].total} />}</h1> */}
          </section>

          <PredictionsList predictions={predictions} />
        </>
      )}
    </>
  );
}
