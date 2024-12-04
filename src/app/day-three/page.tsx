"use client";
import Day from "@components/day";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const DayThree = () => {
  return (
    <Day
      title="Day Three: Mull It Over"
      puzzleInputLink="https://adventofcode.com/2024/day/3/input"
      parseData={(data) => data}
      PartOne={({ inputData }) => <PartOne corruptData={inputData} />}
      PartTwo={({ inputData }) => <PartTwo corruptData={inputData} />}
      prettyPrintInput={(data) => [{ label: "Data", data }]}
    />
  );
};

export default DayThree;
