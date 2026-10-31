"use client";

import React, { useRef, useState, useEffect } from "react";
import { AudioPlayer, AudioPlayerHandle } from "@/components/AudioPlayer";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { HeroSection } from "@/components/HeroSection";
import { ScriptureSection } from "@/components/ScriptureSection";
import { InvitationSection } from "@/components/InvitationSection";
import { CountdownSection } from "@/components/CountdownSection";
import { CalendarSection } from "@/components/CalendarSection";
import { EventsSection } from "@/components/EventsSection";
import { DriftingPetals } from "@/components/DriftingPetals";
import { FooterSection } from "@/components/FooterSection";

export default function WeddingInvitationPage() {
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);

  // Read ?guest=Name from URL for personalised greeting
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("guest");
    if (g) setGuestName(decodeURIComponent(g));
  }, []);

  // Lock scroll until envelope is fully opened
  useEffect(() => {
    document.body.style.overflow = isEnvelopeOpen ? "unset" : "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [isEnvelopeOpen]);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    // Audio starts only on user gesture (tap) — safe for all in-app browsers
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-[#241712] text-[#382A24] selection:bg-[#C06C4E] selection:text-[#FAF5EE] overflow-x-hidden">
      {/* Ambient glow pillars for desktop framing */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C06C4E]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Cinematic Envelope Gate ─────────────────────────────────────── */}
      <EnvelopeOpening onOpen={handleEnvelopeOpen} />

      {/* Drifting petals after envelope reveal */}
      {isEnvelopeOpen && <DriftingPetals />}

      {/* Floating audio pill (bottom-right, reveals after envelope opens) */}
      <AudioPlayer ref={audioPlayerRef} visible={isEnvelopeOpen} />

      {/* ── Main Invitation Site ────────────────────────────────────────── */}
      <main className="relative max-w-[480px] md:max-w-[620px] mx-auto min-h-screen bg-[#FAF5EE] parchment-texture shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] md:my-8 md:rounded-[40px] border border-[#D4AF37]/40 overflow-hidden">

        {/* Inner gold border inset */}
        <div className="absolute inset-2 md:inset-3 rounded-[32px] md:rounded-[36px] border border-[#D4AF37]/25 pointer-events-none z-10" />

        {/* 1. Hero — couple names, date, optional Dear [Guest] greeting */}
        <HeroSection guestName={guestName} />

        {/* 2. Scripture — 1 Corinthians 13:13 */}
        <ScriptureSection />

        {/* 3. Formal nuptial invitation & family blessings */}
        <InvitationSection />

        {/* 4. Countdown timer to Dec 21, 2026 */}
        <CountdownSection />

        {/* 5. December 2026 calendar grid */}
        <CalendarSection />

        {/* 6. Event cards — Roce, Nuptial Mass, Wedding Reception */}
        <EventsSection />

        {/* 7. Closing blessings & contact footer */}
        <FooterSection />

      </main>
    </div>
  );
}
