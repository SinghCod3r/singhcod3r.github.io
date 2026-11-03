"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, Download, Mail, BookOpen, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactCard() {
  const [copied, setCopied] = useState(false);
  const email = "ayushsinghceee@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#d8ff58", "#a786ff", "#7ff3da"],
      });
    } catch {
      // Ignore if canvas-confetti is unsupported
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-white/20 bg-[#121316]/70 backdrop-blur-[35px] saturate-[190%] p-5 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Background Refraction Blob */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#d8ff58]/15 via-[#a786ff]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d8ff58]/30 bg-[#d8ff58]/5 text-[#d8ff58] text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d8ff58] animate-pulse" />
            Open for New Roles &amp; Projects
          </div>

          <h3 className="text-2xl sm:text-5xl font-display font-medium text-[#f0f0e9] tracking-tight leading-tight mb-3 sm:mb-4">
            Let&apos;s build something <br />
            <span className="font-serif italic text-[#d8ff58]">great together.</span>
          </h3>

          <p className="text-xs sm:text-base text-[#989c99] leading-relaxed max-w-lg mb-5 sm:mb-8 font-light">
            Whether you have an exciting job opportunity, want to collaborate on open-source software, or simply want to connect, feel free to reach out.
          </p>

          {/* Email Box with 1-Click Copy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md max-w-lg">
            <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-2 flex-1 text-xs sm:text-sm font-mono text-[#f0f0e9] overflow-hidden">
              <Mail className="w-4 h-4 text-[#d8ff58] flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs font-mono font-medium transition-all duration-200 bg-white/10 hover:bg-[#d8ff58] hover:text-[#0c0d0e] text-[#f0f0e9] active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#0c0d0e]" />
                  <span className="font-bold text-[#0c0d0e]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Fast Actions & Social Outlets */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#d8ff58]/50 text-[#f0f0e9] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#d8ff58]/10 text-[#d8ff58]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-display font-semibold">Send Direct Email</div>
                <div className="text-[11px] font-mono text-[#989c99]">ayushsinghceee@gmail.com</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#989c99] group-hover:text-[#d8ff58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/Ayush_Singh.pdf"
            download="Ayush_Singh_Resume.pdf"
            className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#a786ff]/50 text-[#f0f0e9] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#a786ff]/10 text-[#a786ff]">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-display font-semibold">Download Resume</div>
                <div className="text-[11px] font-mono text-[#989c99]">PDF Document • Verified Facts</div>
              </div>
            </div>
            <Download className="w-4 h-4 text-[#989c99] group-hover:text-[#a786ff] group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Social Icons row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              {
                name: "GitHub",
                href: "https://github.com/SinghCod3r",
                icon: GithubIcon,
                color: "#f0f0e9",
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/singhcod3r",
                icon: LinkedinIcon,
                color: "#7ff3da",
              },
              {
                name: "Medium",
                href: "https://medium.com/@Singhcod3r",
                icon: BookOpen,
                color: "#ff806d",
              },
            ].map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 text-[#f0f0e9] transition-all duration-200 group"
              >
                <soc.icon className="w-5 h-5 mb-1.5 text-[#989c99] group-hover:text-white transition-colors" />
                <span className="text-[11px] font-mono text-[#989c99] group-hover:text-[#f0f0e9]">
                  {soc.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
