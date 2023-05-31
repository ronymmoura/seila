import { RecurrentBill, User } from '@prisma/client';
import { format } from 'date-fns';
import { FaCalendar, FaDollarSign, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from '@kamalion/ui';
import { RecurrentBillService } from '@core/domain/recurrentBill';
import { RecurrentBillRepository } from '@db';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { Money } from '@components';

export default async function RecurrentBillsPage() {
  const session = await getServerSession<any, { user: User }>(authOptions);

  const recurrentBillsRepository = new RecurrentBillRepository();
  const recurrentBills = await new RecurrentBillService(recurrentBillsRepository).listByUserId(session!.user.id);

  console.log({ recurrentBills });

  const handleDelete = async (bill: RecurrentBill) => {
    // if (confirm('Deseja realmente deletar este registro?')) {
    //   await api<any>(`/api/recurrentBill/${bill.id}`, 'DELETE');
    //   await loadBills();
    // }
  };

  const handleEdit = (bill: RecurrentBill) => {
    //setEditBill(bill);
  };

  const handleNewBill = (e: any) => {
    // const bill: RecurrentBill = {
    //   dueDate: new Date(),
    //   id: 0,
    //   description: '',
    //   value: new Prisma.Decimal(0),
    //   categoryId: null,
    //   userId: null
    // };
    //setEditBill(bill);
  };

  const handleSaveNewBill = async () => {
    // setEditBill(null);
    // await loadBills();
  };

  return (
    <>
      <h1 className="mb-10 text-4xl font-semibold">Pagamentos Recorrentes</h1>

      <section className="mb-10">
        <h3 className="text-lg">Total</h3>
        <h1 className="text-5xl">
          {recurrentBills && (
            <>
              R${' '}
              {recurrentBills
                .reduce((sum, current) => sum + +current.value, 0)
                .toLocaleString('pt-br', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
            </>
          )}
        </h1>
      </section>

      <section className="my-5 flex flex-col space-y-2 rounded-md bg-slate-200 p-3 text-[#2E323B]">
        {/* <div className="flex flex-row space-x-2">
          <Button onClick={handleNewBill} icon={<FaPlus />}>
            Adicionar
          </Button>
        </div> */}

        {recurrentBills?.map((bill: RecurrentBill) => (
          <div key={bill.id}>
            <div className="flex flex-row items-center space-x-2 rounded-md bg-slate-50 px-3 py-2">
              <div className="w-full">{bill.description}</div>

              <div className="flex w-[200px] items-center justify-end">
                <FaCalendar className="mr-1 h-5 w-5 text-green-500" />
                {format(new Date(bill.dueDate), 'dd/MM/yyyy')}
              </div>

              <div className="flex w-[200px] items-center justify-end">
                <FaDollarSign className="mr-1 h-5 w-5 text-yellow-500" />
                <Money value={+bill.value} />
              </div>

              <div className="flex items-center justify-end">
                <Button type="info" onClick={() => handleEdit(bill)} icon={<FaPencilAlt />} />

                {/* <Button type="danger" onClick={() => handleDelete(bill)} icon={<FaTrash />} /> */}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* {EditBill && <NewRecurrentBillModal bill={EditBill} onSave={handleSaveNewBill} onCancel={() => setEditBill(null)} />} */}
    </>
  );
}
