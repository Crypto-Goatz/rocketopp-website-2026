import React, { useState, useRef, useEffect } from 'react';
import { UserContext, ChatMessage, PageView } from '../types';
import { getChatResponse } from '../services/geminiService';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

interface Props {
  user: UserContext;
  setView: (view: PageView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView?: PageView;
  isIdle?: boolean;
}

const ChatBot: React.FC<Props> = ({ user, setView, isOpen, setIsOpen, currentView, isIdle }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: `Hello ${user.name ? user.name : 'there'}! I'm RocketBot. How can I help you accelerate your ${user.industry || 'business'} today?`, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNudged, setHasNudged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Proactive Nudging Logic based on Views and IDLE state
  useEffect(() => {
    if (isOpen) return;

    let timeout: ReturnType<typeof setTimeout>;

    // Idle trigger for Chat
    if (isIdle && !hasNudged) {
      setMessages(prev => [...prev, { role: 'model', content: "I noticed you're thinking. Can I answer a question about our pricing or how we integrate with your stack?", timestamp: new Date() }]);
      setHasNudged(true);
      setIsOpen(true);
      return;
    }
    
    // View-based triggers (fallback if not idle)
    if (!hasNudged) {
        if (currentView === PageView.TOOLS) {
            timeout = setTimeout(() => {
                setMessages(prev => [...prev, { role: 'model', content: "These tools are powerful. Need help analyzing the data?", timestamp: new Date() }]);
                setHasNudged(true);
                setIsOpen(true);
            }, 15000);
        } else if (currentView === PageView.MARKETING || currentView === PageView.AI_APPS) {
            timeout = setTimeout(() => {
                setMessages(prev => [...prev, { role: 'model', content: "I can build a custom quote for this service in seconds. Want to see pricing?", timestamp: new Date() }]);
                setHasNudged(true);
                setIsOpen(true);
            }, 10000);
        }
    }

    return () => clearTimeout(timeout);
  }, [currentView, isOpen, hasNudged, setIsOpen, isIdle]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const responseText = await getChatResponse(history, userMsg.content, user);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', content: responseText, timestamp: new Date() }]);
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center z-50 hover:scale-110 transition-transform group ${isIdle ? 'animate-bounce' : ''}`}
        >
          <MessageSquare className="text-black w-8 h-8 fill-black" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-black"></div>
          
          {/* Tooltip hint */}
          <div className="absolute right-full mr-4 bg-zinc-800 text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Sales AI
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-zinc-900 p-4 flex justify-between items-center border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                <Bot className="text-black w-6 h-6" />
                <Sparkles className="w-3 h-3 text-orange-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="font-bold text-white">RocketBot</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online & Ready
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-br-none' 
                      : 'bg-zinc-900 text-zinc-200 rounded-bl-none border border-zinc-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about AI, pricing, or strategy..."
              className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="bg-white hover:bg-zinc-200 text-black p-3 rounded-xl transition-colors shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;