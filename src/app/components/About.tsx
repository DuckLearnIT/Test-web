import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const PORTRAIT = "./src/app/components/ui/Gemini_Generated_Image_xwem10xwem10xwem.png";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 2000;
    const stepTime = 30;
    const steps = dur / stepTime;
    const inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const tools = [
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", invert: false },
  { name: "Adobe Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", invert: false },
  { name: "Adobe Illustrator", logo: "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg", invert: false },
  { name: "Adobe After Effects", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", invert: false },
  { name: "Adobe Premiere Pro", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", invert: false },
  { name: "Canva", logo: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg", invert: false },
];

export function About() {
  return (
    <section id="about" className="py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 bg-[#a78bfa]" />

      <div className="max-w-7xl mx-auto px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">About</span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Portrait column */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                <ImageWithFallback src={PORTRAIT} alt="Ava Chen" className="w-full h-full object-cover" />
              </div>
              {/* Decorative frame offset */}
              <div className="absolute -inset-3 rounded-3xl border border-[#a78bfa]/20 -z-10" />
              {/* Floating badge */}
              <motion.div
                className="absolute -right-4 bottom-12 bg-[#a78bfa] text-[#0a0a0f] px-5 py-3 rounded-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-[1.6rem]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <Counter target={7} suffix="+" />
                </p>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase">Months Exp</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-[2.5rem] md:text-[3.5rem] text-white leading-[1.1] mb-8 tracking-[-0.02em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              I turn <span className="italic text-[#a78bfa]">complexity</span>
              <br />into clarity.
            </h2>
            <div className="space-y-5 text-white/50 text-[0.95rem] leading-relaxed mb-12">
              <p>
                Hi, my name is Nguyen Minh Duc. I’m a designer who believes good design feels invisible. My journey started with visual design—logos, layouts, and colors—but quickly evolved into something deeper: understanding users. Today, I design with intention, balancing creativity with usability to craft experiences that people don’t have to think twice about. Because the best design isn’t just seen—it’s felt.

              </p>
              <p>
                I am passionate about improving user experiences through research, iteration, and thoughtful design decisions, and I am always eager to learn and grow in a collaborative environment.
              </p>
            </div>

            {/* Stats bento grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { val: 1, suffix: "+", label: "Projects" },
                { val: 2, suffix: "+", label: "project collaborator" },
                // { val: 12, suffix: "", label: "Awards" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-[#a78bfa]/30 transition-colors"
                >
                  <p className="text-[2rem] text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-[0.7rem] text-white/40 tracking-[0.15em] uppercase mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Tools marquee */}
            <div className="mb-12">
              <p className="text-[0.7rem] text-white/30 tracking-[0.2em] uppercase mb-4">Tools I Love</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t, i) => (
                  <motion.span
                    key={t.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/50 text-[0.78rem] hover:border-[#a78bfa]/40 hover:text-[#a78bfa] transition-all cursor-default"
                  >
                    <img
                      src={t.logo}
                      alt={t.name}
                      className={`w-4 h-4 object-contain ${t.invert ? "invert opacity-50" : ""}`}
                    />
                    {t.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-[0.7rem] text-white/30 tracking-[0.2em] uppercase mb-4">Education</p>
              <div>
                <p className="text-white/80 text-[1rem] flex items-baseline gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                  Multimedia Communication Student at PTIT
                  <span className="text-white/50 text-[0.78rem]">2024 - 2027</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
