import React from 'react';
import { PageView } from '../types';
import { Rocket, Wrench, Layers } from 'lucide-react';

interface Props {
  currentView: PageView;
  setView: (view: PageView) => void;
}

const Navigation: React.FC<Props> = ({ currentView, setView }) => {
  const navItems = [
    { id: PageView.HOME, label: 'Home', icon: Rocket },
    { id: PageView.SERVICES, label: 'Services', icon: Layers },
    { id: PageView.TOOLS, label: 'Free AI Tools', icon: Wrench },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView(PageView.HOME)}
        >
          <div className="w-10 h-10 rounded-full lava-bg flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Rocket className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">
            ROCKET<span className="lava-text">OPP</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border border-transparent
                ${currentView === item.id 
                  ? 'bg-slate-800 text-white shadow-inner shadow-black/50 border-slate-700' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setView(PageView.CONTACT)}
          className="bg-white text-slate-950 hover:bg-orange-500 hover:text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transform hover:-translate-y-0.5"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Navigation;