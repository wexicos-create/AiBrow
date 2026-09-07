import React, { useState } from 'react';
import { 
  Bot, Pause, Play, Edit3, SkipForward, Square, 
  CheckCircle, AlertCircle, ArrowRight, Eye, ChevronDown, ChevronUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AgentTask } from '../types';

interface AgentControlBarProps {
  task: AgentTask | null;
  isPaused: boolean;
  onTogglePause: () => void;
  onIntervene: (newInstruction: string) => void;
  onNextStep: () => void;
  onStop: () => void;
  visualPointerEnabled: boolean;
  onTogglePointer: () => void;
}

export const AgentControlBar: React.FC<AgentControlBarProps> = ({
  task,
  isPaused,
  onTogglePause,
  onIntervene,
  onNextStep,
  onStop,
  visualPointerEnabled,
  onTogglePointer
}) => {
  const [isIntervening, setIsIntervening] = useState(false);
  const [interveneText, setInterveneText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  if (!task || task.status === 'idle') return null;

  const currentStep = task.steps[task.currentStepIndex] || task.steps[task.steps.length - 1];
  const isCompleted = task.status === 'completed';

  const handleInterveneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interveneText.trim()) return;
    onIntervene(interveneText);
    setInterveneText('');
    setIsIntervening(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#0b101d] border-b border-[#00F0FF]/40 shadow-[0_4px_25px_rgba(0,240,255,0.15)] z-40 px-3 sm:px-4 py-2.5 select-none"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-2">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Status badge & title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-1.5 rounded-lg border flex items-center justify-center ${
              isCompleted 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : isPaused
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] animate-pulse'
            }`}>
              <Bot className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {isCompleted ? 'Misión Cumplida' : isPaused ? 'Agente en Pausa' : 'Agente Autónomo en Acción'}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  isCompleted 
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : isPaused
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                    : 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]'
                }`}>
                  Paso {task.currentStepIndex + 1} de {task.steps.length}
                </span>
              </div>
              <div className="text-[11px] text-gray-300 truncate max-w-md">
                Orden: <span className="text-[#00F0FF] font-medium">"{task.instruction}"</span>
              </div>
            </div>
          </div>

          {/* Action and Control Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Visual Pointer Toggle */}
            <button
              type="button"
              onClick={onTogglePointer}
              className={`flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                visualPointerEnabled
                  ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                  : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:text-white'
              }`}
              title="Activar/Desactivar Puntero Visual Virtual"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Puntero IA: {visualPointerEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {!isCompleted && (
              <>
                {/* Pause / Resume */}
                <button
                  type="button"
                  onClick={onTogglePause}
                  className={`flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                    isPaused 
                      ? 'bg-amber-500 text-black border-amber-400 hover:bg-amber-400' 
                      : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-gray-200'
                  }`}
                  title={isPaused ? 'Reanudar Agente' : 'Pausar para inspeccionar o corregir'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
                </button>

                {/* Intervene / Correct Course Button */}
                <button
                  type="button"
                  onClick={() => setIsIntervening(!isIntervening)}
                  className="flex items-center gap-1 text-[11px] font-mono bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500 text-purple-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  title="Intervenir y corregir la orden en caliente"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Corregir Rumbo</span>
                </button>

                {/* Skip Step */}
                <button
                  type="button"
                  onClick={onNextStep}
                  className="flex items-center gap-1 text-[11px] font-mono bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 px-2 py-1 rounded-lg transition cursor-pointer"
                  title="Saltar o completar paso actual"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {/* Stop / Cancel */}
            <button
              type="button"
              onClick={onStop}
              className="flex items-center gap-1 text-[11px] font-mono bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 px-2 py-1 rounded-lg transition cursor-pointer"
              title="Detener Operación"
            >
              <Square className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">Detener</span>
            </button>

            {/* Toggle Accordion */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-white transition cursor-pointer"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Reasoning & Step Description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2 pt-1 border-t border-zinc-800/80"
            >
              {/* Active Step Reasoning Banner */}
              <div className="bg-[#111827] border border-cyan-900/40 rounded-xl p-2.5 text-xs flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] mt-1.5 shrink-0 animate-ping" />
                <div className="flex-1 min-w-0">
                  <div className="text-[#00F0FF] font-mono font-semibold flex items-center gap-1.5">
                    <span>{currentStep?.description || 'Razonando y analizando entorno...'}</span>
                  </div>
                  {currentStep?.details && (
                    <div className="text-gray-400 text-[11px] mt-0.5 font-mono">
                      💡 {currentStep.details}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Steps Track */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {task.steps.map((step, idx) => {
                  const isCurrent = idx === task.currentStepIndex;
                  const isDone = step.status === 'completed';

                  return (
                    <div
                      key={step.id || idx}
                      className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all ${
                        isDone
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : isCurrent
                          ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                          : 'bg-zinc-900/50 border-zinc-800 text-gray-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shrink-0" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-zinc-700 shrink-0" />
                      )}
                      <span>Paso {idx + 1}: {step.actionType}</span>
                    </div>
                  );
                })}
              </div>

              {/* Hot Intervention Dialog */}
              {isIntervening && (
                <form onSubmit={handleInterveneSubmit} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={interveneText}
                    onChange={(e) => setInterveneText(e.target.value)}
                    placeholder="Escribe cómo corregir el rumbo (ej. 'No abras esa página, busca en Wikipedia mejor')..."
                    className="flex-1 bg-purple-950/30 border border-purple-500/70 focus:border-purple-400 rounded-xl px-3 py-1.5 text-xs text-purple-100 placeholder-purple-400/50 outline-none font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    Aplicar Corrección
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsIntervening(false)}
                    className="bg-zinc-800 text-gray-300 text-xs px-2.5 py-1.5 rounded-xl hover:bg-zinc-700 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
