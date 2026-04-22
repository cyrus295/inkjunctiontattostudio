import React, { useState, useEffect } from 'react';

const ANIME_CHARACTERS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJtZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v9N2S0m6N96O5G9X7z/giphy.gif", // Kakashi
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJtZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v9N2S0m6N96O5G9X7z/giphy.gif", // Placeholder
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJtZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bHZyZ3ZydWJ3bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v9N2S0m6N96O5G9X7z/giphy.gif", // Placeholder
];

export function AnimeCharacter({ trigger }) {
  const [visible, setVisible] = useState(false);
  const [currentChar, setCurrentChar] = useState(0);
  const [position, setPosition] = useState({ bottom: 0, right: 0 });

  useEffect(() => {
    if (trigger > 0) {
      setCurrentChar(Math.floor(Math.random() * ANIME_CHARACTERS.length));
      setPosition({
        bottom: Math.random() * 20 + 5 + "%",
        right: Math.random() * 20 + 5 + "%"
      });
      setVisible(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Hide after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div 
      className="fixed z-[100] pointer-events-none transition-all duration-500 animate-bounce"
      style={{ bottom: position.bottom, right: position.right }}
    >
      <img 
        src={ANIME_CHARACTERS[currentChar]} 
        alt="Anime character" 
        className="w-32 md:w-48 h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
}
