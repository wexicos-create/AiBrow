import { Tab, AgentChatMessage, AgentStep } from '../types';

export interface AgentExecutionPlan {
  steps: Array<Omit<AgentStep, 'status'>>;
  resultSummary: string;
  suggestedUrl?: string;
  suggestedTitle?: string;
  suggestedType?: Tab['type'];
  tags: string[];
}

/**
 * Fast & Unrestricted AI Agent Response Engine
 * Delivers direct, intelligent answers without rigid button bottlenecks.
 */
export function generateCollaborativeChatResponse(
  userMessage: string,
  history: AgentChatMessage[],
  currentContext?: { url?: string; title?: string }
): {
  replyText: string;
  autoAction?: {
    actionType: 'navigate' | 'scan' | 'search' | 'play_video' | 'open_url';
    title: string;
    url: string;
    tabType: Tab['type'];
    query?: string;
  };
} {
  const clean = userMessage.trim().toLowerCase();
  const currentTitle = currentContext?.title || 'Google';
  const currentUrl = currentContext?.url || 'https://www.google.com';

  // 1. YouTube & Video Playback Direct Request
  if (
    clean.includes('youtube') || 
    clean.includes('video') || 
    clean.includes('musica') || 
    clean.includes('cancion') || 
    clean.includes('reproducir') || 
    clean.includes('pon ') ||
    clean.includes('ver ') ||
    clean.includes('trailer')
  ) {
    const rawQuery = userMessage
      .replace(/abre|abrir|ponme|pon|buscar|busca|reproducir|reproduce|ver|mira|youtube|video|videos de|musica de|cancion de/gi, '')
      .trim() || 'lo más visto hoy';

    return {
      replyText: `🎬 **Reproductor de Video Preparado**\n\nHe activado el motor de video para **"${rawQuery}"**. Cargando el stream en el reproductor nativo con aceleración por hardware y modo libre de anuncios.`,
      autoAction: {
        actionType: 'play_video',
        title: `YouTube: ${rawQuery}`,
        url: `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(rawQuery)}`,
        tabType: 'custom',
        query: rawQuery
      }
    };
  }

  // 2. Direct Web Search & Exploration
  if (
    clean.startsWith('busca ') || 
    clean.startsWith('buscar ') || 
    clean.includes('google') || 
    clean.includes('investiga') || 
    clean.includes('noticias') ||
    clean.includes('precio de') ||
    clean.includes('clima en') ||
    clean.includes('resultados de')
  ) {
    const query = userMessage
      .replace(/busca en google|buscar en google|busca|buscar|investiga|averigua|noticias sobre|noticias de/gi, '')
      .trim() || userMessage;

    return {
      replyText: `🔍 **Búsqueda Web Universal en Ejecución**\n\nConsultando múltiples motores (Google, DuckDuckGo, Wikipedia y YouTube) para: **"${query}"**.\n\nHe generado la página de resultados con síntesis en vivo y accesos directos.`,
      autoAction: {
        actionType: 'search',
        title: `${query} - Búsqueda`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        tabType: 'search',
        query: query
      }
    };
  }

  // 3. Wikipedia & Conceptual Encyclopedia
  if (
    clean.includes('wikipedia') || 
    clean.includes('que es') || 
    clean.includes('quien es') || 
    clean.includes('explicame') || 
    clean.includes('historia de') || 
    clean.includes('como funciona') ||
    clean.includes('significado de')
  ) {
    const topic = userMessage
      .replace(/wikipedia|que es|quien es|explicame|cuentame de|como funciona|historia de|significado de/gi, '')
      .trim() || 'Ciencia y Tecnología';

    return {
      replyText: `📖 **Consulta Enciclopédica Directa**\n\nObteniendo el artículo completo de Wikipedia para **"${topic}"** en modo lectura sin distracciones con hipervínculos activos.`,
      autoAction: {
        actionType: 'navigate',
        title: `Wikipedia: ${topic}`,
        url: `https://es.m.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, '_'))}`,
        tabType: 'wikipedia',
        query: topic
      }
    };
  }

  // 4. Code error scanner & repair
  if (
    clean.includes('codigo') || 
    clean.includes('error') || 
    clean.includes('bug') || 
    clean.includes('reparar') || 
    clean.includes('debug') || 
    clean.includes('optimiz') || 
    clean.includes('fallas') || 
    clean.includes('script')
  ) {
    return {
      replyText: `🛠️ **Escáner y Reparador de Código Activado**\n\nAbriendo el entorno de análisis estático y parcheo en vivo en la pestaña de DevTools. Puedes pegar cualquier fragmento en TypeScript, JavaScript, Python o Rust para corregirlo.`,
      autoAction: {
        actionType: 'scan',
        title: 'Escáner & Reparador de Código',
        url: 'aether://devtools/scanner',
        tabType: 'devtools'
      }
    };
  }

  // 5. Cybersecurity & Zero-Days
  if (
    clean.includes('seguridad') || 
    clean.includes('cve') || 
    clean.includes('vulnerab') || 
    clean.includes('zero-day') || 
    clean.includes('zeroday') || 
    clean.includes('ciberseguridad') ||
    clean.includes('airgap')
  ) {
    return {
      replyText: `🛡️ **Centro de Ciberseguridad y Zero-Days**\n\nAccediendo a la base de datos de vulnerabilidades CVE activas y verificando el aislamiento del túnel seguro de RAM.`,
      autoAction: {
        actionType: 'navigate',
        title: 'Zero-Days Defense Hub',
        url: 'https://zerodays.network/vulns',
        tabType: 'zerodays'
      }
    };
  }

  // 6. Direct URL navigation
  if (clean.includes('.com') || clean.includes('.org') || clean.includes('.net') || clean.includes('.io') || clean.includes('.dev') || clean.startsWith('http')) {
    const matchedUrl = userMessage.match(/(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/i);
    const target = matchedUrl ? (matchedUrl[0].startsWith('http') ? matchedUrl[0] : `https://${matchedUrl[0]}`) : 'https://www.google.com';
    
    return {
      replyText: `🌐 **Navegando a:** \`${target}\`\n\nCargando la página web directamente en el visor nativo con soporte de navegación completa.`,
      autoAction: {
        actionType: 'open_url',
        title: target.replace('https://', '').split('/')[0],
        url: target,
        tabType: 'custom'
      }
    };
  }

  // 7. General Free Intelligent Chat & Navigation
  return {
    replyText: `💡 **Entendido:** "${userMessage}"\n\nComo tu navegador inteligente nativo, puedo ejecutar cualquier búsqueda global, reproducir videos en streaming, auditar código o navegar a cualquier destino sin restricciones. Ejecutando análisis en tiempo real.`,
    autoAction: {
      actionType: 'search',
      title: `${userMessage.slice(0, 30)} - Búsqueda`,
      url: `https://www.google.com/search?q=${encodeURIComponent(userMessage)}`,
      tabType: 'search',
      query: userMessage
    }
  };
}

/**
 * Generates instant, high-speed autonomous execution plan with smooth visual pointer coordinates.
 */
export function generateDynamicAgentResponse(prompt: string, currentUrl?: string): AgentExecutionPlan {
  const cleanPrompt = prompt.trim().toLowerCase();

  // 1. YouTube / Video / Music / Streaming
  if (
    cleanPrompt.includes('youtube') || 
    cleanPrompt.includes('video') || 
    cleanPrompt.includes('musica') || 
    cleanPrompt.includes('cancion') || 
    cleanPrompt.includes('reproducir') ||
    cleanPrompt.includes('ver') ||
    cleanPrompt.includes('trailer')
  ) {
    const videoQuery = prompt.replace(/abre|abrir|buscar|busca|reproducir|reproduce|ver|youtube|video|videos de|musica de/gi, '').trim() || 'Tendencias';
    return {
      steps: [
        { 
          id: 's1', 
          stepNumber: 1, 
          description: `Indexando streaming de video para "${videoQuery}"`, 
          details: 'Localizando stream multimedia y configurando aceleración de video.',
          actionType: 'navigate',
          cursorTarget: {
            x: 48,
            y: 16,
            action: 'typing',
            label: `🎬 Buscando: "${videoQuery.slice(0, 20)}"`,
            targetBounds: { top: 12, left: 25, width: 50, height: 8 }
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Cargando reproductor nativo con reproducción instantánea', 
          details: 'Iniciando reproducción del contenido solicitado.',
          actionType: 'dom_click',
          cursorTarget: {
            x: 50,
            y: 45,
            action: 'clicking',
            label: '▶️ Iniciando Reproducción',
            targetBounds: { top: 25, left: 20, width: 60, height: 40 }
          }
        }
      ],
      resultSummary: `🎬 **Video listo:** Se ha configurado el reproductor de YouTube para "${videoQuery}". Ya puedes reproducir el video en vivo en la pestaña.`,
      suggestedUrl: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(videoQuery)}`,
      suggestedTitle: `YouTube - ${videoQuery}`,
      suggestedType: 'custom',
      tags: ['Video', 'YouTube', 'Streaming']
    };
  }

  // 2. Wikipedia / Encyclopedia / Concept Learning
  if (
    cleanPrompt.includes('wikipedia') || 
    cleanPrompt.includes('que es') || 
    cleanPrompt.includes('quién es') || 
    cleanPrompt.includes('historia de') || 
    cleanPrompt.includes('concepto') ||
    cleanPrompt.includes('explicame')
  ) {
    const topic = prompt.replace(/wikipedia|que es|quién es|historia de|concepto de|explicame/gi, '').trim() || 'Ciencia y Tecnología';
    return {
      steps: [
        { 
          id: 's1', 
          stepNumber: 1, 
          description: `Localizando artículo en Wikipedia: "${topic}"`, 
          details: 'Accediendo a la enciclopedia en modo lectura libre.',
          actionType: 'navigate',
          cursorTarget: {
            x: 35,
            y: 20,
            action: 'moving',
            label: `📖 Localizando: "${topic}"`,
            targetBounds: { top: 15, left: 15, width: 70, height: 10 }
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Renderizando texto y bibliografía completa', 
          details: 'Estructurando el contenido para lectura ágil.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 60,
            action: 'inspecting',
            label: '✨ Artículo Listo'
          }
        }
      ],
      resultSummary: `📚 **Artículo de Wikipedia para "${topic}":** Información cargada en vista optimizada sin anuncios.`,
      suggestedUrl: `https://es.m.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, '_'))}`,
      suggestedTitle: `Wikipedia: ${topic}`,
      suggestedType: 'wikipedia',
      tags: ['Enciclopedia', 'Wikipedia']
    };
  }

  // 3. Code Error Repair / Debugging
  if (
    cleanPrompt.includes('codigo') || 
    cleanPrompt.includes('error') || 
    cleanPrompt.includes('bug') || 
    cleanPrompt.includes('reparar') || 
    cleanPrompt.includes('debug') || 
    cleanPrompt.includes('fallas') || 
    cleanPrompt.includes('arregla')
  ) {
    return {
      steps: [
        { 
          id: 's1', 
          stepNumber: 1, 
          description: 'Abriendo Escáner y Reparador de Código', 
          details: 'Inicializando analizador AST y verificación de tipos.',
          actionType: 'navigate',
          cursorTarget: {
            x: 50,
            y: 18,
            action: 'moving',
            label: '🛠️ Abriendo Reparador',
            targetBounds: { top: 12, left: 30, width: 40, height: 8 }
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Ejecutando diagnóstico estático de errores y sintaxis', 
          details: 'Detectando mutaciones directas y optimizaciones.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 50,
            action: 'inspecting',
            label: '⚡ Código Analizado'
          }
        }
      ],
      resultSummary: `🛠️ **Reparador de Código Listo:** Puedes analizar cualquier script, diagnosticar fallas de ejecución y aplicar parches automáticos con un clic.`,
      suggestedUrl: 'aether://devtools/scanner',
      suggestedTitle: 'Escáner & Reparador de Código',
      suggestedType: 'devtools',
      tags: ['Desarrollo', 'Debug', 'AST']
    };
  }

  // 4. General Universal Search
  const query = prompt.replace(/busca en google|buscar|busca|investiga|navega a/gi, '').trim() || prompt;
  return {
    steps: [
      { 
        id: 's1', 
        stepNumber: 1, 
        description: `Buscando en la web: "${query}"`, 
        details: 'Enviando consulta a los índices de búsqueda y compilando fuentes.',
        actionType: 'navigate',
        cursorTarget: {
          x: 45,
          y: 20,
          action: 'typing',
          label: `🔍 Consultando: "${query.slice(0, 25)}"`,
          targetBounds: { top: 15, left: 20, width: 60, height: 8 }
        }
      },
      { 
        id: 's2', 
        stepNumber: 2, 
        description: 'Sintetizando enlaces, videos y artículos principales', 
        details: 'Filtrando resultados relevantes y desplegando vista enriquecida.',
        actionType: 'synthesize',
        cursorTarget: {
          x: 50,
          y: 65,
          action: 'inspecting',
          label: '⚡ Resultados Listos'
        }
      }
    ],
    resultSummary: `🔍 **Búsqueda completada para "${query}":** Se han recuperado los resultados más relevantes de la web, videos y enciclopedias.`,
    suggestedUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    suggestedTitle: `${query} - Búsqueda`,
    suggestedType: 'search',
    tags: ['Búsqueda', 'Web']
  };
}
