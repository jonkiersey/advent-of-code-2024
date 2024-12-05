import { Button, Typography } from "@mui/material";
import { InputData } from "./types";
import ButtonsBox from "@components/buttons-box";
import { useState } from "react";
import ScrollBox from "@components/scroll-box";
import { checkPagesAgainstRules, getMiddlePage } from "./utils";

const PartTwo = ({ rules, pagesToProduce }: InputData) => {
  const [productionSetsValidities, setProductionSetsValidities] = useState<boolean[]>([]);
  const [haveProductionSetsBeenChecked, setHaveProductionSetsBeenChecked] = useState(false);

  const [fixedProductionSets, setFixedProductionSets] = useState<InputData["pagesToProduce"]>([]);
  const [hasFixedProductionSets, setHasFixedProductionSets] = useState(false);

  const [middlePages, setMiddlePages] = useState<number[]>([]);
  const [hasGottenMiddlePages, setHasGottenMiddlePages] = useState(false);

  const checkAllProductionSets = () => {
    setHaveProductionSetsBeenChecked(true);
    setProductionSetsValidities(pagesToProduce.map((productionSet) => checkPagesAgainstRules(rules, productionSet)));
  };

  const fixProductionSet = (printing: InputData["pagesToProduce"][number]) => {
    const printingSet = new Set(printing);
    let relevantRules = rules.filter((rule) => rule.every((number) => printingSet.has(number)));

    const orderedPrinting = [];
    const listLength = printing.length;
    for (let i = 0; i < listLength; i++) {
      const [next] = printing.filter((page) => relevantRules.every((rule) => rule[1] !== page));
      printing = printing.filter((page) => next !== page);
      relevantRules = relevantRules.filter((rule) => next !== rule[0]);
      orderedPrinting.push(next);
    }
    return orderedPrinting;
  };

  const fixInvalidProductionSets = () => {
    setHasFixedProductionSets(true);
    setFixedProductionSets(
      pagesToProduce
        .map((productionSet, index) => {
          if (!productionSetsValidities[index]) {
            return fixProductionSet(productionSet);
          }
          return undefined;
        })
        .filter((p) => p !== undefined)
    );
  };

  const getMiddlePages = () => {
    setHasGottenMiddlePages(true);
    setMiddlePages(fixedProductionSets.map(getMiddlePage));
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
              onClick={fixInvalidProductionSets}
              disabled={hasFixedProductionSets}
            >
              Fix Invalid Production Sets
            </Button>
          </ButtonsBox>
        </>
      )}
      {fixedProductionSets.length > 0 && (
        <>
          <ScrollBox>
            {fixedProductionSets.map((productionSet, index) => (
              <Typography key={index}>
                {index}: {productionSet.join(" ")}
              </Typography>
            ))}
          </ScrollBox>
          <ButtonsBox>
            <Button variant="contained" color="primary" onClick={getMiddlePages} disabled={hasGottenMiddlePages}>
              Get Middle Pages
            </Button>
          </ButtonsBox>
        </>
      )}
      {middlePages.length > 0 && (
        <>
          <Typography>Middle Pages: {middlePages.join(" ")}</Typography>
          <Typography>Sum of Middle Pages: {middlePages.reduce((acc, page) => acc + page, 0)}</Typography>
        </>
      )}
    </>
  );
};

export default PartTwo;
