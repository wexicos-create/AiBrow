import { SearchResultItem } from '../types';

export const MOCK_SEARCH_RESULTS: Record<string, SearchResultItem[]> = {
  default: [
    {
      id: 'res-1',
      title: 'LLaMA 3.3 y Modelos Autónomos de Navegación Web en Tiempo Real',
      url: 'https://huggingface.co/blog/autonomous-web-agents',
      displayUrl: 'huggingface.co > blog > autonomous-web-agents',
      snippet: 'Explora cómo los agentes basados en LLaMA resuelven el árbol DOM de forma interactiva, interactuando con formularios y navegando de manera autónoma sin intervención humana.',
      category: 'Inteligencia Artificial'
    },
    {
      id: 'res-2',
      title: 'Zero-Day Vulnerability Research & Airgap Security Protocol 2026',
      url: 'https://cve.org/zeroday-advisories',
      displayUrl: 'cve.org > security > zerodays-airgap',
      snippet: 'Protocolos de aislamiento estricto Airgap de 256 bits para entornos de navegación sandboxed. Prevención de inyección en tiempo real y ejecución controlada.',
      category: 'Ciberseguridad'
    },
    {
      id: 'res-3',
      title: 'Computación Cuántica y Algoritmos Post-Cuánticos',
      url: 'https://nature.com/articles/quantum-computing-frontier',
      displayUrl: 'nature.com > articles > quantum-computing',
      snippet: 'Avances en procesadores superconductores y algoritmos de corrección de errores cuánticos para cifrado de próxima generación.',
      category: 'Ciencia'
    },
    {
      id: 'res-4',
      title: 'GitHub - Repositorios de Agentes Neurales de Código Abierto',
      url: 'https://github.com/topics/autonomous-agents',
      displayUrl: 'github.com > topics > autonomous-agents',
      snippet: 'Colección de bibliotecas TypeScript y Python para automatización web headless con modelos de lenguaje integrados.',
      category: 'Desarrollo'
    }
  ]
};

export const ZERO_DAYS_ALERTS = [
  {
    cve: 'CVE-2026-9142',
    name: 'Kernel DOM Memory Corruption in Webkit v2.8',
    severity: 'CRÍTICA (9.8)',
    status: 'PARCHE AISLADO AIRGAP',
    description: 'Vulnerabilidad de desbordamiento de búfer en el renderizado de texturas WebGL.',
    affected: 'Chromium / Safari Webkit Engines',
    mitigation: 'Filtro Aether Sandbox activado. 0 bytes filtrados.'
  },
  {
    cve: 'CVE-2026-8831',
    name: 'DNS Side-Channel Telemetry Leakage',
    severity: 'ALTA (8.4)',
    status: 'BLOQUEADO',
    description: 'Extracción encubierta de peticiones DNS mediante etiquetas de precarga en encabezados.',
    affected: 'Browsers estándar sin protocolo Airgap',
    mitigation: 'Túnel DNS cifrado a 143.168.116.237 activo.'
  },
  {
    cve: 'CVE-2026-7209',
    name: 'Shadow DOM Execution Bypass in Web Extensions',
    severity: 'MEDIA (6.5)',
    status: 'SUPERVISADO POR AGENTE',
    description: 'Manipulación de componentes web aislados por extensiones maliciosas.',
    affected: 'Extensiones de terceros sin firma',
    mitigation: 'Aether Virtual DOM Wrapper enforceado.'
  }
];

export const TECH_NEWS = [
  {
    id: 'news-1',
    title: 'Nuevo estándar de navegadores autónomos con agentes locales',
    source: 'TechPulse Daily',
    time: 'Hace 12 min',
    summary: 'Los navegadores modernos integran inferencia en el dispositivo para ejecutar flujos de trabajo completos en páginas web sin compartir cookies ni credenciales con servidores remotos.'
  },
  {
    id: 'news-2',
    title: 'Avance en cifrado homomórfico para búsquedas web ultra-privadas',
    source: 'CyberIntel Review',
    time: 'Hace 45 min',
    summary: 'Investigadores presentan un método de consulta que permite a los motores de búsqueda indexar y responder sin conocer el texto real buscado por el usuario.'
  },
  {
    id: 'news-3',
    title: 'Modelos ligeros LLaMA Uncensored ahora superan a servidores dedicados',
    source: 'OpenAI Watch',
    time: 'Hace 2 horas',
    summary: 'Gracias a la cuantización de 4 bits y la aceleración WebGPU, el agente puede inspeccionar y resumir hasta 40 pestañas concurrentes.'
  }
];
