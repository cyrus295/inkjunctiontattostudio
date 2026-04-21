import { useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowDown, MessageCircle } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/6362496667?text=Hi%2C%20I%20saw%20your%20work%20online%20%E2%80%94%20can%20I%20book%20a%20consultation%3F", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/bgvideo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 p-4 rounded-full shadow-2xl">
            <img
              src="/logo.jpg"
              alt="Ink Junction Tattoos Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Ink Junction
          <span className="block text-green-500 mt-2">Tattoos Studio </span>
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-12 font-light">
          Creating art that lives forever
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 rounded-full font-semibold"
          >
            <ArrowDown className="mr-2 h-5 w-5" />
            View Our Portfolio
          </Button>
          
          <Button
            onClick={openWhatsApp}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-full font-semibold"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Book a Consultation
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-slate-400" />
      </div>
    </section>
  );
}