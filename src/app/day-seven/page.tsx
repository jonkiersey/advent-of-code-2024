"use client";
import Day from "@components/day";
import PartOne from "./part-one";
import { InputData } from "./types";
import PartTwo from "./part-two";

const PageSeven = () => {
  const parseData = (data: string): InputData => {
    const equations = data.split("\n").map((line) => {
      const [resultString, rest] = line.split(":");
      const result = Number(resultString);
      const values = rest.trim().split(" ").map(Number);
      return { result, values };
    });
    return { equations };
  };

  return (
    <Day
      title="Day Seven: Bridge Repair"
      puzzleInputLink="https://adventofcode.com/2024/day/7/input"
      parseData={parseData}
      prettyPrintInput={(data) =>
        data.equations.map((line, index) => ({
          label: index.toString(),
          data: `result: ${line.result}, values: ${line.values.join(", ")}`,
        }))
      }
      PartOne={PartOne}
      PartTwo={PartTwo}
    />
  );
};

export default PageSeven;
