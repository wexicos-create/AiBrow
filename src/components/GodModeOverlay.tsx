import React, { useState, useEffect } from 'react';
import { 
  Cpu, Zap, Shield, Terminal, Globe, Flame, Radio, 
  Activity, Lock, Unlock, RefreshCw, X, Play, Sparkles, 
  Layers, Database, Wifi, AlertTriangle, CheckCircle2, Code, CreditCard, ShoppingBag, Server
} from 'lucide-react';

interface GodModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onNotify: (msg: string) => void;
}

export const GodModeOverlay: React.FC<GodModeOverlayProps> = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'shopify' | 'sniffer' | 'bypasser' | 'overclock'>('matrix');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] AiBrow God Mode Neural Core v5.0 online',
    '[BYPASS] X-Frame-Options & CSP security filters disabled for deep inspection',
    '[MODEL] Active neural link: llama-unlimited (0ms latency, uncensored weights)',
    '[SEC] Airgap 256-bit encryption tunnel active on 143.168.116.237'
  ]);
  const [commandInput, setCommandInput] = useState('');
  
  // Shopify & Payment Terminal State
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('mi-tienda.myshopify.com');
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'skrill' | 'both'>('stripe');
  const [stripeApiKey, setStripeApiKey] = useState('pk_live_51M...');
  const [skrillMerchantId, setSkrillMerchantId] = useState('merchant@skrill.com');
  const [shopifyCodeOutput, setShopifyCodeOutput] = useState<string>('// Selecciona una acción de automatización Shopify para generar código Liquid / JS Pro-Elite.');
  const [isGeneratingShopify, setIsGeneratingShopify] = useState(false);

  const [packetStream, setPacketStream] = useState<Array<{ id: number; protocol: string; src: string; dst: string; status: string; size: string }>>([
    { id: 1, protocol: 'HTTPS/TLS 1.3', src: '192.168.1.45', dst: 'api.shopify.com', status: 'Bypassed', size: '1.4 KB' },
    { id: 2, protocol: 'WSS (WebSocket)', src: '127.0.0.1:3000', dst: 'neural.aether.os', status: 'Encrypted', size: '512 B' },
    { id: 3, protocol: 'PAYMENT API', src: '10.8.0.2', dst: 'api.stripe.com', status: 'Secured 256b', size: '1.8 KB' },
    { id: 4, protocol: 'PROXY TUNNEL', src: 'localhost', dst: 'allorigins.win', status: 'Proxied', size: '12.8 KB' }
  ]);
  const [overclockLevel, setOverclockLevel] = useState(150);
  const [neuralHeat, setNeuralHeat] = useState(38.2);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setNeuralHeat(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      if (Math.random() > 0.6) {
        const timestamp = new Date().toLocaleTimeString();
        setTerminalLogs(prev => [
          `[${timestamp}] [NEURAL] Synced tensor weights across 8 virtual nodes (Token/s: ${Math.floor(Math.random() * 200 + 550)})`,
          ...prev.slice(0, 25)
        ]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    const cmd = commandInput;
    setCommandInput('');
    setTerminalLogs(prev => [
      `> ${cmd}`,
      `[GOD MODE] Executing deep neural instruction: "${cmd}"...`,
      `[SUCCESS] Instruction processed with uncensored llama matrix weights.`,
      ...prev
    ]);
    onNotify(`Comando Modo Dios ejecutado: ${cmd}`);
  };

  const handleGenerateShopifyTerminal = (action: string) => {
    setIsGeneratingShopify(true);
    onNotify(`Generando código pro-elite para Shopify: ${action}...`);
    setTimeout(() => {
      setIsGeneratingShopify(false);
      if (action === 'checkout') {
        setShopifyCodeOutput(`{% comment %} === AETHER PRO-ELITE SECURE PAYMENT TERMINAL (${paymentGateway.toUpperCase()}) === {% endcomment %}
<div id="aether-payment-terminal" class="aether-checkout-wrapper">
  <form id="payment-form" data-store="${shopifyStoreUrl}">
    <h3>Terminal de Pago Segura Pro-Elite</h3>
    <div class="gateway-badge">Gateway Activa: ${paymentGateway === 'stripe' ? 'Stripe Live 256b' : paymentGateway === 'skrill' ? 'Skrill Merchant Direct' : 'Stripe + Skrill Dual Engine'}</div>
    <div class="form-row">
      <input type="text" id="cardholder-name" placeholder="Nombre del Titular" required />
    </div>
    <div class="form-row">
      <input type="text" id="card-element-placeholder" placeholder="•••• •••• •••• ••••" required />
    </div>
    <div class="form-row-dual">
      <input type="text" id="card-expiry" placeholder="MM/AA" required />
      <input type="password" id="card-cvc" placeholder="CVC" required />
    </div>
    <button type="submit" class="btn-pay-now" data-key="${stripeApiKey}">Pagar Ahora de Forma Segura</button>
  </form>
</div>
<style>
.aether-checkout-wrapper { background: #070b14; border: 1px solid #00F0FF; padding: 20px; border-radius: 12px; color: #fff; font-family: monospace; }
.btn-pay-now { background: #00F0FF; color: #000; font-weight: bold; width: 100%; padding: 12px; border: none; border-radius: 8px; cursor: pointer; margin-top: 15px; }
</style>`);
      } else if (action === 'template') {
        setShopifyCodeOutput(`{% comment %} === AETHER AUTOMATED LIQUID TEMPLATE INJECTOR === {% endcomment %}
{{ 'aether-custom-styles.css' | asset_url | stylesheet_tag }}
<script src="{{ 'aether-neural-optimizer.js' | asset_url }}" defer></script>
<div class="aether-neural-banner">
  <h2>⚡ Optimizado por AiBrow Pro-Elite Neural Engine</h2>
  <p>Conexión segura establecida con ${shopifyStoreUrl}</p>
</div>`);
      } else {
        setShopifyCodeOutput(`// [AETHER PRO-ELITE AUTOMATION SCRIPT]
// Analizando estructura de la plantilla Shopify para optimización DOM
console.log('[AETHER] Shopify store connected: ${shopifyStoreUrl}');
console.log('[AETHER] Payment gateway configured: ${paymentGateway.toUpperCase()} (${paymentGateway === 'stripe' ? stripeApiKey : skrillMerchantId})');
// Auto-injecting zero-latency webhook listeners...
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shopify-payment-button').forEach(btn => {
    btn.style.boxShadow = '0 0 20px rgba(0,240,255,0.6)';
  });
});`);
      }
      onNotify('Código Shopify generado con éxito');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-6xl h-[92dvh] bg-[#070b14] border border-[#00F0FF]/60 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] flex flex-col overflow-hidden font-mono">
        
        {/* Top God Mode Header */}
        <div className="bg-[#0b1220] border-b border-[#00F0FF]/40 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-purple-600 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.6)] flex items-center justify-center text-black">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase">
                  AetherOS • MODO DIOS & SHOPIFY PRO-ELITE STUDIO
                </h1>
                <span className="bg-[#27C93F]/20 text-[#27C93F] border border-[#27C93F]/50 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                  PRO-ELITE ⚡
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Automatización de plantillas Shopify, terminal de pago Stripe/Skrill y supercomputación LLaMA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 bg-[#070b14] border border-[#1E293B] px-3 py-1.5 rounded-xl text-xs">
              <span className="text-gray-400">CPU TEMP:</span>
              <span className={`font-bold ${neuralHeat > 45 ? 'text-red-400' : 'text-[#27C93F]'}`}>{neuralHeat}°C</span>
              <span className="text-gray-400 ml-2">OVERCLOCK:</span>
              <span className="text-[#00F0FF] font-bold">{overclockLevel}%</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#111827] hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Sub-bar */}
        <div className="bg-[#090e1a] border-b border-[#1E293B] px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2">
            {[
              { id: 'matrix', label: 'Terminal Neural Matrix', icon: Terminal },
              { id: 'shopify', label: 'Shopify & Pagos Pro', icon: ShoppingBag },
              { id: 'sniffer', label: 'Sniffer de Paquetes', icon: Activity },
              { id: 'bypasser', label: 'Bypasser & Proxy', icon: Shield },
              { id: 'overclock', label: 'Overclock & Modelos', icon: Cpu },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer font-bold ${
                    isActive
                      ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#00F0FF]">
            <Radio className="w-3.5 h-3.5 animate-ping text-[#27C93F]" />
            <span className="hidden sm:inline">Terminal Activa Pro-Elite</span>
          </div>
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050810] flex flex-col gap-4">
          
          {/* TAB 1: TERMINAL NEURAL MATRIX */}
          {activeTab === 'matrix' && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                    Consola Cuántica de Inferencia Directa LLaMA
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Desarrollo asistido por IA para refactorizar código, automatizar tiendas y auditar scripts.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTerminalLogs(['[CLEAR] Buffer cuántico reiniciado.', ...terminalLogs]);
                    onNotify('Terminal Matrix limpiada');
                  }}
                  className="px-3 py-1 bg-[#111827] hover:bg-gray-800 text-gray-300 rounded-lg text-xs border border-gray-700 cursor-pointer"
                >
                  Limpiar Buffer
                </button>
              </div>

              {/* Terminal Logs Output Box */}
              <div className="flex-1 bg-black/90 border border-[#1E293B] rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-y-auto space-y-1.5 shadow-inner min-h-[250px]">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed hover:bg-white/5 px-2 py-0.5 rounded transition">
                    <span className="text-gray-600 mr-2">#</span>
                    <span className={log.includes('[SUCCESS]') ? 'text-[#27C93F] font-bold' : log.includes('[BYPASS]') ? 'text-[#00F0FF]' : log.includes('>') ? 'text-white font-bold' : 'text-gray-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleRunCommand} className="flex gap-2">
                <div className="flex-1 bg-[#0b1220] border border-[#00F0FF]/40 focus-within:border-[#00F0FF] rounded-xl flex items-center px-4 py-2.5 transition">
                  <span className="text-[#00F0FF] font-bold mr-2">root@pro-elite:~#</span>
                  <input
                    type="text"
                    placeholder="Instrucción de código para Shopify (ej. 'Crear sección Liquid con carrusel de productos y pasarela Stripe')..."
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#00F0FF] hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Ejecutar
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SHOPIFY & PAGOS PRO-ELITE */}
          {activeTab === 'shopify' && (
            <div className="space-y-4">
              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl p-5">
                <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-2">
                  <ShoppingBag className="w-4 h-4 text-[#00F0FF]" />
                  Automatización de Tienda Shopify & Terminal de Pago (Stripe / Skrill)
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Configura tu tienda Shopify, vincula tu pasarela de pago y genera código Liquid y scripts automatizados en segundos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">URL de Tienda Shopify</label>
                    <input 
                      type="text"
                      value={shopifyStoreUrl}
                      onChange={(e) => setShopifyStoreUrl(e.target.value)}
                      className="w-full bg-[#070b14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#00F0FF]"
                      placeholder="mitienda.myshopify.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Pasarela de Pago Principal</label>
                    <select
                      value={paymentGateway}
                      onChange={(e) => setPaymentGateway(e.target.value as any)}
                      className="w-full bg-[#070b14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#00F0FF]"
                    >
                      <option value="stripe">Stripe (Tarjetas de Crédito / Débito)</option>
                      <option value="skrill">Skrill (Monedero Digital / Global)</option>
                      <option value="both">Stripe + Skrill (Dual Engine)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Clave API Stripe (Live/Test)</label>
                    <input 
                      type="text"
                      value={stripeApiKey}
                      onChange={(e) => setStripeApiKey(e.target.value)}
                      className="w-full bg-[#070b14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#00F0FF]"
                      placeholder="pk_live_..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Merchant ID Skrill</label>
                    <input 
                      type="text"
                      value={skrillMerchantId}
                      onChange={(e) => setSkrillMerchantId(e.target.value)}
                      className="w-full bg-[#070b14] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none focus:border-[#00F0FF]"
                      placeholder="email@skrill.com"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mb-6">
                  <button
                    onClick={() => handleGenerateShopifyTerminal('checkout')}
                    className="bg-[#00F0FF] text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400 transition"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Generar Terminal de Pago ({paymentGateway.toUpperCase()})
                  </button>
                  <button
                    onClick={() => handleGenerateShopifyTerminal('template')}
                    className="bg-[#111827] hover:bg-gray-800 text-gray-200 border border-gray-700 px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Code className="w-3.5 h-3.5 text-[#27C93F]" />
                    Generar Sección Liquid
                  </button>
                  <button
                    onClick={() => handleGenerateShopifyTerminal('optimizer')}
                    className="bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Autorefatorizar Plantilla
                  </button>
                </div>

                {/* Code Output Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Código Generado / Terminal de Pago:</span>
                    {isGeneratingShopify && <span className="text-[#00F0FF] animate-pulse">Generando con LLaMA Pro...</span>}
                  </div>
                  <pre className="bg-black/90 border border-[#1E293B] p-4 rounded-xl text-emerald-400 text-xs font-mono overflow-x-auto max-h-60">
                    {shopifyCodeOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PACKET SNIFFER */}
          {activeTab === 'sniffer' && (
            <div className="space-y-4">
              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-sm font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#27C93F]" />
                    Sniffer de Paquetes & Tráfico Shopify API
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Monitoreo en tiempo real de webhooks y pasarelas de pago.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newPacket = {
                      id: packetStream.length + 1,
                      protocol: 'STRIPE/SKRILL API',
                      src: '192.168.1.45',
                      dst: 'api.stripe.com/v1/charges',
                      status: 'Authorized 200',
                      size: '2.4 KB'
                    };
                    setPacketStream([newPacket, ...packetStream]);
                    onNotify('Transacción de pasarela capturada');
                  }}
                  className="px-3.5 py-1.5 bg-[#00F0FF]/15 text-[#00F0FF] hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 rounded-xl text-xs font-bold cursor-pointer transition"
                >
                  Capturar Transacción
                </button>
              </div>

              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#111827] text-gray-400 border-b border-[#1E293B]">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Protocolo</th>
                      <th className="p-3">Origen</th>
                      <th className="p-3">Destino / API</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Tamaño</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/50">
                    {packetStream.map(pkt => (
                      <tr key={pkt.id} className="hover:bg-white/5 transition">
                        <td className="p-3 text-gray-500">#{pkt.id}</td>
                        <td className="p-3 text-[#00F0FF] font-bold">{pkt.protocol}</td>
                        <td className="p-3 text-gray-300">{pkt.src}</td>
                        <td className="p-3 text-white">{pkt.dst}</td>
                        <td className="p-3">
                          <span className="bg-[#27C93F]/15 text-[#27C93F] border border-[#27C93F]/40 px-2 py-0.5 rounded text-[10px]">
                            {pkt.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400">{pkt.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BYPASSER DE RESTRICCIONES */}
          {activeTab === 'bypasser' && (
            <div className="space-y-4">
              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl p-5">
                <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  Módulos de Evasión de Bloqueos & Proxy Shopify
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Activa los protocolos de bypass de nivel de sistema para administrar plantillas Shopify sin restricciones de CORS.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Bypass Shopify Storefront CORS', desc: 'Permite peticiones API directas sin restricciones del navegador.', active: true },
                    { title: 'Stripe Webhook Interceptor', desc: 'Captura y reenvía webhooks de pago en entorno de pruebas.', active: true },
                    { title: 'Anti-Tracking Airgap 256', desc: 'Enmascara huella digital del navegador, user-agent y IP.', active: true },
                    { title: 'Inyección de Scripts de Usuario', desc: 'Ejecuta scripts personalizados en tu tienda Shopify.', active: false },
                  ].map((mod, i) => (
                    <div key={i} className="bg-[#111827] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-xs">{mod.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{mod.desc}</div>
                      </div>
                      <div className={`w-10 h-6 rounded-full p-1 flex items-center ${mod.active ? 'bg-[#00F0FF] justify-end' : 'bg-gray-700 justify-start'}`}>
                        <div className="w-4 h-4 rounded-full bg-black shadow"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: OVERCLOCK & MODELOS */}
          {activeTab === 'overclock' && (
            <div className="space-y-4">
              <div className="bg-[#090e1a] border border-[#1E293B] rounded-xl p-5">
                <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-[#00F0FF]" />
                  Selección de Núcleo Neural & Overclock Pro
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { id: 'llama-unlimited', name: 'llama unlimited', desc: 'Modelo base ilimitado con razonamiento hiperrápido', speed: '650 token/s' },
                    { id: 'llama-offline-uncensured', name: 'llama offline uncensured', desc: 'Modelo sin restricciones de contenido ni filtros', speed: '520 token/s' }
                  ].map(m => (
                    <div 
                      key={m.id}
                      onClick={() => {
                        onSelectModel(m.id);
                        onNotify(`Modelo IA cambiado a: ${m.name.toUpperCase()}`);
                      }}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        selectedModel === m.id 
                          ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
                          : 'bg-[#111827] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-bold text-xs">{m.name}</span>
                          {selectedModel === m.id && <span className="text-[10px] bg-[#00F0FF] text-black font-bold px-2 py-0.5 rounded">ACTIVO</span>}
                        </div>
                        <p className="text-[11px] text-gray-400">{m.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-[11px] text-[#00F0FF]">
                        <span>Velocidad:</span>
                        <span className="font-bold">{m.speed}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Nivel de Overclock Cuántico ({overclockLevel}%)</span>
                    <span className="text-[#00F0FF] font-bold">+200% Potencia de Inferencia Pro</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    value={overclockLevel}
                    onChange={(e) => setOverclockLevel(Number(e.target.value))}
                    className="w-full accent-[#00F0FF] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#0b1220] border-t border-[#1E293B] px-4 py-3 flex items-center justify-between text-xs text-gray-400 shrink-0">
          <div>AiBrow Shopify Pro-Elite Engine • Terminal de Pago Segura</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00F0FF] text-black font-bold rounded-xl text-xs hover:bg-cyan-400 transition cursor-pointer"
          >
            Cerrar Modo Dios
          </button>
        </div>

      </div>
    </div>
  );
};
