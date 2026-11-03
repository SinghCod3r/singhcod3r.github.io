"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Stage {
  id: string;
  name: string;
  sub: string;
  desc: string;
  status: "idle" | "active" | "resolved";
  metric: string;
}

export default function OpenPrintingShowcase() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "concurrency" | "repos">("pipeline");
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const stages: Stage[] = [
    {
      id: "dns-sd",
      name: "Network Printer Search",
      sub: "DNS-SD & mDNS",
      desc: "Waits for the network scan to finish so you don't see empty lists or flickering printers.",
      status: currentStep >= 1 ? "resolved" : currentStep === 0 && isSimulating ? "active" : "idle",
      metric: "Clean Device List",
    },
    {
      id: "classifier",
      name: "USB vs Network Check",
      sub: "IPP-over-USB",
      desc: "Correctly identifies USB-plugged printers so they are not confused with network devices.",
      status: currentStep >= 2 ? "resolved" : currentStep === 1 && isSimulating ? "active" : "idle",
      metric: "Accurate Port Detection",
    },
    {
      id: "glib",
      name: "Smooth UI Threading",
      sub: "GLib Idle Loop",
      desc: "Runs heavy file parsing in background threads so your screen never freezes while adding a printer.",
      status: currentStep >= 3 ? "resolved" : currentStep === 2 && isSimulating ? "active" : "idle",
      metric: "Zero Screen Freezes",
    },
    {
      id: "resolver",
      name: "Driver Matching Cache",
      sub: "Fast Database Index",
      desc: "Quickly matches your printer model to the best available driver using a lightweight SQLite cache.",
      status: currentStep >= 4 ? "resolved" : currentStep === 3 && isSimulating ? "active" : "idle",
      metric: "Instant Driver Match",
    },
  ];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => setIsSimulating(false), 1200);
          return 4;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <section id="openprinting" className="relative w-full py-24 md:py-36 px-4 sm:px-8 lg:px-14 xl:px-20 overflow-hidden">
      {/* Background ambient refraction orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#d8ff58]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#a786ff]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d8ff58]/30 bg-[#d8ff58]/5 text-[#d8ff58] text-[11px] font-mono uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#d8ff58] animate-pulse" />
              The Linux Foundation
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium tracking-tight text-[#f0f0e9]">
              OpenPrinting <span className="font-serif italic font-normal text-[#d8ff58]">Engineering.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#989c99] leading-relaxed">
            Real open-source work on Linux: fixing frozen desktop screens, making printer detection faster, and improving system tools used on Ubuntu and Debian.
          </p>
        </div>

        {/* Master Frosted Glass Showcase Container */}
        <div className="relative rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-[30px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* Header Bar with View Switcher */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-6 sm:px-8 py-5 gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff806d]/80" />
                <span className="w-3 h-3 rounded-full bg-[#d8ff58]/80" />
                <span className="w-3 h-3 rounded-full bg-[#7ff3da]/80" />
              </div>
              <span className="text-xs font-mono text-[#989c99] ml-2">
                upstream/system-config-printer • maintainer session
              </span>
            </div>

            {/* Mode switch */}
            <div className="flex p-1 rounded-full border border-white/10 bg-black/40 text-xs">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === "pipeline"
                    ? "bg-[#d8ff58] text-[#0c0d0e] font-semibold shadow-sm"
                    : "text-[#989c99] hover:text-[#f0f0e9]"
                }`}
              >
                Discovery Pipeline
              </button>
              <button
                onClick={() => setActiveTab("concurrency")}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === "concurrency"
                    ? "bg-[#d8ff58] text-[#0c0d0e] font-semibold shadow-sm"
                    : "text-[#989c99] hover:text-[#f0f0e9]"
                }`}
              >
                Concurrency Trace
              </button>
              <button
                onClick={() => setActiveTab("repos")}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === "repos"
                    ? "bg-[#d8ff58] text-[#0c0d0e] font-semibold shadow-sm"
                    : "text-[#989c99] hover:text-[#f0f0e9]"
                }`}
              >
                Maintained Repos
              </button>
            </div>
          </div>

          {/* Tab 1: Interactive Animated Pipeline */}
          {activeTab === "pipeline" && (
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-[#f0f0e9] mb-2">
                    Linux Hardware &amp; Daemon Resolution Engine
                  </h3>
                  <p className="text-sm text-[#989c99] max-w-xl">
                    Follow the execution path rewritten to isolate GUI freezes and classify IPP-over-USB devices correctly.
                  </p>
                </div>
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className={`px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isSimulating
                      ? "bg-[#d8ff58]/20 text-[#d8ff58] border border-[#d8ff58]/40 cursor-wait"
                      : "bg-[#d8ff58] hover:bg-[#c9f547] text-[#0c0d0e] font-bold shadow-[0_0_25px_rgba(216,255,88,0.35)]"
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#d8ff58] animate-ping" />
                      Tracing Step {Math.min(currentStep + 1, 4)}/4...
                    </>
                  ) : (
                    <>
                      <span>▶</span> Run Discovery Simulation
                    </>
                  )}
                </button>
              </div>

              {/* 4 Interactive Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 relative">
                {stages.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className={`relative rounded-2xl p-6 border transition-all duration-500 flex flex-col justify-between ${
                      stage.status === "active"
                        ? "border-[#d8ff58] bg-[#d8ff58]/10 shadow-[0_0_35px_rgba(216,255,88,0.2)] scale-[1.02]"
                        : stage.status === "resolved"
                        ? "border-white/20 bg-white/[0.05]"
                        : "border-white/10 bg-black/30 opacity-70"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono text-[#d8ff58] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                          NODE 0{idx + 1}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            stage.status === "active"
                              ? "bg-[#d8ff58] text-[#0c0d0e] font-bold animate-pulse"
                              : stage.status === "resolved"
                              ? "bg-white/10 text-[#d8ff58]"
                              : "text-[#989c99]"
                          }`}
                        >
                          {stage.status}
                        </span>
                      </div>
                      <h4 className="text-base font-display font-semibold text-[#f0f0e9] mb-1">
                        {stage.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#a786ff] mb-3">{stage.sub}</p>
                      <p className="text-xs text-[#989c99] leading-relaxed mb-4">{stage.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#f0f0e9]">
                      <span className="text-[#989c99]">Result:</span>
                      <span className="text-[#d8ff58]">{stage.metric}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Status Telemetry Log */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-xs flex flex-col gap-2">
                <div className="flex items-center justify-between text-[#989c99] border-b border-white/10 pb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d8ff58] animate-pulse" />
                    DAEMON STATUS: {isSimulating ? "PROCESSING KERNEL SIGNALS" : "ONLINE / AWAITING EVENT"}
                  </span>
                  <span>GTK MAIN LOOP: 60.0 FPS</span>
                </div>
                <div className="text-[#f0f0e9]/80 flex flex-wrap gap-x-6 gap-y-1">
                  <span>
                    <strong className="text-[#d8ff58]">[upstream-fix]</strong> GLib idle callback registered
                  </span>
                  <span>
                    <strong className="text-[#a786ff]">[dns-sd]</strong> delayed presentation active
                  </span>
                  <span>
                    <strong className="text-[#7ff3da]">[pevzner-sync]</strong> zero UI freeze verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Concurrency & GTK Threading Trace */}
          {activeTab === "concurrency" && (
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff806d] mb-2 block">
                    Before &amp; After Fix
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#f0f0e9] mb-4">
                    Stopping Desktop Freezes During Driver Setup
                  </h3>
                  <p className="text-sm text-[#989c99] leading-relaxed mb-6">
                    Before this fix, loading printer driver catalogs caused the Linux desktop interface to freeze for several seconds. Working directly with maintainer Alexander Pevzner, I moved driver loading to background worker threads so the desktop stays fast and responsive.
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 rounded-xl border border-[#ff806d]/30 bg-[#ff806d]/10 flex items-start gap-3">
                      <span className="text-[#ff806d] font-bold">BEFORE:</span>
                      <span className="text-[#f0f0e9]/80">
                        The interface froze for 4 to 12 seconds whenever a user selected and installed a printer.
                      </span>
                    </div>
                    <div className="p-4 rounded-xl border border-[#d8ff58]/30 bg-[#d8ff58]/10 flex items-start gap-3">
                      <span className="text-[#d8ff58] font-bold">AFTER:</span>
                      <span className="text-[#f0f0e9]/80">
                        Background threads handle driver setup while the window stays completely smooth at 60 frames per second.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Screenshot visualizer */}
                <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-[16/10] bg-black/60 shadow-2xl">
                  <Image
                    src="/system-config-printer-preview2.png"
                    alt="OpenPrinting system-config-printer interface"
                    fill
                    className="object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-xs font-mono text-[#f0f0e9]">
                      <span className="text-[#d8ff58]">system-config-printer</span> / GTK unblocked driver selector
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Maintained Repositories */}
          {activeTab === "repos" && (
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "system-config-printer",
                    org: "OpenPrinting",
                    lang: "Python / GTK",
                    desc: "Core desktop printing administration tool across Ubuntu, Fedora, Debian, and Linux distributions worldwide.",
                    link: "https://github.com/OpenPrinting/system-config-printer",
                  },
                  {
                    name: "go-mfp",
                    org: "OpenPrinting",
                    lang: "Go",
                    desc: "Multi-function printer scanner discovery daemon. Fixed UUID-merging and nil-backend failure crashes.",
                    link: "https://github.com/OpenPrinting/go-mfp",
                  },
                  {
                    name: "foomatic-db",
                    org: "OpenPrinting",
                    lang: "XML / Metadata",
                    desc: "Maintained legacy driver metadata, resolved broken upstream references, and built lookup site tooling.",
                    link: "https://github.com/OpenPrinting/foomatic-db",
                  },
                  {
                    name: "legacy-drivers",
                    org: "OpenPrinting",
                    lang: "C / Shell",
                    desc: "Driver packaging, backward compatibility, and modernization for legacy printing hardware.",
                    link: "https://github.com/OpenPrinting",
                  },
                ].map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.07] hover:border-[#d8ff58]/40 p-6 flex flex-col justify-between transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#989c99]">
                        <span>{repo.org}</span>
                        <span className="text-[#d8ff58]">{repo.lang}</span>
                      </div>
                      <h4 className="text-lg font-display font-semibold text-[#f0f0e9] group-hover:text-[#d8ff58] transition-colors mb-2">
                        {repo.name}
                      </h4>
                      <p className="text-xs text-[#989c99] leading-relaxed mb-6">{repo.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#d8ff58]">
                      <span>View GitHub</span>
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

