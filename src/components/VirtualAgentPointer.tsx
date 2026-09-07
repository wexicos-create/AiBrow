import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Navigation } from 'lucide-react';

export interface CursorPosition {
  x: number; // percentage (0-100) or pixels
  y: number; // percentage (0-100) or pixels
  visible: boolean;
  action: 'idle' | 'moving' | 'clicking' | 'inspecting' | 'typing';
  label: string;
  targetBounds?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface VirtualAgentPointerProps {
  cursor: CursorPosition;
}

export const VirtualAgentPointer: React.FC<VirtualAgentPointerProps> = ({ cursor }) => {
  if (!cursor.visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. Target Element Highlight Boundary */}
      <AnimatePresence>
        {cursor.targetBounds && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              top: `${cursor.targetBounds.top}%`,
              left: `${cursor.targetBounds.left}%`,
              width: `${cursor.targetBounds.width}%`,
              height: `${cursor.targetBounds.height}%`,
            }}
            className="absolute border-2 border-dashed border-[#00F0FF] bg-[#00F0FF]/10 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <span className="absolute -top-3 left-2 bg-[#00F0FF] text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
              OBJETIVO IA
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Virtual Cursor Pointer */}
      <motion.div
        animate={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 120,
          mass: 0.6,
        }}
        className="absolute transform -translate-x-2 -translate-y-2 flex flex-col items-start"
      >
        {/* Cursor Icon & Laser Ring */}
        <div className="relative flex items-center justify-center">
          {/* Laser Glow pulse */}
          <div className="absolute -inset-2 rounded-full bg-[#00F0FF]/30 blur-md animate-pulse" />

          {/* Click Shockwave ring */}
          {cursor.action === 'clicking' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute w-8 h-8 rounded-full border-2 border-[#00F0FF] bg-[#00F0FF]/20"
            />
          )}

          {/* Holographic Cursor Arrow / Icon */}
          <div className="relative z-10 w-7 h-7 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-lg rounded-tl-none border border-white/80 shadow-[0_0_15px_rgba(0,240,255,0.8)] flex items-center justify-center text-white transform -rotate-12">
            {cursor.action === 'inspecting' ? (
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            ) : cursor.action === 'typing' ? (
              <Bot className="w-3.5 h-3.5 text-white animate-bounce" />
            ) : (
              <Navigation className="w-4 h-4 fill-white text-cyan-900 transform rotate-45" />
            )}
          </div>
        </div>

        {/* Live Action Tooltip Badge */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 ml-4 px-2.5 py-1 rounded-lg bg-[#070b14]/95 border border-[#00F0FF]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="text-[10px] font-mono text-[#00F0FF] font-semibold">
            {cursor.label || 'IA Operando...'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
