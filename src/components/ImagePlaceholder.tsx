import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImagePlaceholderProps {
  promptSuggestion?: string;
}

export function ImagePlaceholder({ promptSuggestion }: ImagePlaceholderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(promptSuggestion || '');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Generieren');
      }
      
      setImageUrl(data.image);
      setIsEditingPrompt(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (imageUrl) {
    return (
      <div className="relative group w-full h-full rounded-2xl overflow-hidden shadow-xl border border-[#E2DED0]">
        <img src={imageUrl} alt="Generated Comic Illustration" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={() => setIsEditingPrompt(true)}
            className="bg-white/80 hover:bg-white text-[#5A5A40] px-4 py-2 rounded-full font-medium backdrop-blur-md transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Neu generieren
          </button>
        </div>
        
        {isEditingPrompt && (
          <div className="absolute inset-0 bg-black/80 flex flex-col p-6 justify-center z-10">
            <label className="text-white text-sm mb-2 font-medium">Prompt anpassen (Gemini Image Flash):</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 bg-white/10 text-white border border-white/20 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C59B6D] mb-4 text-sm resize-none"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsEditingPrompt(false)}
                className="px-4 py-2 text-white/70 hover:text-white text-sm"
              >
                Abbrechen
              </button>
              <button 
                onClick={generateImage}
                disabled={isLoading || !prompt}
                className="bg-[#C59B6D] hover:bg-[#B48A5C] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generieren
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] bg-[#FDFCF8] rounded-2xl border-2 border-dashed border-[#D1CABB] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
      
      {isEditingPrompt ? (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#E2DED0] p-5 z-10 text-left">
           <label className="text-[#5A5A40] text-sm mb-2 font-medium block">Bildidee für Gemini:</label>
           <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 bg-[#F9F7F2] text-[#4A443D] border border-[#E2DED0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C59B6D] mb-4 text-sm resize-none"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsEditingPrompt(false)}
                className="px-4 py-2 text-[#8C8273] hover:text-[#5A5A40] text-sm"
              >
                Abbrechen
              </button>
              <button 
                onClick={generateImage}
                disabled={isLoading || !prompt}
                className="bg-[#C59B6D] hover:bg-[#B48A5C] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generieren
              </button>
            </div>
        </div>
      ) : (
        <>
          <div className="w-20 h-20 bg-white border border-[#E2DED0] rounded-full shadow-sm flex items-center justify-center mb-4 text-[#A59D8F] group-hover:scale-110 transition-transform">
            <ImageIcon className="w-10 h-10" />
          </div>
          <h3 className="text-[#6B645A] font-medium mb-2">Bild-Platzhalter</h3>
          <p className="text-[#8C8273] text-sm mb-6 max-w-[250px]">
            Hier kannst du später deine eigenen Kurs-Bilder einfügen.
          </p>
          
          <button 
            onClick={() => setIsEditingPrompt(true)}
            className="bg-white border border-[#D1CABB] shadow-sm hover:shadow text-[#5A5A40] px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C59B6D]" />
            Mit KI füllen
          </button>
          
          {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
        </>
      )}
    </div>
  );
}
