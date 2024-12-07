"use client";
import Day from "@components/day";
import { InputData } from "./types";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const DaySix = () => {
  const parseData = (data: string): InputData => {
    return { floorplan: data.split("\n").map((line) => line.split("")) };
  };
  return (
    <Day
      title="Day Six: Guard Gallivant"
      puzzleInputLink="https://adventofcode.com/2024/day/6/input"
      parseData={parseData}
      prettyPrintInput={(data) =>
        data.floorplan.map((line, index) => ({ label: `Line ${index}`, data: line.join("") }))
      }
      PartOne={PartOne}
      PartTwo={PartTwo}
    />
  );
};

export default DaySix;
