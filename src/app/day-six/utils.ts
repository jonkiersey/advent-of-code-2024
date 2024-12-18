import { Coordinates, Direction, DirectionSymbols, GuardPath, InputData } from "./types";

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
  floorplan: InputData["floorplan"]
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

const newObstacleCausesLoop = (floorplan: InputData["floorplan"], additionalObstacle: Coordinates): boolean => {
  const newGuardPath: GuardPath = floorplan.map((row) =>
    row.slice().map((space) => ({
      isObstacle: space === "#",
      usedDirections: { up: false, down: false, left: false, right: false },
    }))
  );
  if (newGuardPath[additionalObstacle.y][additionalObstacle.x].isObstacle) {
    // already is an obstacle, won't cause a new loop
    return false;
  }
  newGuardPath[additionalObstacle.y][additionalObstacle.x].isObstacle = true;

  let { startingCoordinates: location, direction } = getStartingValues(floorplan);
  if (newGuardPath[location.y][location.x].isObstacle) {
    return false;
  }
  newGuardPath[location.y][location.x].usedDirections[direction] = true;
  while (newGuardPath[location.y][location.x] !== undefined) {
    let nextLocation = getNextCoordinates(location, direction);
    if (
      nextLocation.x < 0 ||
      nextLocation.y < 0 ||
      nextLocation.x >= newGuardPath[0].length ||
      nextLocation.y >= newGuardPath.length
    ) {
      break;
    }
    while (newGuardPath[nextLocation.y][nextLocation.x].isObstacle) {
      direction = getRightTurnDirection(direction);
      nextLocation = getNextCoordinates(location, direction);
    }
    location = nextLocation;
    if (newGuardPath[location.y][location.x].usedDirections[direction]) {
      // we have been here before facing the same direction, loop found
      return true;
    } else {
      newGuardPath[location.y][location.x].usedDirections[direction] = true;
    }
  }
  return false;
};

export const findLoopPossibilities = (
  floorplan: InputData["floorplan"],
  progressCallback: (progress: number) => void
) => {
  let count = 0;
  for (let y = 0; y < floorplan.length; y++) {
    for (let x = 0; x < floorplan[y].length; x++) {
      if (newObstacleCausesLoop(floorplan, { x, y })) {
        count++;
      }
    }
    progressCallback((y / floorplan.length) * 100);
  }
  return count;
};
