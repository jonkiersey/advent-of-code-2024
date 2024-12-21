"use client";
import Day from "@components/day";
import { InputData } from "./types";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const DayEight = () => {
  const parseData = (data: string): InputData => {
    const city = data.split("\n").map((line) => line.split(""));
    return { city };
  };

  return (
    <Day
      title="Day Eight: Resonant Collinearity"
      parseData={parseData}
      prettyPrintInput={({ city }) =>
        city.map((line, index) => ({ label: index.toString().padStart(2, "0"), data: line.join("") }))
      }
      puzzleInputLink="https://adventofcode.com/2024/day/8/input"
      PartOne={PartOne}
      PartTwo={PartTwo}
    />
  );
};

export default DayEight;
