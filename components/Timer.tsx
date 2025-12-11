import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

const START_TIME = 30;

export const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = useCallback(() => {
    if (timeLeft === 0) {
      // If timer ended, reset and start
      setTimeLeft(START_TIME);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  }, [isActive, timeLeft]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(START_TIME);
  }, []);

  // Format time as 00:XX
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress for a circular ring (optional visual enhancement)
  // Circumference of circle with r=190 (400px - padding) is 2 * pi * 190 ≈ 1194
  const radius = 190;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / START_TIME;
  const dashOffset = circumference - (progress * circumference);

  return (
    <div className="relative w-[400px] h-[400px] rounded-full bg-dark-panel shadow-2xl flex flex-col items-center justify-center border-8 border-zinc-700/50 box-border group">
      
      {/* SVG Progress Ring */}
      <div className="absolute inset-0 rounded-full rotate-[-90deg]">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* Background Ring */}
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke="#1a202c"
            strokeWidth="8"
          />
          {/* Progress Ring */}
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            stroke="#39FF14"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-1000 ease-linear shadow-neon-glow"
            style={{
               filter: 'drop-shadow(0 0 4px rgba(57, 255, 20, 0.6))'
            }}
          />
        </svg>
      </div>

      {/* Inner Content Container */}
      <div className="z-10 flex flex-col items-center justify-center w-full h-full p-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner-depth border border-zinc-700/30">
        
        {/* Digital Display */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Background 88:88 for LED effect (faint) */}
            <span className="absolute left-0 top-0 text-9xl font-digital font-bold text-neon-green opacity-5 blur-[1px] select-none">
              88:88
            </span>
            {/* Actual Time */}
            <span className={`text-9xl font-digital font-bold text-neon-green drop-shadow-neon-text tracking-tighter tabular-nums transition-opacity duration-300 ${timeLeft === 0 ? 'animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={toggleTimer}
            className="group/btn relative overflow-hidden rounded-full bg-zinc-900 border border-neon-green/30 px-8 py-3 transition-all hover:border-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] active:scale-95"
            aria-label={isActive ? "Pausar" : "Iniciar"}
          >
            <div className="flex items-center gap-2">
              {isActive ? (
                <Pause className="w-6 h-6 text-neon-green fill-neon-green/20" />
              ) : (
                <Play className="w-6 h-6 text-neon-green fill-neon-green/20 ml-1" />
              )}
              <span className="font-digital text-neon-green text-sm font-bold tracking-wider">
                {isActive ? 'PAUSA' : 'INICIAR'}
              </span>
            </div>
          </button>

          <button
            onClick={resetTimer}
            className="group/btn relative overflow-hidden rounded-full bg-zinc-900 border border-zinc-600 px-6 py-3 transition-all hover:border-zinc-400 hover:bg-zinc-800 active:scale-95"
            aria-label="Resetar"
          >
            <RotateCcw className="w-6 h-6 text-zinc-400 group-hover/btn:rotate-[-180deg] transition-transform duration-500" />
          </button>
        </div>
        
        {/* Status Indicator text */}
        <div className="absolute bottom-12 text-neon-green/50 font-digital text-xs tracking-[0.2em] uppercase">
          {timeLeft === 0 ? 'TEMPO ESGOTADO' : isActive ? 'CONTAGEM ATIVA' : 'AGUARDANDO'}
        </div>
      </div>
    </div>
  );
};