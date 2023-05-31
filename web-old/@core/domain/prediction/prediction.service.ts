import { CardRepository, RecurrentBillRepository } from '@db';

export class PredictionService {
  constructor(private cardRepository: CardRepository, private recurrentBillRepository: RecurrentBillRepository) {}

  async get() {}
}
