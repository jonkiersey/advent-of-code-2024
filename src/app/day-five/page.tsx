"use client";
import Day from "@components/day";
import { InputData } from "./types";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const DayFive = () => {
  const parseData = (data: string): InputData => {
    const lines = data.split("\n").map((line) => line.trim());
    const breakIndex = lines.indexOf("");
    const rules = lines.slice(0, breakIndex).map((rule) => rule.split("|").map((page) => parseInt(page)));
    const pagesToProduce = lines.slice(breakIndex + 1).map((pages) => pages.split(",").map((page) => parseInt(page)));
    return { rules, pagesToProduce };
  };
  return (
    <Day
      title="Day 5: Print Queue"
      parseData={parseData}
      prettyPrintInput={(data) => [
        { label: "Rules", data: data.rules.join(" ") },
        { label: "Pages to Produce", data: data.pagesToProduce.join(" ") },
      ]}
      puzzleInputLink="https://adventofcode.com/2024/day/5/input"
      PartOne={PartOne}
      PartTwo={PartTwo}
    />
  );
};

export default DayFive;
