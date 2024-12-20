import { useState } from "react";
import { CONCATENATE, InputData, OperationPermutations, SolutionEquation } from "./types";
import Step from "@components/step";
import ScrollBox from "@components/scroll-box";
import { Typography } from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import {
  calculateOperationsPermutations,
  findSolution,
  prettyPrintSolution,
  selectFromOperationPermutations,
} from "./utils";

const calculateOperationsPermutationsWithConcatenation = calculateOperationsPermutations(true);

const operationPermutations: OperationPermutations = {
  1: calculateOperationsPermutationsWithConcatenation(1),
  2: calculateOperationsPermutationsWithConcatenation(2),
  3: calculateOperationsPermutationsWithConcatenation(3),
  4: calculateOperationsPermutationsWithConcatenation(4),
  5: calculateOperationsPermutationsWithConcatenation(5),
  6: calculateOperationsPermutationsWithConcatenation(6),
  7: calculateOperationsPermutationsWithConcatenation(7),
  8: calculateOperationsPermutationsWithConcatenation(8),
  9: calculateOperationsPermutationsWithConcatenation(9),
  10: calculateOperationsPermutationsWithConcatenation(10),
  11: calculateOperationsPermutationsWithConcatenation(11),
};

const getOperationPermutations = selectFromOperationPermutations(operationPermutations);

const PartTwo = ({ equations }: InputData) => {
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
            <Typography
              key={index}
              sx={{
                color: solution.solvable
                  ? solution.operations.includes(CONCATENATE)
                    ? yellow[500]
                    : "inherit"
                  : red[500],
              }}
            >
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

export default PartTwo;
