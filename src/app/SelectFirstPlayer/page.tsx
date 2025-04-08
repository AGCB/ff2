"use client";
import { useEffect, useRef, useState } from "react";
import vt323 from "../fonts/Vt323";
import CONSTS from "../helpers/CONSTS";
import { atom, useAtom } from "jotai";

const defaultPlayerOptions = [
  {
    index: 0,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_PROGRAMMER,
  },
  {
    index: 1,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_MAMMAL,
  },
  {
    index: 2,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_BOOKWORM,
  },
  {
    index: 3,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_SKATER,
  },
  {
    index: 4,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_ASTROPHYSICIST,
  },
  {
    index: 5,
    icon: "",
    role: CONSTS.PLAYER_OPTION_TYPES.PLAYER_TYPE_GARDENER,
  },
];
const firstPlayerNameAtom = atom("jim");
interface PlayerOptionType {
  index: number;
  icon: string;
  role: string;
  selected: boolean;
}

const PlayerRow: React.FC<PlayerOptionType> = ({
  index,
  icon,
  role,
  selected,
}) => {
  return (
    <div className={`${vt323.className} w-full border-3 text-5xl`}>
      <span>{`${selected ? "👉" : ""}${role}`}</span>
    </div>
  );
};

const SelectFirstPlayer = () => {
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(selected);

  useEffect(() => {
    selectedRef.current = selected;
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const current = selectedRef.current;
      if (event.key === "ArrowUp") {
        console.log("!!! KEY DOWN");
        if (current > 0) {
          setSelected(current - 1);
        }
      } else if (event.key === "ArrowDown") {
        if (current < 5) {
          setSelected(current + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="border-3 border-red-500 flex-col justify-items-center h-screen p-50">
        {defaultPlayerOptions.map((option, i) => {
          const options = JSON.parse(JSON.stringify(option));
          options.selected = selected === i;
          return <PlayerRow key={option.index} {...options} />;
        })}
      </div>
    </>
  );
};

// WITH JOI
// const SelectFirstPlayer = () => {
//   const [firstPlayerName, setFirstPlayerName] = useAtom(firstPlayerNameAtom);

//   useEffect(() => {
//     if (firstPlayerName !== "jim") {
//       setFirstPlayerName("jim");
//     }
//   }, []);

//   return <span>{firstPlayerName}</span>;
// };

export default SelectFirstPlayer;
