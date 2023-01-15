import { Card, Installment, Prisma, Purchase } from '@prisma/client';
import { format } from 'date-fns';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { api } from '@helpers';
import { Money, NewCardModal, Page } from '@components';
import { Button } from '@kamalion/ui';
import { FaCalendar, FaChevronRight, FaDollarSign, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { CardPurchaseModal } from '@components';

const Cards: NextPage = () => {
  const [Cards, setCards] = useState<Card[]>([]);
  const [Purchases, setPurchases] = useState<Purchase[]>();

  const [NewCardModalVisible, setNewCardModalVisible] = useState(false);
  const [SelectedCardId, setSelectedCardId] = useState<number>(null);

  const [PurchaseInInstallments, setPurchaseInInstallments] = useState(false);

  const [SelectedPurchase, setSelectedPurchase] = useState<Purchase & { installments: Installment[] }>();

  const SelectedCard = Cards.filter((x) => x.id === SelectedCardId)[0];

  useEffect(() => {
    (async () => {
      await loadCards();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (SelectedCard) {
        await loadCardPurchases();
      }
    })();
  }, [SelectedCard]);

  const loadCards = async (cardId?: number) => {
    setSelectedCardId(null);

    const cards = await api<Card[]>('/api/card', 'GET');

    if (cards) {
      setCards(cards);

      if (cards.length > 0) {
        cardId ? setSelectedCardId(cardId) : setSelectedCardId(cards[0].id);
      }
    }
  };

  const loadCardPurchases = async () => {
    if (SelectedCard) {
      const purchases = await api<Purchase[]>(`/api/card/${SelectedCard.id}/purchase`, 'GET');
      setPurchases(purchases);
    }
  };

  const handleToggleSelectCard = (card: Card) => {
    setSelectedCardId(card.id);
  };

  const handleNewCard = () => {
    setNewCardModalVisible(true);
  };

  const handleSaveNewCard = async () => {
    setNewCardModalVisible(false);
    await loadCards();
  };

  const handleCancelNewCard = async () => {
    setNewCardModalVisible(false);
  };

  const handleEditPurchase = (purchase: Purchase & { installments: Installment[] }) => {
    setSelectedPurchase(purchase);
  };

  const handleNewPurchase = () => {
    const purchase: Purchase & { installments: Installment[] } = {
      id: 0,
      description: '',
      value: new Prisma.Decimal(0),
      date: new Date(),
      numberOfInstallments: 0,
      paidInstallments: 0,
      installmentValue: new Prisma.Decimal(0),
      cardId: 0,
      categoryId: 0,
      installments: []
    };
    setSelectedPurchase(purchase);
  };

  const handleDeleteCard = async () => {
    if (SelectedCard) {
      if (confirm('Deseja realmente deletar este cartão?')) {
        await api<any>(`/api/card/${SelectedCard.id}`, 'DELETE');
        await loadCards();
      }
    }
  };

  const handleCancelPurchase = async () => {
    setSelectedPurchase(null);
  };

  const handleSavePurchase = async () => {
    setSelectedPurchase(null);
    await loadCards(SelectedCard.id);
    await loadCardPurchases();
  };

  const handleDeletePurchase = async (purchase: Purchase) => {
    if (confirm('Deseja realmente deletar esta compra?')) {
      await api<any>(`/api/card/${SelectedCard.id}/purchase/${purchase.id}`, 'DELETE');
      await loadCards(SelectedCard.id);
      await loadCardPurchases();
    }
  };

  return (
    <Page>
      <h1 className="mb-10 text-4xl font-semibold">Cartões</h1>

      <section className="flex flex-row space-x-5">
        {Cards?.map((card: Card) => (
          <div
            key={card.id}
            onClick={() => handleToggleSelectCard(card)}
            className={`${
              SelectedCard === card ? 'border-0 bg-sky-500 text-white' : 'bg-card cursor-pointer hover:bg-slate-200'
            } flex h-[150px] w-[300px] flex-col rounded-md border-2 border-slate-300 border-[color:var(--color-primary)] p-3 text-lg font-semibold transition `}
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

        <div
          onClick={() => handleNewCard()}
          className={`bg-card flex h-[150px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-[color:var(--color-primary)] p-3 text-lg font-semibold text-[color:var(--color-primary)] transition hover:bg-slate-200`}
        >
          <FaPlus />
        </div>
      </section>

      {SelectedCard && (
        <>
          <section className="my-5 flex flex-col space-y-2 rounded-md bg-slate-200 p-3 text-[#2E323B]">
            <div className="flex flex-row space-x-2">
              <Button onClick={handleNewPurchase} icon={<FaPlus />}>
                Adicionar Compra
              </Button>

              <Button type="danger" onClick={handleDeleteCard} icon={<FaTrash />}>
                Apagar Cartão
              </Button>
            </div>

            {Purchases?.map((purchase: Purchase & { installments: Installment[] }) => (
              <div key={purchase.id}>
                <div className="flex flex-row items-center space-x-2 rounded-md bg-slate-50 px-3 py-2">
                  <div className="w-full">{purchase.description}</div>

                  <div className="flex w-[200px] items-center justify-end">
                    {purchase.numberOfInstallments! > 0 && (
                      <>
                        <div className="mr-2 font-semibold">Parcelas:</div>{' '}
                        {purchase.installments.reduce((sum, current) => sum + (current.isPaid && 1), 0)}/{purchase.numberOfInstallments}
                      </>
                    )}
                  </div>

                  <div className="flex w-[200px] items-center justify-end">
                    <FaCalendar className="mr-1 h-5 w-5 text-emerald-500" />
                    {format(new Date(purchase.date), 'dd/MM/yyyy')}
                  </div>

                  <div className="flex w-[200px] items-center justify-end">
                    <FaDollarSign className="mr-1 h-5 w-5 text-yellow-500" />
                    <Money value={+purchase.installmentValue! || +purchase.value} />
                  </div>

                  <div className="flex items-center justify-end">
                    <Button icon={<FaPencilAlt />} onClick={() => handleEditPurchase(purchase)} />
                  </div>

                  <div className="flex items-center justify-end">
                    <Button type="danger" icon={<FaTrash />} onClick={() => handleDeletePurchase(purchase)} />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {NewCardModalVisible && <NewCardModal onCancel={handleCancelNewCard} onSave={handleSaveNewCard} />}

      {SelectedPurchase && (
        <CardPurchaseModal purchase={SelectedPurchase} cardId={SelectedCard.id} onCancel={handleCancelPurchase} onSave={handleSavePurchase} />
      )}
    </Page>
  );
};

export default Cards;
