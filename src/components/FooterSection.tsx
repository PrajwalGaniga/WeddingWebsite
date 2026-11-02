"use client";

import React from "react";
import { Phone, MessageCircle, ArrowUp, Heart } from "lucide-react";
import { FloralDivider, CornerOrnament } from "./FloralFlourish";
import { WEDDING_CONFIG } from "@/config/wedding";
import { WeddingConfig } from "@/config/types";

interface FooterSectionProps {
  config?: WeddingConfig;
}

export function FooterSection({ config }: FooterSectionProps = {}) {
  const activeConfig = config || WEDDING_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contacts = activeConfig.contacts.map((c) => ({
    name: c.label,
    phone: c.phone,
    cleanPhone: c.clean,
  }));

  return (
    <footer className="relative pt-6 pb-24 px-4 text-center">
      {/* Decorative Closing Card */}
      <div className="relative rounded-3xl bg-[#FAF5EE] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl overflow-hidden mb-8">
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Closing Blessings Note */}
        <p className="font-editorial italic text-xl sm:text-2xl text-[#382A24] leading-relaxed mb-3">
          “Your presence and blessings
          <br />
          will be our treasured gift”
        </p>

        {/* Best Wishes Note from Physical Card */}
        <div className="mt-4 pt-4 border-t border-[#D4AF37]/30">
          <span className="text-[10px] font-royal uppercase tracking-[0.25em] text-[#A85338] font-semibold block mb-1">
            With Love & Affection
          </span>
          <p className="font-script text-2xl text-[#C06C4E]">
            Best wishes from {activeConfig.bestWishesFrom}
          </p>
        </div>

        <FloralDivider className="mt-4 mb-6" />

        {/* Contact Numbers for Coordination */}
        <div className="space-y-4">
          <span className="text-[11px] font-royal uppercase tracking-[0.25em] text-[#382A24] font-bold block">
            For Enquiries & Assistance
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
            {contacts.map((contact) => (
              <div
                key={contact.phone}
                className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/40 flex flex-col items-center gap-2 shadow-xs"
              >
                <span className="text-[10px] font-royal tracking-wider uppercase text-[#A85338]">
                  {contact.name}
                </span>
                <span className="font-sans font-semibold text-sm text-[#382A24]">
                  {contact.phone}
                </span>

                <div className="flex items-center gap-2 mt-1 w-full justify-center">
                  {/* Call Button */}
                  <a
                    href={`tel:${contact.cleanPhone}`}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#C06C4E] hover:bg-[#A85338] text-[#FAF5EE] text-xs font-royal font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${contact.cleanPhone.replace("+", "")}?text=Hello%20Congratulations%20Neslin%20and%20Gaywin!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-royal font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Couple Hashtag & Monogram */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF5EE]/90 border border-[#D4AF37]/50 shadow-md">
          <Heart className="w-3.5 h-3.5 fill-[#C06C4E] text-[#C06C4E]" />
          <span className="font-royal text-xs font-bold tracking-[0.25em] text-[#C06C4E] uppercase">
            #NeslinWedsGaywin
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#C06C4E] text-[#C06C4E]" />
        </div>

        <p className="text-[11px] font-royal tracking-widest uppercase text-[#F7D6C8]/90">
          Mangalore • December 2026
        </p>

        {/* Back to Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-royal tracking-widest uppercase text-[#FAF5EE]/80 hover:text-[#FAF5EE] p-2 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
