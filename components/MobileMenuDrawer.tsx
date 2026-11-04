"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface NavItem {
  number: string;
  label: string;
  href: string;
  color: string;
}

const navItems: NavItem[] = [
  { number: "01", label: "About", href: "#about", color: "#d8ff58" },
  { number: "02", label: "Selected Projects", href: "#projects", color: "#a786ff" },
  { number: "03", label: "Talks & Community", href: "#signal", color: "#ff806d" },
  { number: "04", label: "Tech Stack", href: "#stack", color: "#7ff3da" },
  { number: "05", label: "Contact", href: "#contact", color: "#d8ff58" },
];

export default function MobileMenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <div className="md:hidden">
      {/* Skiper UI Morphing Hamburger Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="relative z-50 flex flex-col items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/5 active:bg-white/15 transition-all duration-200"
      >
        <div className="w-4.5 flex flex-col gap-1 items-end">
          <span
            className={`h-0.5 bg-[#f0f0e9] rounded-full transition-all duration-300 ${
              isOpen ? "w-5 rotate-45 translate-y-1.5 bg-[#d8ff58]" : "w-5"
            }`}
          />
          <span
            className={`h-0.5 bg-[#f0f0e9] rounded-full transition-all duration-200 ${
              isOpen ? "w-0 opacity-0" : "w-3.5"
            }`}
          />
          <span
            className={`h-0.5 bg-[#f0f0e9] rounded-full transition-all duration-300 ${
              isOpen ? "w-5 -rotate-45 -translate-y-1.5 bg-[#d8ff58]" : "w-4"
            }`}
          />
        </div>
      </button>

      {/* Full-Screen Glassmorphic Skiper Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#07080a]/96 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-6 pt-24 ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Top Status Badge */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#989c99]">
            <span className="w-2 h-2 rounded-full bg-[#d8ff58] animate-pulse" />
            <span className="text-white/90">AVAILABLE FOR ROLES</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#989c99]">
            Navigation
          </span>
        </div>

        {/* Staggered Navigation Links */}
        <nav className="flex flex-col gap-3 py-6">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              style={{
                transitionDelay: isOpen ? `${i * 45}ms` : "0ms",
              }}
              className="group flex items-center justify-between py-3 border-b border-white/5 active:bg-white/[0.04] px-2 rounded-xl transition-all duration-300"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-xs font-mono tracking-widest opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: item.color }}
                >
                  {item.number}
                </span>
                <span className="text-2xl font-display font-semibold tracking-tight text-[#f0f0e9] group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#989c99] group-hover:text-[#d8ff58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </nav>

        {/* Bottom Actions: Resume & Direct Contact */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/Ayush_Singh.pdf"
              download="Ayush_Singh_Resume.pdf"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#d8ff58]/40 bg-[#d8ff58]/10 text-[#d8ff58] text-xs font-mono font-medium active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume (PDF)</span>
            </a>

            <a
              href="mailto:ayushsinghceee@gmail.com"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-[#f0f0e9] text-xs font-mono font-medium active:scale-95 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Ayush</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono text-[#989c99]">
            <a
              href="https://github.com/SinghCod3r"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/singhcod3r"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

