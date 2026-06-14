import React from "react";
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

export function ShopEnvironment() {
  const { content } = useData();
  
  const normalizeSrc = (src) => {
    if (!src) return "/bgvideo.mp4";
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  const videoSources = [
    normalizeSrc(content.envMedia1),
    normalizeSrc(content.envMedia2),
    normalizeSrc(content.envMedia3),
    normalizeSrc(content.envMedia4),
    normalizeSrc(content.envMedia5),
    normalizeSrc(content.envMedia6),
  ];

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

        {/* Video Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 h-[600px] md:h-[800px]">
          {/* Main Large Video */}
          <div className="col-span-2 row-span-2 relative overflow-hidden group rounded-sm">
            <video 
              key={videoSources[0]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            >
              <source src={videoSources[0]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-white text-xs font-bold tracking-[0.3em] uppercase bg-green-600 px-3 py-1">Main Floor</span>
            </div>
          </div>

          {/* Side Videos */}
          <div className="relative overflow-hidden group rounded-sm">
            <video 
              key={videoSources[1]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            >
              <source src={videoSources[1]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          <div className="relative overflow-hidden group rounded-sm hidden lg:block">
            <video 
              key={videoSources[2]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            >
              <source src={videoSources[2]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          <div className="relative overflow-hidden group rounded-sm">
            <video 
              key={videoSources[3]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            >
              <source src={videoSources[3]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          <div className="relative overflow-hidden group rounded-sm hidden md:block">
            <video 
              key={videoSources[4]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            >
              <source src={videoSources[4]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          <div className="relative overflow-hidden group rounded-sm">
            <video 
              key={videoSources[5]}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            >
              <source src={videoSources[5]} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
