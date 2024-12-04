import ButtonsBox from "@components/buttons-box";
import ScrollBox from "@components/scroll-box";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  corruptData: string;
};

const PartTwo = ({ corruptData }: Props) => {
  const [validInstructions, setValidInstructions] = useState<string[]>([]);
  const [hasDataBeenParsed, setHasDataBeenParsed] = useState(false);

  const [total, setTotal] = useState<number | null>(null);
  const [hasTotalBeenCalculated, setHasTotalBeenCalculated] = useState(false);

  const parseData = () => {
    setHasDataBeenParsed(true);
    const matches = corruptData.match(
      /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g
    );
    if (matches !== null) {
      setValidInstructions(matches.map((match) => match.toString()));
    }
  };

  const calculateTotal = () => {
    setHasTotalBeenCalculated(true);
    let total = 0;
    let instructionsActive = true;
    for (const instruction of validInstructions) {
      if (instruction === "don't()") {
        instructionsActive = false;
      } else if (instruction === "do()") {
        instructionsActive = true;
      } else if (instructionsActive) {
        const numbers = instruction.match(/\d{1,3}/g);
        if (numbers !== null) {
          total += parseInt(numbers[0]) * parseInt(numbers[1]);
        }
      }
    }
    setTotal(total);
  };
  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          onClick={parseData}
          disabled={hasDataBeenParsed}
        >
          Find Valid Instructions
        </Button>
      </ButtonsBox>
      {validInstructions.length > 0 && (
        <>
          <Typography>
            Valid Instructions Found: {validInstructions.length}
          </Typography>
          <ScrollBox>
            {validInstructions.map((instruction, index) => (
              <Typography key={index}>{instruction}</Typography>
            ))}
          </ScrollBox>
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={calculateTotal}
              disabled={hasTotalBeenCalculated}
            >
              Calculate Total
            </Button>
          </ButtonsBox>
        </>
      )}
      {total !== null && (
        <>
          <Typography>Total: {total}</Typography>
        </>
      )}
    </>
  );
};

export default PartTwo;
