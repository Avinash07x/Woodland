// src/components/StatsFeatured.jsx
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const duration = 8000; // animation duration in ms
    const intervalTime = 20; // update interval in ms

    const increments = statsData.map(stat => stat.value / (duration / intervalTime));

    const interval = setInterval(() => {
      setCounts(prev =>
        prev.map((count, idx) => {
          const next = count + increments[idx];
          return next >= statsData[idx].value ? statsData[idx].value : next;
        })
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-10">
      <div className="max-w-3xl mx-auto">
        {/* BY THE NUMBERS */}
        <div className="mb-32 text-center md:text-left">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-white mb-12">
            By the numbers
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((item, index) => (
              <div key={index}>
                <h2 className="text-3xl font-bold text-white">
                  {Math.floor(counts[index])}+
                </h2>
                <p className="text-gray-400 text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AS FEATURED IN */}
        <div className="text-center">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-white mb-16">
            As featured in
          </h4>

          <div className="flex flex-col md:flex-row items-center justify-center gap-20">
            {featured.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsFeatured;
