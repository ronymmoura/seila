import { RecurrentBillRepository } from '@db';

export class RecurrentBillService {
  constructor(private recurrentBillRepository: RecurrentBillRepository) {}

  async listByUserId(userId: number) {
    const bills = this.recurrentBillRepository.getByUserId(userId);

    return bills;
  }
}
