"use client";

import { useMemo, useState } from "react";
import { RevealDiv } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import { useSound } from "@/components/fx/SoundProvider";

const optionBtn = (selected: boolean) =>
  `min-h-[48px] w-full min-w-0 rounded-xl border px-2.5 py-3 sm:px-4 sm:py-3.5 text-center font-mono text-[12px] leading-tight sm:text-[13px] tracking-normal sm:tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
    selected
      ? "bg-white/10 border-white text-white font-bold"
      : "bg-white/[0.02] border-white/10 text-neutral-300 hover:text-white hover:border-neutral-500 font-medium"
  }`;

export default function RateCalculator() {
  const { playHoverSound, playShutterSound } = useSound();

  const [days, setDays] = useState<number>(2);
  const [projectType, setProjectType] = useState<"mv" | "ep" | "commercial" | "realestate">("mv");
  const [crewTier, setCrewTier] = useState<"minimal" | "standard" | "full">("standard");
  const [cameraTier, setCameraTier] = useState<"fx9" | "red" | "arri">("arri");
  const [vfxTier, setVfxTier] = useState<boolean>(true);

  // Price calculation: recomputed only when an input actually changes
  const estimatedTotal = useMemo(() => {
    // All prices are in INR (₹) per shoot day, except post production (one-time)
    let base = 50000;
    if (projectType === "ep") base = 85000;
    if (projectType === "commercial") base = 110000;
    if (projectType === "realestate") base = 30000;

    let crewCost = 18000;
    if (crewTier === "standard") crewCost = 35000;
    if (crewTier === "full") crewCost = 70000;

    let cameraCost = 10000;
    if (cameraTier === "red") cameraCost = 20000;
    if (cameraTier === "arri") cameraCost = 30000;

    const vfxCost = vfxTier ? 40000 : 0;

    const totalPerDay = base + crewCost + cameraCost;
    return totalPerDay * days + vfxCost;
  }, [days, projectType, crewTier, cameraTier, vfxTier]);

  const handleApplyToQuote = () => {
    playShutterSound();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="relative py-12 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-12 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <RevealDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 25, mass: 0.8, restDelta: 0.001 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-16 border-b border-white/10 pb-8"
        >
          <div>
            <span className="text-[11px] sm:text-[13px] font-mono text-[#E50914] uppercase tracking-[0.12em] sm:tracking-[0.2em] font-semibold block mb-2">
              05 / PRODUCTION ESTIMATOR
            </span>
            <h2 className="font-display text-[clamp(2.4rem,11vw,3.5rem)] sm:text-7xl lg:text-8xl tracking-wide sm:tracking-wider uppercase text-white leading-[0.9]">
              PLAN YOUR <br className="hidden sm:block" />
              <span className="text-white">PRODUCTION</span>
            </h2>
          </div>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-light">
            Build your production setup and get a clear estimate for your project.
          </p>
        </RevealDiv>

        {/* Clean Editorial Two-Column Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Configuration Panel (Enters from Left) */}
          <RevealDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 25, mass: 0.8, restDelta: 0.001 }}
            className="lg:col-span-7 min-w-0 space-y-7 sm:space-y-10"
          >
            {/* 01. Shoot Duration */}
            <div className="space-y-3">
              <span className="block font-mono text-[11px] sm:text-[13px] text-[#E50914] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                01 / SHOOT DURATION
              </span>
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 rounded-xl p-2.5 sm:p-3 w-full sm:max-w-sm">
                <button
                  type="button"
                  onClick={() => {
                    playHoverSound();
                    setDays((prev) => Math.max(1, prev - 1));
                  }}
                  aria-label="Decrease shoot duration by 1 day"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 text-white font-mono font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg cursor-pointer"
                  title="Decrease Days"
                >
                  −
                </button>
                <div className="text-center font-mono">
                  <span className="text-sm sm:text-lg font-bold text-white tracking-wider sm:tracking-widest uppercase">
                    {days} DAY{days > 1 ? "S" : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playHoverSound();
                    setDays((prev) => Math.min(10, prev + 1));
                  }}
                  aria-label="Increase shoot duration by 1 day"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 text-white font-mono font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg cursor-pointer"
                  title="Increase Days"
                >
                  +
                </button>
              </div>
            </div>

            {/* 02. Project Type */}
            <div className="space-y-3">
              <span className="block font-mono text-[11px] sm:text-[13px] text-[#E50914] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                02 / PROJECT TYPE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { id: "mv", label: "MUSIC VIDEO" },
                  { id: "ep", label: "EP VISUALIZER" },
                  { id: "commercial", label: "COMMERCIAL" },
                  { id: "realestate", label: "REAL ESTATE" },
                ].map((item) => {
                  const isSelected = projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        playHoverSound();
                        setProjectType(item.id as "mv" | "ep" | "commercial" | "realestate");
                      }}
                      className={optionBtn(isSelected)}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />}
                      <span className="min-w-0 break-words">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 03. Crew & Staffing */}
            <div className="space-y-3">
              <span className="block font-mono text-[11px] sm:text-[13px] text-[#E50914] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                03 / CREW & STAFFING
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: "minimal", label: "SOLO DP" },
                  { id: "standard", label: "STANDARD CREW" },
                  { id: "full", label: "FULL PRODUCTION" },
                ].map((item) => {
                  const isSelected = crewTier === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        playHoverSound();
                        setCrewTier(item.id as "minimal" | "standard" | "full");
                      }}
                      className={optionBtn(isSelected)}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />}
                      <span className="min-w-0 break-words">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 04. Camera Package */}
            <div className="space-y-3">
              <span className="block font-mono text-[11px] sm:text-[13px] text-[#E50914] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                04 / CAMERA PACKAGE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: "fx9", label: "SONY FX9" },
                  { id: "red", label: "RED V-RAPTOR" },
                  { id: "arri", label: "ARRI ALEXA LF" },
                ].map((item) => {
                  const isSelected = cameraTier === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        playHoverSound();
                        setCameraTier(item.id as "fx9" | "red" | "arri");
                      }}
                      className={optionBtn(isSelected)}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E50914]" />}
                      <span className="min-w-0 break-words">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 05. Post Production */}
            <div className="space-y-3">
              <span className="block font-mono text-[11px] sm:text-[13px] text-[#E50914] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                05 / POST PRODUCTION
              </span>
              <div className="flex items-center justify-between gap-3 p-3 sm:p-5 bg-white/[0.02] rounded-xl border border-white/10">
                <div className="space-y-1 pr-3 sm:pr-4 min-w-0">
                  <span className="font-mono text-[12px] sm:text-[13px] text-white font-semibold uppercase tracking-normal sm:tracking-wider block leading-snug">
                    INCLUDE POST PRODUCTION
                  </span>
                  <span className="text-xs font-sans text-neutral-300 block font-light">
                    Full-production color pass + 3D motion elements.
                  </span>
                </div>
                <button
                  type="button"
                  aria-pressed={vfxTier}
                  aria-label={vfxTier ? "Disable post production add-on" : "Enable post production add-on"}
                  onClick={() => {
                    playHoverSound();
                    setVfxTier(!vfxTier);
                  }}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-lg font-mono text-[12px] sm:text-[13px] font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
                    vfxTier
                      ? "bg-white/10 border border-white text-white"
                      : "bg-white/5 border border-white/10 text-neutral-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${vfxTier ? "bg-[#E50914]" : "bg-neutral-500"}`} />
                  <span>{vfxTier ? "ON" : "OFF"}</span>
                </button>
              </div>
            </div>
          </RevealDiv>

          {/* Right Summary & Estimated Budget Panel (Enters from Right) */}
          <RevealDiv
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 90, damping: 25, mass: 0.8, restDelta: 0.001 }}
            className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-black p-4 min-[400px]:p-5 sm:p-10 rounded-2xl border border-neutral-800 space-y-6 sm:space-y-8 min-w-0 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-[11px] sm:text-[13px] text-[#E50914] uppercase tracking-[0.1em] sm:tracking-[0.15em] font-semibold block">
                  ESTIMATED PRODUCTION BUDGET
                </span>
                <div className="font-display text-[clamp(2.75rem,15vw,4.5rem)] sm:text-7xl lg:text-8xl leading-none text-white tracking-wide sm:tracking-wider break-words">
                  ₹{estimatedTotal.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] sm:text-[13px] font-mono text-neutral-400 uppercase tracking-normal sm:tracking-widest block pt-1 leading-relaxed">
                  ESTIMATED DIRECTING & PRODUCTION COST
                </span>
              </div>

              <div className="border-t border-neutral-800 pt-5 sm:pt-6 space-y-4 sm:space-y-3 font-mono text-[12px] sm:text-[13px]">
                <div className="flex flex-col items-start gap-0.5 text-neutral-300 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-neutral-500 uppercase tracking-wider">SHOOT DAYS</span>
                  <span className="font-bold text-white tracking-wide sm:tracking-wider sm:text-right">{days} DAYS</span>
                </div>
                <div className="flex flex-col items-start gap-0.5 text-neutral-300 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-neutral-500 uppercase tracking-wider">CAMERA PACKAGE</span>
                  <span className="font-bold text-white tracking-wide sm:tracking-wider uppercase sm:text-right">
                    {cameraTier === "fx9" ? "SONY FX9" : cameraTier === "red" ? "RED V-RAPTOR" : "ARRI ALEXA LF"}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-0.5 text-neutral-300 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-neutral-500 uppercase tracking-wider">ON-SET CREW</span>
                  <span className="font-bold text-white tracking-wide sm:tracking-wider uppercase sm:text-right">
                    {crewTier === "minimal" ? "SOLO DP" : crewTier === "standard" ? "STANDARD CREW" : "FULL PRODUCTION"}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-0.5 text-neutral-300 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="text-neutral-500 uppercase tracking-wider">VFX & COLOR</span>
                  <span className="font-bold text-white tracking-wide sm:tracking-wider uppercase sm:text-right">
                    {vfxTier ? "INCLUDED" : "NONE"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleApplyToQuote}
              onMouseEnter={playHoverSound}
              className="mt-2 sm:mt-8 w-full min-h-[52px] py-3.5 sm:py-4 px-5 sm:px-8 rounded-2xl sm:rounded-full bg-[#E50914] hover:bg-red-700 text-white font-mono text-[12px] sm:text-[13px] leading-snug font-bold uppercase tracking-normal sm:tracking-widest flex items-center justify-center gap-2 text-center transition-colors"
            >
              <span>APPLY TO PRODUCTION INQUIRY</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}