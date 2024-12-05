import { Button, Typography } from "@mui/material";
import { InputData } from "./types";
import ButtonsBox from "@components/buttons-box";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import OverflowTypography from "@components/overflow-typography";

const PartOne = ({ rules, pagesToProduce }: InputData) => {
  const [productionSetsValidities, setProductionSetsValidities] = useState<boolean[]>([]);
  const [haveProductionSetsBeenChecked, setHaveProductionSetsBeenChecked] = useState(false);

  const [middlePages, setMiddlePages] = useState<string[]>([]);
  const [haveMiddlePagesBeenFound, setHaveMiddlePagesBeenFound] = useState(false);

  const checkPagesAgainstRules = (productionSet: string[]) => {
    const ruleChecks = rules.map((rule) => ({
      firstValue: rule[0],
      firstFound: false,
      secondValue: rule[1],
      secondFoundFirst: false,
    }));
    let valid = true;
    for (const page of productionSet) {
      for (const ruleCheck of ruleChecks) {
        if (page === ruleCheck.firstValue) {
          ruleCheck.firstFound = true;
        }
        if (page === ruleCheck.secondValue && !ruleCheck.firstFound) {
          ruleCheck.secondFoundFirst = true;
        }
        if (ruleCheck.firstFound && ruleCheck.secondFoundFirst) {
          valid = false;
          break;
        }
      }
    }
    return valid;
  };

  const checkAllProductionSets = () => {
    setHaveProductionSetsBeenChecked(true);
    setProductionSetsValidities(pagesToProduce.map(checkPagesAgainstRules));
  };

  const getMiddePagesOfValidSets = () => {
    setHaveMiddlePagesBeenFound(true);
    const foundMiddlePages: string[] = [];
    for (let i = 0; i < pagesToProduce.length; i++) {
      if (productionSetsValidities[i]) {
        foundMiddlePages.push(pagesToProduce[i][Math.floor(pagesToProduce[i].length / 2)]);
      }
    }
    setMiddlePages(foundMiddlePages);
  };

  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          color="primary"
          onClick={checkAllProductionSets}
          disabled={haveProductionSetsBeenChecked}
        >
          Check All Production Sets
        </Button>
      </ButtonsBox>
      {productionSetsValidities.length > 0 && (
        <>
          <ScrollBox sx={{ maxHeight: 200 }}>
            {productionSetsValidities.map((validity, index) => (
              <Typography key={index}>
                {index}: {validity ? "Valid" : "Invalid"}
              </Typography>
            ))}
          </ScrollBox>
          <ButtonsBox>
            <Button
              variant="contained"
              color="primary"
              onClick={getMiddePagesOfValidSets}
              disabled={haveMiddlePagesBeenFound}
            >
              Get Middle Pages
            </Button>
          </ButtonsBox>
        </>
      )}
      {middlePages.length > 0 && (
        <>
          <OverflowTypography>Middle Pages: {middlePages.join(" ")}</OverflowTypography>
          <Typography>Sum of Middle Pages: {middlePages.reduce((acc, page) => acc + parseInt(page), 0)}</Typography>
        </>
      )}
    </>
  );
};

export default PartOne;
