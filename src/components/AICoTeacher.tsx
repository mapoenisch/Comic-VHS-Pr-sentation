import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function AICoTeacher() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Hallo! Ich bin dein KI-Co-Lehrer für den Comic-Kurs. Hast du Fragen zum Layout, zu Figuren oder zum Material? Christiane und ich helfen dir gerne weiter!" }]}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newHistory = [...messages, { role: 'user' as const, parts: [{ text: userMsg }] }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Fehler im Chat');
      }

      setMessages([...newHistory, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error(error);
      setMessages([...newHistory, { role: 'model', parts: [{ text: "Entschuldigung, meine Verbindung ist gerade abgerissen. Bitte versuche es noch einmal!" }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#C59B6D] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#B48A5C] hover:scale-105 transition-all z-40"
        title="KI-Co-Lehrer öffnen"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2DED0] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F9F7F2] border-2 border-[#5A5A40]"></span>
        </span>
      </button>

      {/* Chat Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#FDFCF8] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-[#5A5A40] text-[#FDFCF8] p-4 flex items-center justify-between shadow-sm z-10 border-b border-[#E2DED0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">KI-Co-Lehrer</h3>
              <p className="text-[#E2DED0] text-xs">Unterstützt von Gemini</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#FDFCF8] space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white ${msg.role === 'user' ? 'bg-[#C59B6D]' : 'bg-[#5A5A40]'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#F4F1E9] text-[#4A443D] rounded-tr-sm' 
                    : 'bg-white border border-[#E2DED0] text-[#4A443D] shadow-sm rounded-tl-sm'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#5A5A40] text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E2DED0] shadow-sm rounded-tl-sm flex gap-1">
                  <div className="w-2 h-2 bg-[#D1CABB] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-[#D1CABB] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-[#D1CABB] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#E2DED0]">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Frag mich etwas über Comics..."
              className="w-full bg-[#F9F7F2] border border-[#E2DED0] rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B6D] text-[#2C2C2C]"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-[#C59B6D] text-white rounded-full hover:bg-[#B48A5C] disabled:opacity-50 disabled:hover:bg-[#C59B6D] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
