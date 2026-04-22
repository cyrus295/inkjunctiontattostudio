import React, { useState } from 'react';

const coverupItems = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=400&q=80",
    after: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&q=80",
    title: "Tribal to Geometric Coverup"
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=400&q=80",
    after: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
    title: "Old Name to Realistic Rose"
  }
];

export function CoverupTattoos() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Coverup Tattoos
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transforming old regrets into new masterpieces. See the incredible transformations.
          </p>
        </div>

        <div className="space-y-16">
          {coverupItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-3xl shadow-lg">
              <div className="relative group">
                <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                  BEFORE
                </div>
                <img 
                  src={item.before} 
                  alt="Before" 
                  className="w-full h-[300px] object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="relative group">
                <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  AFTER
                </div>
                <img 
                  src={item.after} 
                  alt="After" 
                  className="w-full h-[300px] lg:h-[400px] object-cover rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="lg:col-span-2 text-center pt-4">
                <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
