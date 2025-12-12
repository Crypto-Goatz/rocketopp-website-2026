import React, { useState, useEffect } from 'react';
import { UserContext, PageView } from '../types';
import { personalizeContent } from '../services/geminiService';
import { ArrowRight, Sparkles, Zap, Hand, ChevronDown } from 'lucide-react';

interface Props {
  user: UserContext;
  setView: (view: PageView) => void;
  isIdle: boolean;
  onUpdateIndustry: (industry: string) => void;
}

const Hero: React.FC<Props> = ({ user, setView, isIdle, onUpdateIndustry }) => {
  const [headline, setHeadline] = useState("AI-Powered Apps for Modern Business");
  const [subhead, setSubhead] = useState("We build self-optimizing digital experiences that convert.");
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Engagement Mode State
  const [showEngagement, setShowEngagement] = useState(false);
  const [tempIndustry, setTempIndustry] = useState('');

  // Handle Personalization
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
  }, [user.industry]);

  // Handle Idle State Trigger
  useEffect(() => {
    if (isIdle) {
      setShowEngagement(true);
    } else {
      // If user interacts, we can choose to dismiss it or keep it if they are interacting WITH the component.
      // For now, let's keep it visible until they make a choice or scroll away if needed.
      // But to be "alive", if they start moving, we might want to welcome them back.
      // Let's rely on the user explicitly closing or interacting with the dropdown.
    }
  }, [isIdle]);

  const handleQuickOptimize = (industry: string) => {
    setTempIndustry(industry);
    onUpdateIndustry(industry);
    setShowEngagement(false); // Go back to normal view which will now be optimized
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center py-20 overflow-hidden perspective-1000">
      {/* Background Ambience */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] -z-10 transition-all duration-1000 ${showEngagement ? 'scale-125 bg-red-600/30' : 'animate-pulse-slow'}`}></div>

      <div className="max-w-4xl mx-auto text-center z-10 px-4 transition-all duration-700">
        
        {/* Engagement Mode Overlay */}
        <div className={`transition-opacity duration-700 ${showEngagement ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0 flex flex-col items-center justify-center'}`}>
           <div className="bg-slate-950/80 backdrop-blur-xl border border-orange-500/50 p-12 rounded-3xl shadow-[0_0_50px_rgba(249,115,22,0.3)] max-w-2xl mx-auto transform transition-transform">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Hand className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Hey! Are you still there?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                We noticed you pausing. Let's make this worth your time. Tell us your industry, and watch this entire website rewrite itself for <span className="text-orange-500 font-bold">YOU</span>.
              </p>
              
              {!user.industry || user.industry === 'General' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Real Estate', 'Healthcare', 'Legal', 'Finance', 'SaaS', 'E-commerce'].map(ind => (
                    <button
                      key={ind}
                      onClick={() => handleQuickOptimize(ind)}
                      className="px-4 py-3 bg-slate-900 hover:bg-orange-600 hover:text-white border border-slate-800 rounded-xl transition-all font-medium text-sm"
                    >
                      {ind}
                    </button>
                  ))}
                  <button onClick={() => setShowEngagement(false)} className="col-span-full mt-4 text-slate-500 hover:text-white text-sm">
                    Just browsing, thanks.
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-6 text-orange-400 font-bold">Currently optimizing for: {user.industry}</p>
                  <button 
                    onClick={() => setView(PageView.CONTACT)}
                    className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    Let's Talk Business
                  </button>
                  <button onClick={() => setShowEngagement(false)} className="block mx-auto mt-4 text-slate-500 hover:text-white text-sm">
                    Dismiss
                  </button>
                </div>
              )}
           </div>
        </div>

        {/* Standard Hero Content */}
        <div className={`transition-all duration-700 ${showEngagement ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
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
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-lg shadow-lg shadow-orange-900/40 hover:scale-105 transition-transform flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></span>
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
      </div>

      {/* Animated Scroll Indicator - Only show if NOT engaged */}
      {!showEngagement && (
        <div 
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"
          title="Scroll Down"
        >
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] group-hover:text-orange-500 transition-colors">
            Explore
          </span>
          <div className="w-[26px] h-[42px] border-2 border-slate-700 rounded-full p-1 flex justify-center group-hover:border-orange-500 transition-colors bg-black/50 backdrop-blur-sm">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-[bounce_2s_infinite] group-hover:bg-orange-500" />
          </div>
        </div>
      )}
    </section>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default Hero;