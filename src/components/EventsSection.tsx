"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Navigation,
  CalendarPlus,
  Church,
  Wine,
  Copy,
  Check,
} from "lucide-react";
import { FloralDivider } from "./FloralFlourish";

interface EventItem {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  googleMapsUrl: string;
  calendarUrl: string;
  frameImage: string;
  icon: React.ReactNode;
}

// Letter-by-letter / word reveal for smooth titles
function StaggerTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h3
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.04, delayChildren: 0.1 },
        },
      }}
      className={className}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              variants={{
                hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.45, ease: "easeOut" as const },
                },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.h3>
  );
}

const innerCardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const childFadeVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function EventsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const events: EventItem[] = [
    {
      id: "roce",
      title: "Roce Ceremony",
      day: "Saturday",
      date: "December 19, 2026",
      time: "6:30 P.M.",
      venue: "St. Thomas Church Hall, Nirkan",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=St.+Thomas+Church+Hall+Nirkan",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roce+Ceremony+-+Neslin+%26+Gaywin&dates=20261219T130000Z/20261219T170000Z&details=Roce+Ceremony+at+St.+Thomas+Church+Hall,+Nirkan&location=St.+Thomas+Church+Hall,+Nirkan",
      frameImage: "/assets/floral_frame_roce.jpg",
      icon: <Church className="w-5 h-5 text-[#9A3412]" />,
    },
    {
      id: "nuptials",
      title: "Nuptial Mass",
      day: "Monday",
      date: "December 21, 2026",
      time: "3:30 P.M.",
      venue: "Holy Spirit Church, Bajal, Mangalore",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+Bajal+Mangalore",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nuptial+Mass+-+Neslin+%26+Gaywin&dates=20261221T100000Z/20261221T123000Z&details=Nuptial+Mass+at+Holy+Spirit+Church,+Bajal,+Mangalore&location=Holy+Spirit+Church,+Bajal,+Mangalore",
      frameImage: "/assets/floral_frame_church.jpg",
      icon: <Church className="w-5 h-5 text-[#8E2818]" />,
    },
    {
      id: "reception",
      title: "Wedding Reception",
      day: "Monday",
      date: "December 21, 2026",
      time: "6:30 P.M.",
      venue: "St. Sebastian Centenary Auditorium, Bendoor, Mangalore",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=St.+Sebastian+Centenary+Auditorium+Bendoor+Mangalore",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+-+Neslin+%26+Gaywin&dates=20261221T130000Z/20261221T170000Z&details=Wedding+Reception+at+St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore&location=St.+Sebastian+Centenary+Auditorium,+Bendoor,+Mangalore",
      frameImage: "/assets/floral_frame_reception.jpg",
      icon: <Wine className="w-5 h-5 text-[#7A1E12]" />,
    },
  ];

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="relative my-12 px-2 sm:px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-royal uppercase tracking-[0.3em] text-[#8E2818] font-bold">
          Program & Venues
        </span>
        <h2 className="text-3xl sm:text-4xl font-royal font-semibold text-[#2C1A12] mt-1">
          Wedding Itinerary
        </h2>
        <FloralDivider className="mt-4" />
      </div>

      {/* Cards List with Centered Layout and Polite Glassmorphic Inner Frame */}
      <div className="space-y-8 max-w-[420px] mx-auto">
        {events.map((event, index) => {
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
              className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[#D4AF37]/50 bg-[#FAF5EE]"
            >
              {/* Unique Floral Border Background for this Event */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                  src={event.frameImage}
                  alt={event.title}
                  fill
                  className="object-fill"
                  sizes="(max-width: 480px) 100vw, 420px"
                />
              </div>

              {/* Inner Polite Glassmorphic Card Container */}
              <div className="relative z-10 py-9 px-3.5 sm:px-5 flex flex-col items-center justify-center">
                <motion.div
                  variants={innerCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="w-full max-w-[330px] sm:max-w-[345px] rounded-2xl bg-[#FAF5EE]/70 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_12px_40px_rgba(44,26,18,0.12),inset_0_1px_2px_rgba(255,255,255,0.8)] p-5 sm:p-6 flex flex-col items-center text-center transition-all"
                >
                  {/* Top Emblem Icon */}
                  <motion.div
                    variants={childFadeVariants}
                    className="w-10 h-10 rounded-full bg-[#FAF5EE]/80 backdrop-blur-sm border border-[#D4AF37]/60 flex items-center justify-center shadow-xs mb-2.5"
                  >
                    {event.icon}
                  </motion.div>

                  {/* Centered Staggered Event Title */}
                  <StaggerTitle
                    text={event.title}
                    className="text-xl sm:text-2xl font-royal font-bold text-[#8E2818] tracking-wider uppercase text-center leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                  />

                  {/* Delicate Gold Flourish */}
                  <motion.div
                    variants={childFadeVariants}
                    className="flex items-center justify-center gap-2 my-2.5 text-[#D4AF37]"
                  >
                    <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
                    <span className="text-[10px]">✦</span>
                    <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
                  </motion.div>

                  {/* Date & Time */}
                  <motion.div
                    variants={childFadeVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-sans font-semibold text-[#2C1A12] mt-1"
                  >
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8E2818] shrink-0" />
                      <span>{event.day}, {event.date}</span>
                    </div>
                    <span className="text-[#D4AF37] hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#8E2818]">
                      <Clock className="w-3.5 h-3.5 text-[#8E2818] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </motion.div>

                  {/* Venue */}
                  <motion.div variants={childFadeVariants} className="mt-3.5 text-center w-full">
                    <div className="flex items-center justify-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#8E2818] shrink-0" />
                      <span className="font-royal font-bold text-sm sm:text-base text-[#2C1A12]">
                        {event.venue}
                      </span>
                    </div>

                    {/* Copy address button */}
                    <button
                      onClick={() => handleCopyAddress(event.id, event.venue)}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF5EE]/80 hover:bg-[#FAF5EE] backdrop-blur-sm border border-[#D4AF37]/50 text-[11px] font-sans font-medium text-[#8E2818] hover:text-[#731D0F] transition-all cursor-pointer shadow-2xs"
                      title="Copy venue address"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </motion.div>

                  {/* Action Buttons: Google Maps & Add to Calendar */}
                  <motion.div
                    variants={childFadeVariants}
                    className="mt-5 w-full flex items-center justify-center gap-2.5"
                  >
                    {/* Google Maps Button */}
                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#8E2818] hover:bg-[#731D0F] text-[#FAF5EE] text-xs font-royal font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Navigation className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">Google Maps</span>
                    </a>

                    {/* Add to Calendar Button */}
                    <a
                      href={event.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF5EE]/85 hover:bg-[#FAF5EE] backdrop-blur-sm text-[#2C1A12] border border-[#D4AF37]/75 text-xs font-royal font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-[#8E2818] shrink-0" />
                      <span className="whitespace-nowrap">Calendar</span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
