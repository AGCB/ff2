"use client";
import { useEffect, useState } from "react";
import { VT323 } from "next/font/google";
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const CONSTS = {
  CONTINUE_BUTTON: "Continue",
  LICENSE_INFO:
    "This app is open-source and available for use, modification, and distribution by anyone for any purpose.",
  START_BUTTON: "Start",
  TITLE: "AGCB",
};

const Title = (
  <div className="h-full flex justify-center items-center text-9xl">
    <h1 className={`${vt323.className} border-8`}>{CONSTS.TITLE}</h1>
  </div>
);

const StartButton: React.FC<{ current: boolean }> = ({ current }) => {
  return (
    <>
      <button
        className={`${vt323.className} min-w-50 text-left text-4xl`}
      >{`${CONSTS.START_BUTTON.toUpperCase()} ${current ? "👈" : ""}`}</button>
    </>
  );
};

const ContinueButton: React.FC<{ current: boolean }> = ({ current }) => {
  return (
    <>
      <button
        className={`${vt323.className} min-w-50 text-left text-4xl`}
      >{`${CONSTS.CONTINUE_BUTTON.toUpperCase()} ${
        current ? "👈" : ""
      }`}</button>
    </>
  );
};
const LicenseInfo = (
  <div className="bg-cyan-700 h-10 p-10 flex justify-center items-center">
    <span className={`${vt323.className}`}>{CONSTS.LICENSE_INFO}</span>
  </div>
);

export default function Home() {
  const [selection, setSelection] = useState("start");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setSelection("start");
      } else if (event.key === "ArrowRight") {
        setSelection("continue");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex bg-amber-800 w-screen h-screen flex-col items-center gap-4">
      <div className="min-w-30 h-75 w-full ">{Title}</div>
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
