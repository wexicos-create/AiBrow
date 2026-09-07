import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/50 transition-colors"
      >
        <span>Install Aether</span>
        <Download className="w-4 h-4 text-zinc-400" />
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/50 transition-colors"
        >
          <span>Install Aether</span>
          <Download className="w-4 h-4 text-zinc-400" />
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-[2rem] bg-[#1a1a1a] p-8 shadow-2xl border border-zinc-800/80 mb-8 sm:mb-0">
              <h3 className="text-xl font-display font-semibold text-zinc-100 mb-2">Install Aether</h3>
              <p className="text-[15px] text-zinc-400 leading-relaxed mb-6">
                To install this neural interface on your iOS device:
              </p>
              <div className="space-y-4 text-sm text-zinc-300 font-medium">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 text-xs text-zinc-500">1</div>
                  <p>Tap the <strong>Share</strong> button in the Safari toolbar.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5 text-xs text-zinc-500">2</div>
                  <p>Scroll down and tap <strong>Add to Home Screen</strong>.</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-8 w-full rounded-xl bg-zinc-100 py-3.5 text-[15px] font-semibold text-zinc-900 hover:bg-white transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
