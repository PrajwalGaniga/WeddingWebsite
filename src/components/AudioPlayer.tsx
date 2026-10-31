"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
  visible?: boolean;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  ({ autoPlayTrigger, visible = true }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const playAudio = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.volume = 0.6;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio play prevented:", err);
      }
    };

    const pauseAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      setIsPlaying(false);
    };

    const toggleAudio = () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    };

    useImperativeHandle(ref, () => ({
      play: playAudio,
      pause: pauseAudio,
      toggle: toggleAudio,
      isPlaying,
    }));

    useEffect(() => {
      if (autoPlayTrigger) {
        playAudio();
      }
    }, [autoPlayTrigger]);

    // Show quick tooltip on first load
    useEffect(() => {
      const timer = setTimeout(() => setShowTooltip(true), 1500);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5500);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }, []);

    return (
      <>
        {/* Hidden HTML5 Audio Element */}
        <audio
          ref={audioRef}
          src="/data/background-audio.mpeg"
          loop
          preload="auto"
          onEnded={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
          }}
        />

        {/* Floating Audio Pill */}
        {visible && (
          <div className="fixed bottom-5 right-4 z-50 flex items-center gap-2">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#382A24]/90 text-[#FAF5EE] text-xs font-sans tracking-wide border border-[#D4AF37]/40 shadow-lg pointer-events-none"
              >
                <Music className="w-3 h-3 text-[#D4AF37]" />
                <span>{isPlaying ? "Music Playing" : "Tap to Play Music"}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleAudio}
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            aria-label="Toggle Background Music"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#C06C4E]/90 hover:bg-[#A85338] backdrop-blur-md text-[#FAF5EE] shadow-xl border border-[#D4AF37]/50 transition-all duration-300 group cursor-pointer"
          >
            {/* Equalizer Wave / Icon */}
            <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
              {isPlaying ? (
                <>
                  <span className="w-[3px] bg-[#FAF5EE] rounded-full animate-eq-1" />
                  <span className="w-[3px] bg-[#D4AF37] rounded-full animate-eq-2" />
                  <span className="w-[3px] bg-[#FAF5EE] rounded-full animate-eq-3" />
                </>
              ) : (
                <VolumeX className="w-4 h-4 text-[#F7D6C8]" />
              )}
            </div>

            <span className="text-xs font-royal tracking-widest uppercase font-semibold text-[#FAF5EE]">
              {isPlaying ? "Sound On" : "Muted"}
            </span>

            {isPlaying && (
              <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity" />
            )}
          </motion.button>
          </div>
        )}
      </>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
