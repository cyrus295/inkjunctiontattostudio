import React from 'react';

export function Banner() {
  return (
    <div className="relative w-full h-32 md:h-48 overflow-hidden bg-black border-b border-slate-800">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source
          src="/bgvideo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-[0.2em] drop-shadow-2xl">
          INK JUNCTION TATTOOS
        </h2>
      </div>
    </div>
  );
}
