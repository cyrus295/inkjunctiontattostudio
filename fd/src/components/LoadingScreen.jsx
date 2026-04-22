import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900 flex flex-col items-center justify-center">
      {/* Ink Splash Animation Effect */}
      <div className="relative">
        <div className="w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
      
      {/* Branding */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-black text-white tracking-[0.3em] mb-2">
          INK JUNCTION
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[2px] w-8 bg-green-500"></div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
            Loading Artistry
          </p>
          <div className="h-[2px] w-8 bg-green-500"></div>
        </div>
      </div>

      {/* Loading Progress Bar (Fake but looks good) */}
      <div className="mt-12 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
