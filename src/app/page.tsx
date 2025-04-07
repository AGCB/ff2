"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
// components
import ContinueButton from "./components/buttons/ContinueButton";
import StartButton from "./components/buttons/StartButton";
import Title from "./components/Title";
import LicenseInfo from "./components/LicenseInfo";

export default function Home() {
  const [selection, setSelection] = useState("start");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setSelection("start");
      } else if (event.key === "ArrowRight") {
        setSelection("continue");
      } else if (event.key === "Enter") {
        redirect("StoryStart");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex bg-gray-700 w-screen h-screen flex-col items-center gap-4">
      <div className="min-w-30 h-75 w-full ">
        <Title />
      </div>
      <div className="h-80 flex-10/12 flex-col place-content-end">
        <div className="border h-50 flex justify-around items-start">
          {<StartButton current={selection === "start"} />}
          {<ContinueButton current={selection === "continue"} />}
        </div>
        {LicenseInfo}
      </div>
    </div>
  );
}
