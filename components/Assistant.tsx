/**

 * @license

 * SPDX-License-Identifier: Apache-2.0

*/

'use client';



import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido a VidaFarma. Estoy aquí para ayudarte a encontrar lo mejor en salud y belleza. ¿En qué puedo ayudarte hoy?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        // Error handled in service
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-background rounded-none shadow-2xl shadow-primary/10 w-[90vw] sm:w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden border border-border animate-slide-up-fade">
          {/* Header */}
          <div className="bg-muted p-5 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-serif italic text-foreground text-lg">Asistente Virtual</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border border-border text-foreground shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-card border border-border p-5 flex gap-1 items-center shadow-sm">
                   <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-background border-t border-border">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu pregunta..." 
                className="flex-1 bg-card border border-border focus:border-primary px-4 py-3 text-sm outline-none transition-colors placeholder-muted-foreground text-foreground"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-primary text-primary-foreground px-4 hover:opacity-90 transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground w-14 h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-105 transition-all duration-500 z-50"
      >
        {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
             </svg>
        ) : (
            <span className="font-serif italic text-lg">VF</span>
        )}
      </button>
    </div>
  );
};

export default Assistant;