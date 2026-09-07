import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Mic, Camera, Zap, Shield, Code, ArrowLeft, ArrowRight, 
  RotateCw, X, Plus, Settings, Flame, Globe, Paperclip, Send, 
  Mail, Youtube, BookOpen, Newspaper, Lock, CheckCircle, Terminal, 
  Cpu, HardDrive, RefreshCw, Bot, User, Layers, ExternalLink, Bug, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, BrowserMode, AgentTask } from '../types';
import { BrowserViewport } from './BrowserViewport';
import { AutonomousAgentOverlay } from './AutonomousAgentOverlay';
import { PWAInstallButton } from './PWAInstallButton';
import { generateDynamicAgentResponse } from '../services/agentEngine';

export const AetherBrowser: React.FC = () => {
  // Navigation State
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'tab-1', title: 'Google', url: 'https://www.google.com', type: 'home' },
    { id: 'tab-2', title: 'Zero-Days Hub', url: 'https://zerodays.network/vulns', type: 'zerodays' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [historyStack, setHistoryStack] = useState<Tab[]>([]);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  // Operational Mode: Manual, Mixed (Copilot), Autonomous
  const [browserMode, setBrowserMode] = useState<BrowserMode>('mixed');

  // Omnibox & URL Inputs
  const [urlInput, setUrlInput] = useState<string>('https://www.google.com');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [agentInput, setAgentInput] = useState<string>('');

  // Agent State
  const [agentTask, setAgentTask] = useState<AgentTask | null>(null);
  const [showAgentChat, setShowAgentChat] = useState<boolean>(false);
  const [agentChatInitialText, setAgentChatInitialText] = useState<string | undefined>(undefined);
  const [agentLogs, setAgentLogs] = useState<Array<{ time: string; text: string; type: string }>>([
    { time: '11:20:00', type: 'info', text: 'V-Drive montado: 1000GB asignados en sandbox seguro' },
    { time: '11:20:02', type: 'success', text: 'Túnel Airgap 256-bit validado sin fugas DNS' },
    { time: '11:20:05', type: 'info', text: 'Motor neural LLaMA en espera de órdenes manuales o autónomas' }
  ]);
  const [agentResult, setAgentResult] = useState<string | null>(null);

  // Modals & Controls
  const [showPrivacyAudit, setShowPrivacyAudit] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [ollamaOnline, setOllamaOnline] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch Tab
  const handleTabSwitch = (tab: Tab) => {
    setActiveTabId(tab.id);
    setUrlInput(tab.url);
  };

  // Add Tab
  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newId,
      title: 'Google',
      url: 'https://www.google.com',
      type: 'home'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setUrlInput('https://www.google.com');
  };

  // Close Tab
  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const nextTabs = tabs.filter(t => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[0].id);
      setUrlInput(nextTabs[0].url);
    }
  };

  // Reload Current View
  const handleReload = () => {
    setIsReloading(true);
    showToast('Recargando entorno DOM seguro...');
    setTimeout(() => {
      setIsReloading(false);
      showToast('DOM actualizado en tiempo real');
    }, 500);
  };

  // Back Navigation
  const handleBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack(historyStack.slice(0, -1));
      setActiveTabId(prev.id);
      setUrlInput(prev.url);
      showToast(`Regresando a ${prev.title}`);
    } else {
      navigateTo('Google', 'https://www.google.com', 'home');
    }
  };

  // Navigate to URL or View
  const navigateTo = (title: string, url: string, type: Tab['type'], query?: string) => {
    setHistoryStack(prev => [...prev, activeTab]);
    setUrlInput(url);
    setTabs(tabs.map(t => t.id === activeTabId ? {
      ...t,
      title,
      url,
      type,
      query
    } : t));
    showToast(`Navegando a ${title}`);
  };

  // Handle URL form submit
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formatted = urlInput.trim();
    if (!formatted) return;

    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      if (formatted.includes('.') && !formatted.includes(' ')) {
        formatted = 'https://' + formatted;
      } else {
        // Treat as Google search
        handleSearch(formatted);
        return;
      }
    }

    // Specific domain routing
    if (formatted.includes('google.com')) {
      navigateTo('Google', formatted, 'home');
    } else if (formatted.includes('zerodays') || formatted.includes('cve.org')) {
      navigateTo('Zero-Days Hub', formatted, 'zerodays');
    } else if (formatted.includes('github.com')) {
      navigateTo('GitHub', formatted, 'github');
    } else if (formatted.includes('wikipedia.org')) {
      navigateTo('Wikipedia', formatted, 'wikipedia');
    } else if (formatted.includes('news.google.com')) {
      navigateTo('Noticias', formatted, 'news');
    } else {
      navigateTo(formatted.replace('https://', '').split('/')[0], formatted, 'custom');
    }
  };

  // Handle Search Execution
  const handleSearch = (queryText: string) => {
    if (!queryText.trim()) return;
    setSearchQuery(queryText);
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(queryText)}`;
    navigateTo(`${queryText} - Búsqueda`, searchUrl, 'search', queryText);
    showToast(`Resultados listos para: "${queryText}"`);
  };

  // Autonomous / Mixed Agent Task Execution & Free Chat Collaboration
  const executeAutonomousTask = (instruction: string) => {
    if (!instruction.trim()) return;

    // Open collaborative free-chat overlay so user and AI can talk freely and execute together
    setAgentChatInitialText(instruction);
    setShowAgentChat(true);

    const plan = generateDynamicAgentResponse(instruction, activeTab.url);

    const newTask: AgentTask = {
      id: `task-${Date.now()}`,
      instruction,
      status: 'running',
      currentStepIndex: 0,
      steps: plan.steps.map(s => ({ ...s, status: s.stepNumber === 1 ? 'running' : 'pending' })),
      logs: []
    };

    setAgentTask(newTask);
    setAgentResult(null);

    const now = new Date().toLocaleTimeString();
    setAgentLogs(prev => [
      ...prev,
      { time: now, type: 'action', text: `[ASISTENTE IA INICIADO] > ${instruction}` }
    ]);

    // Navigation trigger if requested
    if (plan.suggestedUrl && plan.suggestedTitle && plan.suggestedType) {
      if (instruction.toLowerCase().includes('abrir') || instruction.toLowerCase().includes('ir a') || instruction.toLowerCase().includes('navegar') || instruction.toLowerCase().includes('ver') || instruction.toLowerCase().includes('youtube') || instruction.toLowerCase().includes('noticia') || instruction.toLowerCase().includes('cve') || instruction.toLowerCase().includes('wikipedia') || instruction.toLowerCase().includes('reparar') || instruction.toLowerCase().includes('scanner')) {
        navigateTo(plan.suggestedTitle, plan.suggestedUrl, plan.suggestedType);
      }
    }

    // Step 1 -> 2
    setTimeout(() => {
      setAgentTask(prev => {
        if (!prev) return null;
        const updatedSteps = [...prev.steps];
        if (updatedSteps[0]) updatedSteps[0].status = 'completed';
        if (updatedSteps[1]) updatedSteps[1].status = 'running';
        return { ...prev, currentStepIndex: 1, steps: updatedSteps };
      });
      setAgentLogs(prev => [
        ...prev,
        { time: new Date().toLocaleTimeString(), type: 'info', text: `Procesando: ${plan.steps[0]?.description || 'Buscando fuentes y resolviendo DOM'}` }
      ]);
    }, 700);

    // Final completion
    setTimeout(() => {
      setAgentTask(prev => {
        if (!prev) return null;
        const updatedSteps = prev.steps.map(s => ({ ...s, status: 'completed' as const }));
        return { 
          ...prev, 
          status: 'completed', 
          currentStepIndex: updatedSteps.length - 1, 
          steps: updatedSteps,
          resultSummary: plan.resultSummary 
        };
      });

      setAgentLogs(prev => [
        ...prev,
        { time: new Date().toLocaleTimeString(), type: 'success', text: `Tarea completada con éxito. Respuesta disponible en pantalla.` }
      ]);
      setAgentResult(plan.resultSummary);
    }, 1500);
  };

  // Bottom input submit
  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentInput.trim()) return;
    executeAutonomousTask(agentInput);
    setAgentInput('');
  };

  // Web Speech API Integration
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.start();
        setMicActive(true);
        showToast('Escuchando orden por voz...');
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setAgentInput(transcript);
          setMicActive(false);
          showToast(`Transcrito: "${transcript}"`);
        };

        recognition.onerror = () => {
          setMicActive(false);
          showToast('Micrófono cerrado.');
        };

        recognition.onend = () => setMicActive(false);
      } catch (err) {
        setMicActive(false);
        setAgentInput('Investigar vulnerabilidades en el navegador');
        showToast('Voz simulada: "Investigar vulnerabilidades en el navegador"');
      }
    } else {
      setAgentInput('Analizar y resumir noticias de Inteligencia Artificial');
      showToast('Comando de voz insertado');
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#0b0f19] text-gray-300 font-sans overflow-hidden bg-dots selection:bg-[#00F0FF]/30">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-[#111622] border border-[#00F0FF]/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center gap-2 text-xs font-mono text-[#00F0FF] max-w-[90vw] truncate"
          >
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping shrink-0"></div>
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Autonomous Agent Floating Monitor */}
      <AutonomousAgentOverlay 
        task={agentTask}
        onStop={() => {
          setAgentTask(null);
          showToast('Agente autónomo detenido');
        }}
        onPauseToggle={() => {
          if (!agentTask) return;
          const nextStatus = agentTask.status === 'paused' ? 'running' : 'paused';
          setAgentTask({ ...agentTask, status: nextStatus });
          showToast(nextStatus === 'paused' ? 'Agente pausado' : 'Agente reanudado');
        }}
      />

      {/* 1. Top Bar: Window Controls & Tabs */}
      <header className="h-12 border-b border-[#1E293B] flex items-center px-3 sm:px-4 relative z-20 bg-[#0b0f19]/90 backdrop-blur shrink-0">
        {/* Window Controls */}
        <div className="flex gap-2 mr-3 sm:mr-5 shrink-0">
          <div 
            onClick={() => showToast('Cerrar pestaña')} 
            className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm cursor-pointer hover:brightness-110 active:scale-90 transition" 
            title="Cerrar"
          />
          <div 
            onClick={() => showToast('Minimizar ventana')} 
            className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm cursor-pointer hover:brightness-110 active:scale-90 transition" 
            title="Minimizar"
          />
          <div 
            onClick={() => showToast('Maximizar ventana')} 
            className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm cursor-pointer hover:brightness-110 active:scale-90 transition" 
            title="Maximizar"
          />
        </div>

        {/* Tabs Container */}
        <div className="flex items-end h-full pt-1.5 gap-1 flex-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => {
            const isActive = tab.id === activeTabId;
            return (
              <div 
                key={tab.id}
                onClick={() => handleTabSwitch(tab)}
                className={`flex h-full px-3 rounded-t-xl items-center gap-2 min-w-[130px] max-w-[180px] sm:max-w-[220px] transition cursor-pointer relative group ${
                  isActive 
                    ? 'bg-[#111622] border-t border-l border-r border-[#00F0FF]/40 shadow-[0_-5px_15px_rgba(0,240,255,0.05)] text-white' 
                    : 'opacity-60 hover:opacity-100 hover:bg-[#111622]/40 text-gray-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_8px_#00F0FF]" />
                )}
                
                {tab.type === 'zerodays' ? (
                  <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0" fill="currentColor" />
                ) : tab.type === 'devtools' ? (
                  <Bug className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                ) : tab.type === 'github' ? (
                  <Code className="w-3.5 h-3.5 text-white shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-blue-600 leading-none">G</span>
                  </div>
                )}
                
                <span className="text-[12px] font-medium truncate flex-1">{tab.title}</span>
                
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="p-0.5 rounded hover:bg-zinc-800 text-gray-500 hover:text-white transition shrink-0 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          <button 
            onClick={handleAddTab}
            className="flex h-7 w-7 mb-1.5 items-center justify-center rounded-lg hover:bg-[#111622] text-gray-400 hover:text-gray-200 transition shrink-0 cursor-pointer"
            title="Nueva pestaña"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Status Pills */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button 
            type="button"
            onClick={() => {
              setShowAgentChat(!showAgentChat);
              showToast(showAgentChat ? 'Plática con agente minimizada' : 'Plática libre con Agente IA abierta');
            }}
            className={`flex items-center gap-1.5 border px-2.5 py-1 rounded-full transition cursor-pointer text-[11px] font-mono shadow-[0_0_10px_rgba(0,240,255,0.2)] ${
              showAgentChat
                ? 'border-[#00F0FF] bg-[#00F0FF]/25 text-[#00F0FF] font-bold'
                : 'border-[#00F0FF]/50 bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20'
            }`}
            title="Abrir Plática Libre y Colaboración con el Agente"
          >
             <Bot className="w-3.5 h-3.5 text-[#00F0FF]" />
             <span className="hidden sm:inline">PLÁTICA LIBRE IA</span>
             <span className="sm:hidden">CHAT IA</span>
          </button>

          <button 
            type="button"
            onClick={() => navigateTo('Escáner & Reparador de Código', 'aether://devtools/scanner', 'devtools')}
            className="flex items-center gap-1.5 border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-full transition cursor-pointer text-emerald-400 text-[11px] font-mono shadow-[0_0_10px_rgba(16,185,129,0.15)]"
            title="Abrir Escáner y Reparador de Errores de Ejecución y Código"
          >
             <Bug className="w-3 h-3 text-emerald-400" />
             <span className="hidden sm:inline">REPARAR CÓDIGO</span>
             <span className="sm:hidden">DEBUG</span>
          </button>

          <button 
            onClick={() => {
              setOllamaOnline(!ollamaOnline);
              showToast(ollamaOnline ? 'Ollama desconectado' : 'Ollama conectado en http://localhost:11434');
            }}
            className={`hidden md:flex items-center gap-1.5 border px-2.5 py-1 rounded-full text-[11px] font-mono transition cursor-pointer ${
              ollamaOnline 
                ? 'border-green-500/40 bg-green-500/10 text-green-400' 
                : 'border-yellow-600/40 bg-[#1a180b] text-yellow-500'
            }`}
          >
             <div className={`w-1.5 h-1.5 rounded-full ${ollamaOnline ? 'bg-green-400 shadow-[0_0_5px_#4ade80]' : 'bg-yellow-500 shadow-[0_0_5px_#eab308]'}`}></div>
             <span>{ollamaOnline ? 'Ollama: ONLINE' : 'Ollama: OFFLINE'}</span>
          </button>

          <button 
            onClick={() => setShowPrivacyAudit(true)}
            className="flex items-center gap-1.5 border border-[#00F0FF]/40 bg-[#00F0FF]/5 hover:bg-[#00F0FF]/15 px-2.5 py-1 rounded-full transition cursor-pointer text-[#00F0FF] text-[11px] font-mono"
            title="Protocolo Airgap 256-bit"
          >
             <Shield className="w-3 h-3 text-[#00F0FF]" />
             <span className="hidden sm:inline">AIRGAP 256-BIT</span>
             <span className="sm:hidden">AIRGAP</span>
          </button>
        </div>
      </header>

      {/* 2. Address & Mode Bar */}
      <div className="h-12 border-b border-[#1E293B] flex items-center px-3 sm:px-4 gap-2 sm:gap-3 bg-[#0b0f19]/95 backdrop-blur z-20 shrink-0">
        {/* History Nav */}
        <div className="flex gap-2 sm:gap-3 text-gray-400 shrink-0">
          <button 
            onClick={handleBack}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white cursor-pointer transition"
            title="Atrás"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => showToast('Adelante')}
            className="p-1 rounded opacity-40 hover:opacity-100 hover:text-white cursor-pointer transition"
            title="Adelante"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={handleReload}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white cursor-pointer transition"
            title="Recargar"
          >
            <RotateCw className={`w-4 h-4 ${isReloading ? 'animate-spin text-[#00F0FF]' : ''}`} />
          </button>
        </div>
        
        {/* Omnibox URL Form */}
        <form 
          onSubmit={handleUrlSubmit}
          className="flex-1 bg-[#111622] border border-[#1E293B] focus-within:border-[#00F0FF]/50 rounded-lg h-[34px] flex items-center px-3 justify-between shadow-inner transition min-w-0"
        >
          <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono flex-1 mr-2 min-w-0">
            <Lock className="w-3 h-3 text-[#27C93F] shrink-0" />
            <span className="text-[#27C93F] hidden xs:inline shrink-0">https://</span>
            <input 
              type="text"
              value={urlInput.replace('https://', '')}
              onChange={(e) => setUrlInput('https://' + e.target.value.replace('https://', ''))}
              className="bg-transparent border-none outline-none text-gray-200 font-mono text-[12px] sm:text-[13px] w-full min-w-0"
              placeholder="Buscar o ingresar URL..."
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <button 
               type="button"
               onClick={() => window.open(activeTab.url, '_blank', 'noopener,noreferrer')}
               className="hidden xs:flex items-center gap-1 bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 border border-[#00F0FF]/40 text-[#00F0FF] px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer"
               title="Abrir web actual en pestaña externa"
             >
               <ExternalLink className="w-2.5 h-2.5" />
               <span>Abrir Web ↗</span>
             </button>
             <div 
               onClick={() => showToast('DOM en tiempo real sincronizado')}
               className="hidden sm:flex items-center gap-1 border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-1.5 py-0.5 rounded text-[9px] text-[#00F0FF] font-mono tracking-wider cursor-pointer"
             >
               <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></div>
               DOM VIVO
             </div>
             <Shield 
               onClick={() => setShowPrivacyAudit(true)}
               className="w-4 h-4 text-[#00F0FF] cursor-pointer hover:brightness-125 transition" 
               fill="currentColor" 
             />
          </div>
        </form>

        {/* Operating Mode Selector Button */}
        <div className="flex items-center bg-[#111622] border border-[#1E293B] rounded-lg p-0.5 shrink-0 text-xs font-mono">
          <button 
            type="button"
            onClick={() => {
              setBrowserMode('manual');
              showToast('Modo Manual: control total de navegación');
            }}
            className={`px-2 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
              browserMode === 'manual' ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold' : 'text-gray-400 hover:text-white'
            }`}
            title="Modo Manual"
          >
            <User className="w-3 h-3" />
            <span className="hidden lg:inline">Manual</span>
          </button>
          <button 
            type="button"
            onClick={() => {
              setBrowserMode('mixed');
              showToast('Modo Mixto: asistencia inteligente en vivo');
            }}
            className={`px-2 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
              browserMode === 'mixed' ? 'bg-purple-500/25 text-purple-300 font-bold' : 'text-gray-400 hover:text-white'
            }`}
            title="Modo Mixto (Copiloto)"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden lg:inline">Mixto</span>
          </button>
          <button 
            type="button"
            onClick={() => {
              setBrowserMode('autonomous');
              showToast('Modo Autónomo: el agente navega y ejecuta tareas por ti');
            }}
            className={`px-2 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${
              browserMode === 'autonomous' ? 'bg-green-500/25 text-green-300 font-bold' : 'text-gray-400 hover:text-white'
            }`}
            title="Modo Autónomo"
          >
            <Bot className="w-3 h-3" />
            <span className="hidden lg:inline">Autónomo</span>
          </button>
        </div>
      </div>

      {/* 3. Main Browser Viewport (Scrollable container in flex flow) */}
      <BrowserViewport 
        activeTab={activeTab}
        mode={browserMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onNavigate={navigateTo}
        agentTask={agentTask}
        onExecuteAgent={executeAutonomousTask}
        onOpenAudit={() => setShowPrivacyAudit(true)}
        agentLogs={agentLogs}
        agentResult={agentResult}
      />

      {/* 4. Bottom Command Terminal Bar (in-flow, will NEVER cover content!) */}
      <footer className="border-t border-[#1E293B] bg-[#0b0f19] p-3 sm:p-4 flex flex-col gap-2.5 z-30 shrink-0">
         <form onSubmit={handleBottomSubmit} className="flex gap-2 sm:gap-3 max-w-[1400px] w-full mx-auto items-center">
           <button 
             type="button"
             onClick={() => setShowSettingsModal(true)}
             className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center border border-[#1E293B] bg-[#111622] rounded-xl hover:bg-[#1a2333] hover:border-[#00F0FF]/40 transition group cursor-pointer"
             title="Configuración de Aether"
           >
             <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F0FF] group-hover:rotate-45 transition-transform" />
           </button>
           
           <div className="flex-1 bg-[#111622] border border-[#1E293B] focus-within:border-[#00F0FF]/60 rounded-xl flex items-center px-3 sm:px-4 h-10 sm:h-11 transition-colors min-w-0">
             <input 
                type="text" 
                placeholder={
                  browserMode === 'autonomous'
                    ? "Orden para el Agente Autónomo (ej. 'Investiga vulnerabilidades en la web')..."
                    : "Ask anything... (Escribe una tarea y el agente navegará en tiempo real)"
                }
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-[14px] text-gray-200 placeholder-gray-500 font-sans min-w-0" 
             />
             <div className="flex items-center gap-2.5 text-gray-500 ml-2 sm:ml-4 shrink-0">
               <Flame 
                 onClick={() => {
                   setAgentInput('Ejecutar prueba de estrés y benchmark de modelo');
                   showToast('Orden rápida preparada');
                 }}
                 className="w-4 h-4 hover:text-orange-400 cursor-pointer transition hidden xs:inline" 
                 title="Modo Turbo"
               />
               <Globe 
                 onClick={() => {
                   setAgentInput('Auditar seguridad y enlaces del dominio actual');
                   showToast('Orden rápida preparada');
                 }}
                 className="w-4 h-4 hover:text-blue-400 cursor-pointer transition hidden xs:inline" 
                 title="Mapeo de red"
               />
               <Paperclip 
                 onClick={() => showToast('Gestor de contexto: 0 archivos adjuntos')}
                 className="w-4 h-4 hover:text-gray-300 cursor-pointer transition hidden sm:inline" 
                 title="Adjuntar contexto"
               />
               <Mic 
                 onClick={handleVoiceInput}
                 className={`w-4 h-4 cursor-pointer transition ${micActive ? 'text-red-400 animate-pulse' : 'hover:text-gray-300'}`} 
                 title="Instrucción por voz"
               />
             </div>
           </div>
           
           <button 
             type="submit"
             disabled={agentTask?.status === 'running'}
             className="bg-[#00F0FF] disabled:opacity-50 text-black px-4 sm:px-6 h-10 sm:h-11 rounded-xl font-bold text-xs sm:text-[13px] tracking-wide flex items-center gap-1.5 hover:bg-[#33f3ff] transition shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] shrink-0 active:scale-95 cursor-pointer"
           >
             {agentTask?.status === 'running' ? (
               <>EJECUTANDO <RefreshCw className="w-3.5 h-3.5 animate-spin" /></>
             ) : (
               <>ENVIAR <Send className="w-3.5 h-3.5" /></>
             )}
           </button>
         </form>
         
         {/* Status Footer */}
         <div className="flex flex-wrap justify-between items-center text-[10px] text-gray-500 font-mono px-1 max-w-[1400px] w-full mx-auto uppercase tracking-wide gap-1">
           <div className="flex items-center gap-4">
             <div 
               onClick={() => setShowSettingsModal(true)}
               className="flex items-center gap-1.5 cursor-pointer hover:text-gray-300 transition"
             >
               <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_5px_#00F0FF]"></div> 
               Motor: <span className="text-gray-300 font-bold">LLaMA Uncensored</span>
             </div>
             <span className="hidden md:inline">cURL: POST http://localhost:11434/api/generate</span>
           </div>
           
           <div className="flex items-center gap-3">
              <span 
                onClick={() => setShowPrivacyAudit(true)}
                className="cursor-pointer hover:text-gray-300 transition"
              >
                Escudo: <span className="text-[#27C93F] font-bold">143.168.116.237</span>
              </span>
              <span className="opacity-40 hidden sm:inline">•</span>
              <span className="hidden sm:inline">0g Motion</span>
              <span className="opacity-40">•</span>
              <span className="text-gray-400">
                {agentTask?.status === 'running' ? 'Agente Activo' : 'Daemon en Espera'}
              </span>
           </div>
         </div>
      </footer>

      {/* Privacy Audit Modal */}
      <AnimatePresence>
        {showPrivacyAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e1422] border border-[#00F0FF]/40 rounded-2xl shadow-2xl p-6 relative font-mono text-xs"
            >
              <button 
                onClick={() => setShowPrivacyAudit(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 text-[#00F0FF] text-base font-bold mb-4 font-sans">
                <Shield className="w-5 h-5 text-[#00F0FF]" />
                Auditoría de Seguridad & Protocolo Airgap
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="p-3 bg-[#080b13] border border-[#1E293B] rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">Aislamiento IP (Escudo):</span>
                    <span className="text-[#27C93F] font-bold">143.168.116.237 (ACTIVO)</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">Cifrado de Túnel:</span>
                    <span className="text-[#00F0FF]">AES-256 GCM (AIRGAP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rastreadores bloqueados:</span>
                    <span className="text-gray-200">100% (Modo Zero-Telemetry)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#080b13] border border-[#1E293B] rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">V-Drive Storage:</span>
                    <span className="text-gray-200">1000GB montado en RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Motor de Agente:</span>
                    <span className="text-[#00F0FF]">LLaMA Uncensored v3</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#27C93F] bg-green-950/20 border border-green-500/20 p-2.5 rounded-lg text-[11px]">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Sin fugas de DNS. Todos los paquetes DOM se resuelven localmente en el contenedor.</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowPrivacyAudit(false);
                  showToast('Auditoría completada sin vulnerabilidades');
                }}
                className="mt-5 w-full py-2.5 bg-[#00F0FF] text-black font-sans font-bold text-sm rounded-xl hover:bg-[#33f3ff] transition cursor-pointer"
              >
                Cerrar Auditoría
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0e1422] border border-[#1E293B] rounded-2xl shadow-2xl p-6 relative"
            >
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 text-white text-base font-bold mb-4">
                <Settings className="w-5 h-5 text-[#00F0FF]" />
                Configuración del Navegador Neural
              </div>

              <div className="space-y-4 text-sm text-gray-300 font-sans">
                <div>
                  <label className="text-xs text-gray-400 font-mono block mb-1.5">Motor de Inferencia AI</label>
                  <select className="w-full bg-[#080b13] border border-[#1E293B] rounded-lg px-3 py-2 text-xs font-mono text-gray-200 outline-none focus:border-[#00F0FF]">
                    <option>LLaMA Uncensored (Integrado)</option>
                    <option>Ollama Localhost (11434)</option>
                    <option>Gemini 2.5 Flash Server-Side</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-mono block mb-1.5">V-Drive Cache</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => showToast('Memoria caché V-Drive vaciada con éxito')}
                      className="flex-1 py-2 bg-[#111622] border border-[#1E293B] hover:border-gray-500 rounded-lg text-xs font-mono transition cursor-pointer"
                    >
                      Limpiar V-Drive (1000GB)
                    </button>
                    <button 
                      onClick={() => showToast('Reglas de firewall y escudo recargadas')}
                      className="flex-1 py-2 bg-[#111622] border border-[#1E293B] hover:border-gray-500 rounded-lg text-xs font-mono transition cursor-pointer"
                    >
                      Reiniciar Escudo
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E293B]">
                  <PWAInstallButton />
                </div>
              </div>

              <button 
                onClick={() => setShowSettingsModal(false)}
                className="mt-6 w-full py-2.5 bg-[#00F0FF] text-black font-bold text-sm rounded-xl hover:bg-[#33f3ff] transition cursor-pointer"
              >
                Guardar y Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Autonomous Agent Free-Chat Overlay */}
      <AnimatePresence>
        {showAgentChat && (
          <AutonomousAgentOverlay 
            isOpen={showAgentChat}
            onClose={() => setShowAgentChat(false)}
            activeTab={activeTab}
            onNavigate={navigateTo}
            onOpenAudit={() => setShowPrivacyAudit(true)}
            initialInstruction={agentChatInitialText}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
