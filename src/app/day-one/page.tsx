"use client";
import Day from "@components/day";
import PartOne from "./part-one";
import PartTwo from "./part-two";

const parseData = (data: string) => {
  const lines = data.split("\n");
  const listOne: number[] = [];
  const listTwo: number[] = [];

  for (const line of lines) {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(num1) && !isNaN(num2)) {
      listOne.push(num1);
      listTwo.push(num2);
    }
  }
  return { listOne, listTwo };
};

const DayOne = () => {
  return (
    <Day
      title="Day One: Historian Hysteria"
      puzzleInputLink="https://adventofcode.com/2024/day/1/input"
      parseData={parseData}
      prettyPrintInput={(data) => [
        { label: "List One", data: data.listOne.join(", ") },
        { label: "List Two", data: data.listTwo.join(", ") },
      ]}
      PartOne={PartOne}
      PartTwo={PartTwo}
    />
  );
};

export default DayOne;
