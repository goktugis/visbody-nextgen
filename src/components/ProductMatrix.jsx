import React, { useState } from 'react';
import { 
  productsData, 
  comparisonMetrics 
} from '../data/productsData';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Cpu, 
  FileCheck2, 
  Layers
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function ProductMatrix({ onSelectProductForQuote }) {
  const [activeTab, setActiveTab] = useState('s30');
  const [showComparison, setShowComparison] = useState(false);

  const selectedProduct = productsData.find(p => p.id === activeTab) || productsData[0];

  return (
    <section id="hardware-section" className="w-full py-16 sm:py-24 relative">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" /> DÜNYA STANDARTLARINDA 3D TARAMA DONANIMI
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Geleceğin Beden Ölçüm Teknolojisi
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Patentli çift sensör füzyonu: Çoklu Intel RealSense optik derinlik kameraları ve geniş spektrumlu biyoelektrik empedans (BIA) analizi bir arada.
        </p>

        {/* Product Model Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {productsData.map((prod) => (
            <button
              key={prod.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(prod.id);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === prod.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              <span>{prod.name}</span>
              {prod.highlightBadge && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  activeTab === prod.id ? 'bg-slate-950/20 text-slate-900' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {prod.highlightBadge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Product Detailed Showcase Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-glow p-6 sm:p-10 border border-cyan-500/20 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Product Info & Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                  {selectedProduct.category}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> CE & FDA Medikal Onaylı
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-2">
                {selectedProduct.name}
              </h3>
              <p className="text-cyan-300 font-medium text-sm mt-1">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">Tarama Süresi</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedProduct.scanDuration}</div>
                <div className="text-[10px] text-cyan-400">360° Döner Tabla</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">BIA Frekansları</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedProduct.biaFrequencies}</div>
                <div className="text-[10px] text-emerald-400">Çoklu Spektrum</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">Biyobelirteç</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedProduct.metricsCount}+ Klinik Parametre</div>
                <div className="text-[10px] text-purple-400">Segmental Kas/Yağ</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">Çevre Ölçümü</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedProduct.circumferences}</div>
                <div className="text-[10px] text-cyan-400">±1 mm Hassasiyet</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">Ekran / Arayüz</div>
                <div className="text-sm font-bold text-white mt-0.5">{selectedProduct.screen}</div>
                <div className="text-[10px] text-slate-400">Dokunmatik HUD</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono">Taşıma Kapasitesi</div>
                <div className="text-sm font-bold text-white mt-0.5">200 - 250 kg</div>
                <div className="text-[10px] text-emerald-400">Döner Platform</div>
              </div>
            </div>

            {/* Core Features List */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Temel Teknolojik Avantajlar:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  sound.playSuccess();
                  if (onSelectProductForQuote) onSelectProductForQuote(selectedProduct);
                }}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
              >
                <span>{selectedProduct.name} İçin Fiyat & Demo Talep Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  sound.playClick();
                  setShowComparison(!showComparison);
                }}
                className="py-3 px-5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{showComparison ? 'Karşılaştırmayı Gizle' : 'Tüm Modelleri Karşılaştır'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hardware Visual & Applications */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 group">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-80 object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Önerilen Klinik & İşletme Alanları:
                </div>
                <div className="space-y-1 text-xs text-slate-200">
                  {selectedProduct.idealFor.map((sector, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Full Specification Comparison Table (Toggled) */}
      {showComparison && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-cyan-400" /> Visbody Modelleri vs Geleneksel Yöntemler
              </h3>
              <span className="text-xs font-mono text-cyan-400">Klinik Karşılaştırma Matrisi</span>
            </div>

            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono">
                  <th className="py-3 px-4">Kriter / Özellik</th>
                  <th className="py-3 px-4 text-cyan-300">Visbody S30</th>
                  <th className="py-3 px-4 text-cyan-300">Visbody M30 (Mirror)</th>
                  <th className="py-3 px-4 text-cyan-300">Visbody R-Explorer</th>
                  <th className="py-3 px-4 text-slate-500">Geleneksel Baskül / 2D Foto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {comparisonMetrics.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{row.feature}</td>
                    <td className="py-3 px-4 text-cyan-200">{row.s30}</td>
                    <td className="py-3 px-4 text-cyan-200">{row.m30}</td>
                    <td className="py-3 px-4 text-cyan-200 font-medium">{row.rExplorer}</td>
                    <td className="py-3 px-4 text-slate-500">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
}
