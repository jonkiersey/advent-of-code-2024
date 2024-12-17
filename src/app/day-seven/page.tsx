"use client";
import Day from "@components/day";
import { Typography } from "@mui/material";

const PageSeven = () => {
  return (
    <Day
      title="Day Seven: Bridge Repair"
      puzzleInputLink="https://adventofcode.com/2024/day/7/input"
      parseData={(data) => ({ data })}
      prettyPrintInput={({ data }) => [{ label: "Data", data }]}
      PartOne={() => <Typography>Part One Placeholder</Typography>}
      PartTwo={() => <Typography>Part Two Placeholder</Typography>}
    />
  );
};

export default PageSeven;
