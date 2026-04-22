import React, { useState, useEffect } from 'react';
import { Calculator, X, Send, Ruler, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { WHATSAPP_NUMBER } from '../utils/constants.js';

export function TattooCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [estimate, setEstimate] = useState(0);

  const bodyParts = [
    'Forearm', 'Wrist', 'Shoulder', 'Chest', 'Back', 'Neck', 'Ankle', 'Thigh', 'Ribs'
  ];

  // Logic: Base price is 1000, then roughly 500 per inch for small, 800 per inch for medium/large
  useEffect(() => {
    const numSize = parseFloat(size);
    if (!isNaN(numSize) && numSize > 0) {
      let price = 0;
      if (numSize <= 2) {
        price = 1000;
      } else if (numSize <= 5) {
        price = 1000 + (numSize - 2) * 800;
      } else {
        price = 3400 + (numSize - 5) * 1200;
      }
      setEstimate(Math.round(price));
    } else {
      setEstimate(0);
    }
  }, [size]);

  const handleWhatsAppRedirect = () => {
    const message = `Hi Ink Junction! I used your Tattoo Calculator:%0A- Size: ${size} inches%0A- Body Part: ${bodyPart}%0A- Estimated Cost: ₹${estimate}%0A%0A Can we discuss this design further?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[110] bg-green-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-110 hover:rotate-12 transition-all duration-300 group"
      >
        <Calculator className="w-8 h-8 group-hover:animate-pulse" />
        <span className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Price Calculator
        </span>
      </button>

      {/* Pop-up Mini Frame */}
      <div className={`fixed inset-0 z-[120] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`relative bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Tattoo Estimator</h3>
              <p className="text-green-100 text-xs uppercase tracking-widest font-bold">Smart Pricing</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Size Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <Ruler className="w-4 h-4 text-green-500" />
                Tattoo Size (Inches)
              </label>
              <input 
                type="number" 
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Enter size (e.g. 4)"
                className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 text-white text-xl focus:border-green-500 outline-none transition-all"
              />
            </div>

            {/* Body Part Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <UserIcon className="w-4 h-4 text-green-500" />
                Body Part
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bodyParts.map((part) => (
                  <button
                    key={part}
                    onClick={() => setBodyPart(part)}
                    className={`px-2 py-3 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all ${
                      bodyPart === part 
                      ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {part}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 text-center">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-[0.2em] mb-2">Estimated Amount</p>
              <div className="text-5xl font-black text-white">
                <span className="text-green-500 text-3xl mr-1">₹</span>
                {estimate || '0'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleWhatsAppRedirect}
                disabled={!size || !bodyPart}
                variant="green"
                className="flex-1 py-4 text-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Send to WhatsApp
              </Button>
            </div>

            <p className="text-slate-600 text-[10px] text-center italic">
              * This is a rough estimate. Final price confirmed after design review.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
