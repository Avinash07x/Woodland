import React from 'react'


function About() {
  return (
    <section id="about" className="py-20 bg-white flex-grow">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold">About Woodland</h3>
          <p className="mt-3 text-gray-600">Woodland is a practice that values material honesty, context-sensitive design and thoughtful detailing. Our collaborative process ensures each project is unique to its people and place.</p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• Integrated design approach</li>
            <li>• Sustainable material selection</li>
            <li>• End-to-end project management</li>
          </ul>
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <img src="https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=60" alt="studio" className="w-full h-80 object-cover" />
        </div>
      </div>
    </section>
  )
};
export default About;