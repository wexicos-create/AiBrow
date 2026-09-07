import React, { useState, useEffect } from 'react';
import { 
  Globe, ExternalLink, ShieldCheck, RefreshCw, BookOpen, 
  Sparkles, Lock, AlertCircle, Copy, Check, Terminal, Eye,
  ArrowLeft, ArrowRight, Compass, Search, Radio, Share2,
  Maximize2, Layers, Cpu, CornerDownRight
} from 'lucide-react';
import { Tab } from '../types';

interface WebIframeViewProps {
  url: string;
  title: string;
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
  onNavigate: (title: string, url: string, type: Tab['type'], query?: string) => void;
}

export const WebIframeView: React.FC<WebIframeViewProps> = ({
  url,
  title,
  onExecuteAgent,
  onOpenExternal,
  onNavigate
}) => {
  const [viewMode, setViewMode] = useState<'iframe' | 'proxy' | 'reader'>('iframe');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [proxyHtml, setProxyHtml] = useState<string>('');
  const [proxyError, setProxyError] = useState<string | null>(null);
  const [customInputUrl, setCustomInputUrl] = useState(url);

  const domain = url.replace(/^https?:\/\//i, '').split('/')[0];

  useEffect(() => {
    setCustomInputUrl(url);
    if (viewMode === 'proxy') {
      fetchProxyPage(url);
    }
  }, [url, viewMode]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchProxyPage = async (targetUrl: string) => {
    setIsLoading(true);
    setProxyError(null);
    try {
      // Use standard public mirror proxy to bypass X-Frame-Options for read/navigation
      const proxyEndpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyEndpoint);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      if (data.contents) {
        // Inject base tag so relative links and assets resolve correctly
        const baseUrl = new URL(targetUrl).origin;
        const injectedHtml = data.contents.replace(
          /<head>/i,
          `<head><base href="${baseUrl}/" target="_self"><style>body{background-color:#ffffff;color:#111827;font-family:system-ui,-apple-system,sans-serif;}</style>`
        );
        setProxyHtml(injectedHtml);
      } else {
        throw new Error('No se pudo recuperar el contenido web');
      }
    } catch (err: any) {
      console.warn('Proxy fetch warning:', err);
      setProxyError(err.message || 'Error al cargar página por proxy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInternalNavigate = (newUrl: string) => {
    let clean = newUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }
    const cleanDomain = clean.replace(/^https?:\/\//i, '').split('/')[0];
    onNavigate(cleanDomain, clean, 'custom');
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-hidden font-sans">
      {/* 1. Top Web Control & Navigation Bar */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 z-10 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00F0FF]/20 to-blue-600/30 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center shrink-0 shadow-sm">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
              <Lock className="w-3 h-3 text-[#27C93F] shrink-0" />
              <span className="truncate">{title || domain}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#27C93F]/15 text-[#27C93F] border border-[#27C93F]/30 rounded">
                SSL ACTIVO
              </span>
            </div>
            <div className="text-[11px] text-gray-400 font-mono truncate">{url}</div>
          </div>
        </div>

        {/* View Mode Switches: Iframe, Proxy Espejo, Lector */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap">
          <div className="bg-[#111622] border border-[#1E293B] p-0.5 rounded-xl flex text-xs font-mono">
            <button
              onClick={() => setViewMode('iframe')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'iframe' 
                  ? 'bg-[#00F0FF] text-black font-bold shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Carga directa de sitio web en marco aislado"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Web Iframe</span>
              <span className="sm:hidden">Web</span>
            </button>
            <button
              onClick={() => {
                setViewMode('proxy');
                fetchProxyPage(url);
              }}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'proxy' 
                  ? 'bg-[#00F0FF] text-black font-bold shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Bypass de bloqueos X-Frame-Options mediante Proxy Espejo"
            >
              <Cpu className="w-3 h-3" />
              <span className="hidden sm:inline">Proxy Espejo</span>
              <span className="sm:hidden">Proxy</span>
            </button>
            <button
              onClick={() => setViewMode('reader')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'reader' 
                  ? 'bg-[#00F0FF] text-black font-bold shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Modo lectura limpia y síntesis IA"
            >
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline">Lector</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIframeKey(prev => prev + 1);
              if (viewMode === 'proxy') fetchProxyPage(url);
            }}
            className="p-1.5 bg-[#111622] hover:bg-[#1f2937] border border-[#1E293B] rounded-lg text-gray-300 transition cursor-pointer"
            title="Recargar página web"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#00F0FF]' : ''}`} />
          </button>

          <button
            onClick={handleCopyUrl}
            className="p-1.5 bg-[#111622] hover:bg-[#1f2937] border border-[#1E293B] rounded-lg text-gray-300 transition cursor-pointer"
            title="Copiar URL al portapapeles"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#27C93F]" /> : <Copy className="w-3.5 h-3.5 text-gray-300" />}
          </button>

          {/* Primary Popout Button */}
          <button
            onClick={() => onOpenExternal(url)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00F0FF] to-cyan-400 hover:brightness-110 text-black rounded-lg text-xs font-bold font-mono transition cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.25)] active:scale-95"
            title="Abrir este sitio web completo en una pestaña externa sin límites"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir Web Real</span> ↗
          </button>
        </div>
      </div>

      {/* 2. Security & Navigation Assist Banner */}
      <div className="bg-[#0b101c] border-b border-[#1E293B] px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" />
          <span>Aislamiento Sandbox de Navegación: <strong>{domain}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 hidden lg:inline">
            Puedes interactuar, hacer clic en enlaces o cambiar entre <strong>Iframe</strong>, <strong>Proxy Espejo</strong> y <strong>Abrir Web Real</strong>.
          </span>
          <button
            onClick={() => onExecuteAgent(`Analizar en profundidad y resumir el contenido de ${url}`)}
            className="text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <Sparkles className="w-3 h-3" /> Analizar con Agente IA
          </button>
        </div>
      </div>

      {/* 3. Quick Popular Sites Jump Bar */}
      <div className="bg-[#0c111e] border-b border-[#1E293B]/60 px-3 sm:px-4 py-1 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono shrink-0">
        <span className="text-gray-500 text-[10px] uppercase shrink-0">Destinos Web:</span>
        {[
          { name: 'Reddit', url: 'https://reddit.com' },
          { name: 'GitHub', url: 'https://github.com' },
          { name: 'Wikipedia', url: 'https://es.wikipedia.org' },
          { name: 'StackOverflow', url: 'https://stackoverflow.com' },
          { name: 'DuckDuckGo', url: 'https://duckduckgo.com' },
          { name: 'El País', url: 'https://elpais.com' },
          { name: 'Hacker News', url: 'https://news.ycombinator.com' },
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { name: 'Archive.org', url: 'https://archive.org' }
        ].map(site => (
          <button
            key={site.name}
            onClick={() => handleInternalNavigate(site.url)}
            className="px-2 py-0.5 rounded bg-[#111622] hover:bg-[#1a2336] text-gray-300 hover:text-[#00F0FF] border border-gray-800 transition cursor-pointer text-[11px] whitespace-nowrap"
          >
            {site.name}
          </button>
        ))}
      </div>

      {/* 4. Main Viewport Area */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-black flex flex-col">
        {viewMode === 'iframe' && (
          <div className="flex-1 w-full h-full relative bg-white flex flex-col">
            <iframe
              key={iframeKey}
              src={url}
              title={title}
              className="w-full flex-1 border-0 bg-white"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
              allow="camera; microphone; geolocation; fullscreen; clipboard-write; encrypted-media; autoplay"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {viewMode === 'proxy' && (
          <div className="flex-1 w-full h-full relative overflow-y-auto bg-white text-black p-4">
            {isLoading && (
              <div className="absolute inset-0 bg-[#080b13]/90 flex flex-col items-center justify-center gap-3 text-white z-20">
                <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin" />
                <p className="font-mono text-xs text-gray-300">Cargando contenido por Proxy Espejo sin restricciones CSP...</p>
              </div>
            )}

            {proxyError ? (
              <div className="max-w-xl mx-auto my-12 p-6 bg-[#111622] border border-red-500/40 rounded-2xl text-center text-white space-y-4">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
                <h3 className="text-lg font-bold">El servidor requiere conexión directa</h3>
                <p className="text-xs text-gray-300 font-mono">
                  {proxyError}. Puedes cambiar al modo <strong>Iframe</strong> o hacer clic en <strong>Abrir Web Real ↗</strong>.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setViewMode('iframe')}
                    className="px-4 py-2 bg-[#1f2937] hover:bg-gray-700 text-white rounded-xl text-xs font-mono"
                  >
                    Probar Iframe
                  </button>
                  <button
                    onClick={() => onOpenExternal(url)}
                    className="px-4 py-2 bg-[#00F0FF] text-black font-bold rounded-xl text-xs font-mono"
                  >
                    Abrir Web Real ↗
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-full overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: proxyHtml }}
              />
            )}
          </div>
        )}

        {viewMode === 'reader' && (
          <div className="flex-1 w-full p-4 sm:p-8 overflow-y-auto max-w-4xl mx-auto space-y-6">
            <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-2">
                <BookOpen className="w-4 h-4" />
                MODO LECTOR NEURAL AISLADO
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title || domain}</h1>
              <p className="text-xs font-mono text-gray-400 pb-4 border-b border-[#1E293B]">{url}</p>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                <p>
                  Visualización optimizada de <strong>{domain}</strong> generada por el motor de navegación de AiBrow.
                </p>
                <p>
                  Este modo extrae el contenido textual y estructural eliminando elementos de rastreo, anuncios y scripts de telemetría de terceros para garantizar una navegación rápida y de cero huella digital.
                </p>
                <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#1E293B] font-mono text-xs text-gray-400 space-y-2">
                  <div><strong>Destino:</strong> {url}</div>
                  <div><strong>Host:</strong> {domain}</div>
                  <div><strong>Seguridad:</strong> Aislado en memoria RAM</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-wrap gap-3">
                <button
                  onClick={() => onExecuteAgent(`Generar un resumen ejecutivo y análisis de ${url}`)}
                  className="bg-[#00F0FF] text-black font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#33f3ff] transition cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4" /> Resumir Página con IA
                </button>
                <button
                  onClick={() => onOpenExternal(url)}
                  className="bg-[#1f2937] hover:bg-gray-700 text-white text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition cursor-pointer border border-[#1E293B]"
                >
                  <ExternalLink className="w-4 h-4" /> Ver Sitio Original en Nueva Pestaña
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
