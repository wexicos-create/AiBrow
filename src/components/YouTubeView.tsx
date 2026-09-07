import React, { useState } from 'react';
import { Play, Search, ExternalLink, Sparkles, Youtube, Flame, Tv, Volume2, ShieldCheck } from 'lucide-react';

interface YouTubeViewProps {
  onExecuteAgent: (prompt: string) => void;
  onOpenExternal: (url: string) => void;
}

const FEATURED_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up - Rick Astley (Official Music Video)',
    channel: 'Rick Astley',
    views: '1.5 B vistas',
    time: 'Clásico Digital',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: 'aircAruvnKk',
    title: 'Neural Networks from Scratch - Deep Learning Tutorial',
    channel: '3Blue1Brown',
    views: '12 M vistas',
    time: 'Educativo',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    category: 'Tecnología'
  },
  {
    id: 'M576WGiDBdQ',
    title: 'Artificial Intelligence and Autonomous Agents in Modern Browsers',
    channel: 'Lex Fridman Clips',
    views: '840 K vistas',
    time: 'Podcast',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    category: 'IA'
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Queen - Bohemian Rhapsody (Official Video Remastered)',
    channel: 'Queen Official',
    views: '1.7 B vistas',
    time: 'Música',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    channel: 'Luis Fonsi',
    views: '8.3 B vistas',
    time: 'Música',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    category: 'Música'
  },
  {
    id: '2lAe1cqCOXo',
    title: 'Cybersecurity: Zero-Day Exploit Mitigation & Sandboxing',
    channel: 'Computerphile',
    views: '2.1 M vistas',
    time: 'Seguridad',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    category: 'Seguridad'
  }
];

export const YouTubeView: React.FC<YouTubeViewProps> = ({ onExecuteAgent, onOpenExternal }) => {
  const [currentVideoId, setCurrentVideoId] = useState<string>('dQw4w9WgXcQ');
  const [currentTitle, setCurrentTitle] = useState<string>('Never Gonna Give You Up - Rick Astley (Official Music Video)');
  const [videoSearch, setVideoSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Música', 'Tecnología', 'IA', 'Seguridad', 'Educativo'];

  const filteredVideos = selectedCategory === 'Todos' 
    ? FEATURED_VIDEOS 
    : FEATURED_VIDEOS.filter(v => v.category === selectedCategory);

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoSearch.trim()) return;

    // Check if user entered a direct YouTube URL or video ID
    if (videoSearch.includes('youtube.com') || videoSearch.includes('youtu.be')) {
      const match = videoSearch.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        setCurrentVideoId(match[1]);
        setCurrentTitle(`Video personalizado (${match[1]})`);
        return;
      }
    }

    // Otherwise search on YouTube
    onExecuteAgent(`Buscar videos sobre "${videoSearch}" y reproducir el más relevante`);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#080b13] overflow-y-auto">
      {/* Top YouTube Header */}
      <div className="bg-[#0f1523] border-b border-[#1E293B] px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
              YouTube Player Seguro
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono">
                EMBED LIVE
              </span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono">Reproducción real de videos con aislamiento de telemetría</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleCustomSearch} className="flex-1 max-w-md flex items-center bg-[#111622] border border-[#1E293B] focus-within:border-red-500 rounded-full px-3 py-1.5 transition">
          <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
          <input 
            type="text"
            placeholder="Buscar videos o pegar enlace de YouTube..."
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-200 placeholder-gray-500 font-sans"
          />
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full transition cursor-pointer shrink-0 ml-1"
          >
            Buscar
          </button>
        </form>

        {/* Direct Link Popout */}
        <button 
          onClick={() => onOpenExternal(`https://www.youtube.com/watch?v=${currentVideoId}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2937] hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-mono transition cursor-pointer border border-[#1E293B]"
          title="Abrir en YouTube oficial en pestaña nueva"
        >
          <ExternalLink className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">Abrir en YouTube Oficial</span> ↗
        </button>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Main Video Player Container */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video w-full bg-black relative">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=0&rel=0&modestbranding=1`}
              title={currentTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1E293B] bg-[#0d121c]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">{currentTitle}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-mono">
                <span className="text-[#00F0FF] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27C93F]" /> Reproducción en Sandbox Seguro
                </span>
                <span>•</span>
                <span>ID: {currentVideoId}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onExecuteAgent(`Analizar y extraer los puntos clave del video "${currentTitle}"`)}
                className="bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#00F0FF]/25 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Sintetizar Video con IA
              </button>
            </div>
          </div>
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

        {/* Featured Video Grid */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Videos Sugeridos & Tendencias
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => {
                  setCurrentVideoId(video.id);
                  setCurrentTitle(video.title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group bg-[#111622] border rounded-xl overflow-hidden hover:border-red-500/50 transition cursor-pointer flex flex-col ${
                  currentVideoId === video.id ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-[#1E293B]'
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
                    {video.category}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-400 transition line-clamp-2">
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
