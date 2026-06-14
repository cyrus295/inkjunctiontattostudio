import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-green-500/5 to-transparent opacity-50" />

      {/* Dual Ring Spinner */}
      <div className="relative mb-12">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-2 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin" />
        {/* Inner Ring */}
        <div className="absolute inset-2 border-2 border-t-transparent border-r-white border-b-transparent border-l-white rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
        {/* Center Dot */}
        <div className="absolute inset-[34px] bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse" />
      </div>

      {/* Minimalist Branding */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-black text-white tracking-[0.25em] uppercase mb-3">
          INK <span className="text-green-500">JUNCTION</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-white/10" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.6em] ml-[0.6em]">
            Tattoo Studio
          </p>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/50 w-full animate-[loading_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-[8px] text-slate-600 font-mono tracking-[0.4em] uppercase">
          Crafting Masterpieces...
        </span>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
