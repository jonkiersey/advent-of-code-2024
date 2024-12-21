import { Coordinate, Emissions } from "./types";

export const findEmissions = (city: string[][]): Emissions => {
  const emissions: Emissions = {};
  for (let y = 0; y < city.length; y++) {
    for (let x = 0; x < city[y].length; x++) {
      const frequency = city[y][x];
      if (frequency !== ".") {
        if (!emissions[frequency]) {
          emissions[frequency] = [];
        }
        emissions[frequency].push({ x, y });
      }
    }
  }
  return emissions;
};

export const findAntinodes = (emissions: Emissions): Coordinate[] => {
  const antinodes: Coordinate[] = [];
  for (const coordinates of Object.values(emissions)) {
    for (let i = 0; i < coordinates.length - 1; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        const vector: Coordinate = { x: coordinates[j].x - coordinates[i].x, y: coordinates[j].y - coordinates[i].y };
        const firstAntinode: Coordinate = { x: coordinates[i].x - vector.x, y: coordinates[i].y - vector.y };
        const secondAntinode: Coordinate = { x: coordinates[j].x + vector.x, y: coordinates[j].y + vector.y };
        antinodes.push(firstAntinode, secondAntinode);
      }
    }
  }
  return antinodes;
};

const findLCDVector = (vector: Coordinate): Coordinate => {
  let lcdVector = { x: vector.x, y: vector.y };
  let didSomething = true;
  while (didSomething) {
    didSomething = false;
    for (let i = Math.floor(Math.min(lcdVector.x, lcdVector.y) / 2); i >= 2; i--) {
      if (lcdVector.x % i === 0 && lcdVector.y % i === 0) {
        lcdVector = { x: lcdVector.x / i, y: lcdVector.y / i };
        didSomething = true;
        break;
      }
    }
  }
  return lcdVector;
};

export const findLinearAntinodes = (emissions: Emissions, maxX: number, maxY: number): Coordinate[] => {
  const antinodes: Coordinate[] = [];
  for (const coordinates of Object.values(emissions)) {
    for (let i = 0; i < coordinates.length - 1; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        const vector: Coordinate = { x: coordinates[j].x - coordinates[i].x, y: coordinates[j].y - coordinates[i].y };
        const lcdVector = findLCDVector(vector);
        let k = 0;
        antinodes.push(coordinates[i], coordinates[j]);
        while (true) {
          k++;
          const x = coordinates[i].x + lcdVector.x * k;
          const y = coordinates[i].y + lcdVector.y * k;
          if (x < 0 || y < 0 || x > maxX || y > maxY) {
            break;
          }
          const antinode = { x: coordinates[i].x + lcdVector.x * k, y: coordinates[i].y + lcdVector.y * k };
          antinodes.push(antinode);
        }
        k = 0;
        while (true) {
          k++;
          const x = coordinates[j].x - lcdVector.x * k;
          const y = coordinates[j].y - lcdVector.y * k;
          if (x < 0 || y < 0 || x > maxX || y > maxY) {
            break;
          }
          const antinode = { x: coordinates[j].x - lcdVector.x * k, y: coordinates[j].y - lcdVector.y * k };
          antinodes.push(antinode);
        }
      }
    }
  }
  return antinodes;
};

export const findUniqueAntinodes = (
  city: string[][],
  antinodes: Coordinate[]
): { cityWithAntinodes: string[][]; uniqueAntinodes: number } => {
  const newCityWithAntinodes = city.map((line) => line.slice());
  let antinodeCount = 0;
  for (const antinode of antinodes) {
    if (
      newCityWithAntinodes[antinode.y]?.[antinode.x] !== undefined &&
      newCityWithAntinodes[antinode.y][antinode.x] !== "#"
    ) {
      antinodeCount++;
      newCityWithAntinodes[antinode.y][antinode.x] = "#";
    }
  }
  return { cityWithAntinodes: newCityWithAntinodes, uniqueAntinodes: antinodeCount };
};
