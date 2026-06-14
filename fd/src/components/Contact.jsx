import { Phone, MapPin, MessageCircle, Map as MapIcon, Navigation } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { useData } from "../hooks/useData";
import { WHATSAPP_NUMBER, STUDIO_ADDRESS, GOOGLE_MAPS_URL, CLICKABLE_MAPS_URL } from "../utils/constants.js";

export function Contact() {
  const { content } = useData();
  
  const phone = content.phone || WHATSAPP_NUMBER;
  const address = content.address || STUDIO_ADDRESS;
  const hours = content.hours || "11AM - 9PM";
  const mapsUrl = content.mapsUrl || GOOGLE_MAPS_URL;
  const clickableMapsUrl = content.clickableMapsUrl || CLICKABLE_MAPS_URL;

  const openLocation = () => {
    window.open(clickableMapsUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Abstract Background Art */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Creative Location Card */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1 border border-green-500/30 rounded-full bg-green-500/5 mb-4">
              <span className="text-green-500 text-xs font-bold uppercase tracking-[0.3em]">Find Us</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter">
              THE <span className="text-green-500">SPOT</span>
            </h2>

            <div className="group relative p-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-green-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Navigation className="w-12 h-12 text-green-500" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-green-500">
                  <MapIcon className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-widest text-sm">Studio HQ</span>
                </div>
                
                <p className="text-2xl text-white font-medium leading-tight max-w-sm">
                  {address}
                </p>

                <Button 
                  onClick={openLocation}
                  variant="primary" 
                  className="group/btn"
                >
                  Get Directions
                  <Navigation className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="flex gap-12 pt-4">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Call Us</p>
                <a href={`tel:${phone}`} className="text-xl text-white font-bold hover:text-green-500 transition-colors">
                  {phone}
                </a>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Hours</p>
                <p className="text-xl text-white font-bold">{hours}</p>
              </div>
            </div>
          </div>

          {/* Artistic Map Frame */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-75 animate-pulse" />
            <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-slate-900 rounded-[3rem] p-4 border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-1000">
                <iframe
                  key={mapsUrl}
                  src={mapsUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Artistic Overlay Frame */}
              <div className="absolute inset-0 pointer-events-none border-[20px] border-slate-900 rounded-[2.5rem]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
