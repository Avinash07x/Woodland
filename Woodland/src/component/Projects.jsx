import React from "react";

const projects = [
  {
    title: "Coastal Villa",
    meta: "Aspen • Residential • 2024",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
    align: "right",
  },
  {
    title: "The Willow Loft",
    meta: "Aspen • Residential • 2024",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600",
    align: "left",
  },
  {
    title: "Sunshine Retreat",
    meta: "Aspen • Residential • 2024",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600",
    align: "right",
  },
  {
    title: "Forest Pavilion",
    meta: "Aspen • Residential • 2024",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?w=1600",
    align: "left",
  },
];

function Projects() {
  return (
    <>
      <section id="projects" className="w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden mb-20" // added mb-20 for gap
          >
            {/* ✅ Background Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* ✅ Overlay Card */}
            <div
              className={`absolute ${project.align === "left" ? "left-12" : "right-12"
                } max-w-md bg-white/80 backdrop-blur-xl p-10 shadow-2xl`}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {project.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {project.meta}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
export default Projects;
