"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

export default function PortraitCard() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotX = ((mouseY / rect.height) - 0.5) * -12;
    const rotY = ((mouseX / rect.width) - 0.5) * 12;
    setTilt({ rx: rotX, ry: rotY });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div className="relative w-full flex items-center justify-center py-2 sm:py-6 select-none [perspective:1000px]">
      {/* Ambient Theme Colored Glow in the background */}
      <div
        className="absolute w-56 h-56 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full pointer-events-none transition-all duration-700 blur-[80px]"
        style={{
          background: isHovered
            ? "radial-gradient(circle, rgba(216, 255, 88, 0.3) 0%, rgba(167, 134, 255, 0.15) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(216, 255, 88, 0.18) 0%, rgba(167, 134, 255, 0.08) 60%, transparent 80%)",
        }}
      />

      {/* Pure Circular Image with In and Out Theme Shadows */}
      <div
        ref={circleRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.4s ease-out"
            : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease-out",
          boxShadow: isHovered
            ? "0 0 55px rgba(216, 255, 88, 0.35), 0 25px 50px rgba(0, 0, 0, 0.8)"
            : "0 0 40px rgba(216, 255, 88, 0.2), 0 20px 45px rgba(0, 0, 0, 0.7)",
        }}
        className="group relative w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-[#d8ff58]/35 hover:border-[#d8ff58] cursor-pointer"
      >
        {/* The Image */}
        <Image
          src="/my_image.webp"
          alt="Ayush Singh"
          fill
          priority
          sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          className="object-cover object-top filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Inner Shadows Based On Theme (Inset depth & vignette) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            boxShadow:
              "inset 0 0 45px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(216, 255, 88, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
          }}
        />

        {/* Specular Edge Ring */}
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15 group-hover:ring-[#d8ff58]/40 transition-colors duration-300" />
      </div>
    </div>
  );
}
