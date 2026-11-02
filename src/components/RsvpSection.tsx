"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, Heart, CheckCircle2, MessageSquareHeart, Users, Sparkles } from "lucide-react";
import { FloralDivider, CornerOrnament } from "./FloralFlourish";

interface WishItem {
  id: string;
  name: string;
  message: string;
  attendance: "attending" | "regrets";
  guests: number;
  date: string;
}

const DEFAULT_WISHES: WishItem[] = [
  {
    id: "wish-1",
    name: "Preetham Manil & Marsiya Preema",
    message: "Dearest Neslin & Gaywin, wishing you both a lifetime brimming with profound love, joyful laughter, and God's abundant graces!",
    attendance: "attending",
    guests: 2,
    date: "A few moments ago",
  },
  {
    id: "wish-2",
    name: "Clement Larrado & Family",
    message: "May Christ bless your sacred union. We are immensely proud and joyfully anticipate celebrating this blessed day together.",
    attendance: "attending",
    guests: 4,
    date: "1 hour ago",
  },
  {
    id: "wish-3",
    name: "Florin D’souza & Family",
    message: "My beloved children, with Mark's blessings shining from heaven, may your home be an altar of peace, faith, and unending happiness.",
    attendance: "attending",
    guests: 3,
    date: "Today",
  },
];

export function RsvpSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "regrets">("attending");
  const [eventsSelected, setEventsSelected] = useState<string[]>(["nuptials", "reception"]);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>(DEFAULT_WISHES);

  // Load saved wishes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("neslin_gaywin_wishes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleEvent = (eventId: string) => {
    if (eventsSelected.includes(eventId)) {
      setEventsSelected(eventsSelected.filter((id) => id !== eventId));
    } else {
      setEventsSelected([...eventsSelected, eventId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    // Trigger Festive Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#C06C4E", "#D4AF37", "#F7D6C8", "#FAF5EE", "#A85338"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.8 },
      });
    }, 250);

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      message: message.trim() || (attendance === "attending" ? "Heartiest congratulations and best wishes for a blessed married life!" : "Warmest wishes to you both on this special occasion!"),
      attendance,
      guests: attendance === "attending" ? guestCount : 0,
      date: "Just now",
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);

    try {
      localStorage.setItem("neslin_gaywin_wishes", JSON.stringify(updatedWishes));
    } catch {
      // Ignore
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp-section" className="relative my-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-royal uppercase tracking-[0.3em] text-[#A85338] font-bold">
          Celebrate With Us
        </span>
        <h2 className="text-3xl sm:text-4xl font-royal font-semibold text-[#382A24] mt-1">
          RSVP & Blessings
        </h2>
        <p className="font-editorial italic text-sm text-[#4A3B32] mt-1">
          Please confirm your attendance and leave your warm wishes for the couple
        </p>
        <FloralDivider className="mt-4" />
      </div>

      {/* Main RSVP Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-[#FAF5EE] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl overflow-hidden"
      >
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted-state"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#F7D6C8] border-2 border-[#C06C4E] flex items-center justify-center mx-auto text-[#C06C4E] shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-royal text-2xl font-bold text-[#A85338]">
                Thank You, {name}!
              </h3>

              <p className="font-editorial italic text-base text-[#382A24] max-w-sm mx-auto">
                {attendance === "attending"
                  ? "Your presence will make our celebration complete. We cannot wait to see you on our wedding day!"
                  : "Thank you for sending your heartfelt blessings to Neslin & Gaywin. You will be dearly missed!"}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-[#FAF5EE] hover:bg-[#FDF0EA] text-[#382A24] border border-[#D4AF37] text-xs font-royal uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Edit My Response
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-1.5">
                  Your Full Name(s) <span className="text-[#C06C4E]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John & Maria D'Souza"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#C06C4E] focus:outline-none text-[#382A24] text-sm font-sans placeholder:text-[#382A24]/40 transition-colors"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#C06C4E] focus:outline-none text-[#382A24] text-sm font-sans placeholder:text-[#382A24]/40 transition-colors"
                />
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-2">
                  Will You Be Attending? <span className="text-[#C06C4E]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance("attending")}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-royal font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      attendance === "attending"
                        ? "bg-[#C06C4E] text-[#FAF5EE] border-[#C06C4E] shadow-md"
                        : "bg-[#FDFBF7] text-[#382A24] border-[#D4AF37]/40 hover:bg-[#FDF0EA]"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${attendance === "attending" ? "fill-[#FAF5EE]" : "text-[#C06C4E]"}`} />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance("regrets")}
                    className={`py-3 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-royal font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      attendance === "regrets"
                        ? "bg-[#382A24] text-[#FAF5EE] border-[#382A24] shadow-md"
                        : "bg-[#FDFBF7] text-[#382A24] border-[#D4AF37]/40 hover:bg-[#FDF0EA]"
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests & Events (If Attending) */}
              {attendance === "attending" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-2 border-t border-[#D4AF37]/30"
                >
                  {/* Guest Count */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C06C4E]" />
                      <span>Number of Attending Guests</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`w-10 h-10 rounded-xl border font-royal font-semibold text-sm transition-all cursor-pointer ${
                            guestCount === num
                              ? "bg-[#C06C4E] text-[#FAF5EE] border-[#C06C4E] shadow-sm scale-105"
                              : "bg-[#FDFBF7] text-[#382A24] border-[#D4AF37]/40 hover:bg-[#FDF0EA]"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Events Checklist */}
                  <div>
                    <label className="block text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-2">
                      Which Events Will You Attend?
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "roce", label: "Roce Ceremony (Dec 19, 6:45 PM)" },
                        { id: "nuptials", label: "Nuptial Mass (Dec 21, 4:30 PM)" },
                        { id: "reception", label: "Wedding Reception (Dec 21, 6:45 PM)" },
                      ].map((item) => {
                        const checked = eventsSelected.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleEvent(item.id)}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/30 cursor-pointer hover:border-[#C06C4E] transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="w-4 h-4 accent-[#C06C4E] rounded cursor-pointer"
                            />
                            <span className="text-xs font-royal font-medium text-[#382A24]">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Congratulatory Blessing Message */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-royal font-semibold tracking-wider uppercase text-[#382A24] mb-1.5">
                  <MessageSquareHeart className="w-3.5 h-3.5 text-[#C06C4E]" />
                  <span>Blessing or Note for the Couple</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a Bible verse, prayer, or warm blessing for Neslin & Gaywin..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/50 focus:border-[#C06C4E] focus:outline-none text-[#382A24] text-sm font-sans placeholder:text-[#382A24]/40 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C06C4E] to-[#A85338] hover:from-[#A85338] hover:to-[#8E3E26] text-[#FAF5EE] text-xs sm:text-sm font-royal font-bold tracking-[0.25em] uppercase shadow-lg border border-[#D4AF37]/50 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending Blessing..." : "Send RSVP & Blessings"}</span>
              </button>
            </form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Live Guestbook Wall */}
      <div className="mt-12">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7D6C8]/50 border border-[#D4AF37]/30 text-xs font-royal font-semibold text-[#A85338] mb-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Guestbook Wall</span>
          </div>
          <h3 className="font-royal text-2xl font-semibold text-[#382A24]">
            Blessings From Loved Ones
          </h3>
        </div>

        <div className="space-y-3.5 max-w-md mx-auto">
          {wishes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/40 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-royal font-bold text-sm text-[#C06C4E]">
                  {item.name}
                </span>
                <span className="text-[10px] font-sans text-[#382A24]/60">
                  {item.date}
                </span>
              </div>
              <p className="font-editorial italic text-sm text-[#382A24] leading-relaxed">
                “{item.message}”
              </p>
              {item.attendance === "attending" && item.guests > 0 && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-royal tracking-wider text-[#A85338]">
                  <Heart className="w-2.5 h-2.5 fill-[#C06C4E] text-[#C06C4E]" />
                  <span>Attending with {item.guests} {item.guests === 1 ? "guest" : "guests"}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
