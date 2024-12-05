import ButtonsBox from "@components/buttons-box";
import OverflowTypography from "@components/overflow-typography";
import ScrollBox from "@components/scroll-box";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  wordSearch: string[][];
};

const PartOne = ({ wordSearch }: Props) => {
  const [horizontalWordSearch, setHorizontalWordSearch] = useState<string[]>(
    []
  );
  const [verticalWordSearch, setVerticalWordSearch] = useState<string[]>([]);
  const [leftDiagonalWordSearch, setLeftDiagonalWordSearch] = useState<
    string[]
  >([]);
  const [rightDiagonalWordSearch, setRightDiagonalWordSearch] = useState<
    string[]
  >([]);
  const [hasLoadedWordSearch, setHasLoadedWordSearch] = useState(false);

  const [xmasInstances, setXmasInstances] = useState<number | null>(null);
  const [hasFoundXmasInstances, setHasFoundXmasInstances] = useState(false);

  const loadHorizontalWordSearch = () => {
    const horizontals: string[] = [];
    for (let i = 0; i < wordSearch.length; i++) {
      horizontals.push(wordSearch[i].join(""));
    }
    setHorizontalWordSearch(horizontals);
  };

  const loadVerticalWordSearch = () => {
    const verticals: string[] = [];
    for (let i = 0; i < wordSearch.length; i++) {
      let verticalLine = "";
      for (let j = 0; j < wordSearch[i].length; j++) {
        verticalLine += wordSearch[j][i];
      }
      verticals.push(verticalLine);
    }
    setVerticalWordSearch(verticals);
  };

  const loadRightDiagonals = () => {
    const rightDiagonals: string[] = [];
    for (let y = wordSearch[0].length - 4; y >= 0; y--) {
      let diagonal = "";
      for (let x = 0; x < wordSearch.length - y; x++) {
        diagonal += wordSearch[x][x + y];
      }
      rightDiagonals.push(diagonal);
    }
    for (let x = 1; x <= wordSearch.length - 4; x++) {
      let diagonal = "";
      for (let y = 0; y < wordSearch[0].length - x; y++) {
        diagonal += wordSearch[y + x][y];
      }
      rightDiagonals.push(diagonal);
    }
    setRightDiagonalWordSearch(rightDiagonals);
  };

  const loadLeftDiagonals = () => {
    const leftDiagonals: string[] = [];
    for (let y = wordSearch[0].length - 4; y >= 0; y--) {
      let diagonal = "";
      for (let x = 0; x + y < wordSearch.length; x++) {
        diagonal += wordSearch[wordSearch.length - 1 - x][y + x];
      }
      leftDiagonals.push(diagonal);
    }
    for (let x = wordSearch.length - 2; x >= 3; x--) {
      let diagonal = "";
      for (let y = 0; x - y >= 0; y++) {
        diagonal += wordSearch[x - y][y];
      }
      leftDiagonals.push(diagonal);
    }
    setLeftDiagonalWordSearch(leftDiagonals);
  };

  const loadWordSearch = () => {
    setHasLoadedWordSearch(true);
    loadHorizontalWordSearch();
    loadVerticalWordSearch();
    loadRightDiagonals();
    loadLeftDiagonals();
  };

  const findXmasInstances = () => {
    setHasFoundXmasInstances(true);
    let instances = 0; // [].match(/mul\(\d{1,3},\d{1,3}\)/g);
    for (const lines of [
      horizontalWordSearch,
      verticalWordSearch,
      rightDiagonalWordSearch,
      leftDiagonalWordSearch,
    ]) {
      let lineInstances = 0;
      for (const line of lines) {
        // lineInstances += (line.match(/(XMAS)|(SAMX)/g) || []).length;
        lineInstances += (line.match(/XMAS/g) || []).length;
        lineInstances += (line.match(/SAMX/g) || []).length;
      }
      console.log("lineInstances", lineInstances);
      instances += lineInstances;
    }
    setXmasInstances(instances);
  };

  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          onClick={loadWordSearch}
          disabled={hasLoadedWordSearch}
        >
          Load Word Search
        </Button>
      </ButtonsBox>
      {horizontalWordSearch.length > 0 && (
        <OverflowTypography>
          Horizontal Lines: {horizontalWordSearch.length}
        </OverflowTypography>
      )}
      {verticalWordSearch.length > 0 && (
        <OverflowTypography>
          Vertical Lines: {verticalWordSearch.length}
        </OverflowTypography>
      )}
      {rightDiagonalWordSearch.length > 0 && (
        <>
          <OverflowTypography>
            Right Diagonal Lines: {rightDiagonalWordSearch.length}
          </OverflowTypography>
          <ScrollBox>
            {rightDiagonalWordSearch.map((line, i) => (
              <OverflowTypography fontFamily="monospace" key={i}>
                {line}
              </OverflowTypography>
            ))}
          </ScrollBox>
        </>
      )}
      {leftDiagonalWordSearch.length > 0 && (
        <>
          <OverflowTypography>
            Left Diagonal Lines: {leftDiagonalWordSearch.length}
          </OverflowTypography>
          <ScrollBox>
            {leftDiagonalWordSearch.map((line, i) => (
              <OverflowTypography fontFamily="monospace" key={i}>
                {line}
              </OverflowTypography>
            ))}
          </ScrollBox>
          <ButtonsBox>
            <Button
              variant="contained"
              onClick={findXmasInstances}
              disabled={hasFoundXmasInstances}
            >
              Find {"'XMAS'"} Instances
            </Button>
          </ButtonsBox>
        </>
      )}
      {xmasInstances !== null && (
        <Typography>
          {"'XMAS'"} Instances: {xmasInstances}
        </Typography>
      )}
    </>
  );
};

export default PartOne;
