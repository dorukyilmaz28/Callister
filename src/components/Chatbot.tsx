"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { createMatcher } from "@/utils/frcMatcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const { t, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matcher, setMatcher] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load FRC responses and create matcher
  useEffect(() => {
    fetch('/data/frc_responses_full.json')
      .then(res => res.json())
      .then(data => {
        const matcherInstance = createMatcher(data.frc_responses.responses);
        setMatcher(matcherInstance);
      })
      .catch(err => {
        console.error('Failed to load FRC responses:', err);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: currentLanguage === 'tr' 
            ? '⚠️ FRC yanıtları yüklenemedi. Lütfen sayfayı yenileyin.'
            : '⚠️ Failed to load FRC responses. Please refresh the page.',
          timestamp: new Date()
        }]);
      });
  }, [currentLanguage]);

  // Add welcome message when language changes
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant' as const,
      content: currentLanguage === 'tr'
        ? 'Merhaba! Ben Callister #9024 FRC takımının FAQ asistanıyım. FRC, robotik, takım projeleri veya Callister hakkında herhangi bir sorunuz varsa yardımcı olmaktan mutluluk duyarım! 🤖✨'
        : 'Hello! I am the FAQ assistant of Callister #9024 FRC team. I would be happy to help you with any questions about FRC, robotics, team projects or Callister! 🤖✨',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, [currentLanguage]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let reply: string;
      
      if (matcher) {
        // Use local Fuse.js matcher with language support
        reply = matcher.getResponse(input.trim(), currentLanguage);
      } else {
        // Fallback to backend API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input.trim() })
        });

        if (!response.ok) {
          throw new Error('Backend error');
        }

        const data = await response.json();
        reply = data.reply;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: currentLanguage === 'tr'
          ? 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
          : 'Sorry, an error occurred. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center text-white"
        aria-label={currentLanguage === 'tr' ? "Chat'i aç/kapat" : "Open/close chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 h-[500px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-40 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-semibold font-['Poppins']">Callister FAQ</h3>
                <p className="text-[#D9D9D9] text-xs font-['Poppins']">
                  {currentLanguage === 'tr' ? 'FRC Takım Asistanı (Static JSON)' : 'FRC Team Assistant (Static JSON)'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800' 
                        : 'bg-gradient-to-br from-purple-500 to-purple-700'
                    }`}>
                      {message.role === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30'
                        : 'bg-gradient-to-br from-white/20 to-white/10 border border-white/30'
                    }`}>
                      <p className={`text-sm font-['Poppins'] ${
                        message.role === 'user' ? 'text-[#F5F5F5]' : 'text-[#D9D9D9]'
                      }`}>
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-purple-300/70' : 'text-white/50'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="px-3 py-2 bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#D9D9D9] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#D9D9D9] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#D9D9D9] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                                 placeholder={currentLanguage === 'tr' ? "FRC hakkında soru sorun..." : "Ask a question about FRC..."}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-[#F5F5F5] placeholder-[#D9D9D9]/50 font-['Poppins'] text-sm focus:outline-none focus:border-purple-400/40 transition-colors"
                disabled={isLoading}
                                 aria-label={currentLanguage === 'tr' ? "Mesaj yazın" : "Type your message"}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl text-white font-['Poppins'] font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                 aria-label={currentLanguage === 'tr' ? "Mesaj gönder" : "Send message"}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
