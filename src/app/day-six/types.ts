export type InputData = {
  floorplan: string[][];
};

export type Coordinates = { x: number; y: number };

export type Direction = "up" | "down" | "left" | "right";
export const DirectionSymbols = ["^", "v", "<", ">"];
