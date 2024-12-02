import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const which = req.nextUrl.searchParams.get("input");

  const fileName = which === "example" ? "./example-input.txt" : "./input.txt";
  const filePath = path.join(process.cwd(), "data", "day-1", fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  const lines = data.split("\n");

  const listOne: number[] = [];
  const listTwo: number[] = [];

  for (const line of lines) {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(num1) && !isNaN(num2)) {
      listOne.push(num1);
      listTwo.push(num2);
    }
  }
  return NextResponse.json({ listOne, listTwo });
};
