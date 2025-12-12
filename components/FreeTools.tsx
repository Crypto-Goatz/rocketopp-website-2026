import React, { useState } from 'react';
import { UserContext } from '../types';
import TrendDashboard from './TrendDashboard';
import ImageStudio from './ImageStudio';
import StrategyCenter from './StrategyCenter';
import { Lock, Unlock, Mail, ArrowRight } from 'lucide-react';

interface Props {
  user: UserContext;
  onUpdateUser: (email: string) => void;
}

const FreeTools: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'trends' | 'studio' | 'strategy'>('trends');
  const [emailInput, setEmailInput] = useState('');

  const isLocked = !user.email;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      onUpdateUser(emailInput);
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 to-transparent pointer-events-none"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <Lock className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">Unlock <span className="lava-text">AI Arsenal</span></h2>
            <p className="text-slate-400">
              Access our premium suite of self-optimizing tools including Trend Pulse, Visual Studio, and Strategic Thinking Core.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 relative z-10">
            <div>
              <label className="text-xs uppercase font-bold text-slate-500 tracking-wider ml-1">Business Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Grant Access
            </button>
          </form>
          
          <p className="text-center text-xs text-slate-600 mt-6 relative z-10">
            Join 10,000+ businesses optimizing with RocketOpp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-4">
        <div>
          <h1 className="text-4xl font-display font-bold">Free <span className="lava-text">AI Tools</span></h1>
          <p className="text-slate-400">Experimental features powered by Gemini 2.5 & 3.0 Pro.</p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-xl mt-4 md:mt-0 overflow-x-auto max-w-full">
          {[
            { id: 'trends', label: 'Market Pulse' },
            { id: 'studio', label: 'Visual Studio' },
            { id: 'strategy', label: 'Strategy Core' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950/50 border border-slate-900 rounded-3xl p-6 min-h-[600px]">
        {activeTab === 'trends' && <TrendDashboard user={user} />}
        {activeTab === 'studio' && <ImageStudio user={user} />}
        {activeTab === 'strategy' && <StrategyCenter user={user} />}
      </div>
    </div>
  );
};

export default FreeTools;