import React from "react";

function Footer() {
  return (
    <footer className="relative z-10 mt-24">
      
      {/* subtle divider */}
      <div className="h-px w-full bg-white/10" />

      <div className="py-10 backdrop-blur-xl bg-black/30">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="font-extrabold text-2xl tracking-tight text-white">
            WOODLAND
            <span className="text-green-500">.</span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-white">
              Woodland Architecture
            </span>
            . All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
