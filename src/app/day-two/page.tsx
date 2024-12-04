"use client";
import Day from "@components/day";
import PartOneOrTwo from "./part-one-or-two";

const DayTwo = () => {
  const parseData = (data: string): number[][] => {
    const lines = data.split("\n");
    const newReports: number[][] = [];

    for (const line of lines) {
      const numLine: number[] = line.trim().split(" ").map(Number);
      newReports.push(numLine);
    }
    return newReports;
  };

  return (
    <Day
      title="Day Two: Red-Nosed Reports"
      puzzleInputLink="https://adventofcode.com/2024/day/2/input"
      PartOne={({ inputData }) => <PartOneOrTwo reports={inputData} />}
      PartTwo={({ inputData }) => (
        <PartOneOrTwo reports={inputData} useSafetyTolerance />
      )}
      parseData={parseData}
      prettyPrintInput={(data) =>
        data.map((report, i) => ({
          label: `Report ${i + 1}`,
          data: report.join(","),
        }))
      }
    />
  );
};

export default DayTwo;
