import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 py-28"
    >
      <div className="max-w-full mx-auto px-6">
        
        {/* Glass container */}
        <div className="backdrop-blur-xl bg-black/40 rounded-2xl p-10 md:p-14">
          
          <h3 className="text-4xl font-bold text-white">
            Get in touch
          </h3>

          <p className="mt-3 text-gray-300 max-w-xl">
            For enquiries, fees or collaborations, drop us a message.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-10">
            
            {/* FORM */}
            <form className="space-y-4">
              <input
                className="w-full rounded-md bg-white/90 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Name"
              />
              <input
                className="w-full rounded-md bg-white/90 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Email"
              />
              <textarea
                className="w-full rounded-md bg-white/90 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-green-500"
                rows={6}
                placeholder="Message"
              />
              <button
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 transition text-white font-medium"
              >
                Send message
              </button>
            </form>

            {/* CONTACT INFO */}
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <MapPin className="text-green-500 mt-1" />
                <div>
                  <div className="font-semibold text-white">Office</div>
                  <div>123 Woodland Lane, City</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-green-500 mt-1" />
                <div>
                  <div className="font-semibold text-white">Phone</div>
                  <div>+1 555 123 4567</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-green-500 mt-1" />
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <div>hello@woodland.example</div>
                </div>
              </div>

              <div className="pt-4 text-sm text-gray-400">
                We typically reply within 2 business days.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
