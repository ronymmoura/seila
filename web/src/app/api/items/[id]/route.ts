import { ItemsRepository } from "@/lib/db/repositories";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  await ItemsRepository.delete(params.id);

  return new Response("Deletado!");
}
