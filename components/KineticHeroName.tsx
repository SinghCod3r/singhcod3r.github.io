"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface KineticCharProps {
  char: string;
  index: number;
  wordIndex: number;
}

function KineticChar({ char, index, wordIndex }: KineticCharProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tilt, setTilt] = useState({ scaleY: 1, scaleX: 1, skewX: 0, rot: 0, y: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);

  const handlePointerEnter = () => {
    setIsHovered(true);
    // Playful, elastic shape distortion on hover / touch
    const randomSkew = (Math.random() - 0.5) * 16;
    const randomRot = (Math.random() - 0.5) * 12;
    const stretchMode = Math.random() > 0.5;

    setTilt({
      scaleY: stretchMode ? 1.25 : 0.85,
      scaleX: stretchMode ? 0.8 : 1.22,
      skewX: randomSkew,
      rot: randomRot,
      y: -10,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Smoothly spring back to resting geometry
    setTilt({ scaleY: 1, scaleX: 1, skewX: 0, rot: 0, y: 0 });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 700);
  };

  return (
    <span
      ref={spanRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handlePointerEnter}
      onTouchEnd={handlePointerLeave}
      onClick={handleClick}
      style={{
        transform: isClicked
          ? "rotateY(360deg) scale(1.12)"
          : `translate3d(0, ${tilt.y}px, 0) scaleX(${tilt.scaleX}) scaleY(${tilt.scaleY}) skewX(${tilt.skewX}deg) rotate(${tilt.rot}deg)`,
        transition: isHovered
          ? "transform 0.14s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease-out, text-shadow 0.15s ease-out"
          : "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.35s ease-out, text-shadow 0.35s ease-out",
        textShadow: isHovered
          ? "0 0 35px rgba(242, 242, 238, 0.9), 0 0 60px rgba(216, 255, 88, 0.3)"
          : "0 4px 35px rgba(0, 0, 0, 0.85)",
      }}
      className={`hero-char inline-block cursor-pointer select-none will-change-transform transition-colors duration-200 ${
        isHovered
          ? "text-white z-20"
          : "text-[#F2F2EE] hover:text-white"
      }`}
    >
      {char}
    </span>
  );
}

export default function KineticHeroName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1 = "AYUSH".split("");
  const word2 = "SINGH".split("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const chars1 = gsap.utils.toArray<HTMLElement>(".hero-char-w1");
    const chars2 = gsap.utils.toArray<HTMLElement>(".hero-char-w2");
    if (chars1.length === 0 || chars2.length === 0) return;

    const tl = gsap.timeline({ delay: 0.25 });

    // Staggered morphing entrance for line 1: AYUSH
    tl.fromTo(
      chars1,
      {
        y: 55,
        scaleY: 0.3,
        scaleX: 1.5,
        opacity: 0,
      },
      {
        y: 0,
        scaleY: 1,
        scaleX: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 1.2,
        ease: "elastic.out(1, 0.65)",
      }
    );

    // Staggered morphing entrance for line 2: SINGH
    tl.fromTo(
      chars2,
      {
        y: 50,
        scaleY: 0.3,
        scaleX: 1.5,
        opacity: 0,
      },
      {
        y: 0,
        scaleY: 1,
        scaleX: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 1.2,
        ease: "elastic.out(1, 0.65)",
      },
      "-=0.9"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center select-none text-center"
      aria-label="Ayush Singh"
    >
      {/* LINE 1: AYUSH */}
      <h1 className="flex flex-nowrap items-baseline justify-center font-display font-black tracking-[-0.04em] uppercase italic leading-[0.84] text-[15vw] sm:text-[13vw] lg:text-[9.5rem] xl:text-[11.5rem] text-[#F2F2EE]">
        {word1.map((char, i) => (
          <span key={`w1-${i}`} className="hero-char-w1 inline-block">
            <KineticChar char={char} index={i} wordIndex={0} />
          </span>
        ))}
      </h1>

      {/* LINE 2: SINGH */}
      <h2 className="flex flex-nowrap items-baseline justify-center font-display font-black tracking-[-0.04em] uppercase italic leading-[0.82] text-[15vw] sm:text-[13vw] lg:text-[9.5rem] xl:text-[11.5rem] text-[#F2F2EE] -mt-[0.12em] sm:-mt-[0.15em]">
        {word2.map((char, i) => (
          <span key={`w2-${i}`} className="hero-char-w2 inline-block">
            <KineticChar char={char} index={i} wordIndex={1} />
          </span>
        ))}
      </h2>
    </div>
  );
}
