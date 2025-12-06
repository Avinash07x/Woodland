import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* ✅ LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-extrabold text-white mb-6">
            About Woodland
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Woodland is a practice that values material honesty, context-sensitive
            design and thoughtful detailing. Our collaborative process ensures
            each project is unique to its people and place.
          </p>

          {/* ✅ Feature List */}
          <ul className="mt-8 space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              Integrated design approach
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              Sustainable material selection
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              End-to-end project management
            </li>
          </ul>
        </motion.div>

        {/* ✅ RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=60"
            alt="Woodland Studio"
            className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
