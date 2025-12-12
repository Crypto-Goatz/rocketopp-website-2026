import React, { useState, useEffect } from 'react';
import { UserContext, PageView } from '../types';
import { personalizeContent } from '../services/geminiService';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface Props {
  user: UserContext;
  setView: (view: PageView) => void;
}

const Hero: React.FC<Props> = ({ user, setView }) => {
  const [headline, setHeadline] = useState("AI-Powered Apps for Modern Business");
  const [subhead, setSubhead] = useState("We build self-optimizing digital experiences that convert.");
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    if (user.industry && user.industry !== 'General') {
      setIsOptimizing(true);
      const optimize = async () => {
        const newHeadline = await personalizeContent("AI-Powered Apps for Modern Business", user, 'heading');
        const newSubhead = await personalizeContent("We build self-optimizing digital experiences that convert visitors into revenue through intelligent automation.", user, 'paragraph');
        setHeadline(newHeadline);
        setSubhead(newSubhead);
        setIsOptimizing(false);
      };
      optimize();
    }
  }, [user]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto text-center z-10 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-orange-400 mb-8 uppercase tracking-widest backdrop-blur-sm shadow-xl">
          {isOptimizing ? <Loader2 className="animate-spin w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          {isOptimizing ? "Calibrating to industry..." : `Optimized for ${user.industry || 'Business'}`}
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
          <span className="bg-gradient-to-br from-white via-slate-200 to-slate-500 text-transparent bg-clip-text drop-shadow-sm">
            {headline}
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subhead}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setView(PageView.CONTACT)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/40 hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Start Your Transformation <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setView(PageView.TOOLS)}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-yellow-400" /> Free AI Tools
          </button>
        </div>

        {/* Dynamic Metric */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-slate-800 pt-8 opacity-70">
          <div>
            <div className="text-3xl font-display font-bold text-white">98%</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Optimization</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white">24/7</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white">10x</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">ROI</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default Hero;