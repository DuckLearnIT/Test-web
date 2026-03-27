import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, ChevronDown } from "lucide-react";
import { projects } from "../data/projects";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ─── Animated counter ─── */
function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}

/* ─── Horizontal scroll gallery ─── */
function ParallaxImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15 }}
      className="relative overflow-hidden rounded-2xl"
    >
      <motion.div style={{ y }} className="w-full h-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Process timeline step ─── */
function ProcessStep({
  phase,
  desc,
  index,
  accent,
  total,
}: {
  phase: string;
  desc: string;
  index: number;
  accent: string;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      {/* Vertical connector line */}
      {index < total - 1 && (
        <motion.div
          className="absolute left-[11px] top-8 w-px bottom-0"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          style={{ backgroundColor: `${accent}30`, transformOrigin: "top" }}
        />
      )}

      {/* Dot */}
      <motion.div
        className="absolute left-0 top-[6px] w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: accent }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, delay: index * 0.15 }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
      </motion.div>

      <span
        className="text-[0.7rem] tracking-[0.25em] uppercase block mb-2"
        style={{ color: accent }}
      >
        {String(index + 1).padStart(2, "0")} — {phase}
      </span>
      <p className="text-white/60 text-[0.9rem] leading-relaxed max-w-md">{desc}</p>
    </motion.div>
  );
}

/* ─── Main component ─── */
export function ProjectDetails() {
  const { id } = useParams();
  const currentIndex = projects.findIndex((p) => p.id === Number(id));
  const project = currentIndex !== -1 ? projects[currentIndex] : null;
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const titleY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(false);
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-32 gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center text-2xl text-white/30"
        >
          ?
        </motion.div>
        <h2 className="text-white text-2xl text-center">Project not found</h2>
        <Link
          to="/"
          className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} /> Return home
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0a0a0f] overflow-hidden"
      >
        {/* ═══ FULL-BLEED HERO ═══ */}
        <div ref={heroRef} className="relative h-[100vh] overflow-hidden">
          {/* Parallax background image */}
          <motion.div
            className="absolute inset-0"
            style={{ y: heroImageY, scale: heroImageScale }}
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/40 to-[#0a0a0f]" />
            {/* Accent color wash */}
            <div
              className="absolute inset-0 mix-blend-multiply opacity-30"
              style={{ backgroundColor: project.accent }}
            />
          </motion.div>

          {/* Back link */}
          <motion.div
            className="absolute top-32 left-8 md:left-16 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[0.75rem] text-white/70 hover:text-white tracking-[0.2em] uppercase transition-colors group backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft
                size={13}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back
            </Link>
          </motion.div>

          {/* Hero content — bottom aligned */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-20"
            style={{ opacity: heroOpacity, y: titleY }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span
                  className="text-[0.65rem] tracking-[0.3em] uppercase mb-5 block"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] text-white leading-[0.95] tracking-[-0.03em] mb-6 max-w-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0

 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-white/50 text-[1rem] md:text-[1.1rem] max-w-xl leading-relaxed"
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <span className="text-[0.6rem] text-white/30 tracking-[0.3em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={14} className="text-white/30" />
            </motion.div>
          </motion.div>
        </div>

        {/* ═══ PROJECT META BAR ═══ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Client", value: project.details.client },
              { label: "Role", value: project.details.role },
              { label: "Timeline", value: project.details.timeline },
              { label: "Year", value: project.details.year },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-[0.6rem] text-white/25 uppercase tracking-[0.25em] mb-2">
                  {item.label}
                </p>
                <p className="text-white/90 text-[0.85rem]">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {project.template !== "editorial" ? (
          <>
            {/* ═══ OVERVIEW ═══ */}
        <section className="max-w-7xl mx-auto px-8 md:px-16 py-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
                style={{ color: project.accent }}
              >
                Overview
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Setting the <br />
                <span className="italic" style={{ color: project.accent }}>
                  context
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              <p className="text-white/60 text-[1rem] md:text-[1.1rem] leading-[1.9]">
                {project.details.overview}
              </p>

              {/* Tools used */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.details.tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="px-3 py-1.5 rounded-full border border-white/8 text-[0.7rem] text-white/40 tracking-wider"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY IMAGE 1 — FULL WIDTH ═══ */}
        <section className="px-4 md:px-8 mb-28">
          <ParallaxImage src={project.details.gallery[0]} alt="Project showcase" index={0} />
        </section>

        {/* ═══ THE CHALLENGE ═══ */}
        <section className="max-w-7xl mx-auto px-8 md:px-16 pb-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
                style={{ color: project.accent }}
              >
                Challenge
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What stood <br />
                <span className="italic" style={{ color: project.accent }}>
                  in the way
                </span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-white/60 text-[1rem] md:text-[1.1rem] leading-[1.9]"
            >
              {project.details.challenge}
            </motion.p>
          </div>
        </section>

        {/* ═══ PROCESS TIMELINE ═══ */}
        <section className="max-w-7xl mx-auto px-8 md:px-16 pb-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
                style={{ color: project.accent }}
              >
                Process
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How we <br />
                <span className="italic" style={{ color: project.accent }}>
                  got there
                </span>
              </h2>
            </motion.div>
            <div>
              {project.details.process.map((step, i) => (
                <ProcessStep
                  key={step.phase}
                  phase={step.phase}
                  desc={step.desc}
                  index={i}
                  accent={project.accent}
                  total={project.details.process.length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ THE SOLUTION ═══ */}
        <section className="max-w-7xl mx-auto px-8 md:px-16 pb-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
                style={{ color: project.accent }}
              >
                Solution
              </span>
              <h2
                className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Designing the <br />
                <span className="italic" style={{ color: project.accent }}>
                  answer
                </span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              <p className="text-white/60 text-[1rem] md:text-[1.1rem] leading-[1.9]">
                {project.details.solution}
              </p>
              {project.details.links && project.details.links.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-4">
                  {project.details.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.85rem] tracking-wider group/url w-fit border border-white/10 px-5 py-3 rounded-full hover:bg-white/5 transition-colors"
                      style={{ color: project.accent }}
                    >
                      {link.label}
                      <ArrowUpRight size={14} className="group-hover/url:translate-x-[2px] group-hover/url:-translate-y-[2px] transition-transform" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY IMAGE 2 — FULL WIDTH ═══ */}
        <section className="px-4 md:px-8 mb-28">
          <ParallaxImage src={project.details.gallery[1]} alt="Project result" index={1} />
        </section>

        {/* ═══ IMPACT — METRICS GRID ═══ */}
        <section className="max-w-7xl mx-auto px-8 md:px-16 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="text-[0.65rem] tracking-[0.3em] uppercase mb-4 block"
              style={{ color: project.accent }}
            >
              Impact
            </span>
            <h2
              className="text-[2rem] md:text-[2.8rem] text-white leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The <span className="italic" style={{ color: project.accent }}>results</span>{" "}
              speak
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
            {project.details.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0f] p-8 md:p-12 text-center group hover:bg-white/[0.02] transition-colors duration-500 relative"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${project.accent}08 0%, transparent 70%)`,
                  }}
                />
                <div className="relative z-10">
                  <span
                    className="text-[2.2rem] md:text-[3rem] font-light tracking-tight block mb-2"
                    style={{ color: project.accent }}
                  >
                    <AnimatedCounter value={m.value} delay={i * 0.12} />
                  </span>
                  <span className="text-white/35 text-[0.7rem] tracking-[0.2em] uppercase">
                    {m.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ TESTIMONIAL ═══ */}
        <section className="max-w-5xl mx-auto px-8 md:px-16 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-10 md:p-16 rounded-3xl border border-white/5 overflow-hidden"
          >
            {/* Glassmorphism background */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundColor: project.accent }}
            />
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20"
              style={{ backgroundColor: project.accent }}
            />

            <div className="relative z-10">
              <Quote
                size={32}
                className="mb-6 opacity-30"
                style={{ color: project.accent }}
              />
              <blockquote
                className="text-[1.15rem] md:text-[1.5rem] text-white/80 leading-[1.6] mb-8 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{project.details.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[0.7rem] text-white font-medium"
                  style={{ backgroundColor: `${project.accent}30` }}
                >
                  {project.details.testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-white/90 text-[0.85rem]">
                    {project.details.testimonial.author}
                  </p>
                  <p className="text-white/30 text-[0.75rem]">
                    {project.details.testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

          </>
        ) : (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 flex flex-col gap-24 md:gap-40">
            {/* Intro paragraph with large drop cap or huge typography */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 
                   className="text-[2.5rem] md:text-[4rem] text-white leading-[1.1] mb-6"
                   style={{ fontFamily: "'Playfair Display', serif" }}
                 >
                   Breaking <span className="italic" style={{ color: project.accent }}>Boundaries</span> <br /> One Game at a Time
                 </h2>
                 <p className="text-white/70 text-[1.1rem] md:text-[1.3rem] leading-[1.8] font-light">
                   {project.details.overview}
                 </p>
                 {/* @ts-expect-error links is dynamically added */}
                 {project.details.links && project.details.links.length > 0 && (
                   <div className="mt-10">
                     <a
                       // @ts-expect-error links is dynamically added
                       href={project.details.links[0].url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-[0.9rem] tracking-wider transition-transform hover:scale-105"
                       style={{ backgroundColor: `${project.accent}cc` }}
                     >
                       Explore Full Publication <ArrowUpRight size={16} />
                     </a>
                   </div>
                 )}
              </div>
              <div className="relative">
                 <div className="aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden">
                    <ParallaxImage src={project.details.gallery[0] || project.image} alt="Editorial 1" index={0} />
                 </div>
              </div>
            </div>

            {/* Masonry or asymmetrical grid */}
            {project.details.gallery.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
               <div className="md:col-span-7 aspect-[16/10] overflow-hidden rounded-3xl">
                  <ParallaxImage src={project.details.gallery[1]} alt="Editorial 2" index={1} />
               </div>
               <div className="md:col-span-5 aspect-[3/4] overflow-hidden rounded-[40px]">
                  <ParallaxImage src={project.details.gallery[2] || project.image} alt="Editorial 3" index={2} />
               </div>
            </div>
            )}

            {/* Big quote section */}
            <div className="relative p-12 md:p-24 rounded-[3rem] text-center overflow-hidden border border-white/10" style={{ backgroundColor: `${project.accent}12` }}>
               <div className="absolute top-0 right-1/4 w-[500px] h-[500px] blur-[120px] rounded-full opacity-30 pointer-events-none" style={{ backgroundColor: project.accent }} />
               <Quote size={48} className="mx-auto mb-8 opacity-40" style={{ color: project.accent }} />
               <p className="relative z-10 text-[1.5rem] md:text-[2.5rem] text-white/90 italic leading-[1.5] max-w-4xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
                 "{project.details.testimonial.quote}"
               </p>
               <div className="relative z-10 mt-8">
                  <span className="text-[0.8rem] uppercase tracking-[0.2em] text-white/50 block">{project.details.testimonial.author}</span>
               </div>
            </div>
          </section>
        )}

        {/* ═══ NEXT PROJECT ═══ */}
        {nextProject && (
          <Link
            to={`/project/${nextProject.id}`}
            className="block group"
            data-cursor-hover
          >
            <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
              {/* Background image with hover animation */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={nextProject.image}
                  alt={nextProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-[#0a0a0f]/80 group-hover:bg-[#0a0a0f]/60 transition-colors duration-700" />
              </div>

              <div className="relative z-10 text-center px-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[0.65rem] text-white/30 tracking-[0.3em] uppercase mb-6"
                >
                  Next Project
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-white tracking-[-0.02em] leading-[1] mb-6 group-hover:tracking-[0.01em] transition-all duration-700"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {nextProject.title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 text-[0.8rem] tracking-wider group-hover:gap-3 transition-all duration-300"
                  style={{ color: nextProject.accent }}
                >
                  View Case Study
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.div>
              </div>
            </section>
          </Link>
        )}
      </motion.article>
    </AnimatePresence>
  );
}
