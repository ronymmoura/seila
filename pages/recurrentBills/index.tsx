import { Prisma, RecurrentBill } from '@prisma/client';
import { format, parse } from 'date-fns';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { api } from '@helpers';
import { NewRecurrentBillModal, Page } from '@components';
import { FaCalendar, FaDollarSign, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from '@kamalion/ui';

const RecurrentBills: NextPage = () => {
  const [RecurrentBills, setRecurrentBills] = useState<RecurrentBill[] | undefined>([]);
  const [EditBill, setEditBill] = useState<RecurrentBill | null>(null);

  useEffect(() => {
    (async () => {
      await loadBills();
    })();
  }, []);

  const loadBills = async () => {
    const recurrentBills = await api<RecurrentBill[]>('/api/recurrentBill', 'GET');
    setRecurrentBills(recurrentBills);
  };

  const handleDelete = async (bill: RecurrentBill) => {
    if (confirm('Deseja realmente deletar este registro?')) {
      await api<any>(`/api/recurrentBill/${bill.id}`, 'DELETE');
      await loadBills();
    }
  };

  const handleEdit = (bill: RecurrentBill) => {
    setEditBill(bill);
  };

  const handleNewBill = (e: any) => {
    const bill: RecurrentBill = {
      dueDate: new Date(),
      id: 0,
      description: '',
      value: new Prisma.Decimal(0),
      categoryId: null,
      userId: null
    };

    setEditBill(bill);
  };

  const handleSaveNewBill = async () => {
    setEditBill(null);
    await loadBills();
  };

  return (
    <Page>
      <h1 className="mb-10 text-4xl font-semibold">Pagamentos Recorrentes</h1>

      <section className="mb-10">
        <h3 className="text-lg">Total</h3>
        <h1 className="text-5xl">
          {RecurrentBills && (
            <>
              R${' '}
              {RecurrentBills.reduce((sum, current) => sum + +current.value, 0).toLocaleString('pt-br', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
            </>
          )}
        </h1>
      </section>

      <section className="my-5 flex flex-col space-y-2 rounded-md bg-slate-200 p-3 text-[#2E323B]">
        <div className="flex flex-row space-x-2">
          <Button onClick={handleNewBill} icon={<FaPlus />}>
            Adicionar
          </Button>
        </div>

        {RecurrentBills?.map((bill: RecurrentBill) => (
          <div key={bill.id}>
            <div className="flex flex-row items-center space-x-2 rounded-md bg-slate-50 px-3 py-2">
              <div className="w-full">{bill.description}</div>

              <div className="flex w-[200px] items-center justify-end">
                <FaCalendar className="mr-1 h-5 w-5 text-green-500" />
                {format(new Date(bill.dueDate), 'dd/MM/yyyy')}
              </div>

              <div className="flex w-[200px] items-center justify-end">
                <FaDollarSign className="mr-1 h-5 w-5 text-yellow-500" />
                R${' '}
                {(+bill.value).toLocaleString('pt-br', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
              </div>

              <div className="flex items-center justify-end">
                <Button type="info" onClick={() => handleEdit(bill)} icon={<FaPencilAlt />} />

                <Button type="danger" onClick={() => handleDelete(bill)} icon={<FaTrash />} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {EditBill && <NewRecurrentBillModal bill={EditBill} onSave={handleSaveNewBill} onCancel={() => setEditBill(null)} />}
    </Page>
  );
};

export default RecurrentBills;
