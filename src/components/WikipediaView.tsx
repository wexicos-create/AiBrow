import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Sparkles, ExternalLink, Loader2, Globe, FileText, ArrowRight } from 'lucide-react';

interface WikipediaViewProps {
  initialQuery?: string;
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
}

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

export const WikipediaView: React.FC<WikipediaViewProps> = ({
  initialQuery = 'Inteligencia artificial',
  onExecuteAgent,
  onOpenExternal
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<WikiSummary | null>(null);
  const [searchResults, setSearchResults] = useState<Array<{ title: string; snippet: string }>>([]);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [error, setError] = useState<string | null>(null);

  const fetchWikiArticle = async (query: string, language: 'es' | 'en' = lang) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch direct page summary from Wikipedia REST API
      const summaryRes = await fetch(
        `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.trim())}`
      );

      if (summaryRes.ok) {
        const data: WikiSummary = await summaryRes.json();
        setArticle(data);
      } else {
        // 2. If exact page not found, perform a search query on Wikipedia
        const searchRes = await fetch(
          `https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
        );
        const searchData = await searchRes.json();
        if (searchData.query?.search?.length > 0) {
          setSearchResults(searchData.query.search);
          // Try fetching the top search result
          const topTitle = searchData.query.search[0].title;
          const topRes = await fetch(
            `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`
          );
          if (topRes.ok) {
            const topData: WikiSummary = await topRes.json();
            setArticle(topData);
          }
        } else {
          setError(`No se encontraron artículos para "${query}". Prueba con otro término.`);
        }
      }
    } catch (err) {
      console.error('Error fetching Wikipedia:', err);
      setError('Error al consultar Wikipedia. Por favor verifica tu conexión o busca otro término.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWikiArticle(initialQuery, lang);
  }, [lang]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWikiArticle(searchTerm, lang);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-y-auto">
      {/* Top Header */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
              Wikipedia Enciclopedia
              <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono">
                API EN VIVO
              </span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono">Artículos enciclopédicos con extracción semántica</p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md flex items-center bg-[#111622] border border-[#1E293B] focus-within:border-[#00F0FF] rounded-full px-3 py-1.5 transition">
          <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
          <input 
            type="text"
            placeholder="Buscar en Wikipedia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-200 placeholder-gray-500 font-sans"
          />
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              type="button"
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="px-2 py-0.5 bg-[#1f2937] hover:bg-gray-700 text-[10px] font-mono rounded text-gray-300 transition"
              title="Cambiar idioma (ES/EN)"
            >
              {lang.toUpperCase()}
            </button>
            <button 
              type="submit" 
              className="bg-[#00F0FF] hover:bg-[#33f3ff] text-black text-[11px] font-bold px-3 py-1 rounded-full transition cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* External URL Button */}
        {article?.content_urls?.desktop?.page && (
          <button 
            onClick={() => onOpenExternal(article.content_urls!.desktop.page)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2937] hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Ver en Wikipedia</span> ↗
          </button>
        )}
      </div>

      {/* Main Content View */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 font-mono text-xs gap-3">
            <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin" />
            <span>Consultando servidores de Wikipedia en tiempo real...</span>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5 text-center text-red-300 text-sm font-mono">
            <p>{error}</p>
            <button 
              onClick={() => fetchWikiArticle('Inteligencia artificial', lang)}
              className="mt-3 px-4 py-1.5 bg-red-600/30 border border-red-500/50 rounded-lg text-xs text-white hover:bg-red-600/50 transition"
            >
              Cargar artículo por defecto
            </button>
          </div>
        )}

        {!loading && article && (
          <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between border-b border-[#1E293B] pb-6 mb-6">
              <div className="flex-1">
                <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                  Wikipedia ({lang.toUpperCase()})
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {article.title}
                </h1>
                {article.description && (
                  <p className="text-xs text-gray-400 font-mono mt-1 italic">
                    {article.description}
                  </p>
                )}
              </div>

              {article.thumbnail?.source && (
                <div className="w-32 sm:w-40 shrink-0 rounded-xl overflow-hidden border border-[#1E293B] bg-black/40">
                  <img 
                    src={article.thumbnail.source} 
                    alt={article.title}
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Article Extract Body */}
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-gray-300 leading-relaxed font-sans space-y-4">
              <p className="whitespace-pre-line">
                {article.extract}
              </p>
            </div>

            {/* AI Synthesize Button */}
            <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Globe className="w-4 h-4 text-[#27C93F]" />
                <span>Artículo verificado por la comunidad de Wikipedia</span>
              </div>

              <button 
                onClick={() => onExecuteAgent(`Elaborar un resumen ejecutivo y preguntas clave sobre el artículo de Wikipedia "${article.title}"`)}
                className="bg-[#00F0FF] text-black font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#33f3ff] transition cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
              >
                <Sparkles className="w-4 h-4" />
                Sintetizar Artículo con IA
              </button>
            </div>
          </div>
        )}

        {/* Quick Topics */}
        <div className="bg-[#0a0e17] border border-[#1E293B] rounded-xl p-5">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-3">
            Temas Sugeridos para Explorar
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Inteligencia artificial',
              'Ciberseguridad',
              'Computación cuántica',
              'Python (lenguaje de programación)',
              'World Wide Web',
              'Sistema operativo',
              'Criptografía',
              'Red neuronal artificial'
            ].map(topic => (
              <button
                key={topic}
                onClick={() => {
                  setSearchTerm(topic);
                  fetchWikiArticle(topic, lang);
                }}
                className="px-3 py-1.5 bg-[#111622] hover:bg-[#1a2333] border border-[#1E293B] hover:border-[#00F0FF]/40 rounded-lg text-xs text-gray-300 transition cursor-pointer font-sans"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
