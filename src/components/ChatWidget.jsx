import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, SendHorizontal } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PRIYANKA_SYSTEM_INSTRUCTION from './knowledge.md?raw';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm Priyanka, your Macenza AI assistant. How can I help you navigate our deep-tech engineering and AI capabilities today?",
      time: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessageBadge, setHasNewMessageBadge] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat box to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessageBadge(false);
    }
  }, [messages, isOpen, isTyping]);

  // Prompt actions
  const starterPrompts = [
    { label: "🧠 AI Solutions", text: "What custom AI solutions do you build?" },
    { label: "💻 Tech Stack", text: "What technologies and databases do you use?" },
    { label: "💼 Hiring Careers", text: "Are there active hiring positions available?" },
    { label: "📞 Contact Team", text: "How can I contact your engineering team?" }
  ];

  // Local knowledge-base matching logic (Advanced fallback system)
  const getLocalResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('hire') || q.includes('job') || q.includes('career') || q.includes('position') || q.includes('apply')) {
      return "Yes, we are actively hiring! We look for top-tier engineers passionate about startup speeds. Visit our Careers page to see available engineering positions (e.g. AI Engineers, Backend Systems Engineers, Fullstack Developers) and submit your resume directly to our Supabase database!";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('office')) {
      return "You can reach us through multiple channels:\n• Main Inquiries: info@macenza.com\n• Business Partnerships: shanki9414@gmail.com\n• Direct Hotline: +91 94146 60123\nOr drop a message on our Contact page and our systems team will respond within 24 hours!";
    }
    if (q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('database') || q.includes('postgres') || q.includes('node')) {
      return "Our high-performance engineering stack comprises:\n• Frontend: React, Next.js, Vite, GSAP\n• Backend: Node.js, FastAPI, Python, Express\n• Databases: PostgreSQL, MongoDB, Redis, Firebase\n• Cloud & DevOps: AWS, Azure, GCP, Docker, Kubernetes, CI/CD pipelines.\nWe architect everything for maximum speed and infinite scaling!";
    }
    if (q.includes('about') || q.includes('mission') || q.includes('vision') || q.includes('company')) {
      return "Macenza is a forward-thinking digital product and AI engineering studio. Our mission is to empower global businesses with intelligent infrastructure and premium, scalable software systems built for absolute resilience.";
    }
    if (q.includes('ai') || q.includes('solution') || q.includes('agent') || q.includes('capabilities')) {
      return "Macenza specializes in deep-tech AI engineering. We build Custom Machine Learning models, Autonomous AI Agents (like Sales, Support, and Recruiter Agents), Computer Vision pipelines, NLP systems, Voice AI Assistants, and Predictive Business Analytics. Check our Solutions page for details!";
    }

    return "I'm Priyanka, your Macenza AI assistant. We specialize in deep-tech AI systems, fullstack web/mobile development, and cloud databases. Let me know if you would like to know more about our Core Solutions, Technology Stack, Open Career Positions, or Contact Channels!";
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Add user message
    const userMessage = { sender: 'user', text: query, time: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      if (ai) {
        // Map conversation history for Gemini conversational memory!
        // Gemini strictly requires the first message in the list to have role: 'user'
        const contents = [];

        // Find index of first user message to slice history cleanly
        const firstUserIdx = messages.findIndex(msg => msg.sender === 'user');
        if (firstUserIdx !== -1) {
          messages.slice(firstUserIdx).forEach(msg => {
            contents.push({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          });
        }

        // Push the current user query
        contents.push({
          role: 'user',
          parts: [{ text: query }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contents,
          config: {
            systemInstruction: PRIYANKA_SYSTEM_INSTRUCTION
          }
        });

        const replyText = response.text || "I'm sorry, I couldn't process that. How else can I help?";

        setIsTyping(false);
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: replyText,
          time: new Date()
        }]);
      } else {
        // Smart Local fallback with dynamic natural delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: getLocalResponse(query),
            time: new Date()
          }]);
        }, 800);
      }
    } catch (err) {
      console.error("AI chat assistant endpoint error:", err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "I experienced a connection issue, but here is my system fallback response:\n\n" + getLocalResponse(query),
        time: new Date()
      }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[9999] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${isOpen
          ? 'bg-slate-950 text-white shadow-2xl border border-white/10'
          : 'bg-primary/60 backdrop-blur-md border border-white shadow-[0_8px_32px_rgba(37,99,235,0.2)] hover:bg-primary/30'
          }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90 duration-300" />
        ) : (
          <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
            <DotLottieReact
              src="/chatbot.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
            {hasNewMessageBadge && (
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-ping"></span>
            )}
          </div>
        )}
      </button>

      {/* Floating Chat Card */}
      {isOpen && (
        <div
          className="fixed bottom-28 right-8 z-[9999] w-[90%] sm:w-[400px] h-[550px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header Card */}
          <div className="p-6 bg-gradient-to-r from-primary/20 via-blue-900/10 to-transparent border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                <DotLottieReact
                  src="/chatbot.lottie"
                  loop
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Priyanka &bull; AI Agent
                  <span className="text-xs animate-bounce" style={{ display: 'inline-block', transformOrigin: 'bottom right' }}>👋</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Systems Active</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scrolling Area */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/5 overflow-hidden">
                    <DotLottieReact
                      src="/chatbot.lottie"
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-md ${msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/5 overflow-hidden">
                  <DotLottieReact
                    src="/chatbot.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts Action Grid */}
          {messages.length === 1 && !isTyping && (
            <div className="px-6 pb-4">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider block mb-2">Common Queries:</span>
              <div className="grid grid-cols-2 gap-2">
                {starterPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="p-2.5 text-left bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/30 rounded-xl text-[11px] font-bold text-white/80 transition-all hover:scale-[1.02] duration-300"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Chat Controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-5 border-t border-white/5 bg-slate-950/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/5 p-3 px-4 rounded-xl text-xs font-semibold text-white placeholder-white/30 outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
