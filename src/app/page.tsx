"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-screen h-screen flex-col items-center border-3 border-red-400">
      <div onClick={() => router.push("minesweeper")}>Minesweeper</div>
      <Link href="/ffl">
        <span>ffl</span>
      </Link>
      <Link href="/about">
        <span>about</span>
      </Link>
      <Link href="/react-three-fiber">
        <span>rtf</span>
      </Link>
    </div>
  );
}
