import { InputData } from "./types";

const checkPagesAgainstRules = (rules: InputData["rules"], productionSet: InputData["pagesToProduce"][number]) => {
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

const getMiddlePage = (pages: InputData["pagesToProduce"][number]) => {
  return pages[Math.floor(pages.length / 2)];
};

export { checkPagesAgainstRules, getMiddlePage };
