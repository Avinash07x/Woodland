import React from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pointer-events-none">
      
      {/* NAVBAR BAR */}
      <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="text-xl font-extrabold tracking-tight text-white">
            WOODLAND<span className="text-green-500">.</span>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 items-center text-white">
            <a href="#home" className="hover:text-green-400 transition">Home</a>
            <a href="#projects" className="hover:text-green-400 transition">Projects</a>
            <a href="#services" className="hover:text-green-400 transition">Services</a>
            <a href="#about" className="hover:text-green-400 transition">About</a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition"
            >
              Contact
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(v => !v)}
            aria-label="menu"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden pointer-events-auto bg-black/70 backdrop-blur-xl border-b border-white/10">
          <div className="px-6 py-6 flex flex-col gap-5 text-white">
            <a onClick={() => setOpen(false)} href="#home">Home</a>
            <a onClick={() => setOpen(false)} href="#projects">Projects</a>
            <a onClick={() => setOpen(false)} href="#services">Services</a>
            <a onClick={() => setOpen(false)} href="#about">About</a>
            <a
              onClick={() => setOpen(false)}
              href="#contact"
              className="mt-2 inline-block px-4 py-2 rounded-md border border-white/20"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
