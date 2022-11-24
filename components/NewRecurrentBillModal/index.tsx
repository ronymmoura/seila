import { RecurrentBill } from '@prisma/client';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import { api } from '@helpers';
import { Alert, Button, Input, Modal } from '@kamalion/ui';

interface IProps {
  bill: RecurrentBill;
  onSave?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export const NewRecurrentBillModal: React.FC<IProps> = ({ bill, onSave, onCancel }) => {
  const [BillId, setBillId] = useState<number | null>(bill.id);
  const [BillDescription, setBillDescription] = useState(bill.description);
  const [BillDate, setBillDate] = useState(format(new Date(bill.dueDate), 'dd/MM/yyyy'));
  const [BillValue, setBillValue] = useState<number | undefined>(+bill.value);

  const [Error, setError] = useState();

  const handleSave = async () => {
    try {
      const newBill = {
        description: BillDescription,
        value: BillValue,
        dueDate: parse(BillDate, 'dd/MM/yyyy', new Date())
      };
      await api<any>(`/api/recurrentBill/${BillId ?? ''}`, BillId ? 'PUT' : 'POST', newBill);
      await handleCancel();

      if (onSave) await onSave();
    } catch (e: any) {
      setError(e.data);
    }
  };

  const handleCancel = async () => {
    setBillId(null);
    setBillDescription('');
    setBillDate('');
    setBillValue(0);

    if (onCancel) await onCancel();
  };

  return (
    <Modal>
      <section className="flex flex-col">
        <h1 className="mb-3 text-xl font-bold">Adicionar Compra</h1>

        <div className="my-2">
          <label>Descrição</label>
          <input
            className="input"
            value={BillDescription}
            onChange={(e) => setBillDescription(e.target.value)}
          />
        </div>

        <div className="my-2">
          <label>Data</label>
          <Input
            type="date"
            className="input"
            value={BillDate}
            onChange={(e) => setBillDate(e.formattedValue)}
          />
        </div>

        <div className="my-2">
          <label>Valor</label>
          <Input
            type="money"
            className="input"
            value={BillValue}
            onChange={(e) => setBillValue(e.floatValue)}
          />
        </div>

        <Alert type="danger">{Error}</Alert>

        <Button submit onClick={handleSave}>
          Salvar
        </Button>
        <Button type="white" onClick={handleCancel}>
          Cancelar
        </Button>
      </section>
    </Modal>
  );
};
