import React, { useState, useEffect, useRef } from 'react';
import { UserContext, PageView } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import FreeTools from './components/FreeTools';
import ContactForm from './components/ContactForm';
import ChatBot from './components/ChatBot';
import OnboardingModal from './components/OnboardingModal';

const App: React.FC = () => {
  const [user, setUser] = useState<UserContext>({
    name: '',
    industry: '',
    hasOnboarded: false
  });

  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  
  // Interaction Tracking
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactionCount = useRef(0);

  // Initial visit logic
  useEffect(() => {
    console.log("GA_EVENT: Session_Start | Source: Direct");
    console.log("GA_EVENT: Page_View | Path: /home");
  }, []);

  // Idle Timer & Scroll Logic
  useEffect(() => {
    const handleActivity = () => {
      interactionCount.current += 1;
      
      // If we were idle and are now moving, log it and reset
      if (isIdle) {
        setIsIdle(false);
        console.log("GA_EVENT: User_Engagement | Action: Resumed_Activity");
      }

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      
      // Strict 5-second rule for Hero interaction as requested
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        console.log("GA_EVENT: User_Idle_Trigger | Duration: 5s");
        // Trigger specific re-engagement logic in components via prop
      }, 5000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Initial timer start
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isIdle]);

  const handleOnboardingComplete = (name: string, industry: string) => {
    setUser(prev => ({ ...prev, name, industry, hasOnboarded: true }));
    console.log(`GA_EVENT: Lead_Qualification | Industry: ${industry}`);
  };

  const handleUpdateEmail = (email: string) => {
    setUser(prev => ({ ...prev, email }));
    console.log("GA_EVENT: Lead_Capture | Method: Tool_Gate");
  };

  const handleUpdateIndustry = (industry: string) => {
    setUser(prev => ({ ...prev, industry }));
    console.log(`GA_EVENT: Data_Enrichment | Industry_Update: ${industry}`);
  }

  const renderView = () => {
    switch (currentView) {
      case PageView.HOME:
        return (
          <>
            <Hero 
              user={user} 
              setView={setCurrentView} 
              isIdle={isIdle} 
              onUpdateIndustry={handleUpdateIndustry}
            />
            <Services user={user} />
          </>
        );
      case PageView.SERVICES:
        return <Services user={user} />;
      case PageView.MARKETING:
        return <ServiceDetail type="MARKETING" user={user} setView={setCurrentView} />;
      case PageView.AI_APPS:
        return <ServiceDetail type="AI_APPS" user={user} setView={setCurrentView} />;
      case PageView.WEB_DEV:
        return <ServiceDetail type="WEB_DEV" user={user} setView={setCurrentView} />;
      case PageView.TOOLS:
        return <FreeTools user={user} onUpdateUser={handleUpdateEmail} />;
      case PageView.CONTACT:
        return <ContactForm user={user} />;
      default:
        return <Hero user={user} setView={setCurrentView} isIdle={isIdle} onUpdateIndustry={handleUpdateIndustry} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-orange-500 selection:text-white font-sans relative overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-900/10 rounded-full blur-[120px]"></div>
      </div>

      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative z-10">
        {renderView()}
      </main>

      <ChatBot 
        user={user} 
        setView={setCurrentView} 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        currentView={currentView}
        isIdle={isIdle}
      />
      
      {!user.hasOnboarded && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
      
      <footer className="border-t border-slate-900 bg-black py-12 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 relative z-10">
          <div className="flex justify-center items-center gap-2 mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/9305/9305739.png" 
              alt="RocketOpp Logo" 
              className="w-8 h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <p className="font-display font-bold text-slate-300">RocketOpp.com</p>
          </div>
          <div className="flex justify-center gap-6 text-sm mb-8">
            <button onClick={() => setCurrentView(PageView.SERVICES)} className="hover:text-orange-500 transition-colors">Services</button>
            <button onClick={() => setCurrentView(PageView.TOOLS)} className="hover:text-orange-500 transition-colors">Free Tools</button>
            <button onClick={() => setCurrentView(PageView.CONTACT)} className="hover:text-orange-500 transition-colors">Contact</button>
          </div>
          <p className="text-xs">&copy; 2025 RocketOpp AI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;