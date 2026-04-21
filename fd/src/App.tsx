import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { Contact } from "./components/Contact";

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;

