"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type TypewriterProps = {
  text: string;
  speed?: number;
};

function Typewriter({ text, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  // useTypeWriter Effect
  useEffect(() => {
    if (index < text.length && !isComplete) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed, isComplete]);

  // Handle Enter Press and Redirect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (!isComplete) {
          setDisplayedText(text);
          setIsComplete(true);
        } else {
          router.push("/SelectFirstPlayer");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text, isComplete, router]);

  return <span>{displayedText}</span>;
}

export default Typewriter;
