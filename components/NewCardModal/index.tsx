import { Button, Input, Modal } from '@kamalion/ui';
import { Card } from '@prisma/client';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';
import { api } from '../../helpers';

interface IProps {
  onSave: () => Promise<void>;
  onCancel: () => Promise<void>;
}

export const NewCardModal: React.FC<IProps> = ({ onSave, onCancel }) => {
  const [CardNumber, setCardNumber] = useState('');
  const [CardName, setCardName] = useState('');
  const [CardDueDate, setCardDueDate] = useState(format(new Date(), 'dd/MM/yyyy'));
  const [CardClosingDate, setCardClosingDate] = useState(0);

  const handleSaveCard = async () => {
    const newCard: Card = {
      number: CardNumber,
      name: CardName,
      dueDate: parse(CardDueDate, 'dd/MM/yyyy', new Date()),
      closingDate: +CardClosingDate,
      color: '',
      id: 0,
      userId: 0,
      monthTotal: 0
    };

    await api<Card[]>('/api/card', 'POST', newCard);
    await onSave();
  };

  const handleCancelNewCard = async () => {
    setCardName('');
    setCardNumber('');
    setCardClosingDate(0);
    setCardDueDate('');

    await onCancel();
  };

  return (
    <Modal>
      <section className="flex flex-col">
        <h1 className="mb-3 text-xl font-bold">Adicionar Novo Cartão</h1>

        <div className="my-2">
          <label>Número</label>
          <input
            className="input"
            value={CardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="my-2">
          <label>Nome</label>
          <input className="input" value={CardName} onChange={(e) => setCardName(e.target.value)} />
        </div>

        <div className="my-2">
          <label>Data Validade</label>
          <Input
            type="date"
            className="input"
            value={CardDueDate}
            onChange={(e) => setCardDueDate(e.value)}
          />
        </div>

        <div className="my-2">
          <label>Dia Fechamento</label>
          <Input
            max={31}
            className="input"
            value={CardClosingDate}
            onChange={(e) => setCardClosingDate(+e.value)}
          />
        </div>

        <Button submit onClick={handleSaveCard}>
          Salvar
        </Button>
        <Button type="white" onClick={handleCancelNewCard}>
          Cancelar
        </Button>
      </section>
    </Modal>
  );
};
