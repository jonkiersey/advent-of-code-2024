import { useState } from "react";
import { Emissions, InputData } from "./types";
import Step from "@components/step";
import ScrollBox from "@components/scroll-box";
import { Typography } from "@mui/material";
import { findAntinodes, findEmissions, findUniqueAntinodes } from "./utils";

const PartOne = ({ city }: InputData) => {
  const [emissions, setEmissions] = useState<Emissions>({});
  const [startedRecordingEmissions, setStartedRecordingEmissions] = useState<boolean>(false);
  const [doneRecordingEmissions, setDoneRecordingEmissions] = useState<boolean>(false);
  const [cityWithAntinodes, setCityWithAntinodes] = useState<string[][]>([]);
  const [uniqueAntinodes, setUniqueAntinodes] = useState<number>(0);
  const [startedFindingAntinodes, setStartedFindingAntinodes] = useState<boolean>(false);

  const recordEmissions = () => {
    setStartedRecordingEmissions(true);
    setEmissions(findEmissions(city));
    setDoneRecordingEmissions(true);
  };

  const recordUniqueAntinodes = () => {
    setStartedFindingAntinodes(true);
    const antinodes = findAntinodes(emissions);
    const { cityWithAntinodes: newCityWithAntinodes, uniqueAntinodes: antinodeCount } = findUniqueAntinodes(
      city,
      antinodes
    );
    setUniqueAntinodes(antinodeCount);
    setCityWithAntinodes(newCityWithAntinodes);
  };

  return (
    <>
      <Step
        buttonLabel="Find Radio Emissions"
        buttonDisabled={startedRecordingEmissions}
        buttonOnClick={recordEmissions}
        shouldRender
      >
        <ScrollBox maxHeight={400}>
          {Object.entries(emissions).map(([frequency, locations]) => (
            <Typography fontFamily={"monospace"} key={frequency}>
              {frequency}: {locations.map(({ x, y }) => `[${x}, ${y}]`).join(", ")}
            </Typography>
          ))}
        </ScrollBox>
      </Step>
      <Step
        buttonLabel="Find Antinodes"
        buttonDisabled={startedFindingAntinodes}
        buttonOnClick={recordUniqueAntinodes}
        shouldRender={doneRecordingEmissions}
      >
        {cityWithAntinodes.length !== 0 &&
          cityWithAntinodes.map((line, index) => (
            <Typography fontFamily="monospace" key={index}>
              {index.toString().padStart(2, "0")}: {line.join("")}
            </Typography>
          ))}
        <Typography>Unique Antinodes: {uniqueAntinodes}</Typography>
      </Step>
    </>
  );
};

export default PartOne;
