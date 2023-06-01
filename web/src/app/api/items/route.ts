import { ItemsRepository, MonthGroceriesRepository } from "@/repositories";
import { Item } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await ItemsRepository.list();

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const data = await request.json();

  const monthGroceries = await MonthGroceriesRepository.list();

  await ItemsRepository.create({
    name: data.name,
    categoryId: data.categoryId,
    monthGroceriesId: monthGroceries[0].id,
  } as Item);

  return new Response("Salvo!");
}
