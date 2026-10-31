"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, ZoomIn } from "lucide-react";
import { FloralDivider } from "./FloralFlourish";

interface PhotoItem {
  src: string;
  caption: string;
  date: string;
  location: string;
}

function FallbackPhoto({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (currentSrc.endsWith(".png")) {
      setCurrentSrc(currentSrc.replace(".png", ".jpeg"));
    } else if (currentSrc.endsWith(".jpeg")) {
      setCurrentSrc(currentSrc.replace(".jpeg", ".jpg"));
    } else if (currentSrc.endsWith(".jpg")) {
      setCurrentSrc(currentSrc.replace(".jpg", ".png"));
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={handleError}
    />
  );
}

export function GallerySection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const photos: PhotoItem[] = [
    {
      src: "/data/couplePhoto1.png",
      caption: "Our hearts knew before our words could speak.",
      date: "The Beginning",
      location: "Mangalore",
    },
    {
      src: "/data/couplePhoto2.png",
      caption: "In your quiet laughter, I found my lifelong home.",
      date: "Hand in Hand",
      location: "Cherished Moments",
    },
    {
      src: "/data/couplePhoto3.jpeg",
      caption: "With faith and boundless love, forever begins now.",
      date: "The Promise",
      location: "December 2026",
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % photos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative my-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-royal uppercase tracking-[0.3em] text-[#A85338] font-bold">
          Moments of Joy
        </span>
        <h2 className="text-3xl sm:text-4xl font-royal font-semibold text-[#382A24] mt-1">
          Our Love Story
        </h2>
        <p className="font-editorial italic text-sm text-[#4A3B32] mt-1">
          Every chapter brought us closer to this sacred day
        </p>
        <FloralDivider className="mt-4" />
      </div>

      {/* Love Story Milestones */}
      <div className="mb-10 space-y-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/35 shadow-sm"
        >
          <div className="flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#C06C4E] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Chapter I • The Spark of Grace</span>
          </div>
          <p className="font-editorial italic text-sm text-[#382A24]/90 leading-relaxed">
            What started as a quiet friendship blossomed into an unbreakable bond guided by mutual faith, endless laughter, and shared family values.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/35 shadow-sm"
        >
          <div className="flex items-center gap-2 text-xs font-royal uppercase tracking-widest text-[#C06C4E] font-bold mb-1">
            <Heart className="w-3.5 h-3.5 text-[#C06C4E] fill-[#C06C4E]" />
            <span>Chapter II • A Lifetime Promise</span>
          </div>
          <p className="font-editorial italic text-sm text-[#382A24]/90 leading-relaxed">
            Standing before God and our loving families, we prepare to unite two souls, promising to love, honor, and cherish one another through every season.
          </p>
        </motion.div>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg sm:max-w-none mx-auto">
        {photos.map((photo, idx) => {
          // Subtle natural polaroid tilt
          const tilts = ["-rotate-1 sm:-rotate-2", "rotate-1 sm:rotate-2", "-rotate-1"];
          const tiltClass = tilts[idx % tilts.length];

          return (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              onClick={() => setSelectedIdx(idx)}
              className={`relative bg-[#FAF5EE] p-3 pb-5 rounded-2xl shadow-xl border border-[#D4AF37]/40 cursor-pointer transform transition-all duration-300 group ${tiltClass}`}
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#382A24]/10 border border-[#D4AF37]/30">
                <FallbackPhoto
                  src={photo.src}
                  alt={photo.caption}
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#382A24]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-[#FAF5EE]/90 text-[#382A24] shadow-lg">
                    <ZoomIn className="w-4 h-4 text-[#C06C4E]" />
                  </div>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-3 text-center px-1">
                <span className="font-script text-lg sm:text-xl text-[#382A24] block leading-snug">
                  {photo.caption}
                </span>
                <span className="text-[10px] font-royal uppercase tracking-widest text-[#A85338] block mt-1">
                  {photo.date} • {photo.location}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-[#1A120E]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#382A24]/80 text-[#FAF5EE] hover:bg-[#C06C4E] border border-[#D4AF37]/50 shadow-lg transition-colors cursor-pointer z-20"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#382A24]/80 text-[#FAF5EE] hover:bg-[#C06C4E] border border-[#D4AF37]/40 shadow-xl transition-all cursor-pointer z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#382A24]/80 text-[#FAF5EE] hover:bg-[#C06C4E] border border-[#D4AF37]/40 shadow-xl transition-all cursor-pointer z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md md:max-w-lg w-full bg-[#FAF5EE] p-4 rounded-3xl border-2 border-[#D4AF37] shadow-2xl flex flex-col items-center"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/5">
                <FallbackPhoto
                  src={photos[selectedIdx].src}
                  alt={photos[selectedIdx].caption}
                  className="object-contain sm:object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>

              <div className="mt-4 text-center">
                <p className="font-script text-2xl text-[#C06C4E]">
                  {photos[selectedIdx].caption}
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-[11px] font-royal uppercase tracking-widest text-[#382A24]">
                    {photos[selectedIdx].date}
                  </span>
                  <span className="text-[#D4AF37]">✦</span>
                  <span className="text-[11px] font-royal uppercase tracking-widest text-[#A85338]">
                    {selectedIdx + 1} of {photos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
