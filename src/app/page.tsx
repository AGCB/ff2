"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-screen h-screen flex-col items-center border-3 border-red-400">
      <div onClick={() => router.push("minesweeper")}>Minesweeper</div>
      <div onClick={() => router.push("react-three-fiber")}>
        react-three-fiber-sample
      </div>
      <div onClick={() => router.push("cth/")}>CTH</div>
      <div></div>
    </div>
  );
}
