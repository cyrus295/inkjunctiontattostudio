import React, { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
import { Tag, Sparkles, Clock } from "lucide-react";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

const CountdownTimer = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiresAt).getTime() - now;

      if (distance < 0) {
        setTimeLeft("EXPIRED");
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0) setTimeLeft(`${days}d ${hours}h left`);
        else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m left`);
        else setTimeLeft(`${minutes}m ${seconds}s left`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  if (timeLeft === "EXPIRED") return null;

  return (
    <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-widest text-[10px] mt-4">
      <Clock className="w-3 h-3 animate-pulse" />
      {timeLeft}
    </div>
  );
};

export function Offers() {
  const { offers } = useData();
  const now = new Date();
  
  const activeOffers = offers.filter(offer => {
    const isActive = offer.isActive;
    const notExpired = !offer.expiresAt || new Date(offer.expiresAt) > now;
    return isActive && notExpired;
  });

  if (activeOffers.length === 0) return null;

  const normalizeSrc = (src) => {
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  return (
    <section id="offers" className="py-24 bg-black overflow-hidden relative border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-green-500/30 rounded-full bg-green-500/5 mb-6">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.3em]">Exclusive Deals</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter italic">
            Limited <span className="text-green-500">Offers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {activeOffers.map((offer) => (
            <div 
              key={offer._id} 
              className="group relative bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-green-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* Media Container */}
              <div className="aspect-[16/9] relative overflow-hidden">
                {offer.type === "video" ? (
                  <video
                    src={normalizeSrc(offer.src)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={normalizeSrc(offer.src)}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-green-600 text-black px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl">
                    <Tag className="w-4 h-4" />
                    Special Offer
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4 group-hover:text-green-500 transition-colors">
                    {offer.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  {offer.description}
                </p>
                
                {offer.expiresAt && <CountdownTimer expiresAt={offer.expiresAt} />}
                
                <div className="mt-8 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => {
                      const message = `Hi Ink Junction! I'm interested in the "${offer.title}" offer.`;
                      window.open(`https://wa.me/6362496667?text=${encodeURIComponent(message)}`, "_blank");
                    }}
                    className="w-full bg-white text-black hover:bg-green-500 hover:text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-95"
                  >
                    Claim This Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
