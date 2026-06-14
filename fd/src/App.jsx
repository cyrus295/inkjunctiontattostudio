import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen.jsx";
import { Hero } from "./components/Hero.jsx";
import { Portfolio } from "./components/Portfolio.jsx";
import { Offers } from "./components/Offers.jsx";
import { Contact } from "./components/Contact.jsx";
import { PortraitTattoos } from "./components/PortraitTattoos.jsx";
import { CoverupTattoos } from "./components/CoverupTattoos.jsx";
import { ShopEnvironment } from "./components/ShopEnvironment.jsx";
import { Artist } from "./components/Artist.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { SocialPopup } from "./components/SocialPopup.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

const ProtectedAdmin = () => {
  const [passkey, setPasskey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const correctPasskey = import.meta.env.VITE_ADMIN_PASSKEY || "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passkey === correctPasskey) {
      setIsAuthorized(true);
    } else {
      alert("Invalid Passkey");
    }
  };

  if (isAuthorized) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center backdrop-blur-xl">
        <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-black font-black italic text-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)]">IJ</div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Admin <span className="text-green-500">Access</span></h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8 italic">Personnel Authorization Required</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Enter Admin Passkey"
            className="w-full px-6 py-4 rounded-2xl bg-black border border-white/10 text-white focus:border-green-500 outline-none transition-all placeholder:text-slate-700 font-bold"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-black font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95"
          >
            Unlock Dashboard
          </button>
        </form>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-8 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors italic"
        >
          Return to Site
        </button>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/admin" element={<ProtectedAdmin />} />
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-50 relative font-body animate-in fade-in duration-700">
            <Navbar />
            <Hero />
            <div id="portfolio">
              <Portfolio />
            </div>
            <Offers />
            <PortraitTattoos />
            <CoverupTattoos />
            <ShopEnvironment />
            <Artist />
            <Contact />
            <SocialPopup />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
