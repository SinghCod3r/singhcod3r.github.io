"use client";

import { useEffect, useRef } from "react";

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout | number;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    // Fluid pointer physics
    const mouse = {
      x: 0.5,
      y: 0.4,
      targetX: 0.5,
      targetY: 0.4,
      speed: 0,
      lastX: 0.5,
      lastY: 0.4,
    };

    // Ripple wave disturbances
    const ripples: { x: number; y: number; radius: number; opacity: number }[] = [];

    const handleResize = () => {
      // On mobile, clamp DPR to 1 to reduce GPU fill-rate memory bandwidth by 75%
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const dx = x - mouse.lastX;
      const dy = y - mouse.lastY;
      mouse.speed = Math.min(Math.hypot(dx, dy) * 10, 2);
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.targetX = x;
      mouse.targetY = y;

      // Add gentle fluid ripple
      if (Math.random() > 0.6 && ripples.length < 8) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          opacity: 0.25,
        });
      }
    };

    const render = () => {
      if (isScrolling && isMobile) {
        // Yield 100% CPU & GPU compositor budget to high-refresh (120Hz) native scrolling
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.008;

      // Smooth fluid mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      mouse.speed *= 0.95;

      ctx.clearRect(0, 0, width, height);

      // Deep dark ink background
      const minDim = Math.min(width, height);

      // 1. Fluid Ambient Silk Blobs (Liquid Color Fields)
      const drawFluidBlob = (
        baseX: number,
        baseY: number,
        radius: number,
        colorStart: string,
        driftSpeed = 1
      ) => {
        const driftX = Math.sin(time * 0.6 * driftSpeed) * (minDim * 0.12);
        const driftY = Math.cos(time * 0.5 * driftSpeed) * (minDim * 0.08);
        const x = baseX + driftX;
        const y = baseY + driftY;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, Math.max(20, radius));
        grad.addColorStop(0, colorStart);
        grad.addColorStop(0.5, colorStart.replace(/[\d.]+\)$/, "0.04)"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // Lime Silk Glow (follows mouse fluidly with inertia)
      const limeX = width * (0.3 + mouse.x * 0.2);
      const limeY = height * (0.25 + mouse.y * 0.15);
      drawFluidBlob(limeX, limeY, minDim * 0.65, "rgba(216, 255, 88, 0.16)", 0.8);

      // Violet Silk Glow (opposing drift)
      const violetX = width * (0.75 - mouse.x * 0.15);
      const violetY = height * (0.65 + mouse.y * 0.1);
      drawFluidBlob(violetX, violetY, minDim * 0.7, "rgba(167, 134, 255, 0.14)", 0.6);

      // Cyan Fluid Whisper (center cursor reactive)
      const cyanX = width * mouse.x;
      const cyanY = height * mouse.y;
      drawFluidBlob(cyanX, cyanY, minDim * 0.4, "rgba(127, 243, 218, 0.09)", 1.2);

      // 2. Liquid Silk Waves (Flowing organic lines)
      ctx.save();
      const waveStreams = isMobile ? 2 : 5;
      for (let i = 0; i < waveStreams; i++) {
        const offset = i * (Math.PI / 3);
        const baseY = height * (0.3 + i * 0.12);

        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle =
          i % 2 === 0
            ? "rgba(216, 255, 88, 0.04)"
            : "rgba(167, 134, 255, 0.035)";

        for (let x = 0; x <= width; x += 30) {
          const normX = x / width;
          // Fluid mouse disturbance
          const distFromMouse = Math.abs(normX - mouse.x);
          const mouseLift = Math.exp(-distFromMouse * 5) * 35 * Math.sin(time * 2);

          const waveY =
            baseY +
            Math.sin(normX * 4 + time + offset) * 30 +
            Math.cos(normX * 6 - time * 0.7 + i) * 15 +
            mouseLift;

          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Fluid cursor ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.opacity *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(216, 255, 88, ${r.opacity * 0.18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        if (r.opacity < 0.01) {
          ripples.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
