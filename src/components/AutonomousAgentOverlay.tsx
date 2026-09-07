import React from 'react';
import { Bot, CheckCircle, Loader2, X, Pause, Play, Sparkles, Terminal } from 'lucide-react';
import { AgentTask } from '../types';

interface AutonomousAgentOverlayProps {
  task: AgentTask | null;
  onStop: () => void;
  onPauseToggle: () => void;
}

export const AutonomousAgentOverlay: React.FC<AutonomousAgentOverlayProps> = ({
  task,
  onStop,
  onPauseToggle
}) => {
  if (!task || task.status === 'idle') return null;

  const currentStep = task.steps[task.currentStepIndex] || task.steps[task.steps.length - 1];

  return (
    <div className="fixed top-28 right-4 sm:right-6 z-40 w-80 sm:w-96 bg-[#0e1422]/95 border border-[#00F0FF]/60 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.25)] p-4 backdrop-blur-md text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Agente Autónomo</span>
              {task.status === 'running' && (
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              )}
            </div>
            <span className="text-[10px] text-gray-400">LLaMA Uncensored • En tiempo real</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={onPauseToggle}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition cursor-pointer"
            title={task.status === 'paused' ? 'Reanudar' : 'Pausar'}
          >
            {task.status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={onStop}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition cursor-pointer"
            title="Detener Agente"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Task Description */}
      <div className="my-3 p-2.5 bg-[#080b13] rounded-lg border border-gray-900 text-gray-300 text-[11px] leading-relaxed">
        <span className="text-[#00F0FF] font-bold">Orden activa: </span>
        {task.instruction}
      </div>

      {/* Steps Progress */}
      <div className="space-y-2 mb-3">
        {task.steps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isCurrent = step.status === 'running';
          return (
            <div 
              key={step.id} 
              className={`flex items-center gap-2 p-1.5 rounded-md transition ${
                isCurrent ? 'bg-[#00F0FF]/10 text-[#00F0FF] font-bold' : 
                isDone ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-3.5 h-3.5 text-[#27C93F] shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00F0FF] shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-gray-700 flex items-center justify-center text-[9px] shrink-0">
                  {idx + 1}
                </span>
              )}
              <span className="text-[11px] truncate flex-1">{step.description}</span>
            </div>
          );
        })}
      </div>

      {/* Result if completed */}
      {task.status === 'completed' && task.resultSummary && (
        <div className="mt-2 p-2.5 bg-green-950/20 border border-green-500/30 rounded-lg text-green-300 text-[11px] leading-relaxed">
          <div className="font-bold flex items-center gap-1 mb-1 text-[#27C93F]">
            <Sparkles className="w-3.5 h-3.5" /> Síntesis completada
          </div>
          {task.resultSummary}
        </div>
      )}
    </div>
  );
};
