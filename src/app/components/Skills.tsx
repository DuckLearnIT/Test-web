import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PenTool, Users, Layers, Figma, Monitor, Smartphone, Palette, Lightbulb,
} from "lucide-react";

const skills = [
  {
    icon: PenTool,
    title: "UI Design",
    desc: "Pixel-perfect interfaces with meticulous attention to typography, color theory, spacing, and micro-interactions that delight users.",
    color: "#a78bfa",
  },
  {
    icon: Users,
    title: "UX Research",
    desc: "Qualitative & quantitative research, user interviews, usability testing, journey mapping, and data-driven design decisions.",
    color: "#f472b6",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Scalable component libraries, design tokens, Figma variants, comprehensive documentation, and cross-platform consistency.",
    color: "#38bdf8",
  },
  {
    icon: Figma,
    title: "Prototyping",
    desc: "High-fidelity interactive prototypes that communicate ideas clearly to stakeholders and validate concepts before development.",
    color: "#34d399",
  },
  {
    icon: Monitor,
    title: "Responsive Web",
    desc: "Fluid, adaptive layouts that feel native across every screen size, from large desktop monitors to compact mobile devices.",
    color: "#fb923c",
  },
  {
    icon: Smartphone,
    title: "Mobile Design",
    desc: "Native iOS and Android design patterns, gesture-driven interfaces, and mobile-first thinking for intuitive mobile experiences.",
    color: "#a78bfa",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Visual identities that communicate brand values, personality and positioning through cohesive visual language across all touchpoints.",
    color: "#f472b6",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy",
    desc: "Information architecture, user flows, competitive analysis, and strategic product thinking that aligns design with business goals.",
    color: "#38bdf8",
  },
];

export function Skills() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="py-32 bg-[#0e0e14] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">Expertise</span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-cursor-hover
              className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 group cursor-default overflow-hidden"
            >
              {/* Background glow on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.08 }}
                    exit={{ opacity: 0 }}
                    style={{ backgroundColor: s.color }}
                  />
                )}
              </AnimatePresence>

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-500"
                style={{
                  backgroundColor: hovered === i ? s.color : "rgba(255,255,255,0.05)",
                }}
              >
                <s.icon
                  size={20}
                  style={{ color: hovered === i ? "#0a0a0f" : s.color }}
                  className="transition-colors duration-500"
                />
              </div>
              <h3 className="text-white text-[0.95rem] mb-2">{s.title}</h3>
              <p className="text-white/35 text-[0.8rem] leading-relaxed">{s.desc}</p>

              {/* Animated border accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: s.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
