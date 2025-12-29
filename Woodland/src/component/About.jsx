import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import about from "../assets/project2.jpeg";

function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-28"
    >
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-extrabold text-white mb-6">
            About
          </h3>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique.
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
            <br /><br />
            Ut commodo diam libero vitae erat. Aenean faucibus nibh et justo
            cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique
            posuere.
          </p>

          {/* FEATURE LIST */}
          <ul className="mt-8 space-y-4 text-gray-200">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400" size={20} />
              Integrated design approach
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400" size={20} />
              Sustainable material selection
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400" size={20} />
              End-to-end project management
            </li>
          </ul>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={about}
            alt="Woodland Studio"
            className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
