"use client";

import React from "react";

export function DriftingPetals() {
  const petals = [
    { left: "10%", delay: "0s", size: "w-3 h-4", anim: "animate-petal-1", opacity: 0.8 },
    { left: "28%", delay: "3s", size: "w-2.5 h-3.5", anim: "animate-petal-2", opacity: 0.75 },
    { left: "72%", delay: "6s", size: "w-3.5 h-4.5", anim: "animate-petal-3", opacity: 0.85 },
    { left: "88%", delay: "8s", size: "w-2.5 h-3", anim: "animate-petal-4", opacity: 0.7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal, i) => (
        <div
          key={i}
          className={`absolute -top-6 ${petal.size} ${petal.anim}`}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          {/* Stylized realistic Rose Petal SVG */}
          <svg
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            <path
              d="M12 2C6 5 2 12 3 19C4 26 12 29 17 27C22 25 24 18 21 11C18 4 15 2 12 2Z"
              fill="url(#petal-gradient)"
            />
            <defs>
              <linearGradient id="petal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C06C4E" />
                <stop offset="60%" stopColor="#A83C22" />
                <stop offset="100%" stopColor="#7A2210" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
