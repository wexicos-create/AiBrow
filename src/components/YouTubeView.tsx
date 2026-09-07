import React, { useState, useEffect } from 'react';
import { 
  Play, Search, ExternalLink, Sparkles, Youtube, Flame, 
  Tv, Volume2, ShieldCheck, Maximize2, RefreshCw, Film, 
  Radio, Music, Terminal, Zap, CheckCircle 
} from 'lucide-react';

interface YouTubeViewProps {
  initialQuery?: string;
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  category: string;
  isDirectQuery?: boolean;
}

const POPULAR_VIDEOS: VideoItem[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    channel: 'Rick Astley',
    views: '1.5 B vistas',
    duration: '3:32',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: 'aircAruvnKk',
    title: 'Neural Networks & Deep Learning Explained visually',
    channel: '3Blue1Brown',
    views: '14 M vistas',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnología'
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Queen - Bohemian Rhapsody (Official Video Remastered)',
    channel: 'Queen Official',
    views: '1.7 B vistas',
    duration: '5:59',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: 'M576WGiDBdQ',
    title: 'Artificial Intelligence and Autonomous Agents in Modern Browsers',
    channel: 'Lex Fridman Clips',
    views: '920 K vistas',
    duration: '22:10',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    category: 'IA'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channel: 'Luis Fonsi',
    views: '8.4 B vistas',
    duration: '4:41',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: '2lAe1cqCOXo',
    title: 'Cybersecurity: Zero-Day Exploit Mitigation & Sandboxing in RAM',
    channel: 'Computerphile',
    views: '2.3 M vistas',
    duration: '14:20',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    category: 'Seguridad'
  },
  {
    id: 'jfKfPfyJRdk',
    title: 'Lofi Hip Hop Radio - Beats to Relax / Study to [24/7 Live Stream]',
    channel: 'Lofi Girl',
    views: 'En Vivo',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    category: 'En Vivo'
  },
  {
    id: 'EngW7tLk6R8',
    title: 'How Space Exploration and Propulsion Works in Physics',
    channel: 'Veritasium',
    views: '8.1 M vistas',
    duration: '16:05',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    category: 'Educativo'
  }
];

export const YouTubeView: React.FC<YouTubeViewProps> = ({ 
  initialQuery,
  onExecuteAgent, 
  onOpenExternal 
}) => {
  const [currentVideoId, setCurrentVideoId] = useState<string>('dQw4w9WgXcQ');
  const [currentTitle, setCurrentTitle] = useState<string>('Rick Astley - Never Gonna Give You Up (Official Music Video)');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery || '');
  const [isSearchEmbed, setIsSearchEmbed] = useState<boolean>(false);
  const [activeSearchList, setActiveSearchList] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [theaterMode, setTheaterMode] = useState<boolean>(false);

  const categories = ['Todos', 'Música', 'Tecnología', 'IA', 'Seguridad', 'En Vivo', 'Educativo'];

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handlePlaySearch(initialQuery.trim());
    }
  }, [initialQuery]);

  const extractVideoId = (input: string): string | null => {
    // Check if it's already an 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }
    // Check URL formats: youtube.com/watch?v=..., youtu.be/..., embed/..., shorts/...
    const match = input.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handlePlaySearch = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const detectedId = extractVideoId(trimmed);
    if (detectedId) {
      setIsSearchEmbed(false);
      setCurrentVideoId(detectedId);
      setCurrentTitle(`Video de YouTube (${detectedId})`);
      return;
    }

    // Direct search embed via YouTube Embed List
    setIsSearchEmbed(true);
    setActiveSearchList(trimmed);
    setCurrentTitle(`Búsqueda de Video: "${trimmed}"`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePlaySearch(searchQuery);
  };

  const filteredVideos = selectedCategory === 'Todos'
    ? POPULAR_VIDEOS
    : POPULAR_VIDEOS.filter(v => v.category === selectedCategory);

  const currentEmbedUrl = isSearchEmbed
    ? `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(activeSearchList)}&autoplay=1`
    : `https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`;

  const youtubeExternalUrl = isSearchEmbed
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(activeSearchList)}`
    : `https://www.youtube.com/watch?v=${currentVideoId}`;

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-y-auto">
      {/* 1. Header Toolbar */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
              Reproductor Nativo de Video
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono">
                STREAM ACTIVO
              </span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono">Búsqueda universal y reproducción instantánea sin restricciones</p>
          </div>
        </div>

        {/* Search / URL Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl flex items-center bg-[#111622] border border-[#1E293B] focus-within:border-red-500 rounded-xl px-3 py-1.5 transition">
          <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
          <input 
            type="text"
            placeholder="Escribe lo que quieras ver o pega enlace de YouTube..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-200 placeholder-gray-500 font-sans"
          />
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer shrink-0 ml-1.5 flex items-center gap-1"
          >
            <Play className="w-3 h-3" fill="currentColor" />
            <span>Reproducir</span>
          </button>
        </form>

        {/* External popout */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheaterMode(!theaterMode)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111622] hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-mono border border-[#1E293B] cursor-pointer"
            title="Modo Teatro"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{theaterMode ? 'Normal' : 'Teatro'}</span>
          </button>

          <button 
            onClick={() => onOpenExternal(youtubeExternalUrl)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2937] hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
            title="Abrir en YouTube oficial en pestaña nueva"
          >
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">Abrir en YouTube Oficial</span> ↗
          </button>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className={`p-4 sm:p-6 mx-auto w-full space-y-6 ${theaterMode ? 'max-w-full' : 'max-w-7xl'}`}>
        {/* Main Video Viewport */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full bg-black relative">
            <iframe
              key={currentEmbedUrl}
              src={currentEmbedUrl}
              title={currentTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1E293B] bg-[#0d121c]">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug truncate">{currentTitle}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1 font-mono">
                <span className="text-[#00F0FF] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" /> Sandbox Acelerado por GPU
                </span>
                <span>•</span>
                <span>Resolución: 1080p 60fps</span>
                <span>•</span>
                <span className="text-gray-300">
                  {isSearchEmbed ? `Búsqueda: "${activeSearchList}"` : `ID: ${currentVideoId}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onExecuteAgent(`Analiza el video "${currentTitle}" y dame un resumen con los puntos clave`)}
                className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#00F0FF]/25 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analizar con IA</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-mono text-gray-500 shrink-0 uppercase">Canales:</span>
          {[
            'Música en Tendencia',
            'Lofi Beats En Vivo',
            'Inteligencia Artificial 2026',
            'Ciberseguridad y Zero-Days',
            'Trailers de Cine',
            'Tutoriales de Programación',
            'Documentales de Ciencia'
          ].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                handlePlaySearch(tag);
              }}
              className="px-3 py-1 bg-[#111622] hover:bg-red-600/20 hover:text-white hover:border-red-500/40 text-gray-300 border border-[#1E293B] rounded-lg text-xs font-mono whitespace-nowrap transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-[#111622] text-gray-400 hover:text-white border border-[#1E293B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Catalog Grid */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Catálogo y Transmisiones Destacadas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => {
                  setIsSearchEmbed(false);
                  setCurrentVideoId(video.id);
                  setCurrentTitle(video.title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group bg-[#111622] border rounded-xl overflow-hidden hover:border-red-500/50 transition cursor-pointer flex flex-col ${
                  !isSearchEmbed && currentVideoId === video.id 
                    ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'border-[#1E293B]'
                }`}
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-semibold text-white group-hover:text-red-400 transition line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>{video.channel}</span>
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
