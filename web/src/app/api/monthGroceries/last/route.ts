import { MonthGroceriesRepository } from "@/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  const month = await new MonthGroceriesRepository().getLast();

  const total = month.itemHistory.reduce(
    (sum, current) => sum + Number(current.value) * Number(current.quantity),
    0
  );

  return NextResponse.json({
    ...month,
    total,
  });
}
