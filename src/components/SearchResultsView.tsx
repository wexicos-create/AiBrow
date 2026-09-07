import React, { useState } from 'react';
import { 
  Search, Bot, ArrowUpRight, ExternalLink, Zap, Globe, 
  Sparkles, Youtube, BookOpen, Newspaper, Shield, Play,
  Film, Code, Layers, MessageSquare, Compass
} from 'lucide-react';
import { Tab } from '../types';

interface SearchResultsViewProps {
  query: string;
  onNavigate: (title: string, url: string, type: Tab['type'], query?: string) => void;
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  onNavigate,
  onExecuteAgent,
  onOpenExternal
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'videos' | 'wiki' | 'news' | 'ai'>('all');
  const [currentQuery, setCurrentQuery] = useState(query || 'Exploración Web');

  const cleanQuery = currentQuery.trim() || 'Exploración Web';

  // Dynamic web search results constructed with rich metadata
  const searchResults = [
    {
      id: 'res-wiki',
      title: `${cleanQuery} - Enciclopedia Libre y Referencias`,
      url: `https://es.wikipedia.org/wiki/${encodeURIComponent(cleanQuery.replace(/\s+/g, '_'))}`,
      displayUrl: `es.wikipedia.org > wiki > ${encodeURIComponent(cleanQuery)}`,
      snippet: `Artículo completo y definiciones estructuradas sobre "${cleanQuery}". Revisa el contexto histórico, bases teóricas, aplicaciones prácticas y referencias cruzadas.`,
      category: 'Wikipedia',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      type: 'wikipedia' as const,
      isWiki: true
    },
    {
      id: 'res-video',
      title: `Videos destacados y tutoriales de: "${cleanQuery}" en YouTube`,
      url: `https://youtube.com/search?q=${encodeURIComponent(cleanQuery)}`,
      displayUrl: `youtube.com > results?search_query=${encodeURIComponent(cleanQuery)}`,
      snippet: `Transmisiones en vivo, análisis en video, guías paso a paso y demostraciones multimedia en alta definición sobre "${cleanQuery}".`,
      category: 'Video Live',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      type: 'custom' as const,
      isVideo: true
    },
    {
      id: 'res-news',
      title: `Noticias de última hora y reportes sobre ${cleanQuery}`,
      url: `https://news.google.com/search?q=${encodeURIComponent(cleanQuery)}`,
      displayUrl: `news.google.com > search?q=${encodeURIComponent(cleanQuery)}`,
      snippet: `Cobertura en tiempo real, análisis periodístico, artículos de opinión y novedades globales relacionadas con "${cleanQuery}".`,
      category: 'Noticias',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      type: 'news' as const,
      isNews: true
    },
    {
      id: 'res-github',
      title: `Proyectos y repositorios de código abierto para ${cleanQuery}`,
      url: `https://github.com/search?q=${encodeURIComponent(cleanQuery)}`,
      displayUrl: `github.com > search?q=${encodeURIComponent(cleanQuery)}`,
      snippet: `Descubre librerías, scripts automatizados, herramientas de desarrollo y código fuente bajo licencias libres para "${cleanQuery}".`,
      category: 'Desarrollo',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      type: 'github' as const
    },
    {
      id: 'res-science',
      title: `Investigación, papers y avances científicos en torno a ${cleanQuery}`,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(cleanQuery)}`,
      displayUrl: `scholar.google.com > articles?q=${encodeURIComponent(cleanQuery)}`,
      snippet: `Documentos de investigación revisados por pares, tesis de vanguardia y métricas cuantitativas sobre "${cleanQuery}".`,
      category: 'Académico',
      badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      type: 'custom' as const
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    onNavigate(`${currentQuery} - Búsqueda`, `https://www.google.com/search?q=${encodeURIComponent(currentQuery)}`, 'search', currentQuery);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-y-auto font-sans">
      {/* 1. Category Bar & Real Search Engines Bar */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-4 sm:px-6 py-3 sticky top-0 z-20 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Quick Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
            {[
              { id: 'all', label: 'Todo', icon: Globe },
              { id: 'videos', label: 'Videos', icon: Youtube },
              { id: 'wiki', label: 'Wikipedia', icon: BookOpen },
              { id: 'news', label: 'Noticias', icon: Newspaper },
              { id: 'ai', label: 'Síntesis IA', icon: Bot },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  if (cat.id === 'videos') onNavigate(`YouTube - ${cleanQuery}`, `https://youtube.com`, 'custom', cleanQuery);
                  if (cat.id === 'wiki') onNavigate(`Wikipedia: ${cleanQuery}`, `https://es.wikipedia.org/wiki/${encodeURIComponent(cleanQuery)}`, 'wikipedia', cleanQuery);
                  if (cat.id === 'news') onNavigate(`Noticias - ${cleanQuery}`, `https://news.google.com`, 'news', cleanQuery);
                  if (cat.id === 'ai') onExecuteAgent(`Genera un resumen exhaustivo y análisis profundo de "${cleanQuery}"`);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40' 
                    : 'text-gray-400 hover:text-white hover:bg-[#111622]'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* External Engines Shortcut */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenExternal(`https://duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1a2233] text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
              title="Buscar en DuckDuckGo"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span>DuckDuckGo</span> ↗
            </button>
            <button
              onClick={() => onOpenExternal(`https://www.google.com/search?q=${encodeURIComponent(cleanQuery)}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-[#1a2233] text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
              title="Buscar en Google"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Google</span> ↗
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Search Body */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Search Bar Inline */}
        <form onSubmit={handleSearchSubmit} className="bg-[#111622] border border-[#1E293B] focus-within:border-[#00F0FF]/60 rounded-2xl p-2 flex items-center shadow-lg">
          <Search className="w-5 h-5 text-gray-400 ml-3 mr-2" />
          <input 
            type="text"
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            placeholder="Buscar en la web global o teclear cualquier consulta..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-sans"
          />
          <button 
            type="submit" 
            className="bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
          >
            Buscar
          </button>
        </form>

        {/* Video Direct Playback Banner (When searching) */}
        <div className="bg-gradient-to-r from-red-950/40 to-[#111622] border border-red-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-500/20 text-red-400 font-mono font-bold px-2 py-0.5 rounded border border-red-500/30">
                  STREAMING NATIVO
                </span>
                <span className="text-xs text-gray-400 font-mono">YouTube Player Integrado</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                ¿Deseas ver videos sobre "{cleanQuery}"?
              </h3>
              <p className="text-xs text-gray-300">Reproducción directa en el navegador con aceleración por hardware.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate(`YouTube - ${cleanQuery}`, `https://youtube.com`, 'custom', cleanQuery)}
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition cursor-pointer shrink-0 active:scale-95"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            <span>Reproducir Videos</span>
          </button>
        </div>

        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
          <div className="text-xs font-mono text-gray-400">
            Aproximadamente 5,340,000 resultados en vivo para <strong className="text-white">"{cleanQuery}"</strong>
          </div>
          <button 
            onClick={() => onExecuteAgent(`Resumir y sintetizar todos los resultados web para "${cleanQuery}"`)}
            className="flex items-center gap-1.5 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3.5 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer font-bold"
          >
            <Bot className="w-3.5 h-3.5" />
            Sintetizar Resultados con IA
          </button>
        </div>

        {/* Results Stream */}
        <div className="space-y-4">
          {searchResults.map((res) => (
            <div 
              key={res.id} 
              className="group bg-[#111622] hover:bg-[#151c2c] p-5 rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition shadow-lg"
            >
              <div className="text-[11px] text-gray-400 font-mono flex items-center gap-2 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="truncate">{res.displayUrl}</span>
                {res.category && (
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border shrink-0 ${res.badgeColor}`}>
                    {res.category}
                  </span>
                )}
              </div>

              <h3 
                onClick={() => {
                  if (res.isVideo) {
                    onNavigate(`YouTube - ${cleanQuery}`, `https://youtube.com`, 'custom', cleanQuery);
                  } else if (res.isWiki) {
                    onNavigate(res.title, res.url, 'wikipedia', cleanQuery);
                  } else {
                    onNavigate(res.title, res.url, res.type, cleanQuery);
                  }
                }}
                className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:text-[#00F0FF] cursor-pointer flex items-center gap-2 transition"
              >
                <span>{res.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00F0FF]" />
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-sans">
                {res.snippet}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex flex-wrap items-center gap-3">
                {res.isVideo ? (
                  <button 
                    onClick={() => onNavigate(`YouTube - ${cleanQuery}`, `https://youtube.com`, 'custom', cleanQuery)}
                    className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer font-mono font-bold transition"
                  >
                    <Play className="w-3 h-3" fill="currentColor" /> Reproducir en Vivo
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (res.isWiki) {
                        onNavigate(res.title, res.url, 'wikipedia', cleanQuery);
                      } else {
                        onNavigate(res.title, res.url, res.type, cleanQuery);
                      }
                    }}
                    className="text-xs bg-[#1f2937] hover:bg-gray-700 text-gray-200 px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer font-mono transition"
                  >
                    <Globe className="w-3 h-3 text-[#00F0FF]" /> Abrir en este Navegador
                  </button>
                )}

                <button 
                  onClick={() => onOpenExternal(res.url)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  <ExternalLink className="w-3 h-3" /> Pestaña Externa ↗
                </button>

                <button 
                  onClick={() => onExecuteAgent(`Analizar y extraer datos clave de ${res.title}`)}
                  className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer font-mono ml-auto"
                >
                  <Zap className="w-3 h-3" /> Analizar con IA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
