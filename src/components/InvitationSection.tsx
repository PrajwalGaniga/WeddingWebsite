"use client";

import React from "react";
import { motion } from "framer-motion";
import { CornerOrnament, FloralDivider, BotanicalBranch } from "./FloralFlourish";

export function InvitationSection() {
  return (
    <section className="relative my-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-[#FAF5EE] p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden text-center"
      >
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Wax Seal Monogram Emblem */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C06C4E] to-[#8E3E26] border border-[#D4AF37] flex items-center justify-center shadow-md">
            <span className="font-royal text-sm font-bold text-[#FAF5EE] tracking-wider">
              N & G
            </span>
          </div>
        </div>

        <span className="text-[11px] font-royal uppercase tracking-[0.3em] text-[#8E2818] font-bold">
          The Nuptial Invitation
        </span>
        <h3 className="font-royal text-base sm:text-lg font-bold tracking-[0.16em] text-[#6B2516] uppercase mt-2">
          Neslin Priya &amp; Gaywin Cristan
        </h3>

        {/* Botanical Top Branch */}
        <div className="flex justify-center my-2">
          <BotanicalBranch className="w-28 opacity-80" />
        </div>

        {/* Formal Invitation Text with Smooth Stagger Reveals */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-4 my-6"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
            }}
            className="font-editorial text-lg sm:text-xl text-[#2C1A12] leading-relaxed"
          >
            I, <span className="font-bold text-[#8E2818]">Mrs. Florin D’souza</span>
            <br />
            and with the blessings of my husband
            <br />
            <span className="italic font-semibold text-[#382A24]">late Mark Gregory D’souza</span>
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
            }}
            className="font-editorial text-base sm:text-lg text-[#2C1A12] italic"
          >
            cordially invite you and your family to witness and bless the nuptials of my daughter
          </motion.p>

          {/* Couple Feature Cards */}
          <div className="py-4 space-y-4">
            {/* Bride */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.96, y: 14, filter: "blur(4px)" },
                visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } },
              }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#FDFBF7] via-[#FDF0EA] to-[#FDFBF7] border border-[#D4AF37]/50 w-full max-w-sm shadow-sm"
            >
              <span className="text-[10px] font-royal tracking-[0.25em] uppercase text-[#8E2818] font-bold block mb-1">
                The Bride
              </span>
              <h3 className="font-script text-3xl sm:text-4xl text-[#8E2818] couple-script-text leading-tight">
                Neslin Priya
              </h3>
            </motion.div>

            {/* Flourish Divider */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              className="flex items-center justify-center gap-2 text-[#D4AF37]"
            >
              <span className="text-sm">❧</span>
              <span className="font-script text-2xl text-[#8E2818] italic">With</span>
              <span className="text-sm">❧</span>
            </motion.div>

            {/* Groom */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.96, y: 14, filter: "blur(4px)" },
                visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65 } },
              }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#FDFBF7] via-[#FDF0EA] to-[#FDFBF7] border border-[#D4AF37]/50 w-full max-w-sm shadow-sm"
            >
              <span className="text-[10px] font-royal tracking-[0.25em] uppercase text-[#8E2818] font-bold block mb-1">
                The Groom
              </span>
              <h3 className="font-script text-3xl sm:text-4xl text-[#8E2818] couple-script-text leading-tight">
                Gaywin Cristan
              </h3>
              <p className="font-editorial italic font-medium text-xs sm:text-sm text-[#2C1A12] mt-1">
                (S/o Clement Lasrado and Felcy Rodrigues)
              </p>
            </motion.div>
          </div>
        </motion.div>

        <FloralDivider className="mt-6" />
      </motion.div>
    </section>
  );
}
