"use client";

import { useEffect, useState } from "react";

export function MorphingWords({
  words = ["Linux systems", "Python tools", "fast APIs", "open-source software"],
  className = "",
}: {
  words?: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 350);
    }, 2800);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block transition-all duration-300 transform font-serif italic text-[#d8ff58] ${
        fade ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-2 blur-[2px]"
      } ${className}`}
    >
      {words[index]}
    </span>
  );
}

export function AnimatedTitle({
  text,
  highlight,
  className = "",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <h2 className={`font-display font-medium tracking-tight text-[#f0f0e9] ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-2.5 transition-transform duration-300 hover:-translate-y-1 hover:text-white"
        >
          {word}
        </span>
      ))}
      {highlight && (
        <span className="font-serif italic font-normal text-[#d8ff58] inline-block animate-pulse-subtle">
          {highlight}
        </span>
      )}
    </h2>
  );
}

