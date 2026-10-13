import React, { useState } from 'react';
import { 
  GitCompare, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

export default function BeforeAfterMorph() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="w-full py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <GitCompare className="w-3.5 h-3.5" /> 4D DİJİTAL İKİZ DÖNÜŞÜM MODÜLÜ
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            2D Fotoğraflara Aldanmayın. Gerçek Hacmi Görün.
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Geleneksel tartılar ve ayna fotoğrafları su kaybını kas kaybı sanabilir. Visbody 3D örtüşme algoritması, bedendeki milimetrik hacimsel değişimleri ısı haritasıyla kanıtlar.
          </p>
        </div>

        {/* Morph Interactive Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Split Comparison View */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 aspect-[4/3] select-none">
              
              {/* "After" Image / Layer (Week 12 Optimized) */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0c1829] via-[#09111c] to-[#05090f]">
                <div className="relative text-center p-6 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono">
                    12. HAFTA — VİSBODY 3D OPTİK TARAMA
                  </div>
                  <div className="w-48 h-64 mx-auto rounded-xl border border-emerald-500/40 bg-emerald-950/20 flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <div className="w-12 h-14 rounded-full bg-emerald-500/30 border border-emerald-400 mb-2" />
                    <div className="w-24 h-28 rounded-lg bg-emerald-500/20 border border-emerald-400/80 mb-2 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-300 bg-black/80 px-1 rounded">
                        Bel: 76.2 cm (-7.4cm)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-20 rounded bg-emerald-500/30 border border-emerald-400" />
                      <div className="w-8 h-20 rounded bg-emerald-500/30 border border-emerald-400" />
                    </div>
                    <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400">
                      %16.4 Yağ
                    </div>
                  </div>
                  <div className="text-xs text-emerald-300 font-mono">
                    Hacimsel Yağ Kaybı: -4.180 cm³ | Kas Hipertrofisi: +2.1 kg
                  </div>
                </div>
              </div>

              {/* "Before" Layer (Week 0 Baseline) Clipped by Slider */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a0e1c] via-[#120a14] to-[#0a050b] overflow-hidden border-r-2 border-cyan-400 shadow-2xl"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="w-full h-full flex items-center justify-center p-6 text-center space-y-4">
                  <div className="space-y-4 min-w-[280px]">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono">
                      BAŞLANGIÇ — 0. GÜN TARAMASI
                    </div>
                    <div className="w-48 h-64 mx-auto rounded-xl border border-amber-500/40 bg-amber-950/20 flex flex-col items-center justify-center relative">
                      <div className="w-12 h-14 rounded-full bg-amber-500/30 border border-amber-400 mb-2" />
                      <div className="w-28 h-28 rounded-lg bg-amber-500/20 border border-amber-400 mb-2 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-300 bg-black/80 px-1 rounded">
                          Bel: 83.6 cm
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-9 h-20 rounded bg-amber-500/30 border border-amber-400" />
                        <div className="w-9 h-20 rounded bg-amber-500/30 border border-amber-400" />
                      </div>
                      <div className="absolute top-2 right-2 text-[10px] font-mono text-amber-400">
                        %24.8 Yağ
                      </div>
                    </div>
                    <div className="text-xs text-amber-300 font-mono">
                      Postür Sapması: 18° Boyun Eğimi
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Range Input Overlay */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />

              {/* Slider Thumb Handle */}
              <div 
                className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center"
                style={{ left: `calc(${sliderPos}% - 16px)` }}
              >
                <div className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg shadow-cyan-400/50 border-2 border-white">
                  ⟷
                </div>
              </div>

              <div className="absolute bottom-3 left-3 z-10 pointer-events-none text-[10px] text-slate-400 font-mono bg-black/70 px-2 py-1 rounded">
                Sürükleyerek Önce/Sonra Karşılaştırın
              </div>
            </div>

            {/* Right: Concrete Biomarker Comparison Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  12 HAFTALIK DÖNÜŞÜM VERİSİ
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Klinik Doğrulanmış Biyometrik Fark
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Diyetisyen ve Pilates koçu eşliğinde takip edilen vaka raporu verileri:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-semibold">Bel Çevresi Daralması</div>
                      <div className="text-[11px] text-slate-400">83.6 cm ➔ 76.2 cm</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-emerald-400">-7.4 cm</div>
                    <div className="text-[10px] text-slate-400">Hacimsel İnceltme</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-semibold">Vücut Yağ Yüzdesi</div>
                      <div className="text-[11px] text-slate-400">%24.8 ➔ %16.4</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-emerald-400">-%8.4</div>
                    <div className="text-[10px] text-slate-400">Saf Yağ Kütlesi</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-semibold">İskelet Kas Kütlesi (SMM)</div>
                      <div className="text-[11px] text-slate-400">31.2 kg ➔ 33.3 kg</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-cyan-400">+2.1 kg</div>
                    <div className="text-[10px] text-slate-400">Metabolik Artış</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-semibold">İleri Baş Duruşu Açısı</div>
                      <div className="text-[11px] text-slate-400">18.5° ➔ 6.2° (Nötr Aks)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-purple-400">-12.3° Düzeltme</div>
                    <div className="text-[10px] text-slate-400">Omurga Rahatlaması</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Danışanlar kendi 3D ikizlerindeki bu değişimi gördüğünde seans bağlılığı %89 artmaktadır.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
