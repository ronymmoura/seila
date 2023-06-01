import { MonthGroceriesRepository } from "@/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  const months = await MonthGroceriesRepository.list();

  return NextResponse.json(months[0]);
}
