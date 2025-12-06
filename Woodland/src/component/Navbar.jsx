import React from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed w-full z-30 bg-white/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* ✅ LOGO */}
        <div
          className=" text-xl font-bold tracking-tight text-black"
        >
          WOODLAND<span className="text-green-600">.</span>
        </div>

        {/* ✅ DESKTOP MENU */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#home" className="hover:glitch hover:text-green-600 transition">Home</a>
          <a href="#projects" className="hover:glitch hover:text-green-600 transition">Projects</a>
          <a href="#services" className="hover:glitch hover:text-green-600 transition">Services</a>
          <a href="#about" className="hover:glitch hover:text-green-600 transition">About</a>
          <a
            href="#contact"
            className="hover:glitch px-4 py-2 rounded-md border border-gray-200 hover:bg-green-50 transition"
          >
            Contact
          </a>
        </nav>

        {/* ✅ MOBILE BUTTON */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(v => !v)}
          aria-label="menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* ✅ MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
