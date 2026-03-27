// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// const testimonials = [
//   {
//     quote: "Ava transformed our product experience. Her ability to distill complex problems into elegant, intuitive solutions is unmatched. Our user satisfaction scores increased by 40% within three months.",
//     name: "Sarah Mitchell",
//     role: "VP of Product, Finova",
//     accent: "#a78bfa",
//   },
//   {
//     quote: "Working with Ava was a masterclass in design thinking. She brought clarity and creativity to every phase, and the design system she built is still powering our growth two years later.",
//     name: "James Park",
//     role: "CTO, Bloom Health",
//     accent: "#f472b6",
//   },
//   {
//     quote: "Ava doesn't just design screens -- she designs experiences. Her strategic mindset and meticulous craft elevated our brand to a level we didn't think was possible.",
//     name: "Maria Rodriguez",
//     role: "Founder & CEO, Luxe Commerce",
//     accent: "#38bdf8",
//   },
// ];

// export function Testimonials() {
//   const [idx, setIdx] = useState(0);
//   const [dir, setDir] = useState(1);

//   const go = (n: number) => {
//     setDir(n > idx ? 1 : -1);
//     setIdx(n);
//   };
//   const prev = () => go(idx === 0 ? testimonials.length - 1 : idx - 1);
//   const next = () => go(idx === testimonials.length - 1 ? 0 : idx + 1);

//   // Auto-advance
//   useEffect(() => {
//     const t = setInterval(() => {
//       setDir(1);
//       setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
//     }, 6000);
//     return () => clearInterval(t);
//   }, [idx]);

//   const t = testimonials[idx];

//   return (
//     <section id="testimonials" className="py-32 bg-[#0a0a0f] relative overflow-hidden">
//       {/* Large decorative quote */}
//       <div
//         className="absolute top-16 left-8 text-[20rem] leading-none opacity-[0.02] pointer-events-none select-none"
//         style={{ fontFamily: "'Playfair Display', serif" }}
//       >
//         "
//       </div>

//       <div className="max-w-5xl mx-auto px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="flex items-center gap-4 mb-20"
//         >
//           <div className="h-px flex-1 bg-white/10" />
//           <span className="text-[0.7rem] text-white/30 tracking-[0.3em] uppercase">Kind Words</span>
//           <div className="h-px w-12 bg-white/10" />
//         </motion.div>

//         <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
//           <Quote size={32} style={{ color: t.accent }} className="mb-8 opacity-40" />

//           <AnimatePresence mode="wait" custom={dir}>
//             <motion.div
//               key={idx}
//               custom={dir}
//               initial={{ opacity: 0, x: dir * 60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -dir * 60 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p
//                 className="text-white/80 text-[1.3rem] md:text-[1.6rem] leading-relaxed max-w-3xl mx-auto mb-10 italic"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 "{t.quote}"
//               </p>
//               <div className="flex flex-col items-center gap-1">
//                 <p className="text-white text-[0.95rem]">{t.name}</p>
//                 <p className="text-[0.8rem]" style={{ color: t.accent }}>{t.role}</p>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-center gap-6 mt-12">
//           <button
//             onClick={prev}
//             data-cursor-hover
//             className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           <div className="flex items-center gap-3">
//             {testimonials.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => go(i)}
//                 data-cursor-hover
//                 className="relative h-[3px] rounded-full overflow-hidden transition-all"
//                 style={{ width: i === idx ? 40 : 16, backgroundColor: "rgba(255,255,255,0.1)" }}
//               >
//                 {i === idx && (
//                   <motion.div
//                     className="absolute inset-0 rounded-full"
//                     style={{ backgroundColor: t.accent }}
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 6 }}
//                     key={`prog-${idx}`}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={next}
//             data-cursor-hover
//             className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
