import { Button, Typography } from "@mui/material";
import { InputData } from "./types";
import ButtonsBox from "@components/buttons-box";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import OverflowTypography from "@components/overflow-typography";
import { checkPagesAgainstRules, getMiddlePage } from "./utils";

const PartOne = ({ rules, pagesToProduce }: InputData) => {
  const [productionSetsValidities, setProductionSetsValidities] = useState<boolean[]>([]);
  const [haveProductionSetsBeenChecked, setHaveProductionSetsBeenChecked] = useState(false);

  const [middlePages, setMiddlePages] = useState<number[]>([]);
  const [haveMiddlePagesBeenFound, setHaveMiddlePagesBeenFound] = useState(false);

  const checkAllProductionSets = () => {
    setHaveProductionSetsBeenChecked(true);
    setProductionSetsValidities(pagesToProduce.map((productionSet) => checkPagesAgainstRules(rules, productionSet)));
  };

  const getMiddePagesOfValidSets = () => {
    setHaveMiddlePagesBeenFound(true);
    const foundMiddlePages = [];
    for (let i = 0; i < pagesToProduce.length; i++) {
      if (productionSetsValidities[i]) {
        foundMiddlePages.push(getMiddlePage(pagesToProduce[i]));
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
          <Typography>Sum of Middle Pages: {middlePages.reduce((acc, page) => acc + page, 0)}</Typography>
        </>
      )}
    </>
  );
};

export default PartOne;
