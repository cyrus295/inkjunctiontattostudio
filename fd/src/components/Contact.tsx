import { Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { WHATSAPP_NUMBER, STUDIO_ADDRESS, GOOGLE_MAPS_URL } from "../utils/constants";

export function Contact() {
  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20saw%20your%20work%20online%20%E2%80%94%20can%20I%20book%20a%20consultation%3F`, "_blank");
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Ready to start your tattoo journey? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="text-slate-300 hover:text-green-500 transition-colors text-lg"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="bg-slate-700 rounded-full p-3 flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-slate-300 text-lg">{STUDIO_ADDRESS}</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-6">
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-full font-semibold"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Message on WhatsApp
              </Button>
              <p className="text-slate-400 text-sm mt-3">
                Fastest response time • No signup required
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-auto">
            <iframe
              src={GOOGLE_MAPS_URL}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Fixed WhatsApp Button (Mobile) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20saw%20your%20work%20online%20%E2%80%94%20can%20I%20book%20a%20consultation%3F`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 sm:hidden"
      >
        <div className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-2xl transition-transform hover:scale-110">
          <MessageCircle className="h-8 w-8" />
        </div>
      </a>
    </section>
  );
}