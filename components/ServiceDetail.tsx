import React, { useEffect, useState } from 'react';
import { UserContext, PageView } from '../types';
import { Megaphone, Cpu, Globe, ArrowRight, CheckCircle, BarChart, Code2, Bot } from 'lucide-react';

interface Props {
  type: 'MARKETING' | 'AI_APPS' | 'WEB_DEV';
  user: UserContext;
  setView: (view: PageView) => void;
}

const contentMap = {
  MARKETING: {
    title: "Hyper-Targeted AI Marketing",
    subtitle: "Stop guessing. Start dominating with data-driven precision.",
    icon: Megaphone,
    description: "We don't just run ads; we engineer market takeovers. Using predictive analytics and autonomous content generation, RocketOpp ensures your brand is omnipresent where it matters most.",
    features: [
      "Programmatic SEO that writes itself",
      "Dynamic ad creative generation",
      "Real-time audience sentiment analysis",
      "Automated multi-channel distribution"
    ],
    stat: "400%",
    statLabel: "Avg. Lead Increase",
    seoContent: `
      <h3>The Future of Customer Acquisition</h3>
      <p>In an era of noise, relevance is currency. Traditional marketing relies on broad demographics. RocketOpp Marketing utilizes <strong>generative signals</strong> to identify intent before a search is even made.</p>
      <p>Our systems scrape millions of data points to construct a living profile of your ideal client. Whether you are in healthcare, finance, or retail, we adapt the messaging dynamically to match the exact pain points of the prospect.</p>
    `
  },
  AI_APPS: {
    title: "Enterprise AI Applications",
    subtitle: "Custom Large Language Models trained on your business DNA.",
    icon: Cpu,
    description: "Off-the-shelf AI is generic. We build custom neural networks and agentic workflows that understand your specific business logic, compliance needs, and customer voice.",
    features: [
      "Custom LLM Fine-Tuning",
      "Autonomous Customer Support Agents",
      "Internal Knowledge Base Chatbots",
      "Predictive Inventory & Logistics"
    ],
    stat: "60hrs",
    statLabel: "Saved Per Week/Emp",
    seoContent: `
      <h3>Beyond Basic Chatbots</h3>
      <p>True AI integration goes deeper than a text box. It's about <strong>workflow orchestration</strong>. We build applications that can read invoices, schedule appointments, update CRMs, and negotiate terms without human intervention.</p>
      <p>Security is paramount. Our AI solutions are built with enterprise-grade encryption and privacy safeguards, ensuring your proprietary data remains yours while leveraging the power of Gemini and other top-tier models.</p>
    `
  },
  WEB_DEV: {
    title: "Next-Gen Web Development",
    subtitle: "Websites that think, adapt, and convert in real-time.",
    icon: Globe,
    description: "Your website should be your best salesperson. We build reactive, high-performance web applications that change their content based on who is viewing them.",
    features: [
      "Real-time Industry Personalization",
      "Sub-second Load Times (Edge Hosting)",
      "3D WebGL Interactions",
      "Self-Healing SEO Structures"
    ],
    stat: "99.9%",
    statLabel: "Core Web Vitals",
    seoContent: `
      <h3>A Living Digital Presence</h3>
      <p>Static websites are dead. RocketOpp builds <strong>Dynamic Experience Platforms (DXP)</strong>. By leveraging Edge computing and AI, we serve different headlines, images, and case studies to a CEO versus a CTO.</p>
      <p>Our stack includes React, Tailwind, and Node.js, optimized for Google's latest Core Web Vitals. We ensure 100/100 scores for accessibility, SEO, and performance, giving you an unfair advantage in search rankings.</p>
    `
  }
};

const AnimatedStat = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Extract the numeric part to animate
    const match = value.match(/([\d.]+)/);
    if (!match) return;
    
    const endValue = parseFloat(match[0]);
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(endValue * ease);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  // Reconstruct string with prefix/suffix
  const match = value.match(/^([^0-9.]*)([0-9.]+)([^0-9.]*)$/);
  if (!match) return <span>{value}</span>;

  const [, prefix, numStr, suffix] = match;
  // Determine decimal places from original string
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  return (
    <span>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
};

const ServiceDetail: React.FC<Props> = ({ type, user, setView }) => {
  const content = contentMap[type];
  const Icon = content.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="pt-8 pb-24 animate-[fadeIn_0.5s_ease-out]">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-20 mb-12 group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] group-hover:bg-orange-600/20 transition-all duration-1000"></div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-700 text-orange-500 font-bold text-sm mb-6 shadow-xl">
            <Icon className="w-4 h-4" />
            <span>{type.replace('_', ' ')} SOLUTIONS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white leading-tight">
            {content.title}
          </h1>
          
          <p className="text-2xl text-zinc-400 mb-10 leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView(PageView.CONTACT)}
              className="px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView(PageView.TOOLS)}
              className="px-8 py-4 bg-transparent border border-zinc-600 text-white rounded-xl font-bold text-lg hover:border-orange-500 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              Try Free Tools
            </button>
          </div>
        </div>
      </div>

      {/* Stats & Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-2xl">
          <div className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
            <AnimatedStat value={content.stat} />
          </div>
          <p className="text-zinc-400 font-bold tracking-widest text-sm uppercase">{content.statLabel}</p>
        </div>
        
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="text-orange-500" /> Core Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-orange-500/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="font-medium text-zinc-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep Dive Content (SEO) */}
      <div className="prose prose-invert prose-lg max-w-none">
        <div className="border-l-4 border-orange-600 pl-6 mb-8">
           <p className="text-xl text-zinc-300 italic">
             "For businesses in the {user.industry || 'modern'} sector, adapting to {content.title.toLowerCase()} is no longer optional—it's survival."
           </p>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: content.seoContent }} className="text-zinc-300 space-y-6" />
        
        {/* Why RocketOpp Section */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 rounded-2xl mt-12 border border-zinc-700 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px] group-hover:bg-orange-500/20 transition-all"></div>
           <div className="relative z-10">
               <h3 className="text-2xl font-bold text-white mb-4">Why RocketOpp?</h3>
               <p className="text-zinc-400 mb-6 max-w-2xl text-lg">
                 We combine <strong>Gemini 2.5 Flash speed</strong> with <strong>Gemini 3 Pro reasoning</strong> to deliver solutions that are not just fast, but intelligent. We don't build deliverables; we build assets that appreciate in value over time.
               </p>
               <button 
                 onClick={() => setView(PageView.CONTACT)}
                 className="px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 shadow-lg transform hover:-translate-y-1"
               >
                 Schedule a Consultation <ArrowRight className="w-4 h-4" />
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;