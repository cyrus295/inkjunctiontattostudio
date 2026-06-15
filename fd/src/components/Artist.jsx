import React from 'react';
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

export function Artist() {
  const { content } = useData();
  
  const normalizeSrc = (src, fallback) => {
    if (!src) return fallback;
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  const artistName = content.artistName || "POVARASAN";
  const artistBio = content.artistBio || "\"Turning skin into a living, breathing canvas of art.\"";
  const artistImage = normalizeSrc(content.artistImage, "/artist.jpg");

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Artist Photo */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-4 bg-green-500/10 rounded-[3rem] rotate-3 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-slate-50">
              <img 
                src={artistImage} 
                alt="The Artist" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-6 -right-6 bg-black text-white p-8 rounded-full shadow-2xl border border-white/10 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-none">Master</p>
              <p className="text-green-500 text-xl font-black uppercase italic tracking-tighter mt-1">Artist</p>
            </div>
          </div>

          {/* Artist Details */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 relative">
            <div className="inline-block px-4 py-1 border border-green-500/30 rounded-full bg-green-500/5">
              <span className="text-green-500 text-xs font-black uppercase tracking-[0.3em]">The Creator</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
              {artistName.split(' ')[0]} <br />
              <span className="text-green-500">{artistName.split(' ').slice(1).join(' ')}</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-500 font-medium tracking-wide uppercase italic">
              {artistBio}
            </p>

            <div className="pt-8">
              <div className="w-24 h-1 bg-slate-900 mx-auto md:mx-0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
