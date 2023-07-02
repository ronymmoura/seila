import { CategoriesRepository } from "@/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await new CategoriesRepository().list();

  return NextResponse.json(categories);
}
