import React from "react";
import { motion } from "framer-motion";

import ArchImg from "../assets/server1.png";
import InteriorImg from "../assets/server2.png";
import LayoutImg from "../assets/server3.png";
import ProjectImg from "../assets/server4.png";

const services = [
  {
    id: "01",
    title: "Architecture",
    desc: "We design buildings that are purposeful, enduring, and deeply connected to their surroundings.",
    points: [
      "Concept Design",
      "Architectural Planning",
      "3D Visualization & Modeling",
      "Construction Documentation",
    ],
    image: ArchImg,
  },
  {
    id: "02",
    title: "Interior Design",
    desc: "Beyond surface-level styling, our craft ensures that a space is built to last and feel alive.",
    points: [
      "Spatial Identity",
      "Material & Finish Selection",
      "Furniture & Lighting Design",
      "Detail Development",
    ],
    image: InteriorImg,
  },
  {
    id: "03",
    title: "Layout Planning",
    desc: "We organize environments around people, movement, and use—creating clarity, comfort, and adaptability.",
    points: [
      "Functional Zoning",
      "Human-Centered Design",
      "Circulation Strategy",
      "Flexibility & Future Use",
    ],
    image: LayoutImg,
  },
  {
    id: "04",
    title: "Project Management",
    desc: "We ensure your vision is delivered on time, on budget, and to the highest standards.",
    points: [
      "Design Coordination",
      "Execution Supervision",
      "Quality Control",
      "Budget & Timeline Tracking",
    ],
    image: ProjectImg,
  },
];

function Services() {
  return (
    <section
      id="services"
      className="relative z-10 py-28"
    >
      {/* Background overlay for Tubes */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-white mb-24"
        >
          SERVICES
        </motion.h2>

        {/* Services Rows */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-20 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* LEFT CONTENT */}
              <div className="md:w-1/2">
                <span className="text-sm text-emerald-400 font-semibold">
                  {service.id}
                </span>

                <h3 className="text-3xl font-bold text-white mt-3 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed max-w-xl">
                  {service.desc}
                </p>

                <ul className="space-y-2 text-sm text-gray-200 list-disc pl-5">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* RIGHT IMAGE */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="md:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[420px] object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
