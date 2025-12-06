import React from 'react';

function Projects() {
  const valueProps = [
    {
      title: "Turn ambition into action",
      points: [
        "Find guided paths and interactive lessons no matter your skill level",
        "Fuel your growth with in-demand subjects like AI, cloud, data, cybersecurity, and more"
      ],
      image: "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-1-mobile.webp"
    },
    {
      title: "Gain hands-on expertise​",
      points: [
        "Build portfolio-worthy projects that stand out in a competitive job market",
        "Grow in your career with prep for industry certifications from AWS, Microsoft, CompTIA, ISC2, and more"
      ],
      image: "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-2-mobile.webp"
    },
    {
      title: "Transform your team",
      points: [
        "Ensure you're meeting your unique business needs with flexible content assignment",
        "Access an exclusive admin dashboard to easily manage and track team progress"
      ],
      image: "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-3-mobile.webp"
    },
    {
      title: "Go further together",
      points: [
        "Get help when you need it, build your network, and learn together with access to exclusive events, clubs, study groups, and more in our global learner community"
      ],
      image: "https://static-assets.codecademy.com/assets/homepage/value-props/v1/module-4-mobile.webp"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-start mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            The experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Designed for progress
          </h2>
        </div>

        <div className="relative">
          {/* Dotted Pattern Background */}
          <svg 
            fill="currentColor" 
            role="img" 
            aria-hidden="true" 
            className="absolute inset-0 w-full h-full text-gray-200 opacity-30 pointer-events-none"
          >
            <title>Dot Loose</title>
            <pattern 
              id="dot-pattern" 
              x="0" 
              y="0" 
              width="16" 
              height="16" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="0.5" height="0.5" fill="currentColor"></rect>
              <rect y="1" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect y="0.5" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="1" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="1" y="1" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="1" y="0.5" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="0.5" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="0.5" y="1" width="0.5" height="0.5" fill="currentColor"></rect>
              <rect x="0.5" y="0.5" width="0.5" height="0.5" fill="currentColor"></rect>
            </pattern>
            <rect width="100%" height="100%" fill="url(#dot-pattern)"></rect>
          </svg>

          <ul className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueProps.map((prop, index) => (
              <li 
                key={index} 
                className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {prop.title}
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {prop.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            className="text-blue-600"
                          >
                            <path 
                              d="M10 2L11.545 7.09L16.18 7.09L12.545 10.18L14.09 15.27L10 12.18L5.91 15.27L7.455 10.18L3.82 7.09L8.455 7.09L10 2Z" 
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-base leading-relaxed">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <img 
                    src={prop.image} 
                    alt={prop.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: '343/247' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Projects;