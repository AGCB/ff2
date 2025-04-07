"use client";
import { useState } from "react";

type CoordinateProp = number;

type CellProps = {
  x: CoordinateProp;
  y: CoordinateProp;
  isHidden: boolean;
  isBomb: boolean;
  surroundingBombCount: number;
};

type RowProps = {
  cells: CellProps[];
};

const Cell = ({ x, y, isHidden, isBomb, surroundingBombCount }: CellProps) => {
  const renderCell = () => {
    const renderHiddenCell = () => {
      return "-";
    };
    const renderVisibleCell = () => {
      if (isBomb) {
        return "💣";
      } else {
        if (surroundingBombCount === 0) {
          return "0️⃣";
        } else {
          return surroundingBombCount;
        }
      }
    };
    // hidden
    // 2 visible case, with surroundingBombCountDisplayed or bombLocationDisplayed
    const fullInfoText = (
      <span>{`${x}/${y}--h${String(isHidden)} --IB${String(
        isBomb
      )}--SBC${surroundingBombCount}`}</span>
    );

    const output = (
      <div className="flex justify-center align-middle m-0.5 h-full relative bottom-1 ">
        <span>{isHidden ? renderHiddenCell() : renderVisibleCell()}</span>
      </div>
    );

    return output;
  };

  const showCell = (x: CoordinateProp, y: CoordinateProp) => {
    console.log("Cell at", x, y);
  };

  const handleCellClick = () => {};

  return (
    <div className="border-1 h-5 w-5" onClick={handleCellClick}>
      {renderCell()}
    </div>
  );
};

const Row = ({ cells }: RowProps) => {
  return (
    <div>
      {cells.map((cell: CellProps, i: number) => {
        const { x, y, isHidden, isBomb, surroundingBombCount } = cell;
        return (
          <Cell
            x={x}
            y={y}
            isBomb={isBomb}
            isHidden={isHidden}
            surroundingBombCount={surroundingBombCount}
          />
        );
      })}
    </div>
  );
};

// const testCells = [
//   { x: 4, y: 3, isHidden: false, isBomb: false, surroundingBombCount: 9 },
//   { x: 6, y: 7, isHidden: false, isBomb: false, surroundingBombCount: 0 },
//   { x: 5, y: 3, isHidden: false, isBomb: true, surroundingBombCount: 0 },
// ];

type BoardProps = RowProps[];

type BoardSizeProp = number;

const getDefaultBoard = (size: BoardSizeProp = 10) => {
  let output = [];

  for (let x = 0; x < size; x++) {
    let row = [];
    for (let y = 0; y < size; y++) {
      let cell = {
        x,
        y,
        isHidden: true,
        isBomb: false,
        surroundingBombCount: 0,
      };
      row.push(cell);
    }
    output.push(row);
  }
  return output;
};

const Board = ({ board: BoardProps }) => {
  return <div>{"board"}</div>;
};

const SandBox = () => {
  const [board, setBoard] = useState(getDefaultBoard());
  return (
    <div className="border-8 h-screen p-8 flex justify-center items-center">
      <Board board={board} />
    </div>
  );
};

export default SandBox;
