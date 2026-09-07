import React from 'react';
import { 
  Search, Mic, Camera, Zap, Shield, Code, Settings, Mail, Youtube, 
  BookOpen, Newspaper, ExternalLink, AlertTriangle, CheckCircle, 
  Sparkles, Bot, Eye, Terminal, ArrowUpRight, Play, Loader2, Globe, Lock,
  Bug, Wrench
} from 'lucide-react';
import { Tab, BrowserMode, AgentTask } from '../types';
import { ZERO_DAYS_ALERTS, TECH_NEWS } from '../data/browserMockData';
import { YouTubeView } from './YouTubeView';
import { WikipediaView } from './WikipediaView';
import { WebIframeView } from './WebIframeView';
import { SearchResultsView } from './SearchResultsView';
import { CodeRepairScanner } from './CodeRepairScanner';

interface BrowserViewportProps {
  activeTab: Tab;
  mode: BrowserMode;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch: (q: string) => void;
  onNavigate: (title: string, url: string, type: Tab['type'], query?: string) => void;
  agentTask: AgentTask | null;
  onExecuteAgent: (prompt: string) => void;
  onOpenAudit: () => void;
  agentLogs: Array<{ time: string; text: string; type: string }>;
  agentResult: string | null;
}

export const BrowserViewport: React.FC<BrowserViewportProps> = ({
  activeTab,
  mode,
  searchQuery,
  setSearchQuery,
  onSearch,
  onNavigate,
  agentTask,
  onExecuteAgent,
  onOpenAudit,
  agentLogs,
  agentResult
}) => {
  const isAgentActive = agentTask?.status === 'running';

  const handleOpenExternal = (url: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Error opening external URL:', e);
    }
  };

  // 1. YouTube Dedicated Live View
  if (activeTab.url.includes('youtube.com') || activeTab.url.includes('youtu.be') || activeTab.title.toLowerCase().includes('youtube')) {
    return (
      <YouTubeView 
        onExecuteAgent={onExecuteAgent}
        onOpenExternal={handleOpenExternal}
      />
    );
  }

  // 2. Wikipedia Live API View
  if (activeTab.type === 'wikipedia' || activeTab.url.includes('wikipedia.org')) {
    const wikiTopic = activeTab.query || activeTab.title.replace('Wikipedia', '').replace('-', '').trim() || 'Inteligencia artificial';
    return (
      <WikipediaView 
        initialQuery={wikiTopic}
        onExecuteAgent={onExecuteAgent}
        onOpenExternal={handleOpenExternal}
      />
    );
  }

  // 3. Search Results Dynamic View
  if (activeTab.type === 'search') {
    return (
      <SearchResultsView 
        query={activeTab.query || searchQuery || 'Exploración Web'}
        onNavigate={onNavigate}
        onExecuteAgent={onExecuteAgent}
        onOpenExternal={handleOpenExternal}
      />
    );
  }

  // 4. Custom External Web Page (Real Iframe & Reader View)
  if (activeTab.type === 'custom') {
    return (
      <WebIframeView 
        url={activeTab.url}
        title={activeTab.title}
        onExecuteAgent={onExecuteAgent}
        onOpenExternal={handleOpenExternal}
        onNavigate={onNavigate}
      />
    );
  }

  // 5. Code Error Scanner & Repair DevTools View
  if (activeTab.type === 'devtools' || activeTab.url.includes('devtools') || activeTab.url.includes('scanner') || activeTab.title.toLowerCase().includes('reparar') || activeTab.title.toLowerCase().includes('escáner')) {
    return (
      <CodeRepairScanner 
        onNotify={(msg) => onExecuteAgent(msg)}
      />
    );
  }

  // 6. Zero-Days Security Hub View
  if (activeTab.type === 'zerodays') {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E293B] mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-500" />
              Zero-Days Vulnerability Hub & Defense Feed
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Monitoreo continuo de vectores de ataque en navegadores web y aislamiento Airgap.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenExternal('https://cve.org')}
              className="bg-[#1f2937] hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition cursor-pointer border border-[#1E293B]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
              CVE.org ↗
            </button>
            <button 
              onClick={() => onExecuteAgent('Auditar y validar mitigaciones de todos los CVEs listados')}
              className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:bg-yellow-500/20 transition cursor-pointer"
            >
              <Zap className="w-4 h-4" fill="currentColor" />
              Auditar Todo con IA
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {ZERO_DAYS_ALERTS.map((alert, i) => (
            <div key={i} className="bg-[#111622] border border-[#1E293B] rounded-xl p-5 hover:border-yellow-500/40 transition shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-bold">
                    {alert.cve}
                  </span>
                  <span className="text-white font-semibold">{alert.name}</span>
                </div>
                <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono">
                  {alert.status}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed mb-3">
                {alert.description}
              </p>
              <div className="bg-[#080b13] p-3 rounded-lg border border-gray-900 font-mono text-xs space-y-1 text-gray-400">
                <div><span className="text-gray-500">Afecta:</span> {alert.affected}</div>
                <div><span className="text-[#27C93F]">Mitigación Aether:</span> {alert.mitigation}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button 
                  onClick={() => onExecuteAgent(`Generar parche de aislamiento en tiempo real para ${alert.cve}`)}
                  className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer"
                >
                  Simular Parche con IA
                </button>
                <button 
                  onClick={() => handleOpenExternal(`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${alert.cve}`)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" /> Ver Registro Oficial CVE ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. GitHub Repository Browser View
  if (activeTab.type === 'github') {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">aether-os / neural-browser-core</h2>
                <p className="text-xs text-gray-400 font-mono">Motor de navegación autónoma con integración nativa LLaMA</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleOpenExternal('https://github.com')}
                className="bg-[#1f2937] hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition cursor-pointer border border-[#1E293B]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                GitHub.com ↗
              </button>
              <button 
                onClick={() => onExecuteAgent('Inspeccionar y analizar el código fuente de neural-browser-core')}
                className="bg-[#00F0FF] text-black px-4 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-[#33f3ff] transition cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                Revisar Código con IA
              </button>
            </div>
          </div>

          <div className="border-t border-[#1E293B] pt-4 font-mono text-xs space-y-2 text-gray-300">
            <div className="flex justify-between py-2 px-3 bg-[#080b13] rounded-lg border border-gray-900">
              <span className="text-[#8ab4f8]">src/engine/realtime_dom.ts</span>
              <span className="text-gray-500">Resolución de selectores DOM en 4ms</span>
            </div>
            <div className="flex justify-between py-2 px-3 bg-[#080b13] rounded-lg border border-gray-900">
              <span className="text-[#8ab4f8]">src/agent/ai_engine.ts</span>
              <span className="text-gray-500">Inferencia semántica y extracción de datos</span>
            </div>
            <div className="flex justify-between py-2 px-3 bg-[#080b13] rounded-lg border border-gray-900">
              <span className="text-[#8ab4f8]">src/security/airgap_tunnel.ts</span>
              <span className="text-gray-500">Enrutado cifrado hacia túnel 143.168.116.237</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. News / Feed View
  if (activeTab.type === 'news') {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E293B] mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-400" />
              Noticias Tecnológicas & Ecosistema IA
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Actualidad verificada sobre avances en software, seguridad e inteligencia artificial.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenExternal('https://news.google.com')}
              className="bg-[#1f2937] hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition cursor-pointer border border-[#1E293B]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Google News ↗
            </button>
            <button 
              onClick={() => onExecuteAgent('Elaborar un resumen ejecutivo de las noticias destacadas de hoy')}
              className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-4 py-2 rounded-xl text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer font-bold"
            >
              <Sparkles className="w-4 h-4" />
              Sintetizar Titulares
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {TECH_NEWS.map(news => (
            <div key={news.id} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-5 hover:border-[#00F0FF]/40 transition shadow-lg">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-2">
                <span className="text-[#00F0FF] font-semibold">{news.source}</span>
                <span>{news.time}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{news.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">{news.summary}</p>
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => onExecuteAgent(`Profundizar e investigar detalles sobre: "${news.title}"`)}
                  className="text-xs text-[#00F0FF] hover:underline font-mono cursor-pointer flex items-center gap-1 font-bold"
                >
                  <Zap className="w-3.5 h-3.5" /> Investigar con Agente IA &rarr;
                </button>
                <button 
                  onClick={() => onSearch(news.title)}
                  className="text-xs text-gray-400 hover:text-white font-mono cursor-pointer flex items-center gap-1 ml-auto"
                >
                  <Search className="w-3 h-3" /> Buscar en Google
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. Default: Google Home View
  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full px-4 sm:px-6 py-8 overflow-y-auto">
      
      {/* Google Logo */}
      <div 
        onClick={() => onSearch('Google AI')}
        className="text-5xl sm:text-6xl md:text-[5.5rem] font-sans font-medium tracking-tighter leading-none select-none flex cursor-pointer hover:opacity-95 transition"
      >
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </div>

      {/* AI Badge */}
      <div 
        onClick={() => onExecuteAgent('Análisis del entorno web y verificación de modelo LLaMA')}
        className="border border-[#00F0FF]/30 bg-[#00F0FF]/5 px-3.5 sm:px-4 py-1.5 rounded-full mt-3.5 flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.05)] cursor-pointer hover:bg-[#00F0FF]/15 transition max-w-full"
      >
        <Settings className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
        <span className="text-[11px] sm:text-xs font-semibold text-[#00F0FF] tracking-wider uppercase truncate">Neural Live • Aether Browser</span>
        <span className="text-[11px] sm:text-xs text-gray-400 border-l border-[#1E293B] pl-2 ml-1 hidden xs:inline truncate">LLaMA Uncensored Integrado</span>
      </div>

      {/* Search Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) onSearch(searchQuery);
        }}
        className="w-full max-w-[680px] mt-6 bg-[#111622] border border-gray-700 hover:border-gray-500 focus-within:border-[#00F0FF]/80 rounded-full min-h-[48px] sm:min-h-[52px] flex items-center px-4 sm:px-5 shadow-lg transition-colors group"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 group-focus-within:text-[#00F0FF] transition" />
        <input 
          type="text" 
          placeholder="Busca en Google, YouTube o escribe una orden para la IA..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none px-3 sm:px-4 text-xs sm:text-[14px] text-gray-200 placeholder-gray-500 font-sans min-w-0"
        />
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Mic 
            onClick={() => onSearch('Búsqueda por voz activada')}
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition" 
          />
          <Camera 
            onClick={() => onSearch('Reconocimiento visual OCR')}
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition" 
          />
          <button 
            type="button"
            onClick={() => onExecuteAgent(searchQuery || 'Exploración neural autónoma')}
            className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 text-[11px] font-bold hover:bg-[#00F0FF]/30 transition active:scale-95 cursor-pointer"
          >
            <Zap className="w-3 h-3" fill="currentColor" />
            IA
          </button>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-[680px]">
        <button 
          type="button"
          onClick={() => onSearch(searchQuery || 'Inteligencia Artificial y Navegación Web')}
          className="bg-[#1f2937]/60 hover:bg-[#1f2937] border border-[#1E293B] hover:border-gray-600 text-xs sm:text-sm text-gray-300 px-5 sm:px-6 py-2.5 rounded-md transition font-medium cursor-pointer active:scale-95 shadow-sm"
        >
          Buscar con Google
        </button>
        <button 
          type="button"
          onClick={() => onExecuteAgent(searchQuery || 'Investigar y resumir las últimas noticias de ciberseguridad')}
          className="bg-[#111622] border border-[#00F0FF]/40 hover:border-[#00F0FF] text-[#00F0FF] text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-md flex items-center gap-2 shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition font-medium cursor-pointer active:scale-95"
        >
          <Zap className="w-4 h-4" fill="currentColor" />
          Ejecutar con Agente Autónomo
        </button>
      </div>

      {/* Shortcuts */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-7 max-w-full">
        {[
          { label: 'YouTube', icon: Youtube, color: 'text-red-500', url: 'https://youtube.com', type: 'custom' as const },
          { label: 'Reparar Código', icon: Bug, color: 'text-[#00F0FF]', url: 'aether://devtools/scanner', type: 'devtools' as const },
          { label: 'Wikipedia', icon: BookOpen, color: 'text-green-500', url: 'https://es.wikipedia.org', type: 'wikipedia' as const },
          { label: 'GitHub', icon: Code, url: 'https://github.com', type: 'github' as const },
          { label: 'Noticias', icon: Newspaper, color: 'text-blue-400', url: 'https://news.google.com', type: 'news' as const },
          { label: 'Gmail', icon: Mail, url: 'https://mail.google.com', type: 'custom' as const },
          { label: 'Zero-Days', icon: Shield, color: 'text-yellow-400', url: 'https://zerodays.network', type: 'zerodays' as const },
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate(item.label, item.url, item.type)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#111622] border border-[#1E293B] group-hover:border-[#00F0FF]/60 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center justify-center transition shadow-sm active:scale-95">
              <item.icon className={`w-5 h-5 ${item.color || 'text-gray-400 group-hover:text-gray-200'} transition`} />
            </div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-200 transition font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Terminal / Live Neural Agent Panel */}
      <div className="w-full max-w-[850px] mt-8 bg-[#080b13] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-[#1E293B] bg-[#111622]/50 gap-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className={`w-2.5 h-2.5 rounded-full ${isAgentActive ? 'bg-yellow-400 animate-ping' : 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]'}`}></div>
            <span className="text-gray-200 tracking-wide text-[11px] sm:text-xs font-semibold">
              Agente IA & Motor de Navegación: <span className="text-[#00F0FF] font-mono">Listo</span>
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-gray-500 font-mono">Modo: {mode.toUpperCase()}</span>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-3 bg-[#0a0f18]">
           <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
             <div className="flex items-start gap-2.5 flex-1">
               <div className="flex items-center mt-0.5 shrink-0 text-[#00F0FF] font-mono font-bold text-sm">
                 &gt;<span className="animate-pulse">_</span>
               </div>
               <p className="text-[12px] sm:text-[13px] text-gray-300 leading-relaxed font-mono">
                 Escribe cualquier orden en la barra inferior o en el buscador: el agente resolverá la web, extraerá contenidos y responderá de forma dinámica y directa.
               </p>
             </div>
             <button 
               type="button"
               onClick={onOpenAudit}
               className="px-3.5 py-1.5 border border-[#00F0FF]/40 text-[#00F0FF] text-[11px] rounded-lg hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition font-mono uppercase tracking-wider shrink-0 cursor-pointer active:scale-95 self-start sm:self-auto"
             >
               Auditar Privacidad
             </button>
           </div>

           {/* Live Terminal Output Stream */}
           <div className="bg-[#05080f] border border-gray-900 rounded-xl p-3.5 font-mono text-xs max-h-44 overflow-y-auto space-y-1.5 shadow-inner">
             {agentLogs.map((log, idx) => (
               <div key={idx} className="flex items-start gap-2 leading-relaxed">
                 <span className="text-gray-600 text-[10px] shrink-0 select-none">[{log.time}]</span>
                 <span className={
                   log.type === 'action' ? 'text-[#00F0FF] font-bold' :
                   log.type === 'success' ? 'text-[#27C93F]' :
                   log.type === 'warn' ? 'text-yellow-400' : 'text-gray-300'
                 }>
                   {log.text}
                 </span>
               </div>
             ))}
           </div>

           {/* Dynamic Agent Result Card */}
           {agentResult && (
             <div className="bg-[#111622] border border-[#00F0FF]/40 rounded-xl p-4 text-xs text-gray-200 font-sans shadow-lg space-y-2">
               <div className="flex items-center gap-1.5 text-[#00F0FF] font-semibold font-mono text-xs">
                 <CheckCircle className="w-4 h-4 text-[#27C93F]" />
                 Respuesta del Agente IA:
               </div>
               <p className="text-gray-200 leading-relaxed text-sm whitespace-pre-line font-sans">{agentResult}</p>
             </div>
           )}
        </div>
      </div>

    </div>
  );
};
