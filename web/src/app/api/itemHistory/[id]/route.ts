import { ItemHistoryRepository } from "@/lib/db/repositories";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: number };
  }
) {
  await new ItemHistoryRepository().delete(+params.id);

  return new Response("Deletado!");
}
