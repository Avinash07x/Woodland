import React from "react";

function Footer() {
  return (
    <footer className="py-10 ">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* ✅ Logo / Brand */}
        <div className="font-extrabold text-2xl tracking-tight text-white">
          WOODLAND
          <span className="text-green-600">.</span>
        </div>

        {/* ✅ Copyright */}
        <div className="text-sm text-gray-600 text-center md:text-right">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800">
            Woodland Architecture
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
