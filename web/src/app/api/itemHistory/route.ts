import {
  ItemHistoryRepository,
  MonthGroceriesRepository,
} from "@/repositories";
import { ItemHistory } from "@prisma/client";

export async function POST(request: Request) {
  const { brand, itemId, value, quantity } = await request.json();

  const monthGroceries = await MonthGroceriesRepository.list();

  if (quantity > 0) {
    await ItemHistoryRepository.create({
      brand,
      value,
      quantity,
      itemId,
      monthGroceriesId: monthGroceries[0].id,
    } as ItemHistory);
  } else {
    await ItemHistoryRepository.deleteByItemIdMonthGroceriesId(
      itemId,
      monthGroceries[0].id
    );
  }

  return new Response("Salvo!");
}
