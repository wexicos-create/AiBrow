import React from 'react';
import { 
  Search, Mic, Camera, Zap, Shield, Code, Settings, Mail, Youtube, 
  BookOpen, Newspaper, ExternalLink, AlertTriangle, CheckCircle, 
  Sparkles, Bot, Eye, Terminal, ArrowUpRight, Play, Loader2, Globe
} from 'lucide-react';
import { Tab, BrowserMode, AgentTask } from '../types';
import { MOCK_SEARCH_RESULTS, ZERO_DAYS_ALERTS, TECH_NEWS } from '../data/browserMockData';

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

  // Render Google Home (Exact replica of the provided design)
  if (activeTab.type === 'home') {
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
            placeholder="Busca en Google o escribe una orden para el Agente Autónomo..." 
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
            Ejecutar con Agente Autónomo LLaMA
          </button>
        </div>

        {/* Mode Selector Pill */}
        <div className="mt-5 flex items-center gap-1 p-1 bg-[#111622] border border-[#1E293B] rounded-full text-xs">
          <span className="px-3 py-1 text-gray-400 font-mono text-[11px]">Modo de Uso:</span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold ${
            mode === 'manual' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40' : 'text-gray-400'
          }`}>
            Manual
          </span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold ${
            mode === 'mixed' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-gray-400'
          }`}>
            Mixto (Copiloto)
          </span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold ${
            mode === 'autonomous' ? 'bg-green-500/20 text-green-300 border border-green-500/40 animate-pulse' : 'text-gray-400'
          }`}>
            Autónomo IA
          </span>
        </div>

        {/* Shortcuts */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 max-w-full">
          {[
            { label: 'Gmail', icon: Mail, url: 'https://mail.google.com', type: 'custom' as const },
            { label: 'YouTube', icon: Youtube, color: 'text-red-500', url: 'https://youtube.com', type: 'custom' as const },
            { label: 'GitHub', icon: Code, url: 'https://github.com', type: 'github' as const },
            { label: 'Wikipedia', icon: BookOpen, color: 'text-green-500', url: 'https://es.wikipedia.org', type: 'wikipedia' as const },
            { label: 'Noticias', icon: Newspaper, color: 'text-blue-400', url: 'https://news.google.com', type: 'news' as const },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(item.label, item.url, item.type)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111622] border border-[#1E293B] group-hover:border-[#00F0FF]/60 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-center transition shadow-sm active:scale-95">
                <item.icon className={`w-5 h-5 ${item.color || 'text-gray-400 group-hover:text-gray-200'} transition`} />
              </div>
              <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Terminal / Neural Agent Panel */}
        <div className="w-full max-w-[850px] mt-8 bg-[#080b13] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-wrap justify-between items-center px-4 py-2.5 sm:py-3 border-b border-[#1E293B] bg-[#111622]/50 gap-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <div className={`w-2 h-2 rounded-full ${isAgentActive ? 'bg-yellow-400 animate-ping' : 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]'}`}></div>
              <span className="text-gray-300 tracking-wide text-[11px] sm:text-xs">
                Navegación & Agente Neural: <span className="text-[#00F0FF]">Google Listo (V-Drive 1000GB montado)</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-mono">2026-09-05T11:20:00Z</span>
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-3 bg-[#0a0f18]">
             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
               <div className="flex items-start gap-2.5 flex-1">
                 <div className="flex items-center mt-0.5 shrink-0 text-[#00F0FF] font-mono font-bold text-sm">
                   &gt;<span className="animate-pulse">_</span>
                 </div>
                 <p className="text-[12px] sm:text-[13px] text-gray-400 leading-relaxed font-mono">
                   Introduce cualquier búsqueda o pregunta: el motor <span className="text-[#00F0FF] font-bold">enviarAlAgente()</span> resolverá páginas web y formularios en tiempo real.
                 </p>
               </div>
               <button 
                 type="button"
                 onClick={onOpenAudit}
                 className="px-3.5 py-1.5 border border-[#00F0FF]/40 text-[#00F0FF] text-[11px] rounded hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition font-mono uppercase tracking-wider shrink-0 cursor-pointer active:scale-95 self-start sm:self-auto"
               >
                 Auditar Privacidad
               </button>
             </div>

             {/* Live Terminal Output Stream */}
             <div className="bg-[#05080f] border border-gray-900 rounded-lg p-3 font-mono text-xs max-h-36 overflow-y-auto space-y-1.5">
               {agentLogs.map((log, idx) => (
                 <div key={idx} className="flex items-start gap-2 leading-relaxed">
                   <span className="text-gray-600 text-[10px] shrink-0 select-none">[{log.time}]</span>
                   <span className={
                     log.type === 'action' ? 'text-[#00F0FF] font-bold' :
                     log.type === 'success' ? 'text-[#27C93F]' :
                     log.type === 'warn' ? 'text-yellow-400' : 'text-gray-400'
                   }>
                     {log.text}
                   </span>
                 </div>
               ))}
             </div>

             {/* Agent Result Display if any */}
             {agentResult && (
               <div className="bg-[#111622]/90 border border-[#00F0FF]/30 rounded-lg p-3 text-xs text-gray-300 font-mono">
                 <div className="flex items-center gap-1.5 text-[#00F0FF] font-semibold mb-1">
                   <CheckCircle className="w-3.5 h-3.5" />
                   Respuesta del Agente Neural:
                 </div>
                 <p className="text-gray-300 leading-relaxed">{agentResult}</p>
               </div>
             )}
          </div>
        </div>

      </div>
    );
  }

  // Render Google Search Results View
  if (activeTab.type === 'search') {
    const results = MOCK_SEARCH_RESULTS.default;
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-6">
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span>Aproximadamente 4,280,000 resultados (0.18 segundos)</span>
            <span className="border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-0.5 rounded text-[10px]">
              FILTRADO AIRGAP ACTIVO
            </span>
          </div>
          <button 
            onClick={() => onExecuteAgent(`Resumir todos los resultados de búsqueda para: "${activeTab.query || searchQuery}"`)}
            className="flex items-center gap-1.5 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            Sintetizar Página con IA
          </button>
        </div>

        <div className="space-y-6">
          {results.map((res) => (
            <div key={res.id} className="group bg-[#111622]/40 hover:bg-[#111622] p-4 rounded-xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition">
              <div className="text-[11px] text-gray-400 font-mono flex items-center gap-2 mb-1">
                <span>{res.displayUrl}</span>
                {res.category && (
                  <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[9px] uppercase">
                    {res.category}
                  </span>
                )}
              </div>
              <h3 
                onClick={() => onNavigate(res.title, res.url, 'custom')}
                className="text-base sm:text-lg font-medium text-[#8ab4f8] group-hover:underline cursor-pointer flex items-center gap-1.5"
              >
                {res.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed font-sans">
                {res.snippet}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button 
                  onClick={() => onNavigate(res.title, res.url, 'custom')}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" /> Visitar sitio
                </button>
                <button 
                  onClick={() => onExecuteAgent(`Extraer y analizar el contenido completo de ${res.url}`)}
                  className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                >
                  <Zap className="w-3 h-3" /> Extraer con LLaMA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Zero-Days Hub View
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
          <button 
            onClick={() => onExecuteAgent('Auditar y validar mitigaciones de todos los CVEs listados')}
            className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 hover:bg-yellow-500/20 transition cursor-pointer"
          >
            <Zap className="w-4 h-4" fill="currentColor" />
            Auditar Todo con Agente Autónomo
          </button>
        </div>

        <div className="grid gap-4">
          {ZERO_DAYS_ALERTS.map((alert, i) => (
            <div key={i} className="bg-[#111622] border border-[#1E293B] rounded-xl p-5 hover:border-yellow-500/40 transition">
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
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={() => onExecuteAgent(`Generar parche de aislamiento en tiempo real para ${alert.cve}`)}
                  className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer"
                >
                  Simular Parche con IA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render GitHub View
  if (activeTab.type === 'github') {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Code className="w-7 h-7 text-white" />
              <div>
                <h2 className="text-lg font-bold text-white">aether-os / neural-browser-core</h2>
                <p className="text-xs text-gray-400 font-mono">Motor de navegación autónoma con integración nativa LLaMA</p>
              </div>
            </div>
            <button 
              onClick={() => onExecuteAgent('Inspeccionar y analizar el código fuente de neural-browser-core')}
              className="bg-[#00F0FF] text-black px-4 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-[#33f3ff] transition cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              Revisar Código con Agente IA
            </button>
          </div>

          <div className="border-t border-[#1E293B] pt-4 font-mono text-xs space-y-2 text-gray-300">
            <div className="flex justify-between py-1.5 px-3 bg-[#080b13] rounded border border-gray-900">
              <span>src/engine/realtime_dom.ts</span>
              <span className="text-gray-500">Resolución de selectores DOM en 4ms</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 bg-[#080b13] rounded border border-gray-900">
              <span>src/agent/llama_uncensored.ts</span>
              <span className="text-gray-500">Pipeline de inferencia local sin telemetría</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 bg-[#080b13] rounded border border-gray-900">
              <span>src/security/airgap_tunnel.ts</span>
              <span className="text-gray-500">Enrutado cifrado hacia túnel 143.168.116.237</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Wikipedia View
  if (activeTab.type === 'wikipedia') {
    return (
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-6">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-4">
            <div>
              <span className="text-[11px] font-mono text-gray-500 uppercase">Wikipedia Enciclopedia Libre</span>
              <h1 className="text-2xl font-serif text-white mt-1">Agente Inteligente y Navegación Headless</h1>
            </div>
            <button 
              onClick={() => onExecuteAgent('Generar resumen ejecutivo de los conceptos clave de este artículo de Wikipedia')}
              className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 hover:bg-[#00F0FF]/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Resumir Artículo
            </button>
          </div>
          <div className="text-sm text-gray-300 leading-relaxed space-y-4 font-sans">
            <p>
              En inteligencia artificial, un <strong>agente inteligente</strong> es una entidad autónoma que percibe su entorno a través de sensores y actúa sobre ese entorno mediante actuadores para alcanzar sus objetivos.
            </p>
            <p>
              En el contexto de la navegación web, los agentes de navegación neural como <em>Aether Browser</em> emplean modelos de lenguaje de gran escala para interpretar el árbol de objetos del documento (DOM), predecir interacciones complejas con interfaces de usuario y automatizar tareas repetitivas en tiempo real con aislamiento de memoria estricto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render News View
  if (activeTab.type === 'news') {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-400" />
            Noticias Tecnológicas & Ecosistema IA
          </h2>
          <button 
            onClick={() => onExecuteAgent('Elaborar un resumen ejecutivo de las noticias destacadas de hoy')}
            className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer"
          >
            Sintetizar Titulares
          </button>
        </div>

        <div className="grid gap-4">
          {TECH_NEWS.map(news => (
            <div key={news.id} className="bg-[#111622] border border-[#1E293B] rounded-xl p-5 hover:border-[#00F0FF]/40 transition">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-2">
                <span className="text-[#00F0FF]">{news.source}</span>
                <span>{news.time}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{news.title}</h3>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">{news.summary}</p>
              <div className="mt-3 flex gap-3">
                <button 
                  onClick={() => onExecuteAgent(`Profundizar e investigar detalles sobre: "${news.title}"`)}
                  className="text-xs text-[#00F0FF] hover:underline font-mono cursor-pointer"
                >
                  Investigar con LLaMA &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for Custom URL
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 overflow-y-auto">
      <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center mx-auto mb-3">
          <Globe className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white mb-1">{activeTab.title}</h2>
        <p className="text-xs text-gray-400 font-mono mb-6">{activeTab.url}</p>
        <div className="bg-[#080b13] border border-gray-800 rounded-lg p-4 text-xs font-mono text-left max-w-md mx-auto space-y-2">
          <div className="text-[#27C93F] flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> DOM renderizado en aislamiento seguro
          </div>
          <div className="text-gray-400">Protocolo: TLS 1.3 con clave de 256 bits</div>
          <div className="text-gray-400">Cookies y rastreadores: 0 permitidos</div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button 
            onClick={() => onNavigate('Google', 'https://www.google.com', 'home')}
            className="px-4 py-2 bg-[#1f2937] hover:bg-gray-700 rounded-lg text-xs text-white transition cursor-pointer"
          >
            Volver al Inicio
          </button>
          <button 
            onClick={() => onExecuteAgent(`Analizar y extraer datos de la página ${activeTab.url}`)}
            className="px-4 py-2 bg-[#00F0FF] text-black font-bold rounded-lg text-xs hover:bg-[#33f3ff] transition cursor-pointer"
          >
            Analizar con Agente IA
          </button>
        </div>
      </div>
    </div>
  );
};
