import React, { useState } from 'react';
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

const defaultPortraitTattoos = [
  { id: 1, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80", caption: "Realistic Portrait" },
  { id: 2, src: "https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=800&q=80", caption: "Detailed Portrait" },
  { id: 3, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80", caption: "Custom Portrait" },
];

export function PortraitTattoos() {
  const { portfolio } = useData();
  const [isPaused, setIsPaused] = useState(false);

  const portraitItems = portfolio.filter(item => 
    item.style?.toLowerCase().includes('portrait')
  );

  const displayItems = portraitItems.length > 0 ? portraitItems : defaultPortraitTattoos;
  const marqueeItems = [...displayItems, ...displayItems, ...displayItems];

  const normalizeSrc = (src) => {
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return `${SOCKET_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight uppercase italic">
          Portrait <span className="text-green-500">Tattoos</span>
        </h2>
        <div className="w-24 h-1 bg-slate-900 mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Hyper-realistic portraiture that captures every detail.
        </p>
      </div>

      <div 
        className="relative flex whitespace-nowrap overflow-x-auto scrollbar-hide group cursor-grab active:cursor-grabbing"
        onClick={() => setIsPaused(!isPaused)}
      >
        <div className={`flex gap-8 py-4 px-6 ${isPaused ? 'pause-marquee' : 'animate-marquee'}`}>
          {marqueeItems.map((item, index) => (
            <div 
              key={`${item.id || item._id}-${index}`} 
              className="w-[300px] sm:w-[450px] flex-shrink-0 group relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src={normalizeSrc(item.src)} 
                alt={item.caption} 
                className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-black uppercase tracking-widest text-lg italic">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
