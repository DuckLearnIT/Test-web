import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Work", "About", "Skills", "Certificates", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          data-cursor-hover
          className="text-white text-[1.3rem] tracking-[-0.02em]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Duc's Portfolio<span className="text-[#a78bfa]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l, i) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              data-cursor-hover
              className="relative px-4 py-2 text-[0.78rem] text-white/60 hover:text-white transition-colors tracking-[0.15em] uppercase group"
            >
              <span className="relative z-10">{l}</span>
              <span className="absolute bottom-1 left-4 right-4 h-px bg-[#a78bfa] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-cursor-hover
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-5">
              {navLinks.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="text-left text-[0.9rem] text-white/70 hover:text-white tracking-[0.1em] uppercase transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}