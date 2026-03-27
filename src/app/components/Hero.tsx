import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";

function DodgingChar({ char }: { char: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - e.clientX;
    const dy = centerY - e.clientY;

    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const pushForce = 35;

    setOffset({
      x: (dx / dist) * pushForce,
      y: (dy / dist) * pushForce
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <span
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.span
        className="inline-block pointer-events-none transition-colors duration-200"
        style={{ color: (offset.x !== 0 || offset.y !== 0) ? "#a78bfa" : "inherit" }}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.4em] -mb-[0.4em] pt-[0.2em] -mt-[0.2em] pr-[0.2em] -mr-[0.2em]">
      <motion.span
        className="inline-block"
        initial={{ y: "160%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {text.split("").map((char, i) => (
          <DodgingChar key={i} char={char} />
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 40,
        y: ((e.clientY - r.top) / r.height - 0.5) * 40,
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, #6d28d9 50%, transparent 70%)",
        }}
        animate={{ x: mouse.x * 2, y: mouse.y * 2 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
        style={{
          background: "radial-gradient(circle, #f472b6 0%, #ec4899 50%, transparent 70%)",
          right: "20%",
          top: "20%",
        }}
        animate={{ x: -mouse.x * 1.5, y: -mouse.y * 1.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, #0ea5e9 50%, transparent 70%)",
          left: "15%",
          bottom: "25%",
        }}
        animate={{ x: mouse.x * 1.2, y: -mouse.y * 1.8 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Badge cái phần mà có chữ Available for freelance */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10"
        >
          <Sparkles size={14} className="text-[#a78bfa]" />
          <span className="text-[0.75rem] text-white/60 tracking-[0.2em] uppercase">Available for freelance</span>
        </motion.div> */}

        {/* Main heading with staggered reveal */}
        <h1
          className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.95] tracking-[-0.03em] text-white mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <div>
            <AnimatedText text="I design" delay={0.5} />{" "}
            <span className="italic text-[#a78bfa]">
              <AnimatedText text="digital" delay={0.65} />
            </span>
          </div>
          <div>
            <AnimatedText text="experiences that" delay={0.8} />
          </div>
          <div>
            <span className="relative">
              <AnimatedText text="people" delay={0.95} />
              <motion.svg
                viewBox="0 0 200 20"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <motion.path
                  d="M5 15 Q100 0 195 12"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                />
              </motion.svg>
            </span>{" "}
            <AnimatedText text="love." delay={1.1} />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-white/40 max-w-lg mx-auto text-[1rem] leading-relaxed mb-12"
        >
          UX/UI designer crafting intuitive products.
          {/* <br />Based in San Francisco. */}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor-hover
            className="group relative px-8 py-4 bg-[#a78bfa] text-[#0a0a0f] rounded-full text-[0.85rem] tracking-wide overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor-hover
            className="px-8 py-4 border border-white/20 text-white/80 rounded-full text-[0.85rem] tracking-wide hover:border-white/50 hover:text-white transition-all"
          >
            Let's Talk
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[0.65rem] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
