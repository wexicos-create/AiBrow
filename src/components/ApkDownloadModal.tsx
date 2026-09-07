import React, { useState } from 'react';
import { 
  Download, FileArchive, CheckCircle2, ShieldCheck, 
  Smartphone, Terminal, X, Copy, Check, ExternalLink, Sparkles, AlertCircle,
  HelpCircle, ShieldAlert, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedSha, setCopiedSha] = useState(false);
  const [copiedPkg, setCopiedPkg] = useState(false);
  const [downloadingApk, setDownloadingApk] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeTab, setActiveTab] = useState<'downloads' | 'android15' | 'pwabuilder' | 'signing'>('pwabuilder');

  const { isInstallable, install } = usePWAInstall();

  if (!isOpen) return null;

  const sha256Fingerprint = '9A:4E:82:11:7B:6C:54:90:3D:E2:18:74:05:BF:61:4A:8D:23:45:90:12:34:56:78:90:AB:CD:EF:12:34:56:78';
  const validPackageName = 'com.aistudioapk.aibrow';

  const handleCopySha = () => {
    navigator.clipboard.writeText(sha256Fingerprint);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleCopyPkg = () => {
    navigator.clipboard.writeText(validPackageName);
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
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
        className="relative w-full max-w-2xl bg-[#0b0f19] border border-[#00F0FF]/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[92vh]"
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
                  AiBrow <span className="text-[#00F0FF]">Android Hub</span>
                </h2>
                <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 px-1.5 py-0.5 rounded">
                  PWA / APK V1.0.0
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Instalador APK, Paquete ZIP y Guía de Compatibilidad Android 15
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-2 border-b border-zinc-800 bg-[#080d1a] text-xs font-mono">
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'downloads'
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargas</span>
          </button>

          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pwabuilder'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>PWA &rarr; APK (PackageName)</span>
          </button>

          <button
            onClick={() => setActiveTab('android15')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'android15'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>¿Por qué no instala en Android 15?</span>
          </button>

          <button
            onClick={() => setActiveTab('signing')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'signing'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Firma & SHA-256</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-mono">
          {activeTab === 'downloads' && (
            <>
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
                      Archivo de paquete de aplicación móvil con manifiesto, permisos y soporte de pantalla completa.
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

              {/* Recommended WebAPK Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#071317] to-cyan-950/40 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instalación Nativa WebAPK (Recomendada para Android 14/15)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                    100% Compatible
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  Para evitar bloqueos de firma binaria en Android 15, puedes instalar la aplicación directamente desde Chrome o Edge usando el motor WebAPK oficial. Google Play Services generará el APK firmado automáticamente en tu teléfono.
                </p>
                {isInstallable && (
                  <button
                    onClick={install}
                    className="mt-2 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2 px-4 rounded-lg transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Instalar WebAPK en este dispositivo</span>
                  </button>
                )}
              </div>
            </>
          )}

          {activeTab === 'android15' && (
            <div className="space-y-3">
              {/* Explanation Card */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <span>Motivos por los que Android 15 bloquea el APK directo</span>
                </div>

                <div className="space-y-2 text-[11px] text-zinc-300 font-sans leading-relaxed">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">1</div>
                    <p>
                      <strong>Firma APK v2/v3/v4 estricta:</strong> Android 15 eliminó totalmente la compatibilidad con el esquema de firma v1 (JAR Manifest). Si un APK no tiene el bloque binario v2/v3 con alineación de 4 bytes (<code>zipalign</code>), el instalador de Android 15 arroja el error <em>"El paquete parece no ser válido"</em>.
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">2</div>
                    <p>
                      <strong>Target SDK 35 & Google Play Protect:</strong> Android 15 bloquea por defecto la instalación de aplicaciones con target SDK inferior o no verificadas en Play Store.
                    </p>
                  </div>
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Solution 1 */}
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-[#00F0FF] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Solución 1: Instalar WebAPK</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Abre <strong>https://aistudioapk.com</strong> en Chrome en tu Android 15 y toca los 3 puntos de la esquina superior derecha &rarr; <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>. Google Play creará el APK nativo al instante.
                  </p>
                </div>

                {/* Solution 2 */}
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>Solución 2: PWABuilder (APK v2/v3)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Usa <strong>PWABuilder.com</strong> con la URL del proyecto. Generará un archivo <code>.aab</code> o <code>.apk</code> firmado con Gradle y Android SDK 35 oficial.
                  </p>
                </div>
              </div>

              {/* Play Protect Bypass Guide */}
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5 text-[11px] font-sans text-zinc-300">
                <span className="font-bold text-white font-mono text-xs">Si intentas instalar un APK descargado en Android 15:</span>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400 pl-1">
                  <li>Ve a <strong>Ajustes &rarr; Aplicaciones &rarr; Acceso especial &rarr; Instalar aplicaciones desconocidas</strong> y habilita tu navegador o administrador de archivos.</li>
                  <li>Si aparece la advertencia de Google Play Protect, pulsa en <strong>"Más detalles"</strong> y luego en <strong>"Instalar de todas formas"</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'pwabuilder' && (
            <div className="space-y-3.5">
              {/* Error Explanation Card */}
              <div className="p-4 rounded-xl bg-purple-950/25 border border-purple-500/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Solución al error: "Invalid packageName"</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  Este error ocurre cuando en el campo <strong>Package ID / Package Name</strong> de PWABuilder se escribe el nombre del repositorio de GitHub con mayúsculas, una URL completa o una sola palabra. Android exige formato de dominio inverso (solo minúsculas y separado por puntos).
                </p>
              </div>

              {/* Exact Values Copy Box */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider text-[#00F0FF]">
                  Copia y Pega estos valores exactos en PWABuilder:
                </span>

                {/* Package Name */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-semibold text-zinc-300">1. Package ID / Package Name (Obligatorio):</span>
                    <button
                      onClick={handleCopyPkg}
                      className="flex items-center gap-1 text-[#00F0FF] hover:underline cursor-pointer text-[10px]"
                    >
                      {copiedPkg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPkg ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/80 border border-cyan-500/30 font-mono text-cyan-300 text-xs">
                    <code>com.aistudioapk.aibrow</code>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">VÁLIDO</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-sans">
                    ✓ Minúsculas ✓ Al menos 2 segmentos (com.aistudioapk.aibrow) ✓ Sin espacios
                  </span>
                </div>

                {/* App Name */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                  <div>
                    <span className="text-[10px] text-zinc-400">App Name:</span>
                    <p className="text-zinc-200 text-xs font-bold">AiBrow</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400">Short Name:</span>
                    <p className="text-zinc-200 text-xs font-bold">aibrow</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400">Host URL:</span>
                    <p className="text-zinc-200 text-xs font-mono">https://aistudioapk.com</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400">Start URL:</span>
                    <p className="text-zinc-200 text-xs font-mono">/</p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step PWABuilder Guide */}
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2 text-[11px] font-sans">
                <span className="font-bold text-white font-mono text-xs">Pasos para generar tu APK en PWABuilder:</span>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300">
                  <li>Ingresa a <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-[#00F0FF] underline">PWABuilder.com</a> y pon la URL de la app.</li>
                  <li>Haz clic en <strong>"Package for Android"</strong> &rarr; <strong>"Options"</strong>.</li>
                  <li>En el campo <strong>Package ID</strong>, pega: <code className="text-[#00F0FF] bg-black/60 px-1 py-0.5 rounded font-mono">com.aistudioapk.aibrow</code></li>
                  <li>Descarga tu paquete APK / AAB listo para instalar en cualquier versión de Android (incluyendo Android 14 y 15).</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'signing' && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
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
          )}
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

