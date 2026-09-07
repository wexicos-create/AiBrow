import React, { useState } from 'react';
import { 
  Search, Bot, ArrowUpRight, ExternalLink, Zap, Globe, 
  Sparkles, Youtube, BookOpen, Newspaper, Shield, FileText 
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'news' | 'videos' | 'wiki' | 'ai'>('all');

  const cleanQuery = query || 'Exploración Web';

  // Generate dynamic, realistic search results tailored to the user's exact query
  const dynamicResults = [
    {
      id: 'd-1',
      title: `${cleanQuery} - Resumen enciclopédico y análisis`,
      url: `https://es.wikipedia.org/wiki/${encodeURIComponent(cleanQuery)}`,
      displayUrl: `es.wikipedia.org > wiki > ${encodeURIComponent(cleanQuery)}`,
      snippet: `Información enciclopédica detallada, historia, características técnicas y conceptos fundamentales sobre "${cleanQuery}". Consulta referencias cruzadas y artículos relacionados.`,
      category: 'Enciclopedia',
      type: 'wikipedia' as const
    },
    {
      id: 'd-2',
      title: `Videos destacados y tutoriales sobre "${cleanQuery}" en YouTube`,
      url: 'https://youtube.com',
      displayUrl: `youtube.com > results?search_query=${encodeURIComponent(cleanQuery)}`,
      snippet: `Explora transmisiones en vivo, conferencias, guías paso a paso y demostraciones prácticas en video sobre "${cleanQuery}".`,
      category: 'Video',
      type: 'custom' as const
    },
    {
      id: 'd-3',
      title: `Últimas noticias y reportes de actualidad: ${cleanQuery}`,
      url: 'https://news.google.com',
      displayUrl: `news.google.com > search?q=${encodeURIComponent(cleanQuery)}`,
      snippet: `Cobertura periodística en tiempo real, análisis de expertos y tendencias de la industria relacionadas con "${cleanQuery}".`,
      category: 'Noticias',
      type: 'news' as const
    },
    {
      id: 'd-4',
      title: `Repositorios y proyectos de código abierto sobre ${cleanQuery}`,
      url: 'https://github.com',
      displayUrl: `github.com > search?q=${encodeURIComponent(cleanQuery)}`,
      snippet: `Descubre implementaciones de código abierto, librerías, scripts de automatización y herramientas para desarrolladores centradas en "${cleanQuery}".`,
      category: 'Desarrollo',
      type: 'github' as const
    },
    {
      id: 'd-5',
      title: `Investigación y artículos científicos de vanguardia en ${cleanQuery}`,
      url: `https://nature.com/search?q=${encodeURIComponent(cleanQuery)}`,
      displayUrl: `nature.com > articles > ${encodeURIComponent(cleanQuery)}`,
      snippet: `Publicaciones académicas revisadas por pares, avances tecnológicos y estudios cuantitativos sobre el estado del arte de "${cleanQuery}".`,
      category: 'Ciencia',
      type: 'custom' as const
    }
  ];

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-y-auto">
      {/* Category Tabs & Query Bar */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-4 sm:px-6 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
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
                  if (cat.id === 'videos') onNavigate('YouTube', 'https://youtube.com', 'custom');
                  if (cat.id === 'wiki') onNavigate('Wikipedia', `https://es.wikipedia.org/wiki/${encodeURIComponent(cleanQuery)}`, 'wikipedia');
                  if (cat.id === 'news') onNavigate('Noticias', 'https://news.google.com', 'news');
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

          {/* Direct Search in Live Search Engine */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenExternal(`https://duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2937] hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
              title="Abrir búsqueda completa en DuckDuckGo"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span>DuckDuckGo</span> ↗
            </button>
            <button
              onClick={() => onOpenExternal(`https://www.google.com/search?q=${encodeURIComponent(cleanQuery)}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2937] hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
              title="Abrir búsqueda completa en Google"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Google</span> ↗
            </button>
          </div>
        </div>
      </div>

      {/* Main Results Body */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
          <div className="text-xs font-mono text-gray-400">
            Aproximadamente 4,820,000 resultados para <strong className="text-white">"{cleanQuery}"</strong>
          </div>
          <button 
            onClick={() => onExecuteAgent(`Resumir y sintetizar todos los resultados web para "${cleanQuery}"`)}
            className="flex items-center gap-1.5 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3.5 py-1.5 rounded-lg text-xs font-mono hover:bg-[#00F0FF]/25 transition cursor-pointer font-bold"
          >
            <Bot className="w-3.5 h-3.5" />
            Sintetizar Resultados con IA
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {dynamicResults.map((res) => (
            <div 
              key={res.id} 
              className="group bg-[#111622] hover:bg-[#151c2c] p-5 rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition shadow-lg"
            >
              <div className="text-[11px] text-gray-400 font-mono flex items-center gap-2 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="truncate">{res.displayUrl}</span>
                {res.category && (
                  <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[9px] uppercase font-bold shrink-0">
                    {res.category}
                  </span>
                )}
              </div>

              <h3 
                onClick={() => onNavigate(res.title, res.url, res.type, cleanQuery)}
                className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:text-[#00F0FF] cursor-pointer flex items-center gap-2 transition"
              >
                <span>{res.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00F0FF]" />
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-sans">
                {res.snippet}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => onNavigate(res.title, res.url, res.type, cleanQuery)}
                  className="text-xs bg-[#1f2937] hover:bg-gray-700 text-gray-200 px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer font-mono transition"
                >
                  <Globe className="w-3 h-3 text-[#00F0FF]" /> Abrir en este Navegador
                </button>
                <button 
                  onClick={() => onOpenExternal(res.url)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  <ExternalLink className="w-3 h-3" /> Abrir en Pestaña Externa ↗
                </button>
                <button 
                  onClick={() => onExecuteAgent(`Extraer y analizar todo el contenido de ${res.url}`)}
                  className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer font-mono ml-auto"
                >
                  <Zap className="w-3 h-3" /> Extraer con IA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
