import React from "react";
import { Building2, Sofa, Trees } from "lucide-react";
import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      title: "Architecture",
      desc: "Residential & commercial architecture, design development, and construction documentation.",
      icon: <Building2 size={36} />,
    },
    {
      title: "Interiors",
      desc: "Bespoke interiors with material studies, FF&E selection and detailing.",
      icon: <Sofa size={36} />,
    },
    {
      title: "Landscape",
      desc: "Contextual landscape planning to integrate building and site.",
      icon: <Trees size={36} />,
    },
  ];

  return (
    <section
      id="services"
      className="py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ✅ Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-extrabold text-white text-center">
            Our Services
          </h3>
          <p className="mt-4 text-gray-100 text-center max-w-2xl mx-auto">
            Comprehensive design and project delivery across architecture,
            interiors and landscape.
          </p>
        </motion.div>

        {/* ✅ Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 border border-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              
              {/* ✅ Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 text-white mb-6 group-hover:bg-black group-hover:text-white transition">
                {s.icon}
              </div>

              {/* ✅ Title */}
              <h4 className="text-2xl font-semibold text-black mb-2">
                {s.title}
              </h4>

              {/* ✅ Description */}
              <p className="mt-3 text-gray-600 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
