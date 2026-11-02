"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // Target: December 21, 2026 at 4:30 PM IST (UTC+05:30)
    const targetDate = new Date("2026-12-21T16:30:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative my-10 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#C06C4E]/90 to-[#8E3E26]/95 text-[#FAF5EE] p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 overflow-hidden"
      >
        {/* Subtle background glow & texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF5EE_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Section Header */}
        <div className="relative flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-[#E5C378]" />
          <span className="font-royal text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F7D6C8] font-semibold">
            Counting Down To Forever
          </span>
        </div>

        <h3 className="relative font-script text-3xl sm:text-4xl text-[#FAF5EE] mb-6">
          Until We Say “I Do”
        </h3>

        {/* Countdown Grid */}
        <div className="relative grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-[#561E10]/50 backdrop-blur-md border border-[#D4AF37]/40 shadow-inner group hover:border-[#D4AF37] transition-colors"
            >
              <div className="text-2xl sm:text-4xl font-royal font-bold text-[#FFF5E6] group-hover:scale-105 transition-transform">
                {String(block.value).padStart(2, "0")}
              </div>
              <span className="text-[9px] sm:text-xs font-royal tracking-[0.2em] uppercase text-[#F7D6C8] mt-1">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="relative font-editorial italic text-xs sm:text-sm text-[#FAF5EE]/80 mt-6 tracking-wide">
          Monday, 21st December 2026 • 4:30 P.M. IST
        </p>
      </motion.div>
    </section>
  );
}
