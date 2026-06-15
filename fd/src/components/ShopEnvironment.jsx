import React from "react";
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

export function ShopEnvironment() {
  const { content } = useData();

  const normalizeSrc = (src) => {
    if (!src) return "/envi.mp4";
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  const envVideo = normalizeSrc(content.envMedia1);

  return (
    <section id="shop" className="py-24 bg-black overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              The <span className="text-green-500">Studio</span>
            </h2>
            <p className="text-slate-500 text-xl mt-4 font-light tracking-widest uppercase">
              Where Art Meets Skin • Professional Environment
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-slate-400 max-w-xs text-sm italic">
              Experience the vibe of Ink Junction. Clean, creative, and strictly professional.
            </p>
          </div>
        </div>

        {/* Single Full-Width Video */}
        <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-sm group">
          <video
            key={envVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
          >
            <source src={envVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase bg-green-600 px-3 py-1">
              Studio Floor
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
