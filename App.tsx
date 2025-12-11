import React from 'react';
import { Timer } from './components/Timer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />
      
      <main className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-neon-green font-digital text-2xl md:text-3xl tracking-widest uppercase opacity-80 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">
          Cronômetro Digital
        </h1>
        <Timer />
      </main>
    </div>
  );
};

export default App;