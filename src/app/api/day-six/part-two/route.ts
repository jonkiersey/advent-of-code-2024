import { NextRequest, NextResponse } from "next/server";
import { newObstacleCausesLoop } from "./utils";
import { Floorplan } from "@app/types/day-six";

const POST = async (req: NextRequest) => {
  const payload = await req.json();
  const floorplan: Floorplan = payload.floorplan;
  let count = 0;
  for (let y = 0; y < floorplan.length; y++) {
    for (let x = 0; x < floorplan[y].length; x++) {
      if (newObstacleCausesLoop(floorplan, { x, y })) {
        count++;
      }
    }
  }
  return NextResponse.json({ count });
};

export { POST };
