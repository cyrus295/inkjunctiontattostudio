import React, { useState } from 'react';
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

export function CoverupTattoos() {
  const { portfolio } = useData();
  const [isPaused, setIsPaused] = useState(false);

  const coverupItems = portfolio.filter(item => 
    item.style?.toLowerCase().includes('coverup')
  );

  // If no items, don't show the section
  if (coverupItems.length === 0) return null;

  const marqueeItems = [...coverupItems, ...coverupItems, ...coverupItems];

  const normalizeSrc = (src) => {
    if (!src) return "";
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  return (
    <section id="coverup" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-green-500/30 rounded-full bg-green-500/5 mb-6">
          <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.3em]">The Transformation</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
          Coverup <span className="text-green-500">Magic</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium italic">
          "Witness the evolution from old ink to new masterpieces."
        </p>
      </div>

      <div 
        className="relative flex whitespace-nowrap overflow-x-auto scrollbar-hide group cursor-grab active:cursor-grabbing"
        onClick={() => setIsPaused(!isPaused)}
      >
        <div className={`flex gap-12 py-4 px-6 ${isPaused ? 'pause-marquee' : 'animate-marquee-slow'}`}>
          {marqueeItems.map((item, index) => (
            <div 
              key={`${item._id}-${index}`} 
              className="w-[350px] sm:w-[800px] flex-shrink-0 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                {/* Before Image */}
                <div className="relative group/before aspect-[4/5] sm:aspect-auto overflow-hidden rounded-3xl bg-slate-200">
                  {item.beforeSrc ? (
                    <img 
                      src={normalizeSrc(item.beforeSrc)} 
                      alt="Before" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/before:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">
                      No Before Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-10 bg-black/80 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-lg">
                    BEFORE
                  </div>
                </div>

                {/* After Image/Video */}
                <div className="relative group/after aspect-[4/5] sm:aspect-auto overflow-hidden rounded-3xl bg-slate-900">
                  {item.type === "video" ? (
                    <video
                      src={normalizeSrc(item.src)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={normalizeSrc(item.src)} 
                      alt="After" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/after:scale-105"
                    />
                  )}
                  <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-lg">
                    AFTER
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">{item.caption}</h3>
                <div className="w-12 h-1 bg-green-500 mx-auto mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
