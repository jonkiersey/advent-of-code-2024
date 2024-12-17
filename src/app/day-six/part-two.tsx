import Step from "@components/step";
import { Coordinates, Direction, InputData } from "./types";
import { useState } from "react";
import { Typography } from "@mui/material";
import { getNextCoordinates, getRightTurnDirection, getStartingValues } from "./utils";

type GuardPath = { isObstacle: boolean; usedDirections: { [K in Direction]: boolean } }[][];

const PartTwo = ({ floorplan }: InputData) => {
  const [numberOfLoopPossibilities, setNumberOfLoopPossibilities] = useState<number | null>(null);
  const [hasFoundLoopPossibilities, setHasFoundLoopPossibilities] = useState(false);

  const newObstacleCausesLoop = (additionalObstacle: Coordinates): boolean => {
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

  const findLoopPossibilities = () => {
    setHasFoundLoopPossibilities(true);
    let count = 0;
    for (let y = 0; y < floorplan.length; y++) {
      for (let x = 0; x < floorplan[y].length; x++) {
        if (newObstacleCausesLoop({ x, y })) {
          count++;
        }
      }
    }
    setNumberOfLoopPossibilities(count);
  };

  return (
    <Step
      buttonLabel="Find Loop Possibilities"
      buttonOnClick={findLoopPossibilities}
      buttonDisabled={hasFoundLoopPossibilities}
      shouldRender
    >
      {numberOfLoopPossibilities !== null && (
        <>
          <Typography>Number of Loop Possibilities: {numberOfLoopPossibilities}</Typography>
        </>
      )}
    </Step>
  );
};

export default PartTwo;
