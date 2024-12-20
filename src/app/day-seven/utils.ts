import { ADD, CONCATENATE, InputEquation, MULTIPLY, Operation, OperationPermutations, SolutionEquation } from "./types";

export const calculateOperationsPermutations =
  (includeConcatenationOperator: boolean) =>
  (length: number): Operation[][] => {
    if (length === 0) {
      return [];
    }
    let permutations = [[ADD], [MULTIPLY], ...[includeConcatenationOperator ? [CONCATENATE] : []]];
    for (let i = 0; i < length - 1; i++) {
      permutations = permutations.reduce((acc, permutation) => {
        acc.push(permutation.concat(ADD));
        acc.push(permutation.concat(MULTIPLY));
        if (includeConcatenationOperator) {
          acc.push(permutation.concat(CONCATENATE));
        }
        return acc;
      }, [] as Operation[][]);
    }
    return permutations;
  };

export const selectFromOperationPermutations =
  (operationPermutations: OperationPermutations) =>
  (operationCount: number): Operation[][] => {
    if (!Object.keys(operationPermutations).includes(operationCount.toString())) {
      throw new Error(`Invalid operationCount: ${operationCount}`);
    }
    return operationPermutations[operationCount];
  };

export const findSolution = (operationPermutations: Operation[][], inputEquation: InputEquation): SolutionEquation => {
  for (const permutation of operationPermutations) {
    let result = inputEquation.values[0];
    for (let i = 0; i < permutation.length; i++) {
      if (permutation[i] === ADD) {
        result += inputEquation.values[i + 1];
      } else if (permutation[i] === MULTIPLY) {
        result *= inputEquation.values[i + 1];
      } else if (permutation[i] === CONCATENATE) {
        result = Number(result.toString() + inputEquation.values[i + 1].toString());
      } else {
        console.error("Unknown operation", permutation[i]);
        break;
      }
    }
    if (result === inputEquation.result) {
      return Object.assign(inputEquation, { operations: permutation, solvable: true });
    }
  }
  return Object.assign(inputEquation, { operations: [], solvable: false });
};

export const operationToSymbol = (operation: Operation) => {
  if (operation === ADD) {
    return "+";
  } else if (operation === MULTIPLY) {
    return "x";
  } else if (operation === CONCATENATE) {
    return "||";
  }
  return "?";
};

export const prettyPrintSolution = (solution: SolutionEquation) => {
  let prettyString = "";
  for (let i = 0; i < solution.values.length; i++) {
    prettyString += solution.values[i];
    if (i < solution.operations.length) {
      prettyString += ` ${operationToSymbol(solution.operations[i])} `;
    } else {
      prettyString += " ? ";
    }
  }
  if (solution.solvable) {
    prettyString += ` = ${solution.result}`;
  } else {
    prettyString += ` != ${solution.result}`;
  }
  return prettyString;
};
