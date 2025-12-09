import React, { useState } from 'react';
import { RetroButton, RetroWindow } from './RetroUI';
import { generateWeddingWish } from '../services/geminiService';
import { Sparkles, Send, Bot } from 'lucide-react';

export const GuestBookAI = () => {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState<'funny' | 'heartfelt' | 'poetic'>('funny');
  const [sent, setSent] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const wish = await generateWeddingWish(tone, message);
    setMessage(wish);
    setIsGenerating(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSent(true);
    // Here you would typically send to a backend
    setTimeout(() => {
        setSent(false);
        setMessage('');
    }, 3000);
  };

  return (
    <div className="py-16 px-4 bg-gray-900 border-t-4 border-b-4 border-double border-gray-700">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center font-pixel text-cyan-400 text-2xl mb-8">
           GLOBAL CHAT
        </h2>

        <RetroWindow title="COMPOSE MESSAGE">
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block font-pixel text-xs text-gray-400 mb-2">USERNAME (GUEST NAME)</label>
              <input 
                type="text" 
                className="w-full bg-black border-2 border-gray-600 p-2 font-terminal text-xl text-green-400 focus:outline-none focus:border-green-500"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block font-pixel text-xs text-gray-400 mb-2">MESSAGE</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-black border-2 border-gray-600 p-2 font-terminal text-xl text-white focus:outline-none focus:border-green-500"
                placeholder="Type your wish..."
              />
            </div>

            {/* AI Assistant Section */}
            <div className="bg-gray-800 p-4 border border-gray-600 rounded">
                <div className="flex items-center gap-2 mb-3">
                    <Bot className="text-[#ff00ff]" />
                    <span className="font-pixel text-[10px] text-[#ff00ff]">AI WRITING ASSISTANT</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                    {(['funny', 'heartfelt', 'poetic'] as const).map(t => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTone(t)}
                            className={`px-3 py-1 font-pixel text-[10px] border ${tone === t ? 'bg-[#ff00ff] text-white border-[#ff00ff]' : 'border-gray-500 text-gray-400'}`}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>
                
                <RetroButton 
                    type="button" 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    variant="accent"
                    className="w-full text-xs py-2 flex items-center justify-center gap-2"
                >
                    {isGenerating ? <span className="animate-spin">⌛</span> : <Sparkles size={14} />}
                    {isGenerating ? 'GENERATING...' : 'AUTO-GENERATE WISH'}
                </RetroButton>
            </div>

            <RetroButton 
                variant="primary" 
                className="w-full flex items-center justify-center gap-2"
                disabled={sent}
            >
                {sent ? "MESSAGE SENT!" : <>SEND TO CHAT <Send size={16} /></>}
            </RetroButton>
          </form>
        </RetroWindow>
      </div>
    </div>
  );
};