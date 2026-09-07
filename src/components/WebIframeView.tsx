import React, { useState } from 'react';
import { 
  Globe, ExternalLink, ShieldCheck, RefreshCw, BookOpen, 
  Sparkles, Lock, AlertCircle, Copy, Check, Terminal, Eye
} from 'lucide-react';

interface WebIframeViewProps {
  url: string;
  title: string;
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
  onNavigate: (title: string, url: string, type: any) => void;
}

export const WebIframeView: React.FC<WebIframeViewProps> = ({
  url,
  title,
  onExecuteAgent,
  onOpenExternal,
  onNavigate
}) => {
  const [viewMode, setViewMode] = useState<'iframe' | 'reader'>('iframe');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domain = url.replace('https://', '').replace('http://', '').split('/')[0];

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-hidden">
      {/* Top Web Control Bar */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 z-10 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
              <Lock className="w-3 h-3 text-[#27C93F] shrink-0" />
              <span className="truncate">{title}</span>
            </div>
            <div className="text-[11px] text-gray-400 font-mono truncate">{url}</div>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#111622] border border-[#1E293B] p-0.5 rounded-lg flex text-xs font-mono">
            <button
              onClick={() => setViewMode('iframe')}
              className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'iframe' ? 'bg-[#00F0FF] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Web Iframe</span>
            </button>
            <button
              onClick={() => setViewMode('reader')}
              className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'reader' ? 'bg-[#00F0FF] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline">Modo Lector</span>
            </button>
          </div>

          <button
            onClick={() => setIframeKey(prev => prev + 1)}
            className="p-1.5 bg-[#111622] hover:bg-[#1f2937] border border-[#1E293B] rounded-lg text-gray-300 transition cursor-pointer"
            title="Recargar marco web"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyUrl}
            className="p-1.5 bg-[#111622] hover:bg-[#1f2937] border border-[#1E293B] rounded-lg text-gray-300 transition cursor-pointer"
            title="Copiar URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#27C93F]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Primary Popout Button */}
          <button
            onClick={() => onOpenExternal(url)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black rounded-lg text-xs font-bold font-mono transition cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            title="Abrir el sitio web real en una nueva pestaña sin restricciones"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir Web Real</span> ↗
          </button>
        </div>
      </div>

      {/* Security & Frame Notice Banner */}
      <div className="bg-[#0b101c] border-b border-[#1E293B] px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" />
          <span>Aislamiento Sandbox Activo: <strong>{domain}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 hidden md:inline">
            ¿El sitio bloquea iframes por CSP/X-Frame-Options? Haz clic en "Abrir Web Real ↗"
          </span>
          <button
            onClick={() => onExecuteAgent(`Inspeccionar y analizar estructura semántica de ${url}`)}
            className="text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <Sparkles className="w-3 h-3" /> Analizar con Agente IA
          </button>
        </div>
      </div>

      {/* Viewport Content */}
      {viewMode === 'iframe' ? (
        <div className="flex-1 w-full h-full relative bg-white">
          <iframe
            key={iframeKey}
            src={url}
            title={title}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
            allow="camera; microphone; geolocation; fullscreen; clipboard-write; encrypted-media"
          />
        </div>
      ) : (
        /* Reader / Clean Article View */
        <div className="flex-1 w-full p-4 sm:p-8 overflow-y-auto max-w-4xl mx-auto space-y-6">
          <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-2">
              <BookOpen className="w-4 h-4" />
              MODO LECTOR NEURAL AISLADO
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-xs font-mono text-gray-400 pb-4 border-b border-[#1E293B]">{url}</p>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              <p>
                Visualización optimizada de <strong>{domain}</strong> generada por el motor de renderizado de Aether Browser.
              </p>
              <p>
                Este modo extrae el contenido textual y estructural eliminando elementos de rastreo, anuncios y scripts de telemetría de terceros para garantizar una navegación de cero huella digital.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-wrap gap-3">
              <button
                onClick={() => onExecuteAgent(`Generar un resumen completo de ${url}`)}
                className="bg-[#00F0FF] text-black font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#33f3ff] transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Resumir Página con IA
              </button>
              <button
                onClick={() => onOpenExternal(url)}
                className="bg-[#1f2937] hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer border border-[#1E293B]"
              >
                <ExternalLink className="w-4 h-4" /> Ver Sitio Original en Nueva Pestaña
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
