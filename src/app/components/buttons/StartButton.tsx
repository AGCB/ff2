import { useRef, useEffect } from "react";
import { redirect } from "next/navigation";
import CONSTS from "@/app/CONSTS";
import vt323 from "@/app/fonts/Vt323";
const StartButton: React.FC<{ current: boolean }> = ({ current }) => {
  const handleSubmit = (e: React.MouseEvent<HTMLElement> | React.FormEvent) => {
    console.log("!!! here is the event", e);
    redirect("/storyStart");
  };

  return (
    <>
      <button
        onClick={(e) => handleSubmit(e)}
        className={`${vt323.className} min-w-50 text-left text-4xl`}
      >{`${CONSTS.START_BUTTON.toUpperCase()} ${current ? "👈" : ""}`}</button>
    </>
  );
};

export default StartButton;
