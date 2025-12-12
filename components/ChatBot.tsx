import React, { useState, useRef, useEffect } from 'react';
import { UserContext, ChatMessage, PageView } from '../types';
import { getChatResponse } from '../services/geminiService';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

interface Props {
  user: UserContext;
  setView: (view: PageView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatBot: React.FC<Props> = ({ user, setView, isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: `Hello ${user.name ? user.name : 'there'}! I'm RocketBot. How can I help you accelerate your ${user.industry || 'business'} today?`, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full shadow-2xl shadow-orange-900/50 flex items-center justify-center z-50 hover:scale-110 transition-transform group animate-[bounce_3s_infinite]"
        >
          <MessageSquare className="text-white w-8 h-8 fill-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900"></div>
          
          {/* Tooltip hint */}
          <div className="absolute right-full mr-4 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Sales AI
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center relative">
                <Bot className="text-white w-6 h-6" />
                <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="font-bold text-white">RocketBot</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online & Ready
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about AI, pricing, or strategy..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl transition-colors shadow-lg shadow-orange-900/20"
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