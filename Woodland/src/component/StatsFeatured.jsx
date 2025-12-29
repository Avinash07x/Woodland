import React, { useEffect, useRef, useState } from "react";
import feat1 from "../assets/featured1.png";
import feat2 from "../assets/featured2.png";
import feat3 from "../assets/featured3.png";

function StatsFeatured() {
  const statsData = [
    { value: 316, label: "projects completed" },
    { value: 740, label: "satisfied customers" },
    { value: 215, label: "YTD transactions" },
  ];

  const featured = [
    { name: "HGTV", logo: feat1 },
    { name: "eXp Realty", logo: feat2 },
    { name: "Fortune Magazine", logo: feat3 },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          const duration = 2000;
          const intervalTime = 20;
          const increments = statsData.map(
            stat => stat.value / (duration / intervalTime)
          );

          const interval = setInterval(() => {
            setCounts(prev =>
              prev.map((count, idx) => {
                const next = count + increments[idx];
                return next >= statsData[idx].value
                  ? statsData[idx].value
                  : next;
              })
            );
          }, intervalTime);

          setTimeout(() => clearInterval(interval), duration);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full py-24"
    >
      {/* Glass wrapper */}
      <div className="max-w-full mx-auto px-6 backdrop-blur-xl bg-black/40 rounded-2xl py-20">
        
        {/* BY THE NUMBERS */}
        <div className="mb-32 text-center md:text-left">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-300 mb-12">
            By the numbers
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {statsData.map((item, index) => (
              <div key={index}>
                <h2 className="text-4xl font-bold text-white">
                  {Math.floor(counts[index])}+
                </h2>
                <p className="text-gray-400 text-lg">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AS FEATURED IN */}
        <div className="text-center">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-gray-300 mb-16">
            As featured in
          </h4>

          <div className="flex flex-col md:flex-row items-center justify-center gap-20">
            {featured.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain opacity-80 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsFeatured;
