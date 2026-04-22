import React, { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen.jsx";
import { TopPoster } from "./components/TopPoster.jsx";
import { Banner } from "./components/Banner.jsx";
import { Hero } from "./components/Hero.jsx";
import { Portfolio } from "./components/Portfolio.jsx";
import { Contact } from "./components/Contact.jsx";
import { PortraitTattoos } from "./components/PortraitTattoos.jsx";
import { CoverupTattoos } from "./components/CoverupTattoos.jsx";
import { TattooCost } from "./components/TattooCost.jsx";
import { ShopEnvironment } from "./components/ShopEnvironment.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { AnimeCharacter } from "./components/AnimeCharacter.jsx";
import { TattooCalculator } from "./components/TattooCalculator.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [characterTrigger, setCharacterTrigger] = useState(0);

  useEffect(() => {
    // Show loading screen for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Global click listener to trigger anime characters on button clicks
    const handleClick = (e) => {
      const isButton = e.target.closest('button');
      if (isButton) {
        setCharacterTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative font-body animate-in fade-in duration-700">
      <Navbar />
      <TopPoster />
      <Banner />
      <Hero />
      <div id="portfolio">
        <Portfolio />
      </div>
      <PortraitTattoos />
      <CoverupTattoos />
      <ShopEnvironment />
      <TattooCost />
      <Contact />
      <TattooCalculator />
      <AnimeCharacter trigger={characterTrigger} />
    </div>
  );
}

export default App;
