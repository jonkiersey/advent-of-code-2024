import ButtonsBox from "@components/buttons-box";
import ScrollBox from "@components/scroll-box";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  corruptData: string;
};

const PartOne = ({ corruptData }: Props) => {
  const [validInstructions, setValidInstructions] = useState<string[]>([]);
  const [parsingData, setParsingData] = useState(false);
  const [hasDataBeenParsed, setHasDataBeenParsed] = useState(false);

  const [total, setTotal] = useState<number | null>(null);
  const [calculatingTotal, setCalculatingTotal] = useState(false);
  const [hasTotalBeenCalculated, setHasTotalBeenCalculated] = useState(false);

  const parseData = () => {
    setParsingData(true);
    const matches = corruptData.match(/mul\(\d{1,3},\d{1,3}\)/g);
    if (matches !== null) {
      setValidInstructions(matches.map((match) => match.toString()));
    }
    setParsingData(false);
    setHasDataBeenParsed(true);
  };

  const calculateTotal = () => {
    setCalculatingTotal(true);
    let total = 0;
    for (const instruction of validInstructions) {
      const numbers = instruction.match(/\d{1,3}/g);
      if (numbers !== null) {
        total += parseInt(numbers[0]) * parseInt(numbers[1]);
      }
    }
    setTotal(total);
    setCalculatingTotal(false);
    setHasTotalBeenCalculated(true);
  };
  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          onClick={parseData}
          disabled={parsingData || hasDataBeenParsed}
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
              disabled={calculatingTotal || hasTotalBeenCalculated}
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

export default PartOne;
