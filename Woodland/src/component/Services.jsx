import React from 'react'



function Services() {
  const services = [
    { title: 'Architecture', desc: 'Residential & commercial architecture, design development, and construction documentation.' },
    { title: 'Interiors', desc: 'Bespoke interiors with material studies, FF&E selection and detailing.' },
    { title: 'Landscape', desc: 'Contextual landscape planning to integrate building and site.' },
  ]
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold">Services</h3>
        <p className="mt-3 text-gray-600 max-w-2xl">Comprehensive design and project delivery across architecture, interiors and landscape.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-xl font-semibold">{s.title}</div>
              <div className="mt-2 text-gray-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};
export default Services;
