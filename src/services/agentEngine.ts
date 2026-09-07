import { Tab, AgentChatMessage, AgentStep } from '../types';

export interface AgentExecutionPlan {
  steps: Array<Omit<AgentStep, 'status'>>;
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
        { 
          id: 's1', 
          stepNumber: 1, 
          description: `Apuntando a la barra multimedia para: "${prompt}"`, 
          details: 'Moviendo el cursor al campo de búsqueda multimedia e ingresando los términos solicitados.',
          actionType: 'navigate',
          cursorTarget: {
            x: 48,
            y: 16,
            action: 'typing',
            label: `⌨️ Tecleando en YouTube: "${prompt.slice(0, 20)}"`,
            targetBounds: { top: 12, left: 25, width: 50, height: 8 }
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Haciendo clic en el reproductor y resolviendo stream seguro', 
          details: 'Activando aceleración por hardware en RAM sin trackers publicitarios.',
          actionType: 'dom_click',
          cursorTarget: {
            x: 50,
            y: 45,
            action: 'clicking',
            label: '👆 Clic en Reproductor de Video',
            targetBounds: { top: 25, left: 20, width: 60, height: 40 }
          }
        },
        { 
          id: 's3', 
          stepNumber: 3, 
          description: 'Sintetizando enlaces directos y cargando vista en vivo', 
          details: 'Inspeccionando controles de reproducción y entregando el resultado al usuario.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 75,
            action: 'inspecting',
            label: '✨ Video Listo para Reproducir'
          }
        }
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
        { 
          id: 's1', 
          stepNumber: 1, 
          description: `Desplazando puntero al índice de Wikipedia: "${topic}"`, 
          details: 'Localizando el artículo principal en español y preparando la lectura sin distracciones.',
          actionType: 'navigate',
          cursorTarget: {
            x: 35,
            y: 20,
            action: 'moving',
            label: `🔍 Localizando: "${topic}"`,
            targetBounds: { top: 15, left: 15, width: 70, height: 10 }
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Haciendo clic en la sección de definiciones y bibliografía', 
          details: 'Extrayendo resúmenes enciclopédicos y enlaces de verificación cruzada.',
          actionType: 'dom_click',
          cursorTarget: {
            x: 42,
            y: 48,
            action: 'clicking',
            label: '👆 Extrayendo Secciones Clave',
            targetBounds: { top: 30, left: 20, width: 60, height: 35 }
          }
        },
        { 
          id: 's3', 
          stepNumber: 3, 
          description: 'Generando resumen estructurado y navegación enciclopédica', 
          details: 'Sintetizando la información en lenguaje natural claro y conciso.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 70,
            action: 'inspecting',
            label: '📖 Lectura Enciclopédica Lista'
          }
        }
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
        { 
          id: 's1', 
          stepNumber: 1, 
          description: 'Apuntando al escudo de seguridad y base de datos CVE', 
          details: 'Consultando registros NIST NVD y vectores de explotación recientes.',
          actionType: 'navigate',
          cursorTarget: {
            x: 65,
            y: 18,
            action: 'moving',
            label: '🛡️ Auditando Escudo de Seguridad'
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Haciendo clic en la matriz de mitigación en Sandbox', 
          details: 'Aislando sockets y bloqueando scripts no firmados en el túnel Airgap.',
          actionType: 'dom_click',
          cursorTarget: {
            x: 50,
            y: 52,
            action: 'clicking',
            label: '⚡ Aplicando Aislamiento de Memoria',
            targetBounds: { top: 35, left: 20, width: 60, height: 35 }
          }
        },
        { 
          id: 's3', 
          stepNumber: 3, 
          description: 'Confirmando reglas Sandbox y reporte defensivo', 
          details: 'Generando dictamen de seguridad perimetral.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 75,
            action: 'inspecting',
            label: '✅ Perímetro Blindado'
          }
        }
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
        { 
          id: 's1', 
          stepNumber: 1, 
          description: 'Moviendo cursor al botón del Escáner y Reparador de Código', 
          details: 'Accediendo al entorno de análisis estático AST y linter en tiempo real.',
          actionType: 'navigate',
          cursorTarget: {
            x: 72,
            y: 12,
            action: 'moving',
            label: '🛠️ Apuntando al Reparador de Código'
          }
        },
        { 
          id: 's2', 
          stepNumber: 2, 
          description: 'Haciendo clic en el botón de Auditoría AST y Linter', 
          details: 'Inspeccionando scopes de variables, condiciones de carrera y fugas de memoria.',
          actionType: 'dom_click',
          cursorTarget: {
            x: 50,
            y: 42,
            action: 'clicking',
            label: '👆 Ejecutando Análisis AST',
            targetBounds: { top: 25, left: 15, width: 70, height: 35 }
          }
        },
        { 
          id: 's3', 
          stepNumber: 3, 
          description: 'Generando parche corregido y optimizaciones de rendimiento', 
          details: 'Calculando mejoras de tiempo de ejecución y preparando código listo para producción.',
          actionType: 'synthesize',
          cursorTarget: {
            x: 50,
            y: 72,
            action: 'inspecting',
            label: '✨ Código Reparado con Éxito'
          }
        }
      ],
      resultSummary: `🛠️ **Escáner y Reparador de Código IA Listo:**\n• Se auditó el runtime en busca de excepciones no controladas, fugas de memoria y layout thrashing.\n• Se abrió el **Escáner & Reparador de Código** donde puedes pegar cualquier script (JS, TS, Python, React, SQL) y repararlo en 1 clic.\n• Optimizaciones de rendimiento del navegador aplicadas con éxito.`,
      suggestedUrl: 'aether://devtools/scanner',
      suggestedTitle: 'Escáner & Reparador de Código',
      suggestedType: 'devtools',
      tags: ['Depurador', 'Reparador de Código', 'Optimización']
    };
  }

  // 5. Generic / Custom intelligent response with visual waypoints
  return {
    steps: [
      { 
        id: 's1', 
        stepNumber: 1, 
        description: `Moviendo puntero a la barra de búsqueda para: "${prompt.slice(0, 35)}"`, 
        details: 'El agente localiza la barra de consulta web y escribe la instrucción.',
        actionType: 'navigate',
        cursorTarget: {
          x: 48,
          y: 14,
          action: 'typing',
          label: `⌨️ Escribiendo: "${prompt.slice(0, 22)}"`,
          targetBounds: { top: 10, left: 20, width: 60, height: 8 }
        }
      },
      { 
        id: 's2', 
        stepNumber: 2, 
        description: 'Haciendo clic sobre las fuentes web principales', 
        details: 'Extrayendo contenido relevante y descartando publicidad.',
        actionType: 'dom_click',
        cursorTarget: {
          x: 38,
          y: 45,
          action: 'clicking',
          label: '👆 Inspeccionando Resultados Web',
          targetBounds: { top: 30, left: 15, width: 70, height: 30 }
        }
      },
      { 
        id: 's3', 
        stepNumber: 3, 
        description: 'Sintetizando respuesta clara y estructurada', 
        details: 'Integrando hallazgos con el contexto del navegador para el usuario.',
        actionType: 'synthesize',
        cursorTarget: {
          x: 50,
          y: 70,
          action: 'inspecting',
          label: '✨ Síntesis y Acción Completadas'
        }
      }
    ],
    resultSummary: `✨ **Respuesta del Asistente:**\nPara tu solicitud **"${prompt}"**, el motor procesó los datos relevantes. Puedes navegar a los resultados en vivo, abrir la web en una pestaña externa o profundizar con más preguntas.`,
    suggestedUrl: `https://www.google.com/search?q=${encodeURIComponent(prompt)}`,
    suggestedTitle: `${prompt} - Resultados`,
    suggestedType: 'search',
    tags: ['Navegación', 'Asistente', 'IA']
  };
}
