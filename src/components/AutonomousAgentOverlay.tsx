import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, X, Sparkles, Send, Mic, Minimize2, Maximize2, 
  Trash2, ArrowUpRight, Zap, RefreshCw, MessageSquare, Terminal, 
  User, CheckCircle, Code, Shield, ExternalLink, Globe, Play, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentChatMessage, Tab } from '../types';
import { generateCollaborativeChatResponse } from '../services/agentEngine';

interface AutonomousAgentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  onNavigate: (title: string, url: string, type: Tab['type'], query?: string) => void;
  onOpenAudit: () => void;
  initialInstruction?: string;
}

export const AutonomousAgentOverlay: React.FC<AutonomousAgentOverlayProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  onOpenAudit,
  initialInstruction
}) => {
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: '🤖 **Motor de IA Nativo Conectado**\n\nEstoy listo para navegar, reproducir cualquier video, ejecutar búsquedas generales por la web o analizar código con máxima velocidad y libertad. ¿Qué deseas hacer?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (!isMinimized && isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isMinimized, isOpen]);

  // Handle initial instruction when opened via quick action
  useEffect(() => {
    if (initialInstruction && isOpen) {
      handleSendMessage(initialInstruction);
    }
  }, [initialInstruction]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: AgentChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Fast, ultra-snappy AI response and direct action
    setTimeout(() => {
      const response = generateCollaborativeChatResponse(text, messages, {
        url: activeTab.url,
        title: activeTab.title
      });

      const agentMsg: AgentChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: response.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);

      // Execute action directly without blocking the user behind button clicks!
      if (response.autoAction) {
        const { actionType, title, url, tabType, query } = response.autoAction;
        if (actionType === 'play_video' || (url && url.includes('youtube'))) {
          onNavigate(title, url, 'custom', query);
        } else if (actionType === 'scan') {
          onNavigate('Escáner & Reparador de Código', 'aether://devtools/scanner', 'devtools');
        } else if (actionType === 'search') {
          onNavigate(title, url, 'search', query);
        } else if (actionType === 'open_url' || actionType === 'navigate') {
          onNavigate(title, url, tabType, query);
        }
      }
    }, 250);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.start();
        setMicActive(true);

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setInputMessage(spoken);
          setMicActive(false);
          handleSendMessage(spoken);
        };

        recognition.onerror = () => setMicActive(false);
        recognition.onend = () => setMicActive(false);
      } catch (err) {
        setMicActive(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'system',
        text: 'Historial reiniciado. IA lista para nuevas órdenes.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed z-50 transition-all duration-300 flex flex-col ${
        isMinimized 
          ? 'bottom-20 right-4 sm:right-6 w-80 h-14' 
          : 'bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[450px] md:w-[490px] h-[540px] max-h-[calc(100vh-160px)]'
      } bg-[#0b101d]/95 border border-[#00F0FF]/50 rounded-2xl shadow-[0_0_35px_rgba(0,240,255,0.22)] backdrop-blur-xl overflow-hidden font-sans`}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B] bg-[#070b14]/90 shrink-0 select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00F0FF]/20 to-blue-600/30 border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF]">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#27C93F] border-2 border-[#070b14]" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 truncate">
              <span>IA Script Nativo</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-mono">
                ALTA VELOCIDAD
              </span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono truncate flex items-center gap-1">
              <Globe className="w-2.5 h-2.5 text-[#00F0FF]" />
              <span className="truncate">{activeTab.title}</span>
            </div>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1 shrink-0 text-gray-400">
          <button 
            type="button"
            onClick={clearChat}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-gray-200 transition cursor-pointer"
            title="Limpiar conversación"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-gray-200 transition cursor-pointer"
            title={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition cursor-pointer"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* When Minimized */}
      {isMinimized && (
        <div 
          onClick={() => setIsMinimized(false)}
          className="flex-1 flex items-center justify-between px-4 text-xs font-mono text-gray-300 cursor-pointer hover:bg-white/5"
        >
          <span className="truncate">IA en segundo plano. Clic para desplegar...</span>
          <MessageSquare className="w-4 h-4 text-[#00F0FF]" />
        </div>
      )}

      {/* When Expanded */}
      {!isMinimized && (
        <>
          {/* 2. Chat Stream */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-2 text-[11px] text-gray-500 font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="max-w-[88%] space-y-1.5">
                    <div 
                      className={`p-3 rounded-2xl leading-relaxed text-[12px] sm:text-[13px] ${
                        isUser 
                          ? 'bg-gradient-to-r from-blue-600 to-[#0088cc] text-white rounded-tr-none shadow-md' 
                          : 'bg-[#111827] border border-[#1E293B] text-gray-200 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line break-words font-sans">{msg.text}</p>
                    </div>

                    <div className={`text-[9px] font-mono text-gray-500 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Fast Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-[11px] bg-[#111827]/80 border border-[#1E293B] p-2.5 rounded-2xl rounded-tl-none w-fit">
                <Bot className="w-3.5 h-3.5 animate-pulse" />
                <span>Ejecutando orden...</span>
                <span className="flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse delay-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse delay-150"></span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. High Speed Action Bar */}
          <div className="px-3.5 py-2 border-t border-[#1E293B]/70 bg-[#070b14]/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {[
              { label: '▶️ Reproducir video', action: 'Reproducir música en vivo y video en YouTube' },
              { label: '🔍 Buscar en la Web', action: 'Buscar noticias de tecnología e inteligencia artificial' },
              { label: '🛠️ Reparar código', action: 'Reparar errores de sintaxis y optimizar script' },
              { label: '🛡️ Escudo Zero-Days', action: 'Auditar seguridad y vulnerabilidades Zero-Days' },
              { label: '📖 Wikipedia', action: 'Consultar artículo en Wikipedia sobre Computación Cuántica' }
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.action)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#111622] hover:bg-[#1f293d] border border-gray-800 hover:border-[#00F0FF]/40 text-gray-300 text-[11px] flex items-center gap-1.5 transition cursor-pointer shrink-0 active:scale-95"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* 4. Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-[#1E293B] bg-[#070b14] flex items-center gap-2 shrink-0"
          >
            <div className="flex-1 bg-[#111622] border border-[#1E293B] focus-within:border-[#00F0FF]/70 rounded-xl px-3 h-10 flex items-center transition shadow-inner">
              <input 
                ref={inputRef}
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe cualquier orden, búsqueda o video a reproducir..."
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-[13px] text-gray-200 placeholder-gray-500 font-sans"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-1 text-gray-400 hover:text-gray-200 transition cursor-pointer ${
                  micActive ? 'text-red-400 animate-pulse' : ''
                }`}
                title="Dictar por voz"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-[#00F0FF] disabled:opacity-40 text-black w-10 h-10 rounded-xl flex items-center justify-center font-bold hover:bg-[#33f3ff] transition shadow-[0_0_12px_rgba(0,240,255,0.25)] shrink-0 active:scale-95 cursor-pointer"
              title="Enviar orden a la IA"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
};
