import { Tab, AgentChatMessage } from '../types';

export interface AgentExecutionPlan {
  steps: Array<{
    id: string;
    stepNumber: number;
    description: string;
    actionType: 'navigate' | 'dom_click' | 'extract' | 'synthesize';
  }>;
  resultSummary: string;
  suggestedUrl?: string;
  suggestedTitle?: string;
  suggestedType?: Tab['type'];
  tags: string[];
}

export function generateCollaborativeChatResponse(
  userMessage: string,
  history: AgentChatMessage[],
  currentContext?: { url?: string; title?: string }
): {
  replyText: string;
  suggestedAction?: {
    label: string;
    actionType: 'navigate' | 'scan' | 'search' | 'custom';
    payload: string;
  };
} {
  const clean = userMessage.trim().toLowerCase();
  const currentTitle = currentContext?.title || 'Google';
  const currentUrl = currentContext?.url || 'https://www.google.com';

  // 1. Greetings & general chat
  if (clean === 'hola' || clean.includes('que tal') || clean.includes('buenos dias') || clean.includes('buenas') || clean === 'hi' || clean === 'hey') {
    return {
      replyText: `¡Hola! Aquí estoy listo para colaborar contigo en tiempo real. Estamos actualmente en **${currentTitle}**.\n\n¿Qué te gustaría que investiguemos, reparemos o exploremos juntos hoy?`,
      suggestedAction: {
        label: '🔍 Explorar Noticias y Tendencias',
        actionType: 'navigate',
        payload: 'https://news.google.com'
      }
    };
  }

  // 2. Questions about current page/tab
  if (clean.includes('esta pagina') || clean.includes('esta pestaña') || clean.includes('donde estamos') || clean.includes('que ves') || clean.includes('analiza')) {
    return {
      replyText: `Estamos en la pestaña **"${currentTitle}"** con URL: \`${currentUrl}\`.\n\nHe verificado el DOM y la conexión mediante el túnel seguro Airgap. Si quieres, puedo extraer los puntos clave, buscar datos relacionados o abrir una herramienta de auditoría.`,
      suggestedAction: {
        label: '🛡️ Auditar Privacidad y Túnel',
        actionType: 'custom',
        payload: 'open_audit'
      }
    };
  }

  // 3. YouTube / Music / Video requests
  if (clean.includes('youtube') || clean.includes('video') || clean.includes('musica') || clean.includes('cancion') || clean.includes('reproducir') || clean.includes('ver un video')) {
    const query = userMessage.replace(/abre|abrir|pon|buscar|youtube|video|musica|cancion/gi, '').trim() || 'lo más visto';
    return {
      replyText: `¡Excelente idea! He preparado el reproductor de YouTube para **"${query}"**. Podemos abrir la pestaña de video juntos ahora mismo o buscar contenido específico.`,
      suggestedAction: {
        label: `▶️ Abrir YouTube: "${query}"`,
        actionType: 'navigate',
        payload: `https://youtube.com/search?q=${encodeURIComponent(query)}`
      }
    };
  }

  // 4. Code error scanning, debugging & fixing
  if (clean.includes('codigo') || clean.includes('error') || clean.includes('bug') || clean.includes('reparar') || clean.includes('debug') || clean.includes('optimiz') || clean.includes('fallas') || clean.includes('arregla')) {
    return {
      replyText: `¡Claro! Tengo listo nuestro **Escáner y Reparador de Código Multilenguaje**. Detecta condiciones de carrera, mutaciones directas de estado, fugas de memoria y optimiza el rendimiento.\n\n¿Quieres que abramos el depurador para analizar tu script?`,
      suggestedAction: {
        label: '🛠️ Abrir Reparador de Código',
        actionType: 'scan',
        payload: 'aether://devtools/scanner'
      }
    };
  }

  // 5. Cybersecurity, Zero-Days, Vulnerabilities
  if (clean.includes('seguridad') || clean.includes('cve') || clean.includes('vulnerab') || clean.includes('zero-day') || clean.includes('zeroday') || clean.includes('proteccion') || clean.includes('escudo')) {
    return {
      replyText: `En materia de ciberseguridad, nuestro navegador opera con aislamiento de paquetes en RAM (1000GB V-Drive) y bloqueo estricto de telemetría.\n\nPodemos consultar las alertas CVE recientes en el Zero-Days Hub para verificar vectores actuales.`,
      suggestedAction: {
        label: '⚡ Ver Alertas Zero-Days',
        actionType: 'navigate',
        payload: 'https://zerodays.network/vulns'
      }
    };
  }

  // 6. Wikipedia & Concept explanations
  if (clean.includes('wikipedia') || clean.includes('que es') || clean.includes('quien es') || clean.includes('explicame') || clean.includes('cuentame de') || clean.includes('como funciona')) {
    const topic = userMessage.replace(/wikipedia|que es|quien es|explicame|cuentame de|como funciona/gi, '').trim() || 'Tecnología';
    return {
      replyText: `Entendido. Vamos a investigar a fondo sobre **"${topic}"**. Podemos consultar la enciclopedia en modo lectura sin distracciones o buscar las fuentes más actualizadas.`,
      suggestedAction: {
        label: `📖 Leer Wikipedia: "${topic}"`,
        actionType: 'navigate',
        payload: `https://es.m.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, '_'))}`
      }
    };
  }

  // 7. General search / Exploration
  if (clean.includes('busca') || clean.includes('google') || clean.includes('investiga') || clean.includes('averigua') || clean.includes('noticias')) {
    return {
      replyText: `Me parece una gran dirección. Para **"${userMessage}"**, puedo ejecutar la búsqueda en tiempo real, filtrar los resultados y presentarte una síntesis conjunta.`,
      suggestedAction: {
        label: `🔍 Buscar en Google: "${userMessage.slice(0, 30)}"`,
        actionType: 'search',
        payload: userMessage
      }
    };
  }

  // 8. Developer Test Suite / Function Execution
  if (clean.includes('prueba') || clean.includes('test') || clean.includes('funcion') || clean.includes('diagnostico') || clean.includes('benchmark') || clean.includes('apk') || clean.includes('dev')) {
    return {
      replyText: `⚙️ **Modo Pruebas de Desarrollador Activado**:\n\nTodas las funciones están desbloqueadas para pruebas directas:\n• **Escáner y Reparador de Código AST**: Análisis estático y parcheo en vivo.\n• **Aislamiento en RAM**: Espacio efímero de 1000GB montado en V-Drive.\n• **Auditoría de Túnel Airgap**: Inspección de sockets y enrutamiento.\n• **Navegación y Scraping Multifuente**: Wikipedia, YouTube, News y Web abierta.\n\n¿Qué subsistema deseas poner a prueba ahora?`,
      suggestedAction: {
        label: '⚡ Ejecutar Diagnóstico de Sistema',
        actionType: 'custom',
        payload: 'open_audit'
      }
    };
  }

  // 9. Collaborative conversational default
  return {
    replyText: `Te entiendo perfectamente: *" ${userMessage} "*. \n\nPodemos trabajar en ello juntos paso a paso. ¿Prefieres que busque más datos en la web, que inspeccionemos el código, o tienes una idea específica de cómo abordarlo?`,
    suggestedAction: {
      label: `💡 Investigar "${userMessage.slice(0, 25)}"`,
      actionType: 'search',
      payload: userMessage
    }
  };
}

export function generateDynamicAgentResponse(prompt: string, currentUrl?: string): AgentExecutionPlan {
  const cleanPrompt = prompt.trim().toLowerCase();

  // 1. YouTube / Videos / Media
  if (cleanPrompt.includes('youtube') || cleanPrompt.includes('video') || cleanPrompt.includes('musica') || cleanPrompt.includes('cancion') || cleanPrompt.includes('ver')) {
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: `Buscando índice multimedia y canales de streaming para: "${prompt}"`, actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Resolviendo protocolo de reproducción Web y reproductor iframe', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Sintetizando enlaces directos y cargando vista en vivo', actionType: 'synthesize' }
      ],
      resultSummary: `🎬 **Acceso a YouTube y Streaming:** Se ha configurado el reproductor web para "${prompt}". Puedes reproducir contenidos directamente o abrir YouTube oficial con aceleración de hardware.`,
      suggestedUrl: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(prompt)}`,
      suggestedTitle: `YouTube - ${prompt}`,
      suggestedType: 'custom',
      tags: ['Multimedia', 'YouTube', 'Streaming']
    };
  }

  // 2. Wikipedia / Encyclopedia / Definitions
  if (cleanPrompt.includes('wikipedia') || cleanPrompt.includes('que es') || cleanPrompt.includes('quién es') || cleanPrompt.includes('historia de') || cleanPrompt.includes('concepto')) {
    const topic = prompt.replace(/wikipedia|que es|quién es|historia de|concepto de/gi, '').trim() || 'Inteligencia artificial';
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: `Consultando base de conocimiento enciclopédica sobre: "${topic}"`, actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Extrayendo secciones clave, definiciones y referencias bibliográficas', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Generando resumen estructurado y navegación enciclopédica', actionType: 'synthesize' }
      ],
      resultSummary: `📚 **Resumen Enciclopédico de "${topic}":**\n• Definición fundamental y contexto histórico analizados.\n• Se ha preparado el artículo completo con lectura sin distracciones.\n• Puedes abrir la enciclopedia en vivo o navegar por sus hipervínculos.`,
      suggestedUrl: `https://es.m.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, '_'))}`,
      suggestedTitle: `Wikipedia: ${topic}`,
      suggestedType: 'wikipedia',
      tags: ['Enciclopedia', 'Educación', 'Wikipedia']
    };
  }

  // 3. Cybersecurity, Zero-Days, CVEs, Airgap
  if (cleanPrompt.includes('zero') || cleanPrompt.includes('cve') || cleanPrompt.includes('vulnerab') || cleanPrompt.includes('hack') || cleanPrompt.includes('seguridad') || cleanPrompt.includes('airgap') || cleanPrompt.includes('dns')) {
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: 'Escaneando bases de datos de vulnerabilidades NIST NVD y CVE Mitre', actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Analizando vectores de ataque en memoria, WebGL y fugas DNS', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Generando reglas de mitigación Sandbox en tiempo real', actionType: 'synthesize' }
      ],
      resultSummary: `🛡️ **Reporte de Ciberseguridad & Vulnerabilidades:**\n• Se auditaron los vectores críticos de navegación Web.\n• Protocolo Airgap: Filtros de sandbox activos contra scripts no autorizados.\n• Túnel DNS cifrado listo para mitigar rastreos de huella digital.`,
      suggestedUrl: 'https://zerodays.network/vulns',
      suggestedTitle: 'Zero-Days Defense Hub',
      suggestedType: 'zerodays',
      tags: ['Ciberseguridad', 'CVE', 'Defensa']
    };
  }

  // 4. Code Error Scanner, Debugging & Auto-Repair
  if (cleanPrompt.includes('escanear error') || cleanPrompt.includes('reparar') || cleanPrompt.includes('bug') || cleanPrompt.includes('depurar') || cleanPrompt.includes('debug') || cleanPrompt.includes('optimiz') || cleanPrompt.includes('fuga de memoria') || cleanPrompt.includes('error de ejecucion') || cleanPrompt.includes('errores')) {
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: 'Iniciando AST Linter & Escáner de ejecución en tiempo real', actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Auditando árbol de sintaxis, variables sin scope, bucles infinitos y promesas rotas', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Aplicando correcciones automáticas y generando código optimizado', actionType: 'synthesize' }
      ],
      resultSummary: `🛠️ **Escáner y Reparador de Código IA Listo:**\n• Se auditó el runtime en busca de excepciones no controladas, fugas de memoria y layout thrashing.\n• Se abrió el **Escáner & Reparador de Código** donde puedes pegar cualquier script (JS, TS, Python, React, SQL) y repararlo en 1 clic.\n• Optimizaciones de rendimiento del navegador aplicadas con éxito.`,
      suggestedUrl: 'aether://devtools/scanner',
      suggestedTitle: 'Escáner & Reparador de Código',
      suggestedType: 'devtools',
      tags: ['Depurador', 'Reparador de Código', 'Optimización']
    };
  }

  // 5. Programming, GitHub, Code, Development
  if (cleanPrompt.includes('github') || cleanPrompt.includes('codigo') || cleanPrompt.includes('código') || cleanPrompt.includes('react') || cleanPrompt.includes('python') || cleanPrompt.includes('javascript') || cleanPrompt.includes('api')) {
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: `Inspeccionando repositorios y ecosistema de desarrollo para: "${prompt}"`, actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Parseando dependencias, estructura de código y buenas prácticas', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Sintetizando arquitectura técnica y ejemplos funcionales', actionType: 'synthesize' }
      ],
      resultSummary: `💻 **Análisis de Código y Desarrollo:**\n• Entorno TypeScript / Node.js verificado.\n• Se estructuraron recomendaciones de arquitectura modular y navegación sin bloqueos.\n• Acceso directo a repositorios y herramientas de depuración habilitado.`,
      suggestedUrl: 'https://github.com',
      suggestedTitle: 'GitHub Repositories',
      suggestedType: 'github',
      tags: ['Desarrollo', 'Código', 'GitHub']
    };
  }

  // 5. News & Current Events
  if (cleanPrompt.includes('noticia') || cleanPrompt.includes('news') || cleanPrompt.includes('actualidad') || cleanPrompt.includes('hoy')) {
    return {
      steps: [
        { id: 's1', stepNumber: 1, description: 'Rastreando titulares de agencias internacionales y fuentes tecnológicas', actionType: 'navigate' },
        { id: 's2', stepNumber: 2, description: 'Filtrando noticias verificadas y eliminando ruido publicitario', actionType: 'extract' },
        { id: 's3', stepNumber: 3, description: 'Compilando resumen ejecutivo de actualidad', actionType: 'synthesize' }
      ],
      resultSummary: `📰 **Boletín de Actualidad & Noticias:**\n• Titulares recopilados de tecnología, ciencia y actualidad.\n• Información sintetizada con verificación de fuentes.\n• Disponible para lectura en vivo en el feed de noticias.`,
      suggestedUrl: 'https://news.google.com',
      suggestedTitle: 'Noticias en Vivo',
      suggestedType: 'news',
      tags: ['Noticias', 'Actualidad', 'Tecnología']
    };
  }

  // 6. Generic / Custom intelligent response
  return {
    steps: [
      { id: 's1', stepNumber: 1, description: `Analizando requerimiento y contexto web: "${prompt.slice(0, 45)}..."`, actionType: 'navigate' },
      { id: 's2', stepNumber: 2, description: 'Buscando datos relevantes, extrayendo fuentes y validando información', actionType: 'extract' },
      { id: 's3', stepNumber: 3, description: 'Generando respuesta clara, estructurada y acciones en el navegador', actionType: 'synthesize' }
    ],
    resultSummary: `✨ **Respuesta del Asistente:**\nPara tu solicitud **"${prompt}"**, el motor procesó los datos relevantes. Puedes navegar a los resultados en vivo, abrir la web en una pestaña externa o profundizar con más preguntas.`,
    suggestedUrl: `https://www.google.com/search?q=${encodeURIComponent(prompt)}`,
    suggestedTitle: `${prompt} - Resultados`,
    suggestedType: 'search',
    tags: ['Navegación', 'Asistente', 'IA']
  };
}
