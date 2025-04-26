"use client";
import { CellType } from "./page";

const addThreatLevel = (output: CellType[][]) => {
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  output.forEach((row, i) => {
    row.forEach((cell, k) => {
      if (!cell.isBomb) {
        neighbors.forEach((neighborOffset) => {
          const xOffset = neighborOffset[0];
          const yOffset = neighborOffset[1];
          const neighbor = output?.[i + xOffset]?.[k + yOffset];

          if (neighbor && neighbor.isBomb) {
            output[i][k].threatLevel++;
          }
        });
      }
    });
  });
};

const addDefaultData = () => {
  const SIZE = 10;
  const output = [];
  if (typeof window === "undefined") {
    return [];
  }
  for (let x = 0; x < SIZE; x++) {
    let row = [];

    for (let y = 0; y < SIZE; y++) {
      const cell = {
        x,
        y,
        isBomb: Math.random() > 0.37,
        isVisible: false,
        isFlagged: false,
        threatLevel: 0,
      };
      row.push(cell);
    }
    output.push(row);
  }

  return output;
};

function getDefaultBoard() {
  let output = addDefaultData();
  addThreatLevel(output);

  return output;
}
