"use client";

import Day from "@components/day";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const parseData = (data: string) => {
  return { wordSearch: data.split("\n").map((line) => line.split("")) };
};

const DayFour = () => {
  return (
    <Day
      title="Day Four: Ceres Search"
      parseData={parseData}
      PartOne={PartOne}
      PartTwo={PartTwo}
      prettyPrintInput={({ wordSearch: lines }) =>
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
