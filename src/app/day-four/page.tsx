"use client";

import Day from "@components/day";
import { Typography } from "@mui/material";
import PartOne from "./part-one";

const parseData = (data: string) => {
  return data.split("\n").map((line) => line.split(""));
};

const DayFour = () => {
  return (
    <Day
      title="Day Four: Ceres Search"
      parseData={parseData}
      PartOne={({ inputData }) => <PartOne wordSearch={inputData} />}
      PartTwo={() => <Typography>Part Two Placeholder</Typography>}
      prettyPrintInput={(lines) =>
        lines.map((line, index) => ({
          label: `${index}`,
          data: line.join(" "),
        }))
      }
      puzzleInputLink="https://adventofcode.com/2024/day/4/input"
    />
  );
};

export default DayFour;
