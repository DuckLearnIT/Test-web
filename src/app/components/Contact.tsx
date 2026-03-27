import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Send, ArrowUpRight, Mail, MapPin, Linkedin, Facebook } from "lucide-react";

const BehanceIcon = ({ size = 24, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h2.097c2.345 0 2.352-2.815 0-2.815h-2.097v2.815zm0 5.623h2.336c2.827 0 2.941-3.52 0-3.52h-2.336v3.52z" />
  </svg>
);

export function Contact() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const subjectRaw = formData.get("subject") as string;
    const message = formData.get("message") as string;
    
    const subject = subjectRaw || `New message from ${name}`;
    const body = `${message}\n\n---\nFrom: ${name}`;
    
    window.location.href = `mailto:nguyenducdw@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 3000);
  };

  const inputClass = (name: string) =>
    `w-full px-0 py-4 bg-transparent border-b text-white text-[0.9rem] placeholder:text-white/20 focus:outline-none transition-colors ${focused === name ? "border-[#a78bfa]" : "border-white/10"
    }`;

  return (
    <section id="contact" className="py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient blob */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10 bg-[#a78bfa]" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">Contact</span>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left: Big CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-[2.5rem] md:text-[4rem] text-white leading-[1.05] tracking-[-0.02em] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's build
              <br />something{" "}
              <br /><span className="italic text-[#a78bfa]">amazing</span>
              <br />together.
            </h2>
            <p className="text-white/40 text-[0.95rem] leading-relaxed mb-10 max-w-md">
              Have a project in mind? I'd love to hear about it. Drop me a message
              and let's explore how we can create something extraordinary.
            </p>

            <div className="space-y-4 mb-10">
              <a href="mailto:nguyenducdw@gmail.com" data-cursor-hover className="flex items-center gap-3 text-white/50 hover:text-[#a78bfa] transition-colors group">
                <Mail size={18} />
                <span>nguyenducdw@gmail.com</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <MapPin size={18} />
                <span>Hanoi, Vietnam</span>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/nguy%E1%BB%85n-%C4%91%E1%BB%A9c-6b3087354/" },
                { icon: BehanceIcon, label: "Behance", url: "https://www.behance.net/nguyenduck" },
                { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/profile.php?id=61579134277598" },
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#a78bfa] hover:border-[#a78bfa]/30 transition-all"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="grid sm:grid-cols-2 gap-x-8">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className={inputClass("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className={inputClass("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={inputClass("subject")}
              onFocus={() => setFocused("subject")}
              onBlur={() => setFocused(null)}
            />
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={4}
              required
              className={`${inputClass("message")} resize-none`}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />

            <div className="pt-8">
              <button
                type="submit"
                data-cursor-hover
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#a78bfa] rounded-full" />
                <span className="absolute inset-0 bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <span className="relative z-10 text-[#0a0a0f] text-[0.85rem] tracking-wider flex items-center gap-2">
                  {sent ? (
                    "Message Started!"
                  ) : (
                    <>
                      Send Message
                      <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
