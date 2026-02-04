'use client';

import { useState } from 'react';

const ATTACKERS = [
  'Deimos', 'Brava', 'Ram', 'Sens', 'Grim', 'Flores', 'Osa',
  'Iana', 'Ace', 'Zero', 'Gridlock', 'Nøkk', 'Amaru', 'Kali', 
  'Lion', 'Finka', 'Maverick', 'Nomad', 'Jackal', 'Ying', 'Zofia', 
  'Dokkaebi', 'Buck', 'Blackbeard', 'Capitão', 'Hibana', 'Sledge', 
  'Thatcher', 'Ash', 'Thermite', 'Twitch', 'Montagne', 'Glaz', 
  'Fuze', 'Blitz', 'IQ', 'Striker', 'Rauora'
];

const DEFENDERS = [
  'Sentry', 'Skopós', 'Fenrir', 'Tubarão', 'Thunderbird', 'Thorn', 
  'Oryx', 'Melusi', 'Aruni', 'Mozzie', 'Warden', 'Goyo', 'Wamai', 
  'Maestro', 'Alibi', 'Clash', 'Kaid', 'Mira', 'Lesion', 'Ela', 
  'Vigil', 'Frost', 'Valkyrie', 'Caveira', 'Echo', 'Smoke', 'Mute', 
  'Castle', 'Pulse', 'Doc', 'Rook', 'Kapkan', 'Tachanka', 'Jäger', 
  'Bandit', 'Denari', 'Azami', 'Solis'
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<'attacker' | 'defender'>('attacker');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState<string>('---');
  const [imageError, setImageError] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedOperator('---');
    
    // Rotation aléatoire entre 1080 et 2160 degrés (3-6 tours)
    const randomRotation = 1080 + Math.random() * 1080;
    setRotation(prev => prev + randomRotation);
    
    // Sélectionner un agent aléatoire après 3 secondes
    setTimeout(() => {
      setIsSpinning(false);
      
      const operators = selectedRole === 'attacker' ? ATTACKERS : DEFENDERS;
      const randomIndex = Math.floor(Math.random() * operators.length);
      setSelectedOperator(operators[randomIndex]);
      setImageError(false); // Reset l'erreur d'image
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="flex items-center px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src="/logo-mask.png" alt="Enemy Logo" className="w-10 h-10 object-contain" />
          <div className="text-white font-bold tracking-wider">
            <span className="text-gray-300">ENEMY</span>
            <span className="text-orange-500">OPS</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-5xl font-bold mb-3 tracking-wide">
          <span className="text-white">OPERATOR </span>
          <span className="text-orange-500">ROULETTE</span>
        </h1>
        
        <p className="text-gray-400 mb-12 text-sm">
          Focused tactical selection. Toggle between roles and spin to deploy.
        </p>

        {/* Role Toggle */}
        <div className="flex gap-2 mb-16">
          <button
            onClick={() => {
              setSelectedRole('attacker');
              setSelectedOperator('---');
              setImageError(false);
            }}
            className={`px-6 py-2 rounded text-sm font-medium tracking-wide transition-all flex items-center gap-2 ${
              selectedRole === 'attacker'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="text-lg">★</span>
            ATTACKER
          </button>
          <button
            onClick={() => {
              setSelectedRole('defender');
              setSelectedOperator('---');
              setImageError(false);
            }}
            className={`px-6 py-2 rounded text-sm font-medium tracking-wide transition-all flex items-center gap-2 ${
              selectedRole === 'defender'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="text-lg">🛡</span>
            DEFENDER
          </button>
        </div>

        {/* Roulette Wheel */}
        <div className="relative mb-12">
          {/* Indicator Arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-10">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-orange-500"></div>
          </div>

          {/* Wheel Container */}
          <div className="w-80 h-80 relative">
            {/* Rotating Segments */}
            <div 
              className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-[3000ms] ease-out"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
              }}
            >
              {/* Segments */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div className={`w-full h-full ${i % 2 === 0 ? 'bg-[#1a2942]' : 'bg-[#243552]'}`}></div>
                </div>
              ))}
            </div>

            {/* Center Circle (Non-Rotating) - Pour la photo d'agent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-orange-500 border-4 border-[#0a0a0a] flex items-center justify-center z-10">
              {selectedOperator !== '---' && (
                <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex items-center justify-center">
                  <img 
                    src={`/agents/${selectedOperator}.${imageError ? 'png' : 'avif'}`} 
                    alt={selectedOperator}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selection Display */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-12 py-6 mb-8 min-w-[300px] text-center">
          <div className={`text-sm font-medium tracking-widest mb-2 ${selectedOperator === '---' ? 'text-orange-500' : 'text-green-500'}`}>
            {selectedOperator === '---' ? 'AWAITING SELECTION' : 'OPERATOR SELECTED'}
          </div>
          <div className="text-white text-2xl font-bold tracking-wider uppercase">
            {selectedOperator}
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-bold tracking-wider transition-all flex items-center gap-3 ${
            isSpinning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          SPIN
        </button>
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 border-t border-gray-800 flex items-center justify-between">
        <div className="flex flex-col gap-2 mx-auto">
          <img src="/logo-text.png" alt="ENEMYN1" className="h-8 object-contain" style={{ filter: 'brightness(0.6)' }} />
          <div className="text-gray-600 text-xs tracking-wide">
            CREATED FOR <span className="text-gray-500">ENEMY N1</span> • FOR <span className="text-gray-500">SIEGE.GG</span> • TRADEMARK OF <span className="text-gray-500">UBISOFT ENTERTAINMENT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

