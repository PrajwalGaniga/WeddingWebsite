"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Heart, Download, ExternalLink, Sparkles } from "lucide-react";
import { CornerOrnament } from "./FloralFlourish";

export function CalendarSection() {
  const [downloaded, setDownloaded] = useState(false);

  // December 2026 starts on Tuesday (offset = 2 if week starts on Sunday: Sun=0, Mon=1, Tue=2)
  const daysInMonth = 31;
  const startDayOffset = 2; // Tuesday is 2
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Neslin and Gaywin Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:wedding-neslin-gaywin-20261221@wedding.invitation
SUMMARY:The Wedding of Neslin & Gaywin
DESCRIPTION:Nuptial Mass at Holy Spirit Church, Bajal, Mangalore (3:30 P.M.) followed by Wedding Reception at St. Sebastian Centenary Auditorium, Bendoor, Mangalore (6:30 P.M.).
LOCATION:Holy Spirit Church, Bajal, Mangalore & St. Sebastian Centenary Auditorium, Bendoor, Mangalore
DTSTART:20261221T100000Z
DTEND:20261221T163000Z
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Neslin & Gaywin Wedding Tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Neslin_and_Gaywin_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Neslin+%26+Gaywin&dates=20261221T100000Z/20261221T163000Z&details=Nuptial+Mass+at+Holy+Spirit+Church,+Bajal,+Mangalore+at+3:30+P.M.+followed+by+Wedding+Reception+at+St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore+at+6:30+P.M.&location=Holy+Spirit+Church,+Bajal,+Mangalore`;

  return (
    <section className="relative my-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-[#FAF5EE] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-xl overflow-hidden text-center"
      >
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        <div className="flex items-center justify-center gap-2 mb-1">
          <CalendarIcon className="w-4 h-4 text-[#C06C4E]" />
          <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#A85338] font-bold">
            Save Our Date
          </span>
        </div>

        <h3 className="font-royal text-2xl sm:text-3xl text-[#382A24] font-semibold mb-6">
          December 2026
        </h3>

        {/* Calendar Grid Container */}
        <div className="max-w-[340px] mx-auto bg-[#FDFBF7] rounded-2xl p-4 border border-[#D4AF37]/30 shadow-inner">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {weekDays.map((day) => (
              <span
                key={day}
                className="text-xs font-royal font-semibold text-[#A85338]/80 py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Month Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank offset days */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNumber = i + 1;
              const isWeddingDay = dayNumber === 21;
              const isRoceDay = dayNumber === 19;

              if (isWeddingDay) {
                return (
                  <div
                    key={dayNumber}
                    className="relative flex items-center justify-center p-1"
                  >
                    {/* Glowing Ring Animation */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border-2 border-[#D4AF37] bg-[#C06C4E]/20"
                    />
                    <div className="relative w-8 h-8 rounded-full bg-[#C06C4E] text-[#FAF5EE] flex flex-col items-center justify-center shadow-md z-10">
                      <span className="text-xs font-royal font-bold leading-none">21</span>
                      <Heart className="w-2 h-2 fill-[#FAF5EE] text-[#FAF5EE] mt-0.5" />
                    </div>
                  </div>
                );
              }

              if (isRoceDay) {
                return (
                  <div
                    key={dayNumber}
                    title="Roce Ceremony"
                    className="relative flex items-center justify-center p-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F7D6C8] border border-[#C06C4E] text-[#382A24] flex flex-col items-center justify-center shadow-xs">
                      <span className="text-xs font-royal font-bold leading-none">19</span>
                      <span className="text-[7px] font-royal text-[#A85338] font-bold">ROCE</span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={dayNumber}
                  className="flex items-center justify-center p-1.5 text-xs font-editorial text-[#382A24]/75"
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Tag */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7D6C8]/60 text-[#382A24] text-xs font-royal font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C06C4E]" />
            <span>Monday, December 21 • Wedding Ceremony & Reception</span>
          </div>
          <span className="text-[11px] font-editorial italic text-[#4A3B32]">
            (Roce Ceremony on Saturday, December 19)
          </span>
        </div>

        {/* Action Buttons: Add to Calendar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C06C4E] hover:bg-[#A85338] text-[#FAF5EE] text-xs font-royal font-semibold tracking-wider uppercase shadow-md transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={handleDownloadIcs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF5EE] hover:bg-[#FDF0EA] text-[#382A24] border border-[#D4AF37] text-xs font-royal font-semibold tracking-wider uppercase shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C06C4E]" />
            <span>{downloaded ? "Saved to Calendar!" : "Apple / Outlook (.ics)"}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
