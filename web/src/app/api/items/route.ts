import { ItemsRepository } from "@/repositories";
import { Item } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await new ItemsRepository().list();

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const data = await request.json();

  await new ItemsRepository().create({
    name: data.name,
    categoryId: data.categoryId,
    monthGroceriesId: data.monthGroceriesId,
  } as Item);

  return new Response("Salvo!");
}
