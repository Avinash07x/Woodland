import React from 'react'
import { Menu, X, } from 'lucide-react'

function Navbar() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="fixed w-full z-30 mt-0 bg-white/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight">WOODLAND<span className="text-green-600">.</span></div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#home" className="hover:text-green-600">Home</a>
          <a href="#projects" className="hover:text-green-600">Projects</a>
          <a href="#services" className="hover:text-green-600">Services</a>
          <a href="#about" className="hover:text-green-600">About</a>
          <a href="#contact" className="px-4 py-2 rounded-md border border-gray-200 hover:bg-green-50">Contact</a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
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
  )
};
export default Navbar;