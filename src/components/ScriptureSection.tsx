"use client";

import React from "react";
import { motion } from "framer-motion";
import { CornerOrnament } from "./FloralFlourish";

export function ScriptureSection() {
  return (
    <section className="relative my-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl bg-gradient-to-b from-[#FDFBF7] to-[#F7D6C8]/25 p-6 sm:p-8 border border-[#D4AF37]/50 shadow-xl overflow-hidden text-center"
      >
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Decorative Quote Icon */}
        <div className="flex justify-center mb-2">
          <span className="text-4xl sm:text-5xl font-editorial text-[#D4AF37] leading-none select-none">
            “
          </span>
        </div>

        {/* Holy Scripture */}
        <blockquote className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#382A24] leading-relaxed max-w-md mx-auto">
          and now these three remain: Faith, Hope and Love,
          <br className="hidden sm:inline" /> But the greatest of these is{" "}
          <span className="text-[#C06C4E] font-medium not-italic font-script text-2xl sm:text-3xl">
            love
          </span>
        </blockquote>

        {/* Scripture Citation */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-[1px] w-6 bg-[#D4AF37]/60" />
          <cite className="font-royal text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#A85338] not-italic">
            1 Corinthians 13:13
          </cite>
          <div className="h-[1px] w-6 bg-[#D4AF37]/60" />
        </div>
      </motion.div>
    </section>
  );
}
