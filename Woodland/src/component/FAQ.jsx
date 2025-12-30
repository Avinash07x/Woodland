import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services does Woodland Studio offer?",
    answer:
      "We provide architecture, interior design, layout planning, and complete project management from concept to execution.",
  },
  {
    question: "Do you handle end-to-end project management?",
    answer:
      "Yes, we manage everything from design coordination to execution supervision, quality control, and budget tracking.",
  },
  {
    question: "Do you work on residential and commercial projects?",
    answer:
      "We work on residential, hospitality, and select commercial projects that align with our design philosophy.",
  },
  {
    question: "How do I start a project with Woodland?",
    answer:
      "You can contact us through the website form or email us directly. We’ll schedule a consultation to understand your vision.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faqs" className="relative z-10 py-28">
      
      {/* Single soft overlay (no double blur) */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-4xl mx-auto px-6 pointer-events-auto">
        
        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-white mb-12 text-center"
        >
          Questions & Answers
        </motion.h3>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-lg"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-medium hover:bg-white/5 transition"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus size={20} className="text-emerald-400 shrink-0" />
                  ) : (
                    <Plus size={20} className="text-emerald-400 shrink-0" />
                  )}
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
