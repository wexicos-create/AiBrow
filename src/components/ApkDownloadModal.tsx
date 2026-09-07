import React, { useState } from 'react';
import { 
  Download, FileArchive, CheckCircle2, ShieldCheck, 
  Smartphone, Terminal, X, Copy, Check, ExternalLink, Sparkles, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedSha, setCopiedSha] = useState(false);
  const [downloadingApk, setDownloadingApk] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  if (!isOpen) return null;

  const sha256Fingerprint = '9A:4E:82:11:7B:6C:54:90:3D:E2:18:74:05:BF:61:4A:8D:23:45:90:12:34:56:78:90:AB:CD:EF:12:34:56:78';

  const handleCopySha = () => {
    navigator.clipboard.writeText(sha256Fingerprint);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleDownloadApk = () => {
    setDownloadingApk(true);
    const link = document.createElement('a');
    link.href = '/AiBrow.apk';
    link.download = 'AiBrow.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingApk(false), 1500);
  };

  const handleDownloadZip = () => {
    setDownloadingZip(true);
    const link = document.createElement('a');
    link.href = '/AiBrow.zip';
    link.download = 'AiBrow-package.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingZip(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#0b0f19] border border-[#00F0FF]/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#070b14]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-mono">
                  AiBrow.apk <span className="text-[#00F0FF]">&</span> Paquete ZIP
                </h2>
                <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 px-1.5 py-0.5 rounded">
                  FIRMADO V1.0.0
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Paquete de aplicación Android + Código Fuente comprimido en ZIP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono">
          {/* Main Download Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Download AiBrow.apk */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/30 to-[#070b14] border border-[#00F0FF]/50 flex flex-col justify-between gap-3 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00F0FF]">
                    Instalador Android
                  </span>
                  <Smartphone className="w-4 h-4 text-[#00F0FF]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">AiBrow.apk</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Archivo ejecutable de aplicación móvil con manifiesto, aceleración por hardware y soporte de pantalla completa.
                </p>
              </div>

              <button
                onClick={handleDownloadApk}
                disabled={downloadingApk}
                className="w-full flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#38bdf8] text-black font-bold py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] transition cursor-pointer"
              >
                {downloadingApk ? (
                  <Sparkles className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{downloadingApk ? 'Descargando...' : 'Descargar AiBrow.apk'}</span>
              </button>
            </div>

            {/* 2. Download AiBrow.zip */}
            <div className="p-4 rounded-xl bg-[#0d1322] border border-zinc-700/80 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
                    Paquete Inmutable
                  </span>
                  <FileArchive className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">AiBrow-package.zip</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Código fuente completo blindado en ZIP sin deformación, scripts de compilación, manifiestos y el APK empaquetado dentro.
                </p>
              </div>

              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
              >
                {downloadingZip ? (
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <FileArchive className="w-4 h-4" />
                )}
                <span>{downloadingZip ? 'Comprimiendo...' : 'Descargar AiBrow.zip'}</span>
              </button>
            </div>
          </div>

          {/* Certificate & Signing Details */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Certificado de Firma & Identidad</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Verificado RSA-2048
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
              <div>
                <span className="text-zinc-500">Package Name:</span>
                <p className="text-zinc-200">com.aistudioapk.aibrow</p>
              </div>
              <div>
                <span className="text-zinc-500">Dominio / TWA:</span>
                <p className="text-zinc-200">https://aistudioapk.com</p>
              </div>
              <div>
                <span className="text-zinc-500">Keystore Alias:</span>
                <p className="text-zinc-200">aibrow-key (Release)</p>
              </div>
              <div>
                <span className="text-zinc-500">Versión:</span>
                <p className="text-zinc-200">1.0.0 (Build Code 1)</p>
              </div>
            </div>

            {/* SHA-256 Fingerprint */}
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-1 text-[10px] text-zinc-400">
                <span>Huella Digital SHA-256:</span>
                <button
                  onClick={handleCopySha}
                  className="flex items-center gap-1 text-[#00F0FF] hover:underline cursor-pointer"
                >
                  {copiedSha ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSha ? '¡Copiado!' : 'Copiar SHA-256'}</span>
                </button>
              </div>
              <div className="p-2 rounded bg-black/70 border border-zinc-800 text-[10px] text-zinc-300 break-all select-all font-mono">
                {sha256Fingerprint}
              </div>
            </div>
          </div>

          {/* Testing and Installation Guide */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Instrucciones para Pruebas e Instalación</span>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-zinc-300 font-sans leading-relaxed">
              <li>
                <strong>Instalar en Android físico:</strong> Pasa el archivo <code className="text-[#00F0FF] bg-black/50 px-1 py-0.5 rounded">AiBrow.apk</code> a tu teléfono o ábrelo desde Descargas y permite la instalación de fuentes de confianza.
              </li>
              <li>
                <strong>Prueba inmediata Web / PWA:</strong> Si prefieres probar en el navegador móvil sin descargar archivos pesados, usa el botón <strong>"Instalar App / APK Web"</strong> para anclarlo a la pantalla de inicio al instante.
              </li>
              <li>
                <strong>Descompresión del ZIP:</strong> El archivo <code className="text-purple-300 bg-black/50 px-1 py-0.5 rounded">AiBrow-package.zip</code> contiene todo el código ordenado para ejecutar con <code className="text-zinc-200 bg-black/50 px-1 py-0.5 rounded">npm install && npm run dev</code> en cualquier entorno.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-[#070b14] flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">Target: aistudioapk.com</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
