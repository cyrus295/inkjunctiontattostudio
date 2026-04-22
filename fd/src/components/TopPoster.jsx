import React from 'react';

export function TopPoster() {
  return (
    <div className="w-full bg-black font-heading pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-hidden">
        <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-slate-800">
          {/* Main Poster Image */}
          <img 
            src="https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=1600&q=80" 
            alt="Ink Junction Tattoo Poster" 
            className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8">
            <div className="max-w-xl">
              <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
                LIMITED SLOTS AVAILABLE
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2 italic tracking-tighter">
                INK JUNCTION
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-medium mb-6">
                Premium Custom Tattoos & Piercings
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Experience</span>
                  <span className="text-white font-black text-lg">10+ YEARS</span>
                </div>
                <div className="w-px h-10 bg-slate-700"></div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Quality</span>
                  <span className="text-white font-black text-lg">100% HYGIENIC</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Corner Tag */}
          <div className="absolute top-0 right-0 bg-white text-black font-black px-8 py-2 rotate-45 translate-x-6 -translate-y-2 shadow-lg">
            BOOK NOW
          </div>
        </div>
      </div>
    </div>
  );
}
