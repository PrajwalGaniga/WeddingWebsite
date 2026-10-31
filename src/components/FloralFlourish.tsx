"use client";

import React from "react";

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#C06C4E]/60" />
      <div className="flex items-center gap-1.5 text-[#C06C4E]">
        <span className="text-[10px] text-[#D4AF37]">✦</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-[#C06C4E]"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-[10px] text-[#D4AF37]">✦</span>
      </div>
      <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#C06C4E]/60" />
    </div>
  );
}

export function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotation = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <div className={`absolute w-8 h-8 pointer-events-none ${rotation} ${
      position.includes("top") ? "top-2" : "bottom-2"
    } ${position.includes("left") ? "left-2" : "right-2"}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#D4AF37]/70"
      >
        <path
          d="M2 38V12C2 6.47715 6.47715 2 12 2H38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 34V14C6 9.58172 9.58172 6 14 6H34"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <circle cx="12" cy="12" r="2.5" fill="#C06C4E" />
      </svg>
    </div>
  );
}

export function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-24 h-10 ${className}`}
    >
      <path
        d="M5 20C25 18 45 22 95 20"
        stroke="#C06C4E"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M25 19C28 13 36 12 36 12C36 12 34 18 29 20"
        fill="#A85338"
        fillOpacity="0.85"
      />
      <path
        d="M40 21C43 27 51 28 51 28C51 28 49 22 44 20"
        fill="#D4AF37"
        fillOpacity="0.85"
      />
      <path
        d="M58 19C61 13 69 12 69 12C69 12 67 18 62 20"
        fill="#A85338"
        fillOpacity="0.85"
      />
      <path
        d="M72 21C75 27 83 28 83 28C83 28 81 22 76 20"
        fill="#D4AF37"
        fillOpacity="0.85"
      />
      <circle cx="95" cy="20" r="2" fill="#D4AF37" />
    </svg>
  );
}
