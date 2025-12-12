import React, { useState } from 'react';
import { UserContext } from '../types';
import TrendDashboard from './TrendDashboard';
import ImageStudio from './ImageStudio';
import StrategyCenter from './StrategyCenter';
import { Lock, Unlock, Mail, ArrowRight, TrendingUp, Image as ImageIcon, BrainCircuit, X } from 'lucide-react';

interface Props {
  user: UserContext;
  onUpdateUser: (email: string) => void;
}

const FreeTools: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [activeTool, setActiveTool] = useState<'trends' | 'studio' | 'strategy' | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [showGate, setShowGate] = useState(false);
  const [pendingTool, setPendingTool] = useState<'trends' | 'studio' | 'strategy' | null>(null);

  const handleLaunch = (tool: 'trends' | 'studio' | 'strategy') => {
    if (user.email) {
      setActiveTool(tool);
    } else {
      setPendingTool(tool);
      setShowGate(true);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      onUpdateUser(emailInput);
      setShowGate(false);
      if (pendingTool) {
        setActiveTool(pendingTool);
      }
    }
  };

  // Render the specific tool if active
  if (activeTool) {
    return (
      <div className="max-w-7xl mx-auto py-8 animate-[fadeIn_0.5s_ease-out]">
        <button 
          onClick={() => setActiveTool(null)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Tools
        </button>
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 min-h-[600px] shadow-2xl relative overflow-hidden">
           {/* Background noise texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
           
           <div className="relative z-10 h-full">
            {activeTool === 'trends' && <TrendDashboard user={user} />}
            {activeTool === 'studio' && <ImageStudio user={user} />}
            {activeTool === 'strategy' && <StrategyCenter user={user} />}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 relative">
      {/* Lead Capture Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-out]">
           <div className="max-w-md w-full bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
            <button onClick={() => setShowGate(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 to-transparent pointer-events-none"></div>
            
            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-2 text-white">Unlock <span className="lava-text">Access</span></h2>
              <p className="text-slate-400">
                Enter your business email to launch our premium AI tools.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 relative z-10">
              <div>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-black border border-slate-800 rounded-xl pl-10 pr-4 py-4 text-white focus:border-orange-500 focus:outline-none transition-colors shadow-inner"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Unlock className="w-4 h-4" /> Grant Access
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
          RocketOpp <span className="lava-text">Lab</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore our experimental suite of AI-powered utilities. 
          Generate assets, analyze markets, and strategize in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Module 1 */}
        <div className="group bg-slate-950 border border-slate-900 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.1)] flex flex-col">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-slate-800">
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Market Pulse</h3>
          <p className="text-slate-500 mb-8 leading-relaxed flex-1">
            Real-time industry scanning using Gemini Grounding. Detect emerging trends and generate blog ideas tailored to your sector.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 mb-8 text-xs text-slate-400 font-mono border border-slate-800">
            > Scanning 4B+ Pages...<br/>
            > Identifying Keywords...<br/>
            > Analyzing Sentiment...
          </div>
          <button 
            onClick={() => handleLaunch('trends')}
            className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
          >
            Launch Tool <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Module 2 */}
        <div className="group bg-slate-950 border border-slate-900 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.1)] flex flex-col">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-slate-800">
            <ImageIcon className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Visual Studio</h3>
          <p className="text-slate-500 mb-8 leading-relaxed flex-1">
            Create 4K brand assets or edit existing imagery with natural language. Powered by Imagen 3 and Gemini Flash.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 mb-8 text-xs text-slate-400 font-mono border border-slate-800">
            > Generating 4K Texture...<br/>
            > Applying Lighting...<br/>
            > Rendering Output...
          </div>
          <button 
            onClick={() => handleLaunch('studio')}
            className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
          >
            Launch Tool <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Module 3 */}
        <div className="group bg-slate-950 border border-slate-900 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.1)] flex flex-col">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-slate-800">
            <BrainCircuit className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Strategy Core</h3>
          <p className="text-slate-500 mb-8 leading-relaxed flex-1">
            Gemini Thinking Mode analyzes your business bottlenecks and formulates a 3-step digital transformation plan.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 mb-8 text-xs text-slate-400 font-mono border border-slate-800">
            > Allocating Tokens...<br/>
            > Reasoning (Chain-of-Thought)...<br/>
            > Formulating Strategy...
          </div>
          <button 
            onClick={() => handleLaunch('strategy')}
            className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
          >
            Launch Tool <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeTools;