import { ItemHistoryRepository } from "@/repositories";
import { ItemHistory } from "@prisma/client";

export async function PUT(request: Request) {
  const { id, brand, itemId, value, quantity, monthGroceriesId } =
    await request.json();

  await new ItemHistoryRepository().update({
    id,
    brand,
    value,
    quantity,
    itemId,
    monthGroceriesId,
  } as ItemHistory);

  return new Response("Salvo!");
}
