import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-bold">Get in touch</h3>
        <p className="mt-2 text-gray-600">For enquiries, fees or collaborations, drop us a message.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <form className="space-y-4">
            <input className="w-full rounded-md border px-4 py-3" placeholder="Name" />
            <input className="w-full rounded-md border px-4 py-3" placeholder="Email" />
            <textarea className="w-full rounded-md border px-4 py-3" rows={6} placeholder="Message" />
            <button className="px-6 py-3 rounded-md bg-green-600 text-white">Send message</button>
          </form>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin />
              <div>
                <div className="font-semibold">Office</div>
                <div className="text-gray-600">123 Woodland Lane, City</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone />
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-gray-600">+1 555 123 4567</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-gray-600">hello@woodland.example</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">We typically reply within 2 business days.</div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Contact;