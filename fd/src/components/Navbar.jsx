import React, { useState, useEffect } from "react";
import { Menu, X, Instagram, Phone } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#cost" },
    { name: "The Studio", href: "#shop" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-lg py-4 border-b border-white/10" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full border-2 border-green-500 overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-black tracking-[0.2em] text-xl uppercase italic group-hover:text-green-500 transition-colors">
            Ink Junction
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-white/70 hover:text-green-500 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Right Side Info */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="https://instagram.com" className="text-white hover:text-green-500 transition-colors">
            <Instagram size={20} />
          </a>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest">
            <Phone size={14} className="text-green-500" />
            BOOK NOW
          </div>
        </div>

        {/* Mobile Menu Button (3 lines) */}
        <button 
          className="md:hidden text-white hover:text-green-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[99] transition-all duration-700 flex flex-col items-center justify-center gap-8 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="absolute top-8 right-8">
           <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-500">
              <X size={40} />
           </button>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="text-white text-4xl font-black uppercase tracking-tighter hover:text-green-500 transition-colors italic"
          >
            {link.name}
          </a>
        ))}

        <div className="mt-12 flex gap-8">
           <Instagram className="text-white w-8 h-8" />
           <div className="text-green-500 font-black tracking-widest text-xl uppercase">Ink Junction</div>
        </div>
      </div>
    </nav>
  );
}
