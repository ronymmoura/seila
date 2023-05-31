import { Card, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { CardRepository } from '@db';
import { CardService } from '@core/domain/card';

export default async function CardList() {
  const session = await getServerSession<any, { user: User }>(authOptions);

  const cardRepository = new CardRepository();
  const cardService = new CardService(cardRepository);

  const cards = await cardService.listByUserId(session!.user.id);

  return (
    <>
      {cards?.map((card: Card) => (
        <div
          key={card.id}
          onClick={() => handleToggleSelectCard(card)}
          className={`${
            SelectedCard === card ? 'border-transparent bg-sky-500 text-white' : 'bg-card cursor-pointer hover:bg-slate-200'
          } flex h-[150px] w-full flex-col rounded-md border-2 border-slate-300 border-[color:var(--color-primary)] p-3 text-lg font-semibold transition md:w-[300px]`}
        >
          <div className="h-full w-full">{card.name}</div>

          <div className="w-full flex-col justify-end">
            <div className="text-md font-thin">Próxima Fatura</div>

            <div className="text-3xl">
              <Money value={+card.monthTotal!} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
