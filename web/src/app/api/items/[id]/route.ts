import { ItemsRepository } from "@/lib/db/repositories";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: number };
  }
) {
  await new ItemsRepository().delete(+params.id);

  return new Response("Deletado!");
}
