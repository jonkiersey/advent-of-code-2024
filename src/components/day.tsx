import { useState } from "react";
import { Box, Link, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PuzzleInput from "@components/puzzle-input";
import OverflowTypography from "./overflow-typography";
import ScrollBox from "./scroll-box";

type Props<T, U, V> = {
  parseData: (data: string) => T;
  puzzleInputLink: string;
  title: string;
  prettyPrintInput: (data: T) => {
    label: string;
    data: string;
  }[];
  PartOne: React.ComponentType<T & Partial<U>>;
  PartTwo: React.ComponentType<T & Partial<V>>;
  partOnePropOverrides?: U;
  partTwoPropOverrides?: V;
};

const Day = <T, U, V>({
  parseData,
  puzzleInputLink,
  title,
  prettyPrintInput,
  PartOne,
  PartTwo,
  partOnePropOverrides,
  partTwoPropOverrides,
}: Props<T, U, V>) => {
  const [selectedPart, setSelectedPart] = useState<1 | 2>(1);
  const [inputData, setInputData] = useState<T>();

  const handleInputChange = (data: string) => {
    setInputData(parseData(data));
  };

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ display: "flex" }}>
        <Link href={puzzleInputLink} target="_blank">
          Get Puzzle Input Data
        </Link>
      </Box>
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
          {inputData != null && selectedPart === 1 && <PartOne {...inputData} {...partOnePropOverrides} />}
          {inputData != null && selectedPart === 2 && <PartTwo {...inputData} {...partTwoPropOverrides} />}
        </>
      )}
    </>
  );
};

export default Day;
