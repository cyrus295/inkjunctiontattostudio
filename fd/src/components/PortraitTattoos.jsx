import { useState } from 'react';
import { useData } from "../hooks/useData";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";

// Local portrait files from /public/port/
const defaultPortraitTattoos = [
  { id: 1,  type: "image", src: "/port/photo_6161212547432911794_y.jpg", caption: "Portrait Tattoo" },
  { id: 2,  type: "image", src: "/port/photo_6161212547432911795_y.jpg", caption: "Portrait Tattoo" },
  { id: 3,  type: "image", src: "/port/photo_6161212547432911796_y.jpg", caption: "Portrait Tattoo" },
  { id: 4,  type: "image", src: "/port/photo_6161212547432911797_y.jpg", caption: "Portrait Tattoo" },
  { id: 5,  type: "image", src: "/port/photo_6161212547432911798_y.jpg", caption: "Portrait Tattoo" },
  { id: 6,  type: "image", src: "/port/photo_6161212547432911799_y.jpg", caption: "Portrait Tattoo" },
  { id: 7,  type: "image", src: "/port/photo_6161212547432911800_y.jpg", caption: "Portrait Tattoo" },
  { id: 8,  type: "image", src: "/port/photo_6161212547432911801_y.jpg", caption: "Portrait Tattoo" },
  { id: 9,  type: "image", src: "/port/photo_6161212547432911802_y.jpg", caption: "Portrait Tattoo" },
  { id: 10, type: "image", src: "/port/photo_6161212547432911803_y.jpg", caption: "Portrait Tattoo" },
  { id: 11, type: "video", src: "/port/document_6161212546972919696.mp4", caption: "Portrait Work" },
  { id: 12, type: "video", src: "/port/document_6161212546972919697.mp4", caption: "Portrait Work" },
  { id: 13, type: "video", src: "/port/document_6161212546972919698.mp4", caption: "Portrait Work" },
  { id: 14, type: "video", src: "/port/document_6161212546972919699.mp4", caption: "Portrait Work" },
  { id: 15, type: "video", src: "/port/document_6161212546972919700.mp4", caption: "Portrait Work" },
];

export function PortraitTattoos() {
  const { portfolio } = useData();
  const [isPaused, setIsPaused] = useState(false);

  // Use database items if available, otherwise use local files
  const portraitItems = portfolio.filter(item =>
    item.style?.toLowerCase().includes('portrait')
  );
  const displayItems = portraitItems.length > 0 ? portraitItems : defaultPortraitTattoos;

  // Double for seamless loop
  const marqueeItems = [...displayItems, ...displayItems];

  const normalizeSrc = (src) => {
    if (!src) return "";
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return src;
    return `${SOCKET_URL}/${src}`;
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
              {item.type === "video" ? (
                <video
                  src={normalizeSrc(item.src)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <img
                  src={normalizeSrc(item.src)}
                  alt={item.caption}
                  className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
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
