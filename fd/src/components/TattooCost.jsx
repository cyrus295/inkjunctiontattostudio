import React from "react";
import { DollarSign, Maximize, Palette, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { WHATSAPP_NUMBER } from "../utils/constants.js";

export function TattooCost() {
  const pricingFactors = [
    {
      icon: <Maximize className="w-6 h-6 text-green-500" />,
      title: "Size & Complexity",
      description: "Larger designs or those with intricate details require more time and precision."
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Time Required",
      description: "Hourly rates may apply for large projects like sleeves or back pieces."
    },
    {
      icon: <Palette className="w-6 h-6 text-green-500" />,
      title: "Color vs. Black & Grey",
      description: "Full-color tattoos often take longer and use more materials than black and grey."
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-500" />,
      title: "Placement",
      description: "Certain areas of the body are more challenging to tattoo and may affect the price."
    }
  ];

  const estimatedPrices = [
    { size: "Minimum Price", price: "Starts from ₹1,000", detail: "For very small, simple designs (1-2 inches)." },
    { size: "Small Tattoos", price: "₹2,500 - ₹5,000", detail: "Palm-sized designs with moderate detail." },
    { size: "Medium Tattoos", price: "₹6,000 - ₹12,000", detail: "Hand-sized or slightly larger detailed pieces." },
    { size: "Large Pieces", price: "Contact for Quote", detail: "Sleeves, back pieces, and custom large-scale art." }
  ];

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'd%20like%20to%20get%20a%20price%20estimate%20for%20a%20tattoo.`, "_blank");
  };

  return (
    <section id="cost" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            Tattoo <span className="text-green-500">Cost Guide</span>
          </h2>
          <div className="h-1.5 w-24 bg-green-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transparent pricing based on quality and expertise. Every piece is unique, so costs vary based on several factors.
          </p>
        </div>

        {/* Pricing Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingFactors.map((factor, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:border-green-500/50 transition-all duration-300 group"
            >
              <div className="bg-slate-900 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                {factor.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{factor.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* Price Estimates Table/Cards */}
        <div className="bg-slate-800/30 rounded-3xl p-8 md:p-12 border border-slate-800">
          <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <DollarSign className="text-green-500" />
            Estimated Starting Prices
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {estimatedPrices.map((item, index) => (
              <div key={index} className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
                <div>
                  <h4 className="text-green-500 font-bold text-sm uppercase tracking-widest mb-2">{item.size}</h4>
                  <div className="text-2xl font-black mb-4">{item.price}</div>
                </div>
                <p className="text-slate-500 text-sm italic">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-8 italic">
              * Note: These are rough estimates. Final price depends on the specific design and complexity.
            </p>
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              variant="green"
              className="text-xl font-bold"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Get a Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
