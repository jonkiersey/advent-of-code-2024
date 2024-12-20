export type InputEquation = {
  result: number;
  values: number[];
};

export type InputData = {
  equations: InputEquation[];
};

export const ADD: Operation = "ADD" as const;
export const MULTIPLY: Operation = "MULTIPLY" as const;
export const CONCATENATE: Operation = "CONCATENATE" as const;

export type Operation = "ADD" | "MULTIPLY" | "CONCATENATE";

export type SolutionEquation = InputEquation & { operations: Operation[]; solvable: boolean };

export type OperationPermutations = { [key: number]: Operation[][] };
