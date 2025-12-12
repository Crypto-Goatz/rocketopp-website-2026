import React, { useState } from 'react';
import { UserContext } from '../types';
import { CheckCircle, Send } from 'lucide-react';

const ContactForm: React.FC<{ user: UserContext }> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '',
    company: user.company || '',
    industry: user.industry || '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate webhook to GoHighLevel
    console.log("Sending to GHL Webhook:", formData);
    
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-4xl font-display font-bold mb-4">Transmission Received</h2>
        <p className="text-zinc-400 text-lg">
          RocketOpp is analyzing your data. An expert agent will contact you shortly to begin your transformation.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold mb-4">Let's <span className="lava-text">Talk Business</span></h2>
        <p className="text-zinc-400">Fill out the intelligence briefing below.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-bl-full pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Company Name</label>
            <input 
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Phone</label>
            <input 
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="mb-8 space-y-2">
          <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Industry / Vertical</label>
          <input 
            required
            type="text"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            placeholder="e.g. Legal, Medical, Real Estate..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-900/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          Initialize Contact <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;