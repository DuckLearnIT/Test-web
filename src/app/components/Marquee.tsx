import { motion } from "motion/react";

const words = [
  "UI DESIGN", "UX RESEARCH", "DESIGN SYSTEMS", "PROTOTYPING",
  "BRAND IDENTITY", "PRODUCT STRATEGY", "MOBILE DESIGN", "INTERACTION DESIGN",
];

export function Marquee() {
  const row = words.map((w, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="text-[3rem] md:text-[5rem] text-transparent tracking-[-0.02em]" style={{
        WebkitTextStroke: "1px rgba(255, 255, 255, 0.88)",
        fontFamily: "'Playfair Display', serif",
      }}>
        {w}
      </span>
      <span className="w-3 h-3 rounded-full bg-[#a78bfa]/30 shrink-0" />
    </span>
  ));

  return (
    <div className="py-16 bg-[#0a0a0f] overflow-hidden border-y border-white/5">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}
