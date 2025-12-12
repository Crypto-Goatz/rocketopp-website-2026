import React, { useState } from 'react';
import { PageView } from '../types';
import { Rocket, Wrench, ChevronDown, Megaphone, Cpu, Globe, ArrowRight } from 'lucide-react';

interface Props {
  currentView: PageView;
  setView: (view: PageView) => void;
}

const Navigation: React.FC<Props> = ({ currentView, setView }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200); // Small delay to allow moving to the menu
    setMenuTimeout(timeout);
  };

  const navItemClass = (isActive: boolean) => `
    px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-transparent
    ${isActive 
      ? 'bg-zinc-800 text-white shadow-inner shadow-black/50 border-zinc-700' 
      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
    }
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView(PageView.HOME)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/9305/9305739.png" 
              alt="RocketOpp Logo" 
              className="w-10 h-10 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white">
            ROCKET<span className="lava-text">OPP</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setView(PageView.HOME)}
            className={navItemClass(currentView === PageView.HOME)}
          >
            <Rocket className="w-4 h-4" /> Home
          </button>

          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={navItemClass([PageView.SERVICES, PageView.MARKETING, PageView.AI_APPS, PageView.WEB_DEV].includes(currentView))}
              onClick={() => setView(PageView.SERVICES)}
            >
              Services <ChevronDown className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mega Menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px]">
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none"></div>
                  
                  {[
                    { id: PageView.MARKETING, label: 'Marketing', icon: Megaphone, desc: 'AI-driven campaigns' },
                    { id: PageView.AI_APPS, label: 'AI Apps', icon: Cpu, desc: 'Custom LLM integration' },
                    { id: PageView.WEB_DEV, label: 'Web Dev', icon: Globe, desc: 'Self-optimizing sites' },
                  ].map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => { setView(item.id); setIsServicesOpen(false); }}
                      className="group cursor-pointer p-4 rounded-xl hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800"
                    >
                      <div className="w-10 h-10 bg-zinc-900 group-hover:bg-orange-600 rounded-lg flex items-center justify-center mb-3 transition-colors">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{item.label}</h4>
                      <p className="text-xs text-zinc-500 mb-3 leading-tight">{item.desc}</p>
                      <span className="text-xs font-bold text-zinc-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Learn More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setView(PageView.TOOLS)}
            className={navItemClass(currentView === PageView.TOOLS)}
          >
            <Wrench className="w-4 h-4" /> Free AI Tools
          </button>
        </div>

        <button 
          onClick={() => setView(PageView.CONTACT)}
          className="bg-white text-black hover:bg-orange-500 hover:text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transform hover:-translate-y-0.5"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navigation;