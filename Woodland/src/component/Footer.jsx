import React from 'react'


function Footer() {
  return (
    <footer className="py-8 bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-bold text-xl tracking-tight">WOODLAND<span className="text-green-600">.</span></div>
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} Woodland Architecture. All rights reserved.</div>
      </div>
    </footer>
  )
};
export default Footer;