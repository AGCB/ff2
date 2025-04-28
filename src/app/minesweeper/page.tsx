"use client";
import { useState, useEffect, useContext } from "react";
import { BoardProvider, useBoardContext } from "./BoardContext";

export type CellType = {
  x: number;
  y: number;
  isFlagged: boolean;
  isVisible: boolean;
  isBomb: boolean;
  threatLevel: number;
};

export type SetBoardType = React.Dispatch<
  React.SetStateAction<CellType[][] | null>
>;
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

const addThreatLevel = (output: CellType[][]) => {
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
        isBomb: Math.random() > 0.87,
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

const Cell = ({ cellData }: { cellData: CellType }) => {
  const { board, setBoard } = useBoardContext();
  const renderCell = (cellData: CellType) => {
    const { x, y, isVisible, isBomb, threatLevel, isFlagged } = cellData;

    // Cell renderers.... hidden, flagged, visible,

    const renderHidden = () => null;
    const renderFlagged = () => "🏴";
    const renderThreatLevel = (threatLevel: number) => `${String(threatLevel)}`;

    const chooseCellRenderer = (cellData: CellType) =>
      isFlagged
        ? renderFlagged()
        : !isVisible
        ? renderHidden()
        : renderThreatLevel(cellData.threatLevel);

    return <span className="text-xl">{chooseCellRenderer(cellData)}</span>;
  };
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    cellData: CellType
  ) => {
    const { isBomb, isFlagged, isVisible, x, y } = cellData;

    if (isBomb) {
      setBoard(getDefaultBoard());
    } else if (!isFlagged && !isVisible) {
      let newBoard = JSON.parse(JSON.stringify(board));
      const revealNonThreatenedNeighborHood = (
        board: CellType[][],
        x: number,
        y: number,
        visited = new Set<string>()
      ) => {
        const key = `${x}-${y}`;
        if (visited.has(key)) return;
        visited.add(key);
        const cell = board?.[x]?.[y];
        if (!cell || cell.isVisible || cell.isFlagged) return;

        cell.isVisible = true;

        if (cell.threatLevel === 0) {
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

          neighbors.forEach(([dx, dy]) => {
            const nx = dx + x;
            const ny = dy + y;

            revealNonThreatenedNeighborHood(board, nx, ny, visited);
          });
        }
      };
      revealNonThreatenedNeighborHood(newBoard, x, y);
      setBoard(newBoard);
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cellData: CellType
  ) => {
    const { x, y } = cellData;
    e.preventDefault();

    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
    setBoard(newBoard);
  };
  return (
    <div
      onContextMenu={(e) => handleContextMenu(e, cellData)}
      onClick={(e) => handleClick(e, cellData)}
      className={`${"border-2 border-gray-400"} flex flex-col items-center p-2 w-10 h-10 text-xl`}
    >
      {renderCell(cellData)}
    </div>
  );
};

const Row = ({ cells }: { cells: CellType[] }) => {
  return (
    <div className="flex justify-center align-center">
      {cells.map((cell: CellType) => (
        <Cell key={`${cell.x}-${cell.y}`} cellData={cell} />
      ))}
    </div>
  );
};

const MineSweeperContent = () => {
  const { board, setBoard } = useBoardContext();
  return (
    <div className="flex flex-col justify-center items-center">
      {board?.map((row, i) => (
        <Row cells={row} key={i} />
      ))}
    </div>
  );
};

export const MineSweeper = () => {
  return (
    <BoardProvider>
      <MineSweeperContent />
    </BoardProvider>
  );
};

export default MineSweeper;
