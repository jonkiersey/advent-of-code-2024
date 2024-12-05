import { useState } from "react";
import {
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PuzzleInput from "@components/puzzle-input";
import OverflowTypography from "./overflow-typography";
import ScrollBox from "./scroll-box";

type Props<T> = {
  parseData: (data: string) => T;
  puzzleInputLink: string;
  title: string;
  prettyPrintInput: (data: T) => {
    label: string;
    data: string;
  }[];
  PartOne: (props: { inputData: T }) => JSX.Element;
  PartTwo: (props: { inputData: T }) => JSX.Element;
};

const Day = <T,>({
  parseData,
  puzzleInputLink,
  title,
  prettyPrintInput,
  PartOne,
  PartTwo,
}: Props<T>) => {
  const [selectedPart, setSelectedPart] = useState<1 | 2>(1);
  const [inputData, setInputData] = useState<T>();

  const handleInputChange = (data: string) => {
    setInputData(parseData(data));
  };

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Link href={puzzleInputLink} target="_blank">
        Puzzle Input Data
      </Link>
      <PuzzleInput handleInputChange={handleInputChange} />
      {inputData !== undefined && (
        <>
          <ScrollBox sx={{ maxHeight: 400 }}>
            {prettyPrintInput(inputData).map(({ label, data }) => (
              <OverflowTypography key={label} fontFamily="monospace">
                {label}: {data}
              </OverflowTypography>
            ))}
          </ScrollBox>
          <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={(_, value) => {
              if (value !== null) {
                setSelectedPart(value);
              }
            }}
            value={selectedPart}
          >
            <ToggleButton value={1}>Part 1</ToggleButton>
            <ToggleButton value={2}>Part 2</ToggleButton>
          </ToggleButtonGroup>
          {selectedPart === 1 && <PartOne inputData={inputData} />}
          {selectedPart === 2 && <PartTwo inputData={inputData} />}
        </>
      )}
    </>
  );
};

export default Day;
