import { CardRepository } from '@db';

export class CardService {
  constructor(private cardRepository: CardRepository) {}

  async listByUserId(userId: number) {
    const cards = this.cardRepository.getAllByUserId(userId);

    return cards;
  }

  async getByUserId(userId: number) {}
}
