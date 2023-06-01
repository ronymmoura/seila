import { CategoriesRepository } from "@/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await CategoriesRepository.list();

  return NextResponse.json(categories);
}
