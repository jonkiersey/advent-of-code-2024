export type Floorplan = string[][];

export type Direction = "up" | "down" | "left" | "right";

export const DirectionSymbols = ["^", "v", "<", ">"];

export type GuardPath = { isObstacle: boolean; usedDirections: { [K in Direction]: boolean } }[][];

export type Coordinates = { x: number; y: number };
