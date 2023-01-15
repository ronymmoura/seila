import { Money } from '@components';
import { api } from '@helpers';
import { Button, Input, Modal } from '@kamalion/ui';
import { Installment, Prisma, Purchase } from '@prisma/client';
import { format, parse } from 'date-fns';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// import { Container } from './styles';

interface IProps {
  purchase: Purchase & { installments: Installment[] };
  cardId: number;
  onCancel: () => Promise<void> | void;
  onSave: () => Promise<void> | void;
}

export const CardPurchaseModal: React.FC<IProps> = ({ purchase, cardId, onCancel, onSave }) => {
  const [PurchaseId, setPurchaseId] = useState(purchase.id);
  const [PurchaseDescription, setPurchaseDescription] = useState(purchase.description);
  const [PurchaseDate, setPurchaseDate] = useState(format(new Date(purchase.date), 'dd/MM/yyyy'));
  const [PurchaseValue, setPurchaseValue] = useState(+purchase.value);
  const [PurchaseNumberOfInstallments, setPurchaseNumberOfInstallments] = useState(purchase.numberOfInstallments);
  const [PurchasePaidInstallments, setPurchasePaidInstallments] = useState(purchase.paidInstallments);
  const [PurchaseInstallmentValue, setPurchaseInstallmentValue] = useState(+purchase.installmentValue);

  const [PurchaseInInstallments, setPurchaseInInstallments] = useState(purchase.numberOfInstallments > 0);

  const [PurchaseInstallments, setPurchaseInstallments] = useState(purchase.installments);

  const handleSavePurchase = async () => {
    const newPurchase = {
      id: PurchaseId,
      description: PurchaseDescription,
      value: PurchaseValue,
      date: parse(PurchaseDate, 'dd/MM/yyyy', new Date()),
      numberOfInstallments: PurchaseNumberOfInstallments,
      paidInstallments: PurchasePaidInstallments,
      installmentValue: PurchaseInstallmentValue
    };

    const method = PurchaseId ? 'PUT' : 'POST';

    await api<any>(`/api/card/${cardId}/purchase/${PurchaseId || ''}`, method, newPurchase);
    await onSave();
  };

  const handleCancelNewPurchase = async () => {
    await onCancel();
  };

  const handlePayInstallment = async (installment: Installment, isPaid: boolean) => {
    purchase.installments = await api<Installment[]>(
      `/api/card/${cardId}/purchase/${PurchaseId}/installment/${installment.id}?isPaid=${isPaid}`,
      'PUT'
    );

    setPurchaseInstallments(purchase.installments);
  };

  return (
    <Modal className="lg:w-[800px]">
      <div className={``}>
        <h1 className="mb-3 text-xl font-bold">Adicionar Compra</h1>

        <div className="flex flex-row">
          <section className={`flex flex-col ${purchase.installments.length > 0 ? 'w-[300px]' : ''}`}>
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
                  <Input className="input" value={PurchaseNumberOfInstallments} onChange={(e) => setPurchaseNumberOfInstallments(+e.value)} />
                </div>

                <div className="my-2">
                  <label>Prestações Pagas</label>
                  <Input className="input" value={PurchasePaidInstallments} onChange={(e) => setPurchasePaidInstallments(+e.value)} />
                </div>

                <div className="my-2">
                  <label>Valor das Prestações</label>
                  <Input
                    type="money"
                    className="input"
                    value={PurchaseInstallmentValue}
                    onChange={(e) => setPurchaseInstallmentValue(e.floatValue)}
                  />
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

          <section className="flex-1 px-4">
            <div className="mb-2 text-xl font-semibold">Parcelas</div>

            <div className="space-y-2 rounded-md bg-slate-200 p-2">
              {PurchaseInstallments.map((installment) => (
                <div key={installment.id} className="flex flex-row items-center rounded-md bg-white py-1 px-2">
                  <div className="mr-2">
                    {installment.isPaid ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-red-400" />}
                  </div>
                  <div className="flex-1">{format(new Date(installment.paymentDate), 'dd/MM/yyyy')}</div>

                  <div className="">
                    <Money value={+installment.value} />
                  </div>

                  <div className="ml-2">
                    {installment.isPaid ? (
                      <Button type="danger" icon={<FaTimesCircle />} onClick={() => handlePayInstallment(installment, false)} />
                    ) : (
                      <Button type="success" icon={<FaCheckCircle />} onClick={() => handlePayInstallment(installment, true)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};
