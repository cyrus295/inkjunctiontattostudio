import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

export function Hero() {
  const { content } = useData();
  const videoRef = useRef(null);

  const normalizeSrc = (src, fallback) => {
    if (src && src.trim()) {
      if (src.startsWith('http') || src.startsWith('data:')) return src;
      if (src.startsWith('/img/') || src.startsWith('/uploads/')) {
        return `${SOCKET_URL}${src}`;
      }
      return src.startsWith('/') ? src : `/${src}`;
    }

    return fallback;
  };

  // Ensure seamless looping
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        video.currentTime = 0;
        video.play();
      };
      video.addEventListener("ended", handleEnded);
      return () => video.removeEventListener("ended", handleEnded);
    }
  }, []);

  const heroVideo = normalizeSrc(content.heroVideo, "/bgvideo.mp4");

  return (
    <section className="relative h-[110vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Video Background */}
      <video
        key={heroVideo}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={heroVideo}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic text-center md:text-left">
            {content.heroTitle || "Ink Junction"}
            <span className="block text-green-500 mt-2">{content.heroSubtitle || "Studio"}</span>
          </h1>

          {/* Logo beside the name on desktop, below on mobile */}
          <div className="bg-black backdrop-blur-md border-[6px] border-black p-2 rounded-full shadow-2xl transition-transform duration-700 hover:rotate-[360deg] hover:scale-110 ring-4 ring-white/10 shrink-0">
            <img
              src="/logo.jpg"
              alt="Ink Junction Tattoos Logo"
              className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 mt-12 font-light uppercase tracking-[0.3em]">
          {content.heroBio || "Creating art that lives forever"}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-green-500" />
      </div>
    </section>
  );
}
