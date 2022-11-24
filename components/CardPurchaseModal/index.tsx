import { api } from '@helpers';
import { Button, Input, Modal } from '@kamalion/ui';
import { Prisma, Purchase } from '@prisma/client';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';

// import { Container } from './styles';

interface IProps {
  purchase: Purchase;
  cardId: number;
  onCancel: () => Promise<void> | void;
  onSave: () => Promise<void> | void;
}

export const CardPurchaseModal: React.FC<IProps> = ({ purchase, cardId, onCancel, onSave }) => {
  const [PurchaseId, setPurchaseId] = useState(purchase.id);
  const [PurchaseDescription, setPurchaseDescription] = useState(purchase.description);
  const [PurchaseDate, setPurchaseDate] = useState(format(new Date(purchase.date), 'dd/MM/yyyy'));
  const [PurchaseValue, setPurchaseValue] = useState(+purchase.value);
  const [PurchaseInstallments, setPurchaseInstallments] = useState(purchase.numberOfInstallments);
  const [PurchasePaidInstallments, setPurchasePaidInstallments] = useState(purchase.paidInstallments);
  const [PurchaseInstallmentValue, setPurchaseInstallmentValue] = useState(+purchase.installmentValue);

  const [PurchaseInInstallments, setPurchaseInInstallments] = useState(purchase.numberOfInstallments > 0);

  const handleSavePurchase = async () => {
    const newPurchase = {
      id: PurchaseId,
      description: PurchaseDescription,
      value: PurchaseValue,
      date: parse(PurchaseDate, 'dd/MM/yyyy', new Date()),
      numberOfInstallments: PurchaseInstallments,
      paidInstallments: PurchasePaidInstallments,
      installmentValue: PurchaseInstallmentValue
    };

    console.log({ newPurchase });

    await api<any>(`/api/card/${cardId}/purchase/${PurchaseId || ''}`, PurchaseId ? 'PUT' : 'POST', newPurchase);
    await onSave();
  };

  const handleCancelNewPurchase = async () => {
    await onCancel();
  };

  return (
    <Modal>
      <section className="flex flex-col">
        <h1 className="mb-3 text-xl font-bold">Adicionar Compra</h1>

        <div className="my-2">
          <label>Descrição</label>
          <input className="input" value={PurchaseDescription} onChange={(e) => setPurchaseDescription(e.target.value)} />
        </div>

        <div className="my-2">
          <label>Data</label>
          <Input type="date" className="input" value={PurchaseDate} onChange={(e) => setPurchaseDate(e.formattedValue)} />
        </div>

        <div className="my-2">
          <label>Valor</label>
          <Input type="money" className="input" value={PurchaseValue} onChange={(e) => setPurchaseValue(e.floatValue)} />
        </div>

        <div className="my-2">
          <input
            id="purchaseInInstallments"
            className="mr-2 cursor-pointer"
            type="checkbox"
            checked={PurchaseInInstallments}
            onChange={(e) => {
              setPurchaseInInstallments((old) => !old);
            }}
          />
          <label className="cursor-pointer" htmlFor="purchaseInInstallments">
            Compra parcelada
          </label>
        </div>

        {PurchaseInInstallments && (
          <>
            <div className="my-2">
              <label>Número de Prestações</label>
              <Input className="input" value={PurchaseInstallments} onChange={(e) => setPurchaseInstallments(+e.value)} />
            </div>

            <div className="my-2">
              <label>Prestações Pagas</label>
              <Input className="input" value={PurchasePaidInstallments} onChange={(e) => setPurchasePaidInstallments(+e.value)} />
            </div>

            <div className="my-2">
              <label>Valor das Prestações</label>
              <Input type="money" className="input" value={PurchaseInstallmentValue} onChange={(e) => setPurchaseInstallmentValue(e.floatValue)} />
            </div>
          </>
        )}

        <Button submit onClick={handleSavePurchase}>
          Salvar
        </Button>
        <Button type="white" onClick={handleCancelNewPurchase}>
          Cancelar
        </Button>
      </section>
    </Modal>
  );
};
