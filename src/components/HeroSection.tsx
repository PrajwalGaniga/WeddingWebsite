"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloralDivider } from "./FloralFlourish";
import { Heart } from "lucide-react";

// Stagger container for letter-by-letter reveal
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

function StaggerName({ text }: { text: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex justify-center items-center"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          className="inline-block text-5xl sm:text-6xl font-script text-[#8E2818] couple-script-text px-[0.5px] select-none"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface HeroSectionProps {
  guestName?: string | null;
}

export function HeroSection({ guestName }: HeroSectionProps = {}) {
  return (
    <>
      {/* ─── SCREEN 1: Name Card – Full viewport ─── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-3 pt-6 pb-6 overflow-hidden">
        {/* Royal Heritage Floral Arch Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-[400px] mx-auto rounded-[28px] overflow-hidden shadow-2xl border border-[#D4AF37]/60 bg-[#FAF5EE]"
        >
          {/* Full-bleed floral arch border background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/assets/floral_frame_hero.jpg"
              alt="Royal Heritage Floral Frame"
              fill
              priority
              className="object-fill"
              sizes="(max-width: 480px) 100vw, 400px"
            />
          </div>

          {/* Content layer – padded well inside the floral border */}
          <div className="relative z-10 pt-[18%] pb-[14%] px-8 sm:px-10 flex flex-col items-center text-center">

            {/* Personalised guest greeting (shown when ?guest=Name) */}
            {guestName && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.05, duration: 0.65 }}
                className="mb-2 px-3 py-0.5 rounded-full bg-[#F7D6C8]/80 border border-[#D4AF37]/50 backdrop-blur-sm"
              >
                <p className="text-[10px] font-editorial italic text-[#6B2516] tracking-wide">
                  Dear <span className="font-bold not-italic">{guestName}</span>,
                </p>
              </motion.div>
            )}

            {/* Holy Matrimony badge */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-[9.5px] sm:text-[10px] font-royal font-bold tracking-[0.26em] text-[#6B2516] uppercase mb-2 flex items-center gap-1.5"
            >
              <span className="text-[#D4AF37]">✦</span>
              Holy Matrimony
              <span className="text-[#D4AF37]">✦</span>
            </motion.p>

            {/* Together With Our Families */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-[8px] sm:text-[8.5px] font-royal font-bold tracking-[0.18em] text-[#6B2516] uppercase mb-3"
            >
              Together With Our Families
            </motion.p>

            {/* Names with staggered letter reveal */}
            <div className="space-y-0.5 my-0.5">
              <StaggerName text="Neslin" />

              {/* Ampersand with hearts */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.45, duration: 0.5, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-2 py-0.5"
              >
                <span className="h-[1px] w-5 bg-[#A85338]/40" />
                <Heart className="w-3 h-3 fill-[#C06C4E] text-[#C06C4E]" />
                <span className="font-script text-3xl text-[#6B2516]">&</span>
                <Heart className="w-3 h-3 fill-[#C06C4E] text-[#C06C4E]" />
                <span className="h-[1px] w-5 bg-[#A85338]/40" />
              </motion.div>

              <StaggerName text="Gaywin" />
            </div>

            {/* Invite sub-line - carefully sized so it never touches the frame design */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[7.5px] sm:text-[8px] font-royal font-bold tracking-[0.12em] text-[#382A24] uppercase mt-3 mb-3.5 max-w-[210px] mx-auto text-center leading-normal"
            >
              Invite You To Celebrate Our Wedding
            </motion.p>

            {/* Date Block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="w-full max-w-[240px] py-2.5 border-y border-[#D4AF37]/60 text-center my-2"
            >
              <div className="text-[10px] font-royal font-bold tracking-[0.3em] uppercase text-[#6B2516]">
                December
              </div>
              <div className="flex items-center justify-center gap-4 my-1">
                <span className="text-[10px] font-royal font-bold tracking-[0.2em] text-[#382A24] uppercase">Monday</span>
                <span className="text-4xl font-royal font-bold text-[#8E2818]">21</span>
                <span className="text-[10px] font-royal font-bold tracking-[0.15em] text-[#382A24] uppercase">4:30 P.M.</span>
              </div>
              <div className="text-[10px] font-royal font-bold tracking-[0.3em] uppercase text-[#6B2516]">
                2026
              </div>
            </motion.div>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-[11px] font-editorial italic text-[#382A24] tracking-wide my-2"
            >
              Mangalore, India
            </motion.p>

            {/* Hashtag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-script text-2xl text-[#8E2818] couple-script-text"
            >
              #NeslinWedsGaywin
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-royal tracking-[0.3em] uppercase text-[#A85338]/70">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#A85338]/60 text-xs"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
