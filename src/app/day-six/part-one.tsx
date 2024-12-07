import Step from "@components/step";
import { InputData } from "./types";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import { Typography } from "@mui/material";
import OverflowTypography from "@components/overflow-typography";

type Coordinates = { x: number; y: number };

type Direction = "up" | "down" | "left" | "right";
const DirectionSymbols = ["^", "v", "<", ">"];

const directionFromSymbol = (symbol: string) => {
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

const PartOne = ({ floorplan }: InputData) => {
  const [guardPath, setGuardPath] = useState<InputData["floorplan"]>();
  const [guardPathUniqueSteps, setGuardPathUniqueSteps] = useState<number>(0);
  const [hasFoundGuardPath, setHasFoundGuardPath] = useState(false);

  const getStartingValues = (): { startingCoordinates: Coordinates; direction: Direction } => {
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

  const getNextCoordinates = (currentCoordinates: Coordinates, direction: Direction): Coordinates => {
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

  const getRightTurnDirection = (currentDirection: Direction): Direction => {
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

  const getGuardPath = async () => {
    setHasFoundGuardPath(true);
    const newGuardPath = floorplan.map((row) => row.slice());
    let uniqueSteps = 0;
    let { startingCoordinates: location, direction } = getStartingValues();
    newGuardPath[location.y][location.x] = "X";
    uniqueSteps += 1;
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
      while (newGuardPath[nextLocation.y][nextLocation.x] === "#") {
        direction = getRightTurnDirection(direction);
        nextLocation = getNextCoordinates(location, direction);
      }
      location = nextLocation;
      if (newGuardPath[location.y][location.x] !== "X") {
        newGuardPath[location.y][location.x] = "X";
        uniqueSteps += 1;
      }
    }
    setGuardPath(newGuardPath);
    setGuardPathUniqueSteps(uniqueSteps);
  };

  const countUniqueSteps = () => {
    if (guardPath === undefined) {
      return 0;
    }
    let uniqueSteps = 0;
    for (let i = 0; i < guardPath.length; i++) {
      for (let j = 0; j < guardPath[i].length; j++) {
        if (guardPath[i][j] === "X") {
          uniqueSteps += 1;
        }
      }
    }
    return uniqueSteps;
  };

  return (
    <Step buttonLabel="Find Guard Path" buttonOnClick={getGuardPath} buttonDisabled={hasFoundGuardPath} shouldRender>
      {guardPath !== undefined && guardPath.length > 0 && (
        <>
          <ScrollBox sx={{ maxHeight: 800 }}>
            {guardPath.map((step, index) => (
              <OverflowTypography variant="body2" fontFamily={"monospace"} key={index}>
                {step}
              </OverflowTypography>
            ))}
          </ScrollBox>
          <Typography>Unique Steps: {guardPathUniqueSteps}</Typography>
          <Typography>Unique Steps: {countUniqueSteps()}</Typography>
        </>
      )}
    </Step>
  );
};

export default PartOne;
