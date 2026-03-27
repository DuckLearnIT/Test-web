import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "TOEIC: 795 Certificate",
    issuer: "ETS",
    date: "Valid until 03/08/2026",
    color: "#38bdf8",
    logo: null,
    link: "#",
  },
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google / Coursera",
    date: "2025",
    color: "#34d399",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    link: "https://www.coursera.org/account/accomplishments/verify/T5EPULE8ZXUU",
  },
  {
    title: "Start the UX Design Process: Empathize, Define, and Ideate",
    issuer: "Google / Coursera",
    date: "2025",
    color: "#fb7185",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    link: "https://www.coursera.org/account/accomplishments/verify/MMID7KYNIVGX",
  },
  {
    title: "Build Wireframes and Low-Fidelity Prototypes",
    issuer: "Google / Coursera",
    date: "2025",
    color: "#a78bfa",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    link: "https://www.coursera.org/account/accomplishments/verify/MGC4IM0YBJE5",
  },
  {
    title: "Conduct UX Research and Test Early Concepts",
    issuer: "Google / Coursera",
    date: "2025",
    color: "#fb923c",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    link: "https://www.coursera.org/account/accomplishments/verify/HDVHHAPE08MQ",
  },
];

export function Certificates() {
  return (
    <section id="testimonials" className="py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.04] bg-[#a78bfa]" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">Certificates</span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.5rem] md:text-[4rem] text-white text-center mb-4 tracking-[-0.02em]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Certifications & <span className="italic text-[#a78bfa]">Credentials</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-[0.85rem] mb-16 max-w-lg mx-auto"
        >
          Continuous learning is at the core of my practice. Here are the credentials that back my expertise.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              data-cursor-hover
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden block"
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ backgroundColor: cert.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
                  style={{ backgroundColor: `${cert.color}15` }}
                >
                  {cert.logo ? (
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <Award size={20} style={{ color: cert.color }} />
                  )}
                </div>
                <ExternalLink
                  size={14}
                  className="text-white/10 group-hover:text-white/30 transition-colors mt-1"
                />
              </div>

              <h3 className="text-white text-[0.9rem] mb-2 leading-snug font-medium">{cert.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-white/35 text-[0.78rem]">{cert.issuer}</p>
                <span
                  className="text-[0.7rem] px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${cert.color}15`, color: cert.color }}
                >
                  {cert.date}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
