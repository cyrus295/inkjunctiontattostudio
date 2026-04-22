import React from 'react';

const portraitTattoos = [
  { id: 1, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80", caption: "Realistic Portrait 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=800&q=80", caption: "Realistic Portrait 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80", caption: "Realistic Portrait 3" },
];

export function PortraitTattoos() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Portrait Tattoos
          </h2>
          <div className="w-24 h-1 bg-slate-900 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hyper-realistic portraiture that captures every detail and emotion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portraitTattoos.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-xl">
              <img 
                src={item.src} 
                alt={item.caption} 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium text-lg">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
