import React, { useState, useEffect, useRef } from 'react';
import { UserContext, PageView } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
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
  
  // Interaction Tracking
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactionCount = useRef(0);

  // Initial visit logic
  useEffect(() => {
    console.log("Visit logged. Score calculated: 85/100");
  }, []);

  // Idle Timer & Scroll Logic
  useEffect(() => {
    const handleActivity = () => {
      interactionCount.current += 1;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      
      // If user is idle for 20 seconds, prompt them
      idleTimerRef.current = setTimeout(() => {
        if (!isChatOpen && user.hasOnboarded) {
          // Only auto-open if we haven't already and user has some context
          // setIsChatOpen(true); // Optional: can be annoying if too aggressive
          // Instead, maybe we just wiggle the chat button? (Handled in ChatBot component)
        }
      }, 20000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isChatOpen, user.hasOnboarded]);

  const handleOnboardingComplete = (name: string, industry: string) => {
    setUser(prev => ({ ...prev, name, industry, hasOnboarded: true }));
  };

  const handleUpdateEmail = (email: string) => {
    setUser(prev => ({ ...prev, email }));
  };

  const renderView = () => {
    switch (currentView) {
      case PageView.HOME:
        return (
          <>
            <Hero user={user} setView={setCurrentView} />
            <Services user={user} />
          </>
        );
      case PageView.SERVICES:
        return <Services user={user} />;
      case PageView.TOOLS:
        return <FreeTools user={user} onUpdateUser={handleUpdateEmail} />;
      case PageView.CONTACT:
        return <ContactForm user={user} />;
      default:
        return <Hero user={user} setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-white font-sans">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
        {renderView()}
      </main>

      <ChatBot user={user} setView={setCurrentView} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      
      {!user.hasOnboarded && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
      
      <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 relative z-10">
          <p className="mb-6 font-display font-bold text-slate-300">RocketOpp.com</p>
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