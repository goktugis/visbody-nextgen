import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Coins, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function ClinicRoiCalculator({ onOpenLeadForm }) {
  const [clientCount, setClientCount] = useState(120);
  const [pricePerScan, setPricePerScan] = useState(750);
  const [upsellRate, setUpsellRate] = useState(30);

  // Math Calculations
  const directScanRevenue = clientCount * pricePerScan;
  const packageUpsellRevenue = clientCount * (upsellRate / 100) * 2200; // Average premium PT/diet package
  const totalMonthlyRevenue = directScanRevenue + packageUpsellRevenue;
  const annualRevenue = totalMonthlyRevenue * 12;

  // Approx device investment payback (Assuming S30 tier ~350,000 TL amortized)
  const paybackMonths = Math.max(1.2, (380000 / totalMonthlyRevenue)).toFixed(1);

  return (
    <section id="roi-section" className="w-full py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" /> KLİNİK & STÜDYO YATIRIM GETİRİSİ (ROI)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cihazınız Kaç Ayda Kendini Öder?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Visbody, sadece bir ölçüm cihazı değil; üyelerinizin bağlılığını artıran ve kliniğinize yüksek karlı yeni gelir modelleri ekleyen bir prestij yatırımıdır.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="rounded-3xl glass-panel-glow p-6 sm:p-10 border border-emerald-500/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Input Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 border-b border-white/5 pb-2">
                <Building2 className="w-4 h-4" /> KLİNİK PARAMETRELERİNİZİ SEÇİN
              </div>

              {/* Slider 1: Monthly Scan Clients */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Aylık Aktif Üye / Danışan Taraması</span>
                  <span className="font-mono text-emerald-300 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                    {clientCount} Kişi / Ay
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="5"
                  value={clientCount}
                  onChange={(e) => setClientCount(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>20 (Butik Stüdyo)</span>
                  <span>150 (Orta Ölçekli Diyetisyen)</span>
                  <span>400 (Büyük Spor Kulübü)</span>
                </div>
              </div>

              {/* Slider 2: Price Per 3D Scan */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">3D Tarama + Biyomekanik Rapor Seans Ücreti</span>
                  <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                    {pricePerScan.toLocaleString('tr-TR')} TL
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="50"
                  value={pricePerScan}
                  onChange={(e) => setPricePerScan(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>400 TL (Giriş Seviye)</span>
                  <span>850 TL (Piyasa Ortalaması)</span>
                  <span>2.000 TL (VIP Klinik)</span>
                </div>
              </div>

              {/* Slider 3: Package Upsell Conversion */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">3D Rapor Sonrası Premium Paket/Üyelik Satış Oranı</span>
                  <span className="font-mono text-purple-300 font-bold bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800">
                    %{upsellRate} Dönüşüm
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={upsellRate}
                  onChange={(e) => setUpsellRate(Number(e.target.value))}
                  className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>%10 (Düşük)</span>
                  <span>%30 (Visbody Ortalama Başarısı)</span>
                  <span>%60 (Yüksek İkna)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Visbody 3D raporları alan üyelerin %84'ü vücut asimetrilerini gördükten sonra kişisel antrenman veya klinik diyet programlarına kaydolmaktadır.
                </span>
              </div>
            </div>

            {/* Right: Projected Revenue Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-teal-950/40 border border-emerald-500/30 backdrop-blur-md space-y-4 shadow-xl">
                
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    ÖNGÖRÜLEN AYLIK EKSTRA GELİR
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                    {Math.round(totalMonthlyRevenue).toLocaleString('tr-TR')} TL <span className="text-sm font-normal text-slate-400">/ ay</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-400">Yıllık Ciro Katkısı:</div>
                    <div className="font-mono font-bold text-white mt-0.5">
                      {Math.round(annualRevenue).toLocaleString('tr-TR')} TL
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Amortisman Süresi:</div>
                    <div className="font-mono font-bold text-cyan-300 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Sadece {paybackMonths} Ay
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Doğrudan Tarama Geliri:</span>
                    <span className="font-mono font-semibold">{directScanRevenue.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ek Paket Dönüşüm Geliri:</span>
                    <span className="font-mono font-semibold text-emerald-300">{Math.round(packageUpsellRevenue).toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    if (onOpenLeadForm) onOpenLeadForm('roi');
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
                >
                  <span>Kliniğinize Özel Vadeli Teklif Alın</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
