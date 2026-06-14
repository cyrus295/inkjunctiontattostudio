import React, { useState, useEffect } from "react";
import { Menu, X, Instagram, Phone, MessageCircle, ArrowDown, Mail, MessageSquare } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "../utils/constants.js";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);

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
    { name: "Offers", href: "#offers" },
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

  const openWhatsApp = () => {
    const message = `Hi Ink Junction Tattoo Studio! I'd like to book a session.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setShowBookingPopup(false);
  };

  const openSMS = () => {
    const message = `Hi Ink Junction Tattoo Studio! I'd like to book a session.`;
    window.open(`sms:${WHATSAPP_NUMBER}?body=${encodeURIComponent(message)}`, "_self");
    setShowBookingPopup(false);
  };

  const callNow = () => {
    window.open(`tel:${WHATSAPP_NUMBER}`, "_self");
    setShowBookingPopup(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-3xl py-4 border-b border-white/10 shadow-2xl" 
          : "bg-black py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative w-14 h-14 rounded-full border border-white/20 overflow-hidden transition-all duration-700 group-hover:border-green-500/50 group-hover:scale-105">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-[0.3em] text-sm md:text-xl uppercase group-hover:text-green-500 transition-all duration-500">
              Ink Junction
            </span>
            <span className="text-slate-400 font-bold tracking-[0.2em] text-[8px] md:text-[10px] uppercase group-hover:text-green-500 transition-all duration-500">
              Tattoo Studio
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-green-500 group-hover:w-full transition-all duration-700"></span>
            </a>
          ))}
        </div>

        {/* Right Side Info */}
        <div className="hidden lg:flex items-center gap-8">
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            className="text-white/50 hover:text-green-500 transition-all duration-500 hover:scale-110"
            title="Instagram"
          >
            <Instagram size={22} />
          </a>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <button 
            onClick={() => setShowBookingPopup(true)}
            className="px-8 py-3 rounded-sm bg-transparent border border-white/20 hover:border-green-500 text-white font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-700 hover:bg-green-500 hover:text-black"
          >
            Book Now
          </button>
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

        <button 
          onClick={() => {
            setIsOpen(false);
            setShowBookingPopup(true);
          }}
          className="mt-4 bg-green-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-lg shadow-2xl active:scale-95 transition-transform"
        >
          BOOK NOW
        </button>

        <div className="mt-8 flex gap-8">
           <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram className="text-white w-8 h-8" />
           </a>
           <div className="text-green-500 font-black tracking-widest text-xl uppercase italic">Ink Junction</div>
        </div>
      </div>

      {/* Booking Popup Modal (Shared Black Theme) */}
      {showBookingPopup && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setShowBookingPopup(false)}
          />
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Book Your Session</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Ink Junction Tattoo Studio</p>
              
              <div className="space-y-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-green-600 hover:bg-green-500 text-white transition-all group active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-bold uppercase tracking-widest text-sm">WhatsApp</span>
                  </div>
                  <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={openSMS}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all group active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6" />
                    <span className="font-bold uppercase tracking-widest text-sm">Direct SMS</span>
                  </div>
                  <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={callNow}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all group active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-green-500" />
                    <span className="font-bold uppercase tracking-widest text-sm">Phone Call</span>
                  </div>
                  <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <button 
                onClick={() => setShowBookingPopup(false)}
                className="mt-8 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
