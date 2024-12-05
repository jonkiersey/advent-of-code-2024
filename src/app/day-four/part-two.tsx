import ButtonsBox from "@components/buttons-box";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  wordSearch: string[][];
};
const PartTwo = ({ wordSearch }: Props) => {
  const [xMASesFound, setXMASesFound] = useState<number | null>(null);
  const [hasFoundXMASes, setHasFoundXMASes] = useState(false);

  const xmasTips = ["M", "S"];

  const xMasesHere = (i: number, j: number): number => {
    let count = 0;

    const topLeft = wordSearch[i - 1][j - 1];
    const topRight = wordSearch[i - 1][j + 1];
    const bottomLeft = wordSearch[i + 1][j - 1];
    const bottomRight = wordSearch[i + 1][j + 1];

    if (
      [topLeft, topRight, bottomLeft, bottomRight].every((tip) =>
        xmasTips.includes(tip)
      ) &&
      topLeft !== bottomRight &&
      topRight !== bottomLeft
    ) {
      count += 1;
    }

    return count;
  };

  const findXMASes = () => {
    let xMASes = 0;
    for (let i = 1; i < wordSearch.length - 1; i++) {
      for (let j = 1; j < wordSearch[i].length - 1; j++) {
        if (wordSearch[i][j] === "A") {
          xMASes += xMasesHere(i, j);
        }
      }
    }
    setXMASesFound(xMASes);
    setHasFoundXMASes(true);
  };
  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          color="primary"
          onClick={findXMASes}
          disabled={hasFoundXMASes}
        >
          Find X-MASes
        </Button>
      </ButtonsBox>
      {xMASesFound !== null && (
        <Typography>X-MASes Found: {xMASesFound}</Typography>
      )}
    </>
  );
};

export default PartTwo;
