import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Mic, MicOff, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { useVoiceAgent } from '@/src/hooks/useVoiceAgent';
import { cn } from '@/src/lib/utils';
import { Message } from '@/src/types';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! I\'m your Tecson Media digital strategist. How can I assist you with your web design or branding project today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { isActive: isVoiceActive, isConnecting: isVoiceConnecting, startVoice, stopVoice } = useVoiceAgent();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are the Tecson Media Toronto AI assistant. You help users with high-end web design, branding, and digital strategy inquiries. You represent a luxury web design agency. Be professional, sophisticated, and insightful. You can answer questions about our services (Custom Web Design, Branding), our process (2-4 week turnaround), and values (100% custom, luxury aesthetic). We are based in Toronto.",
        }
      });

      const modelMessage: Message = { role: 'model', content: response.text || "I'm sorry, I couldn't process that." };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-[2rem] border border-gold/10 bg-obsidian shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/10 bg-charcoal p-6 text-paper">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/20 text-gold shadow-glow">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Tecson Strategy AI</h3>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">Elite Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-paper/40 hover:text-gold transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border",
                    m.role === 'user' ? "bg-gold border-gold text-obsidian" : "bg-charcoal border-gold/20 text-gold shadow-glow"
                  )}>
                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-gold text-obsidian rounded-tr-none" 
                      : "bg-charcoal text-paper border border-gold/5 rounded-tl-none"
                  )}>
                    <div className={cn("markdown-body", m.role === 'user' ? "text-obsidian" : "text-paper")}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-charcoal text-gold">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-charcoal p-4 border border-gold/5">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0.2s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gold/10 p-6 bg-charcoal/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={isVoiceActive ? stopVoice : startVoice}
                  disabled={isVoiceConnecting}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full transition-all border",
                    isVoiceActive 
                      ? "bg-red-500 border-red-400 text-paper animate-pulse" 
                      : "bg-obsidian border-gold/10 text-gold hover:bg-gold/10 shadow-glow"
                  )}
                >
                  {isVoiceConnecting ? <Loader2 className="h-5 w-5 animate-spin" /> : isVoiceActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isVoiceActive ? "Listening..." : "Request expertise..."}
                    className="w-full rounded-full border border-gold/10 bg-obsidian py-3 pl-6 pr-12 text-sm text-paper focus:border-gold/50 focus:outline-none placeholder:text-warm-grey/20"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {isVoiceActive && (
                <p className="mt-2 text-center text-[10px] font-sans font-bold uppercase tracking-widest text-red-500">Live Voice Consulting</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-500",
          isOpen ? "bg-paper text-obsidian" : "bg-obsidian text-gold border border-gold/20 shadow-glow"
        )}
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
      </motion.button>
    </div>
  );
}
