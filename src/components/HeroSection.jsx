import React from 'react';
import { 
  Scan, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Layers, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function HeroSection({ 
  onExploreScan, 
  onOpenReport, 
  onOpenQuote 
}) {
  return (
    <section className="relative w-full pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>YENİ NESİL 3D BİYO-MEKANİK & BIA FÜZYON PLATFORMU</span>
        </div>

        {/* Main Dramatic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Bedeni Yalnızca Ölçmeyin.{' '}
          <span className="text-gradient-cyan block sm:inline">
            Görünür Kılın.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Dünyanın 1 Numaralı 3D Optik Tarama ve Biyoelektrik Empedans (BIA) Füzyon Teknolojisi. 
          <span className="text-white font-semibold"> 32 saniyede milimetrik postür analizi</span>, 18 klinik biyobelirteç ve interaktif dijital ikiz simülasyonu ile danışanlarınızın gerçek potansiyelini keşfedin.
        </p>

        {/* Call to Actions Group */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={() => {
              sound.playSuccess();
              if (onExploreScan) onExploreScan();
            }}
            className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/25 hover:scale-105"
          >
            <Scan className="w-5 h-5 text-slate-950" />
            <span>3D Dijital İkizi Keşfet</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (onOpenReport) onOpenReport();
            }}
            className="py-3.5 px-6 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm flex items-center gap-2 transition-all hover:bg-slate-800"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Örnek Klinik Raporu İncele</span>
          </button>
        </div>

        {/* 4 Telemetry Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8">
          <div className="p-4 rounded-2xl glass-panel border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">32 Saniye</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Tam Vücut 360° Tarama</div>
            <div className="text-[11px] text-slate-500 font-mono">Otomatik Döner Tabla</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">±1 mm</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Optik Derinlik Hassasiyeti</div>
            <div className="text-[11px] text-slate-500 font-mono">14 Bölgesel Çevre Ölçümü</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-purple-400">18+ Gösterge</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Biyobelirteç & BIA</div>
            <div className="text-[11px] text-slate-500 font-mono">Segmental Kas/Yağ & Faz Açısı</div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/5 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">r = 0.984</div>
            <div className="text-xs text-slate-300 font-medium mt-1">DEXA Doğruluk Skoru</div>
            <div className="text-[11px] text-slate-500 font-mono">Klinik Altın Standart</div>
          </div>
        </div>

      </div>
    </section>
  );
}
