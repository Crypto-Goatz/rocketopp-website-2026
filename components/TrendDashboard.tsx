import React, { useState } from 'react';
import { UserContext, BlogPost } from '../types';
import { getTrendingTopics } from '../services/geminiService';
import { Search, Loader2, Newspaper, TrendingUp } from 'lucide-react';

const TrendDashboard: React.FC<{ user: UserContext }> = ({ user }) => {
  const [trends, setTrends] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [targetIndustry, setTargetIndustry] = useState(user.industry || 'Technology');

  const handleSearch = async () => {
    setLoading(true);
    const results = await getTrendingTopics(targetIndustry);
    setTrends(results);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
       <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-orange-500" /> 
              Live Market Data
            </h3>
            <p className="text-slate-400 text-sm">
              Google Search Grounding via Gemini 2.5 Flash
            </p>
          </div>
       </div>

      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          value={targetIndustry}
          onChange={(e) => setTargetIndustry(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
          placeholder="Enter Industry Topic..."
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 transition-colors border border-slate-700"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
          Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pr-2 max-h-[500px]">
        {trends.map((trend, i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-orange-500/30 transition-colors flex flex-col group">
            <div className="bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-900/20 transition-colors">
               <Newspaper className="text-orange-500 w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 line-clamp-2 text-white">{trend.title}</h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">{trend.summary}</p>
            {trend.sourceUrl && (
              <a href={trend.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:text-orange-300 uppercase font-bold tracking-wider mt-auto flex items-center gap-1">
                Read Source <span className="text-lg leading-none">&rarr;</span>
              </a>
            )}
          </div>
        ))}
        {!loading && trends.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center text-slate-600 py-12 border-2 border-dashed border-slate-800 rounded-2xl">
             <Search className="w-12 h-12 mb-4 opacity-20" />
             <p>Enter a topic to scan real-time web trends.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default TrendDashboard;