import React from 'react';
import { UserContext } from '../types';
import { Bot, Globe, BarChart, Code, Cpu, MessageSquare } from 'lucide-react';

interface Props {
  user: UserContext;
}

const ServiceCard: React.FC<{ 
  title: string; 
  desc: string; 
  icon: React.ElementType;
  className?: string;
}> = ({ title, desc, icon: Icon, className }) => (
  <div className={`p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:-translate-y-2 group ${className}`}>
    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 transition-all duration-500">
      <Icon className="w-7 h-7 text-slate-300 group-hover:text-white" />
    </div>
    <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{desc}</p>
  </div>
);

const Services: React.FC<Props> = ({ user }) => {
  const isSpecific = user.industry && user.industry !== 'General';

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Future-Proof <span className="lava-text">Capabilities</span>
        </h2>
        <p className="text-lg text-slate-400">
          {isSpecific 
            ? `We engineer intelligent digital ecosystems specifically for the ${user.industry} sector. Stop competing and start dominating.` 
            : "We don't just build websites; we build self-optimizing business engines driven by artificial intelligence."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          title="AI-Native Web Design"
          desc={isSpecific ? `Adaptive interfaces that personalize content for every ${user.industry} visitor in real-time.` : "Fluid, responsive, and intelligent. Our sites adapt content based on visitor behavior and demographics."}
          icon={Globe}
        />
        <ServiceCard 
          title="Autonomous SEO"
          desc="Self-writing blogs and programmatic pages that track trends and rank automatically without human input."
          icon={BarChart}
        />
        <ServiceCard 
          title="CRM Automation"
          desc="Seamlessly integrate with GoHighLevel, Salesforce, and HubSpot. Automate follow-ups, pipelines, and reporting."
          icon={Code}
        />
        <ServiceCard 
          title="Voice & Chat Agents"
          desc={isSpecific ? `Deploy 24/7 AI sales reps trained on ${user.industry} knowledge to close deals while you sleep.` : "Human-like AI agents that handle support, booking, and sales qualification across SMS, Web, and Phone."}
          icon={Bot}
        />
        <ServiceCard 
          title="Workflow Intelligence"
          desc="Eliminate repetitive tasks. We build custom AI logic to handle invoicing, scheduling, and data entry."
          icon={Cpu}
        />
        <ServiceCard 
          title="Reputation Management"
          desc="Automated review generation and response systems that build trust and authority on autopilot."
          icon={MessageSquare}
        />
      </div>
    </section>
  );
};

export default Services;