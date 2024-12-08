import Step from "@components/step";
import { InputData } from "./types";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import { Typography } from "@mui/material";
import OverflowTypography from "@components/overflow-typography";
import { getStartingValues, getNextCoordinates, getRightTurnDirection } from "./utils";

const PartOne = ({ floorplan }: InputData) => {
  const [guardPath, setGuardPath] = useState<InputData["floorplan"]>();
  const [guardPathUniqueSteps, setGuardPathUniqueSteps] = useState<number>(0);
  const [hasFoundGuardPath, setHasFoundGuardPath] = useState(false);

  const getGuardPath = async () => {
    setHasFoundGuardPath(true);
    const newGuardPath = floorplan.map((row) => row.slice());
    let uniqueSteps = 0;
    let { startingCoordinates: location, direction } = getStartingValues(floorplan);
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
        </>
      )}
    </Step>
  );
};

export default PartOne;
