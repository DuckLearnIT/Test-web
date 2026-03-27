import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-white/60 text-[1.1rem]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Nguyen Duc<span className="text-[#a78bfa]">.</span>
        </p>
        <p className="text-[0.75rem] text-white/20">
          &copy; 2026 Nguyen Minh Duc. Crafted with care.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor-hover
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
