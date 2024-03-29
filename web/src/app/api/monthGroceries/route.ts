import { MonthGroceriesRepository } from "@/repositories";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const months = await new MonthGroceriesRepository().list();

  const parsedMonths = months.map((month) => {
    const total = month.itemHistory.reduce(
      (sum, current) => sum + Number(current.value) * Number(current.quantity),
      0
    );

    return {
      ...month,
      total,
    };
  });

  console.log({ parsedMonths });

  return NextResponse.json(parsedMonths);
}
