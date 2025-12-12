import React, { useState } from 'react';

interface Props {
  onComplete: (name: string, industry: string) => void;
}

const OnboardingModal: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');

  const handleNext = () => {
    if (step === 1 && name) setStep(2);
    else if (step === 2 && industry) onComplete(name, industry);
  };

  const handleSkip = () => {
    onComplete('Guest', 'General');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Lava Effect Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold mb-2">Initialize Experience</h2>
          <p className="text-zinc-400 text-sm">Allow our AI to optimize the website for your business goals.</p>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <label className="block text-sm font-medium text-zinc-300">What should we call you?</label>
            <input 
              autoFocus
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              placeholder="First Name"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <label className="block text-sm font-medium text-zinc-300">What represents your industry?</label>
            <input 
              autoFocus
              type="text" 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              placeholder="e.g. Finance, Healthcare, Construction..."
            />
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button 
            onClick={handleSkip}
            className="flex-1 py-3 text-zinc-500 hover:text-white transition-colors font-medium"
          >
            Skip Optimization
          </button>
          <button 
            onClick={handleNext}
            disabled={(step === 1 && !name) || (step === 2 && !industry)}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-3 rounded-xl transition-all"
          >
            {step === 1 ? 'Next' : 'Launch Site'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;