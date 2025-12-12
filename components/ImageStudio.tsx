import React, { useState } from 'react';
import { UserContext } from '../types';
import { generateHeroImage, editUserImage } from '../services/geminiService';
import { Image as ImageIcon, Wand2, Download, RefreshCw, Upload, Loader2 } from 'lucide-react';

const ImageStudio: React.FC<{ user: UserContext }> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const img = await generateHeroImage(prompt, "1K"); // Using Pro Image Preview
      setGeneratedImage(img);
    } catch (e) {
      alert("Generation failed");
    }
    setLoading(false);
  };

  const handleEdit = async () => {
    if (!selectedFile || !prompt) return;
    setLoading(true);
    
    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const result = await editUserImage(base64, prompt); // Using Flash Image (Nano Banana)
        setGeneratedImage(result);
      } catch (e) {
        alert("Edit failed");
      }
      setLoading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Preview
      const reader = new FileReader();
      reader.onload = (ev) => {
        setGeneratedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Visual <span className="lava-text">Studio</span></h2>
            <p className="text-slate-400 text-sm">Create high-end assets or edit existing photos with Nano Banana speed.</p>
          </div>

          <div className="flex gap-2 bg-slate-900 p-1 rounded-lg">
            <button 
              onClick={() => { setMode('generate'); setGeneratedImage(null); }}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'generate' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Generate (Pro)
            </button>
            <button 
              onClick={() => { setMode('edit'); setGeneratedImage(null); }}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'edit' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
            >
              Edit (Nano)
            </button>
          </div>

          {mode === 'edit' && (
             <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-orange-500 transition-colors cursor-pointer relative">
               <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
               <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
               <p className="text-sm text-slate-400">{selectedFile ? selectedFile.name : "Upload image to edit"}</p>
             </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-orange-500 focus:outline-none resize-none text-sm"
              placeholder={mode === 'generate' ? "A futuristic office with orange neon lighting..." : "Add a lens flare effect..."}
            />
          </div>

          <button 
            onClick={mode === 'generate' ? handleGenerate : handleEdit}
            disabled={loading || !prompt || (mode === 'edit' && !selectedFile)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:brightness-110 disabled:opacity-50 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {mode === 'generate' ? 'Generate 4K Asset' : 'Apply AI Edits'}
          </button>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center min-h-[500px] relative overflow-hidden group">
          {generatedImage ? (
            <>
              <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={generatedImage} download="rocketopp-asset.png" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-100">
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-700">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>AI Canvas Empty</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ImageStudio;