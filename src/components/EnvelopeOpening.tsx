"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimate, useReducedMotion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

// ── Canvas petal burst ─────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  spin: number;
  spinV: number;
  color: string;
}

const BURST_COLORS = [
  "#C06C4E", "#D4AF37", "#E5C378", "#F7D6C8",
  "#8E2818", "#FAF5EE", "#A85338", "#FFF0B8",
];

function fireCanvasBurst(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const particles: Particle[] = Array.from({ length: 42 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.5 + Math.random() * 6;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      r: 4 + Math.random() * 7,
      alpha: 1,
      spin: Math.random() * Math.PI * 2,
      spinV: (Math.random() - 0.5) * 0.18,
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
    };
  });

  let raf: number;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.vx *= 0.98;
      p.alpha -= 0.018;
      p.spin += p.spinV;
      if (p.alpha <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }
    if (alive) {
      raf = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}

// ── SVG Rose Petal ─────────────────────────────────────────────────────────
function RosePetal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 2C6 5 2 12 3 19C4 26 12 29 17 27C22 25 24 18 21 11C18 4 15 2 12 2Z"
        fill="url(#rose-grad)"
      />
      <defs>
        <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C06C4E" />
          <stop offset="55%"  stopColor="#A83C22" />
          <stop offset="100%" stopColor="#7A2210" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Royal Wax Seal Monogram Emblem ─────────────────────────────────────────
function WaxSealEmblem() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#5E430B] drop-shadow-xs">
      <path
        d="M12 2L13.5 7H10.5L12 2ZM6 9C8 8 10 9 12 11C14 9 16 8 18 9C19 12 17 15 12 17C7 15 5 12 6 9ZM12 17V22M9 22H15"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Main EnvelopeOpening Component ─────────────────────────────────────────
export function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "animating" | "done">("idle");
  const [sealCracking, setSealCracking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstCleanup = useRef<(() => void) | undefined>(undefined);

  // Framer animation scopes
  const [flapScope, animateFlap] = useAnimate();
  const [sealScope, animateSeal] = useAnimate();
  const [cardScope, animateCard] = useAnimate();
  const [envelopeBodyScope, animateEnvelopeBody] = useAnimate();
  const [leftScope, animateLeft] = useAnimate();
  const [rightScope, animateRight] = useAnimate();
  const [overlayScope, animateOverlay] = useAnimate();

  // ── Check sessionStorage on mount ────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const forceIntro = params.get("intro") === "1" || params.get("replay") === "1";
      if (!forceIntro && sessionStorage.getItem("intro_seen") === "true") {
        setIsOpen(true);
        onOpen();
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup burst
  useEffect(() => {
    return () => { burstCleanup.current?.(); };
  }, []);

  // ── Skip intro ───────────────────────────────────────────────────────────
  const skipIntro = useCallback(() => {
    if (typeof window !== "undefined") sessionStorage.setItem("intro_seen", "true");
    burstCleanup.current?.();
    onOpen();
    setIsOpen(true);
  }, [onOpen]);

  // ── Main 7-Act Cinematic Sequence ────────────────────────────────────────
  const handleTap = useCallback(async () => {
    if (phase !== "idle") return;
    setPhase("animating");

    // Persist seen state & trigger audio gesture unlock immediately
    if (typeof window !== "undefined") sessionStorage.setItem("intro_seen", "true");
    onOpen();

    // Reduced motion shortcut
    if (shouldReduceMotion) {
      await animateOverlay(overlayScope.current, { opacity: 0 }, { duration: 0.35 });
      setIsOpen(true);
      return;
    }

    // ── Act 2: Seal crack & disintegrate (0 → 0.4s) ───────────────────────
    setSealCracking(true);
    await animateSeal(
      sealScope.current,
      { scale: [1, 1.25, 0], rotate: [0, -18, 24], opacity: [1, 1, 0] },
      { duration: 0.42, ease: "easeInOut" as const }
    );

    // ── Act 3: Envelope Flap folds open 180° upward (0.4 → 1.2s) ─────────
    await animateFlap(
      flapScope.current,
      { rotateX: 180 },
      { duration: 0.82, ease: [0.45, 0, 0.55, 1] as const }
    );

    // ── Act 4: Card slides smoothly out of pocket; Envelope sinks below ───
    await Promise.all([
      animateCard(
        cardScope.current,
        { y: "-82%", opacity: 1, zIndex: 35 },
        { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const }
      ),
      animateEnvelopeBody(
        envelopeBodyScope.current,
        { y: 35, opacity: 0.3 },
        { duration: 0.95, ease: "easeOut" as const }
      ),
    ]);

    // Cinematic breath
    await new Promise<void>((r) => setTimeout(r, 120));

    // ── Act 5a: Camera pull-back (depth anticipation) ─────────────────────
    await animateCard(
      cardScope.current,
      { scale: 0.86, rotateX: 6 },
      { duration: 0.45, ease: "easeOut" as const }
    );

    // ── Act 6: Canvas gold & rose petal burst explodes ────────────────────
    if (canvasRef.current) {
      burstCleanup.current = fireCanvasBurst(canvasRef.current) ?? undefined;
    }

    // ── Act 5b: Camera push-forward zoom (fills the screen) ───────────────
    await animateCard(
      cardScope.current,
      { scale: 1.15, rotateX: 0 },
      { duration: 0.85, ease: [0.87, 0, 0.13, 1] as const }
    );

    // ── Act 7: Card unfolds like a book (panels swing open) ───────────────
    const bookDuration = { duration: 0.72, ease: [0.87, 0, 0.13, 1] as const };
    await Promise.all([
      animateLeft(leftScope.current, { rotateY: -92 }, bookDuration),
      animateRight(rightScope.current, { rotateY: 92 }, bookDuration),
    ]);

    await new Promise<void>((r) => setTimeout(r, 160));

    // ── Act 8: Smooth cross-fade to full invitation site ───────────────────
    await animateOverlay(
      overlayScope.current,
      { opacity: 0 },
      { duration: 0.65, ease: "easeInOut" as const }
    );

    setIsOpen(true);
    setPhase("done");
  }, [
    phase,
    shouldReduceMotion,
    onOpen,
    animateFlap, flapScope,
    animateSeal, sealScope,
    animateCard, cardScope,
    animateEnvelopeBody, envelopeBodyScope,
    animateLeft, leftScope,
    animateRight, rightScope,
    animateOverlay, overlayScope,
  ]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          ref={overlayScope}
          key="cinematic-envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[60] overflow-hidden select-none touch-manipulation"
          style={{ perspective: "1200px" }}
        >
          {/* ── 1. Fullscreen Canvas for petal burst ──────────────────────── */}
          <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[65]"
            style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          />

          {/* ── 2. Fullscreen Background Wallpaper & Vignette ─────────────── */}
          <div className="absolute inset-0 bg-[#F8F2E8] pointer-events-none">
            <Image
              src="/assets/envelope_wallpaper.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center opacity-85"
              sizes="100vw"
            />
            {/* Ambient golden warm inner glow */}
            <div className="absolute inset-0 bg-radial from-[#FDF5EC]/30 via-transparent to-transparent" />
            {/* Cinematic subtle vignette */}
            <div className="absolute inset-0 intro-vignette" />
          </div>

          {/* ── 3. 8 Drifting Rose Petals ─────────────────────────────────── */}
          {[
            { left: "8%",  size: "w-3 h-4",     anim: "animate-petal-1" },
            { left: "22%", size: "w-2.5 h-3.5", anim: "animate-petal-2" },
            { left: "38%", size: "w-3 h-4",     anim: "animate-petal-5" },
            { left: "52%", size: "w-2 h-3",     anim: "animate-petal-6" },
            { left: "66%", size: "w-3.5 h-4.5", anim: "animate-petal-3" },
            { left: "76%", size: "w-2.5 h-3",   anim: "animate-petal-7" },
            { left: "85%", size: "w-3 h-4",     anim: "animate-petal-4" },
            { left: "93%", size: "w-2 h-3.5",   anim: "animate-petal-8" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute -top-8 ${p.size} ${p.anim} pointer-events-none z-20`}
              style={{ left: p.left }}
            >
              <RosePetal className="w-full h-full drop-shadow-sm" />
            </div>
          ))}

          {/* ── 4. Skip Button (Fixed top right, always accessible) ───────── */}
          <button
            onClick={skipIntro}
            type="button"
            className="fixed top-4 right-4 z-[70] px-3.5 py-1.5 rounded-full bg-[#382A24]/65 backdrop-blur-md border border-[#D4AF37]/50 text-[11px] font-royal tracking-[0.22em] uppercase text-[#FAF5EE]/90 hover:text-[#FAF5EE] hover:bg-[#382A24]/90 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            Skip ✕
          </button>

          {/* ── 5. Perfectly Centered Stage Container ─────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-8 z-10 pointer-events-none">
            <div className="w-full max-w-[360px] sm:max-w-[400px] flex flex-col items-center pointer-events-auto">

              {/* "You Are Cordially Invited" Header */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: phase === "idle" ? 1 : 0, y: phase === "idle" ? 0 : -12 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 sm:mb-5 flex flex-col items-center text-center select-none pointer-events-none"
              >
                <p className="text-[10px] font-royal font-bold tracking-[0.35em] text-[#A85338] uppercase mb-1">
                  ✦ You Are Cordially Invited ✦
                </p>
                <motion.h2
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-base sm:text-lg font-royal font-semibold tracking-[0.28em] text-[#5C1A0F] uppercase"
                >
                  Tap to Open
                </motion.h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="h-[1px] w-10 bg-[#A85338]/40" />
                  <span className="text-[#D4AF37] text-[10px]">✦</span>
                  <span className="h-[1px] w-10 bg-[#A85338]/40" />
                </div>
              </motion.div>

              {/* ── 3D Interactive Envelope Box ──────────────────────────── */}
              <div
                className="relative w-full h-[225px] sm:h-[245px] cursor-pointer"
                style={{ perspective: "1200px" }}
                onClick={handleTap}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTap(); }}
                aria-label="Open wedding invitation envelope"
              >
                {/* Envelope Wrapper with Gentle Idle Hover Float */}
                <motion.div
                  ref={envelopeBodyScope}
                  animate={phase === "idle" ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Layer 1: Envelope Back Base & Elegant Ivory Lining */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_22px_55px_-10px_rgba(25,8,4,0.65)] border border-[#D4AF37]/50 z-0">
                    {/* Deep Terracotta Base Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8E2818] via-[#751E11] to-[#541208]" />

                    {/* Inner Ivory Lining with Gold Border */}
                    <div className="absolute inset-2 rounded-xl bg-[#FAF5EE] border border-[#D4AF37]/40 flex flex-col items-center justify-center p-4 text-center gap-1">
                      <p className="text-[9px] font-royal uppercase tracking-[0.3em] text-[#8E2818] font-bold">
                        The Wedding Of
                      </p>
                      <p className="text-2xl sm:text-3xl font-script text-[#8E2818] leading-tight">
                        {WEDDING_CONFIG.bride} &amp; {WEDDING_CONFIG.groom}
                      </p>
                      <div className="h-[1px] w-12 bg-[#D4AF37]/55 my-1" />
                      <p className="text-[10px] font-editorial italic text-[#382A24]">
                        {WEDDING_CONFIG.dateShort} • {WEDDING_CONFIG.location.split(",")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Layer 2: The Invitation Card (Hidden inside, slides UP on tap) */}
                  <motion.div
                    ref={cardScope}
                    initial={{ y: 0, opacity: 0.2, scale: 1, rotateX: 0 }}
                    className="absolute inset-x-3 top-2 h-[92%] z-10 rounded-xl overflow-hidden border border-[#D4AF37]/80 shadow-2xl bg-[#FAF5EE]"
                    style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                  >
                    {/* Card face with Ornate Floral Frame */}
                    <div className="relative w-full h-full bg-[#FAF5EE]">
                      <Image
                        src="/assets/floral_frame_hero.jpg"
                        alt="Wedding invitation card"
                        fill
                        className="object-fill"
                        sizes="400px"
                      />

                      {/* Inside face of the card (revealed when panels unfold) */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0">
                        <p className="text-[9px] font-royal uppercase tracking-[0.3em] text-[#7A1E11] font-bold">
                          The Wedding Of
                        </p>
                        <h3
                          className="text-3xl sm:text-4xl font-script font-bold text-[#5C0F05] couple-script-text my-1 leading-tight select-none"
                          style={{
                            textShadow: "0 1px 1px rgba(212, 175, 55, 0.6), 0 2px 6px rgba(92, 15, 5, 0.3)",
                            WebkitTextStroke: "0.4px #4A0802",
                          }}
                        >
                          {WEDDING_CONFIG.bride} &amp; {WEDDING_CONFIG.groom}
                        </h3>
                        <div className="h-[1px] w-12 bg-[#D4AF37] my-1" />
                        <p className="text-[10px] font-editorial italic text-[#2C1A12]">
                          {WEDDING_CONFIG.date}
                        </p>
                      </div>

                      {/* Book fold panels (open like a book on Act 7) */}
                      <div className="absolute inset-0 flex" style={{ transformStyle: "preserve-3d", perspective: "800px" }}>
                        {/* Left panel */}
                        <motion.div
                          ref={leftScope}
                          initial={{ rotateY: 0 }}
                          className="flex-1 h-full bg-gradient-to-r from-[#FCF8F2] to-[#F7EFE4] border-r border-[#D4AF37]/50 flex flex-col items-center justify-center gap-1.5 px-3 text-center"
                          style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                        >
                          <p className="text-[9px] font-royal uppercase tracking-[0.25em] text-[#7A1E11] font-bold">
                            The Wedding Of
                          </p>
                          <h3
                            className="text-3xl sm:text-4xl md:text-[42px] font-script font-bold text-[#5C0F05] couple-script-text leading-tight my-0.5 select-none"
                            style={{
                              textShadow: "0 1px 1px rgba(212, 175, 55, 0.6), 0 2px 6px rgba(92, 15, 5, 0.3)",
                              WebkitTextStroke: "0.4px #4A0802",
                            }}
                          >
                            {WEDDING_CONFIG.bride}
                          </h3>
                          <div className="flex items-center gap-1.5 my-0.5">
                            <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
                            <span className="font-script text-base text-[#7A1E11] italic">&amp;</span>
                            <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
                          </div>
                        </motion.div>

                        {/* Right panel */}
                        <motion.div
                          ref={rightScope}
                          initial={{ rotateY: 0 }}
                          className="flex-1 h-full bg-gradient-to-l from-[#FCF8F2] to-[#F7EFE4] flex flex-col items-center justify-center gap-1.5 px-3 text-center"
                          style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
                        >
                          <h3
                            className="text-3xl sm:text-4xl md:text-[42px] font-script font-bold text-[#5C0F05] couple-script-text leading-tight my-0.5 select-none"
                            style={{
                              textShadow: "0 1px 1px rgba(212, 175, 55, 0.6), 0 2px 6px rgba(92, 15, 5, 0.3)",
                              WebkitTextStroke: "0.4px #4A0802",
                            }}
                          >
                            {WEDDING_CONFIG.groom}
                          </h3>
                          <div className="h-[1px] w-12 bg-[#D4AF37]/70 my-1" />
                          <p className="text-[9px] sm:text-[10px] font-royal font-bold tracking-[0.22em] text-[#2C1A12] uppercase">
                            {WEDDING_CONFIG.dateShort}
                          </p>
                        </motion.div>
                      </div>

                      {/* Central vertical gold foil crease line */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Layer 3: Envelope Front Pocket (Card emerges from inside this pocket) */}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-20">
                    {/* Left Flap */}
                    <div
                      className="absolute inset-0 bg-[#7A1F12] shadow-md"
                      style={{ clipPath: "polygon(0 0, 0 100%, 50% 52%)" }}
                    />
                    {/* Right Flap */}
                    <div
                      className="absolute inset-0 bg-[#6E1A0F] shadow-md"
                      style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 52%)" }}
                    />
                    {/* Bottom Flap */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#521107] to-[#872314] shadow-lg border-t border-[#D4AF37]/30"
                      style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 48%)" }}
                    />
                    {/* Gold filigree seam line along bottom flap edge */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="100" x2="50" y2="48" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.45" />
                      <line x1="100" y1="100" x2="50" y2="48" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.45" />
                    </svg>
                  </div>

                  {/* Layer 4: Envelope Top Flap (Folds upward in 3D on tap) */}
                  <motion.div
                    ref={flapScope}
                    initial={{ rotateX: 0 }}
                    className="absolute inset-x-0 top-0 h-[60%] z-30 pointer-events-none"
                    style={{
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                      perspective: "1200px",
                    }}
                  >
                    {/* Front Face of Flap (pointing down over pocket) */}
                    <div
                      className="absolute inset-0 rounded-t-2xl shadow-xl bg-gradient-to-b from-[#8E2818] via-[#7B2013] to-[#63160B]"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* Gold border lines along the triangular edges */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" />
                        <line x1="100" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.75" />
                      </svg>
                    </div>

                    {/* Back Face of Flap (visible once folded open 180°) */}
                    <div
                      className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#5C1309] to-[#450C05]"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        transform: "rotateX(180deg)",
                        backfaceVisibility: "hidden",
                      }}
                    />
                  </motion.div>

                  {/* Layer 5: Royal Terracotta Wax Seal (Stamped at Flap Tip) */}
                  <motion.div
                    ref={sealScope}
                    className={`absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 ${
                      sealCracking ? "seal-cracking" : ""
                    }`}
                  >
                    <motion.div
                      animate={phase === "idle" ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] rounded-full wax-seal border-2 border-[#E8CB6A] shadow-[0_10px_25px_rgba(35,8,3,0.7)] flex items-center justify-center cursor-pointer active:scale-95"
                    >
                      {/* Concentric gold decorative stamped rings */}
                      <div className="absolute inset-[6px] rounded-full border border-[#FFF0B8]/60" />
                      <div className="absolute inset-[10px] rounded-full border border-dashed border-[#5E430B]/35" />

                      {/* Stamped Emblem & Couple Monogram */}
                      <div className="flex flex-col items-center justify-center">
                        <WaxSealEmblem />
                        <span className="text-[10px] sm:text-[11px] font-royal font-bold tracking-[0.2em] text-[#5E430B] mt-0.5">
                          {WEDDING_CONFIG.monogram}
                        </span>
                      </div>

                      {/* Pulsing Outer Gold Aura (Idle Call-to-Action) */}
                      {phase === "idle" && (
                        <motion.div
                          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/65 pointer-events-none"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Music Callout Indicator below Envelope */}
              {phase === "idle" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 sm:mt-5 text-[11px] font-editorial italic text-[#5C1A0F]/80 tracking-wide flex items-center gap-1.5 select-none"
                >
                  <span className="text-[#A85338]">♫</span> Tap envelope to open with music
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
