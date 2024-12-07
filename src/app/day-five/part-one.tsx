import { Typography } from "@mui/material";
import { InputData } from "./types";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import OverflowTypography from "@components/overflow-typography";
import { checkPagesAgainstRules, getMiddlePage } from "./utils";
import Step from "@components/step";

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
      <Step
        buttonLabel="Check All Production Sets"
        buttonOnClick={checkAllProductionSets}
        buttonDisabled={haveProductionSetsBeenChecked}
        shouldRender
      >
        {productionSetsValidities.length > 0 && (
          <ScrollBox sx={{ maxHeight: 200 }}>
            {productionSetsValidities.map((validity, index) => (
              <Typography key={index}>
                {index}: {validity ? "Valid" : "Invalid"}
              </Typography>
            ))}
          </ScrollBox>
        )}
      </Step>
      <Step
        buttonLabel="Get Middle Pages"
        buttonOnClick={getMiddePagesOfValidSets}
        buttonDisabled={haveMiddlePagesBeenFound}
        shouldRender={productionSetsValidities.length > 0}
      >
        {middlePages.length > 0 && (
          <>
            <OverflowTypography>Middle Pages: {middlePages.join(" ")}</OverflowTypography>
            <Typography>Sum of Middle Pages: {middlePages.reduce((acc, page) => acc + page, 0)}</Typography>
          </>
        )}
      </Step>
    </>
  );
};

export default PartOne;
