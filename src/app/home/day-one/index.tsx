import { useState } from "react";
import {
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PartOne from "./part-one";
import PartTwo from "./part-two";
import PuzzleInput from "@components/puzzle-input";
import LongList from "@components/long-list";

const DayOne = () => {
  const [selectedPart, setSelectedPart] = useState<1 | 2>(1);
  const [listOne, setListOne] = useState<number[]>([]);
  const [listTwo, setListTwo] = useState<number[]>([]);

  const handleInputChange = (data: string) => {
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
    setListOne(listOne);
    setListTwo(listTwo);
  };
  return (
    <>
      <Typography variant="h4">Day One: Historian Hysteria</Typography>
      <Link href="https://adventofcode.com/2024/day/1/input" target="_blank">
        Puzzle Input Data
      </Link>
      <PuzzleInput handleInputChange={handleInputChange} />
      {listOne.length > 0 && listTwo.length > 0 && (
        <>
          <LongList label="List One" list={listOne} />
          <LongList label="List Two" list={listTwo} />
        </>
      )}
      <ToggleButtonGroup
        color="primary"
        exclusive
        onChange={(_, value) => setSelectedPart(value)}
        value={selectedPart}
      >
        <ToggleButton value={1}>Part 1</ToggleButton>
        <ToggleButton value={2}>Part 2</ToggleButton>
      </ToggleButtonGroup>
      {selectedPart === 1 && <PartOne listOne={listOne} listTwo={listTwo} />}
      {selectedPart === 2 && <PartTwo listOne={listOne} listTwo={listTwo} />}
    </>
  );
};

export default DayOne;
