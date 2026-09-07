export type BrowserMode = 'manual' | 'mixed' | 'autonomous';

export interface Tab {
  id: string;
  title: string;
  url: string;
  type: 'home' | 'search' | 'zerodays' | 'github' | 'wikipedia' | 'news' | 'devtools' | 'custom';
  query?: string;
}

export interface CodeErrorDiagnostic {
  line: number;
  column?: number;
  severity: 'error' | 'warning' | 'optimization';
  code: string;
  message: string;
  suggestedFix: string;
}

export interface CodeScanResult {
  language: string;
  originalCode: string;
  repairedCode: string;
  errorsFound: CodeErrorDiagnostic[];
  performanceScore: number;
  securityScore: number;
  summary: string;
  optimizationGains: string[];
}

export interface AgentStep {
  id: string;
  stepNumber: number;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  actionType: 'navigate' | 'dom_click' | 'extract' | 'synthesize';
  targetElement?: string;
  details?: string;
}

export interface AgentTask {
  id: string;
  instruction: string;
  status: 'idle' | 'running' | 'completed' | 'paused';
  currentStepIndex: number;
  steps: AgentStep[];
  logs: Array<{ time: string; text: string; type: 'info' | 'success' | 'action' | 'warn' }>;
  resultSummary?: string;
  extractedData?: Record<string, any>;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'navigate' | 'scan' | 'search' | 'custom';
    payload: string;
  };
}

export interface SearchResultItem {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  date?: string;
  category?: string;
}
