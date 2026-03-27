import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projects } from "../data/projects";


function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative grid lg:grid-cols-2 gap-10 items-center py-16"
    >
      {/* Image */}
      <div className={`relative overflow-hidden rounded-3xl ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="aspect-[16/11] overflow-hidden rounded-3xl">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        {/* Colored overlay on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: project.accent }}
        />
        {/* View project button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Link
            to={`/project/${project.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-[0.8rem] tracking-wider backdrop-blur-md transition-transform hover:scale-105"
            style={{ backgroundColor: `${project.accent}cc` }}
          >
            View Project <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
        <span className="text-[0.7rem] tracking-[0.3em] uppercase" style={{ color: project.accent }}>
          {project.num}
        </span>
        <h3
          className="text-[2rem] md:text-[2.8rem] text-white mt-2 mb-4 leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {project.title}
        </h3>
        <p className="text-[0.75rem] text-white/30 tracking-[0.15em] uppercase mb-4">
          {project.category}
        </p>
        <p className="text-white/50 text-[0.9rem] leading-relaxed max-w-md inline-block">
          {project.description}
        </p>
        <div className="mt-6">
          <Link
            to={`/project/${project.id}`}
            data-cursor-hover
            className="inline-flex items-center gap-2 text-[0.8rem] tracking-wider group/btn"
            style={{ color: project.accent }}
          >
            Read Case Study
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="work" className="py-32 bg-[#0a0a0f] relative" ref={containerRef}>
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">Selected Work</span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.5rem] md:text-[4rem] text-white text-center mb-4 tracking-[-0.02em]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Featured <span className="italic text-[#a78bfa]">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-[0.85rem] mb-16"
        >
          A curated selection of recent work across product, mobile, and brand design.
        </motion.p>

        {/* Projects */}
        <div className="relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
            <motion.div className="w-full bg-[#a78bfa]/40 origin-top" style={{ height: lineHeight }} />
          </div>
          
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
