import React, { useState } from 'react';
import { Instagram, MessageCircle, X, ExternalLink, Mail, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER, STUDIO_EMAIL, INSTAGRAM_URL } from '../utils/constants.js';

export function SocialPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-8 h-8" />,
      url: INSTAGRAM_URL,
      color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600",
      description: "Follow our latest work & updates"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-8 h-8" />,
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "bg-green-500",
      description: "Chat with us directly for bookings"
    },
    {
      name: "SMS",
      icon: <MessageSquare className="w-8 h-8" />,
      url: `sms:${WHATSAPP_NUMBER}`,
      color: "bg-orange-500",
      description: "Send us a direct text message"
    },
    {
      name: "Email",
      icon: <Mail className="w-8 h-8" />,
      url: `mailto:${STUDIO_EMAIL}`,
      color: "bg-blue-600",
      description: "Send us your designs & inquiries"
    }
  ];

  const handleOpenLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[110] bg-black text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-500/30 hover:scale-110 hover:border-green-500 transition-all duration-300 group animate-bounce"
      >
        <div className="relative">
          <Instagram className="w-6 h-6 group-hover:opacity-0 transition-opacity duration-300" />
          <MessageCircle className="w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-500" />
        </div>
      </button>

      {/* Social Popup Modal */}
      <div className={`fixed inset-0 z-[120] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`relative bg-slate-900 border border-white/10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/50">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Connect With Us</h3>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Quick Links</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links Grid */}
          <div className="p-6 space-y-4">
            {socialLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleOpenLink(link.url)}
                className="w-full group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden text-left"
              >
                <div className={`${link.color} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-black uppercase tracking-tight text-lg italic">{link.name}</h4>
                  <p className="text-slate-500 text-xs font-medium">{link.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-slate-950/50 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Ink Junction Tattoo Studio • Professional Studio
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
