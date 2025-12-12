import React, { useState } from 'react';
import { UserContext } from '../types';
import { generateStrategy } from '../services/geminiService';
import { BrainCircuit, Loader2, Mail, CheckCircle, Lock } from 'lucide-react';

const StrategyCenter: React.FC<{ user: UserContext }> = ({ user }) => {
  const [challenge, setChallenge] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleStrategize = async () => {
    if (!challenge) return;
    setIsThinking(true);
    
    // Simulate thinking process with Gemini
    await generateStrategy(user.industry || 'Business', challenge);
    
    // Simulate delay for "email sending"
    setTimeout(() => {
      setIsThinking(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s_ease-out]">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Strategy Generated</h3>
        <p className="text-slate-400 mb-6 max-w-md">
          A comprehensive 3-step digital transformation plan has been securely transmitted to <span className="text-white font-bold">{user.email}</span>.
        </p>
        <button 
          onClick={() => { setIsSent(false); setChallenge(''); }}
          className="text-orange-500 hover:text-orange-400 text-sm font-bold uppercase tracking-wider"
        >
          Create Another Strategy
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BrainCircuit className="text-indigo-400" /> 
          Deep Strategy Core
        </h3>
        <p className="text-slate-400 text-sm">
          Gemini 3 Pro Thinking Mode (32k Token Budget).
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <label className="text-sm font-medium text-slate-300">
          Describe your current business bottleneck:
        </label>
        <textarea 
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none resize-none placeholder:text-slate-600"
          placeholder={`e.g., We are struggling to convert leads in the ${user.industry || 'market'} sector...`}
        />
        
        <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl flex items-start gap-3">
          <Lock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-indigo-200">
            <strong>Security Notice:</strong> Due to the high value of this strategic output, 
            the full report will be delivered exclusively to your registered email address.
          </p>
        </div>

        <button 
          onClick={handleStrategize}
          disabled={isThinking || !challenge}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-900/50"
        >
          {isThinking ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> formulate(strategy)...
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" /> Generate & Email Strategy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StrategyCenter;