import { useState } from "react";
import { InputData, OperationPermutations, SolutionEquation } from "./types";
import Step from "@components/step";
import ScrollBox from "@components/scroll-box";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  calculateOperationsPermutations,
  findSolution,
  prettyPrintSolution,
  selectFromOperationPermutations,
} from "./utils";

const calculateOperationsPermutationsWithoutConcatenation = calculateOperationsPermutations(false);

const operationPermutations: OperationPermutations = {
  1: calculateOperationsPermutationsWithoutConcatenation(1),
  2: calculateOperationsPermutationsWithoutConcatenation(2),
  3: calculateOperationsPermutationsWithoutConcatenation(3),
  4: calculateOperationsPermutationsWithoutConcatenation(4),
  5: calculateOperationsPermutationsWithoutConcatenation(5),
  6: calculateOperationsPermutationsWithoutConcatenation(6),
  7: calculateOperationsPermutationsWithoutConcatenation(7),
  8: calculateOperationsPermutationsWithoutConcatenation(8),
  9: calculateOperationsPermutationsWithoutConcatenation(9),
  10: calculateOperationsPermutationsWithoutConcatenation(10),
  11: calculateOperationsPermutationsWithoutConcatenation(11),
};

const getOperationPermutations = selectFromOperationPermutations(operationPermutations);

const PartOne = ({ equations }: InputData) => {
  const [solutions, setSolutions] = useState<SolutionEquation[]>([]);
  const [startedFindingSolutions, setStartedFindingSolutions] = useState<boolean>(false);
  const [doneFindingSolutions, setDoneFindingSolutions] = useState<boolean>(false);
  const [solvableSum, setSolvableSum] = useState<number>();
  const [startedGettingSolvableSum, setStartedGettingSolvableSum] = useState<boolean>(false);

  const findSolutions = () => {
    setStartedFindingSolutions(true);
    const newSolutions: SolutionEquation[] = [];
    for (let i = 0; i < equations.length; i++) {
      const solution = findSolution(getOperationPermutations(equations[i].values.length - 1), equations[i]);
      newSolutions.push(solution);
    }
    setSolutions(newSolutions);
    setDoneFindingSolutions(true);
  };

  const getSumOfSolvable = () => {
    setStartedGettingSolvableSum(true);
    const sums = solutions.filter((equation) => equation.solvable).map((equation) => equation.result);
    setSolvableSum(sums.reduce((acc, sum) => acc + sum, 0));
  };

  return (
    <>
      <Step
        buttonLabel="Find Solutions"
        buttonDisabled={startedFindingSolutions}
        buttonOnClick={findSolutions}
        shouldRender
      >
        <ScrollBox sx={{ maxHeight: 400 }}>
          {solutions.map((solution, index) => (
            <Typography key={index} sx={{ color: solution.solvable ? "inherit" : red[500] }}>
              {prettyPrintSolution(solution)}
            </Typography>
          ))}
        </ScrollBox>
      </Step>
      <Step
        buttonLabel="Get Sum of Solvable Equations"
        buttonOnClick={getSumOfSolvable}
        buttonDisabled={startedGettingSolvableSum}
        shouldRender={doneFindingSolutions}
      >
        {solvableSum !== undefined && <>Sum of Solvable Values: {solvableSum}</>}
      </Step>
    </>
  );
};

export default PartOne;
