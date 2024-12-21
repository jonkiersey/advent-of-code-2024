export type InputData = {
  city: string[][];
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Emissions = { [key: string]: Coordinate[] };
