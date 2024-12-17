import { Coordinates, Direction, DirectionSymbols, Floorplan } from "@app/types/day-six";

export const getNextCoordinates = (currentCoordinates: Coordinates, direction: Direction): Coordinates => {
  let x = currentCoordinates.x;
  let y = currentCoordinates.y;
  switch (direction) {
    case "up":
      y -= 1;
      break;
    case "down":
      y += 1;
      break;
    case "left":
      x -= 1;
      break;
    case "right":
      x += 1;
      break;
  }
  return { x, y };
};

export const directionFromSymbol = (symbol: string) => {
  switch (symbol) {
    case "^":
      return "up";
    case "v":
      return "down";
    case "<":
      return "left";
    case ">":
      return "right";
    default:
      return "";
  }
};

export const getRightTurnDirection = (currentDirection: Direction): Direction => {
  switch (currentDirection) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
};

export const getStartingValues = (
  floorplan: Floorplan
): {
  startingCoordinates: Coordinates;
  direction: Direction;
} => {
  let direction: Direction | "" = "";
  let startingCoordinates: Coordinates | undefined;
  for (let i = 0; i < floorplan.length; i++) {
    for (let j = 0; j < floorplan[i].length; j++) {
      if (DirectionSymbols.includes(floorplan[i][j])) {
        direction = directionFromSymbol(floorplan[i][j]);
        startingCoordinates = { x: j, y: i };
        break;
      }
    }
  }
  if (startingCoordinates === undefined) {
    throw new Error("No starting point found");
  }
  if (direction === "") {
    throw new Error("No starting point found");
  }
  return { startingCoordinates, direction };
};
