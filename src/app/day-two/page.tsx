"use client";
import Day from "@components/day";
import PartOneOrTwo from "./part-one-or-two";

const DayTwo = () => {
  const parseData = (data: string) => {
    const lines = data.split("\n");
    const reports: number[][] = [];

    for (const line of lines) {
      const numLine: number[] = line.trim().split(" ").map(Number);
      reports.push(numLine);
    }
    return { reports };
  };

  return (
    <Day
      title="Day Two: Red-Nosed Reports"
      puzzleInputLink="https://adventofcode.com/2024/day/2/input"
      PartOne={PartOneOrTwo}
      PartTwo={PartOneOrTwo}
      partTwoPropOverrides={{ useSafetyTolerance: true }}
      parseData={parseData}
      prettyPrintInput={({ reports }) =>
        reports.map((report, i) => ({
          label: `Report ${i + 1}`,
          data: report.join(","),
        }))
      }
    />
  );
};

export default DayTwo;
