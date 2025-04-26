import React, { createContext, useContext, useState, useEffect } from "react";
import { CellType } from "./page";
import { SetStateAction } from "jotai";

type BoardContextType = {
  board: CellType[][] | null;
  setBoard: React.Dispatch<SetStateAction<CellType[][] | null>>;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be uesd within the Board Provider");
  }
  return context;
};

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
        neighbors.forEach(([dx, dy]) => {
          const neighbor = output?.[i + dx]?.[k + dy];
          if (neighbor?.isBomb) {
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
  for (let x = 0; x < SIZE; x++) {
    let row = [];
    for (let y = 0; y < SIZE; y++) {
      row.push({
        x,
        y,
        isBomb: Math.random() > 0.87,
        isVisible: false,
        isFlagged: false,
        threatLevel: 0,
      });
    }
    output.push(row);
  }
  return output;
};

const getDefaultBoard = () => {
  const board = addDefaultData();
  addThreatLevel(board);
  return board;
};

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<CellType[][] | null>(getDefaultBoard());

  useEffect(() => {
    setBoard(getDefaultBoard());
  }, []);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
