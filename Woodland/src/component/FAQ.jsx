// FAQs.jsx
import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What services does Woodland Studio offer?",
    a: "We provide architecture, interior design, layout planning, and full project management from concept to execution.",
  },
  {
    q: "Do you manage projects end-to-end?",
    a: "Yes. We handle design coordination, site supervision, quality checks, budgeting, and timelines.",
  },
  {
    q: "Do you take commercial projects?",
    a: "We work on residential, hospitality, and select commercial projects aligned with our design philosophy.",
  },
  {
    q: "How do I start a project?",
    a: "Reach out via our contact form or email. We’ll schedule a consultation to understand your vision.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  // -------------------------------------------------
  // TUBES BACKGROUND (FIXED & SAFE)
  // -------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const randomColors = (count) =>
      Array.from({ length: count }, () =>
        "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
      );

    const loadTubes = async () => {
      try {
        const { default: TubesCursorApp } = await import(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );

        if (!mounted || !canvasRef.current) return;

        if (appRef.current?.dispose) appRef.current.dispose();

        appRef.current = TubesCursorApp(canvasRef.current, {
          tubes: {
            colors: ["#6ee7b7", "#22d3ee", "#a78bfa"],
            lights: {
              intensity: 160,
              colors: ["#10b981", "#6366f1", "#ec4899", "#f59e0b"],
            },
          },
        });
      } catch (e) {
        console.error("Tubes error:", e);
      }
    };

    loadTubes();

    const handleClick = () => {
      if (!appRef.current?.tubes) return;
      appRef.current.tubes.setColors(randomColors(3));
      appRef.current.tubes.setLightsColors(randomColors(4));
    };

    document.addEventListener("click", handleClick);

    return () => {
      mounted = false;
      document.removeEventListener("click", handleClick);
      if (appRef.current?.dispose) appRef.current.dispose();
      appRef.current = null;
    };
  }, []);

  // -------------------------------------------------
  // JSX
  // -------------------------------------------------
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Tubes canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-white mb-12 text-center"
        >
          Questions & Answers
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex justify-between items-center text-white text-left"
              >
                {f.q}
                {open === i ? (
                  <Minus className="text-emerald-400" />
                ) : (
                  <Plus className="text-emerald-400" />
                )}
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="px-6 pb-6 text-gray-300">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
