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
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ✅ Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-20"
        >
          SERVICES
        </motion.h2>

        {/* ✅ Services Rows */}
        <div className="space-y-28">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-16 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* ✅ Left Content */}
              <div className="md:w-1/2">
                <span className="text-sm text-green-600 font-semibold">
                  {service.id}
                </span>

                <h3 className="text-3xl text-blue-500 font-bold mt-2 mb-4">
                  {service.title}
                </h3>

                <p className="text-white mb-6 leading-relaxed max-w-xl">
                  {service.desc}
                </p>

                <ul className="space-y-2 text-sm text-white list-disc pl-5">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* ✅ Right Image */}
              <div className="md:w-1/2">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[420px] object-cover rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
