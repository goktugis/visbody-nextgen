import React from 'react';
import { 
  Sliders, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  FileText, 
  Sparkles,
  Target,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function ClinicalSimulator({ 
  posture, 
  setPosture, 
  onGenerateReport 
}) {
  const presets = [
    {
      id: 'sedentary',
      title: 'Masa Başı Çalışan (Ergonomi Riski)',
      badge: 'Sedanter Profil',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      data: { forwardHead: 19, shoulderTilt: 3.5, pelvicTilt: 10, bodyFat: 26.2, muscleMass: 28.5 },
      desc: 'Cervical 19° forward carriage (Tech Neck), anterior pelvik tilt ve lomber lordoz kompresyon riski.'
    },
    {
      id: 'athlete',
      title: 'Pro Atlet & Sprinter',
      badge: 'Elit Performans',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
      data: { forwardHead: 4, shoulderTilt: 0.5, pelvicTilt: 2, bodyFat: 9.4, muscleMass: 43.8 },
      desc: 'Mükemmel biyomekanik aks hizası, yüksek faz açısı (8.4°) ve simetrik segmental kas kütlesi.'
    },
    {
      id: 'pilates',
      title: 'Reformer Pilates Danışanı',
      badge: 'Postür İyileşme',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
      data: { forwardHead: 7, shoulderTilt: 1.1, pelvicTilt: 4, bodyFat: 19.5, muscleMass: 33.2 },
      desc: 'Dengeli gövde stabilizasyonu, minimal skapular asimetri ve optimize edilmiş çekirdek (core) kuvveti.'
    },
    {
      id: 'rehab',
      title: 'Post-Op Ortopedi & Skolyoz Şüphesi',
      badge: 'Klinik Vaka',
      color: 'border-red-500/40 bg-red-500/10 text-red-300',
      data: { forwardHead: 16, shoulderTilt: 4.8, pelvicTilt: 12, bodyFat: 23.0, muscleMass: 29.0 },
      desc: 'Lateral omurga deviasyonu, sağ omuz belirgin yüksekliği (+4.8°) ve bilateral bacak yük dengesizliği.'
    }
  ];

  // Calculate dynamic Biomechanical Health Score (100 base)
  const penalty = (posture.forwardHead * 1.5) + (posture.shoulderTilt * 4) + (posture.pelvicTilt * 2.2) + (Math.abs(posture.bodyFat - 18) * 0.8);
  const healthScore = Math.max(42, Math.min(99, Math.round(100 - penalty)));

  // Segmental distribution
  const segmentalLean = {
    trunk: (posture.muscleMass * 0.48).toFixed(1),
    rArm: (posture.muscleMass * 0.08 + (posture.shoulderTilt > 2 ? 0.3 : 0)).toFixed(1),
    lArm: (posture.muscleMass * 0.08).toFixed(1),
    rLeg: (posture.muscleMass * 0.18 + (posture.pelvicTilt > 6 ? 0.4 : 0)).toFixed(1),
    lLeg: (posture.muscleMass * 0.18).toFixed(1)
  };

  const handlePresetSelect = (presetData) => {
    sound.playClick();
    setPosture(presetData);
  };

  return (
    <div className="w-full rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5" /> KLİNİK BİYOMEKANİK SİMÜLATÖRÜ
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Etkileşimli Beden Analizi Laboratuvarı
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Aşağıdaki klinik senaryoları seçin veya kaydırıcıları hareket ettirin. Visbody yapay zeka algoritmasının omurga açısını, kas/yağ oranını ve biyomekanik skoru nasıl canlı hesapladığını test edin.
          </p>
        </div>

        {/* Dynamic Score Ring */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
          <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="175.9"
                strokeDashoffset={175.9 - (175.9 * healthScore) / 100}
                className={`transition-all duration-700 ${healthScore > 85 ? 'text-emerald-400' : healthScore > 70 ? 'text-cyan-400' : healthScore > 55 ? 'text-amber-400' : 'text-red-400'}`}
                fill="transparent"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xl font-bold font-mono text-white">{healthScore}</span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono">BİYOMEKANİK SKOR</div>
            <div className={`text-sm font-bold ${healthScore > 85 ? 'text-emerald-400' : healthScore > 70 ? 'text-cyan-400' : healthScore > 55 ? 'text-amber-400' : 'text-red-400'}`}>
              {healthScore > 85 ? 'Optimum Duruş' : healthScore > 70 ? 'İyi / Dengeleme Önerilir' : healthScore > 55 ? 'Orta / Düzeltici Terapi' : 'Yüksek Asimetri Riski'}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">100 Üzerinden AI İndeksi</div>
          </div>
        </div>
      </div>

      {/* 4 Clinical Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {presets.map((p) => (
          <div
            key={p.id}
            onClick={() => handlePresetSelect(p.data)}
            className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${p.color}`}>
                {p.badge}
              </span>
              <UserCheck className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              {p.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {p.desc}
            </p>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Yağ: %{p.data.bodyFat}</span>
              <span>Kas: {p.data.muscleMass}kg</span>
              <span className="text-cyan-400 flex items-center gap-0.5">Yükle <ArrowRight className="w-3 h-3" /></span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Caliper Sliders & Segmental Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 5 Fine-Tuning Sliders */}
        <div className="lg:col-span-7 space-y-5 p-5 rounded-2xl bg-black/40 border border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" /> Milimetrik İskelet & Kompozisyon Ayarları
            </span>
            <span className="text-xs text-cyan-400 font-mono">Canlı 3D Senkronize</span>
          </div>

          {/* Slider 1: Forward Head */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">İleri Baş Duruşu Açısı (Cervical C7 Forward)</span>
              <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                +{posture.forwardHead}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              value={posture.forwardHead}
              onChange={(e) => setPosture({ ...posture, forwardHead: Number(e.target.value) })}
              className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0° (Kusursuz Aks)</span>
              <span>10° (Hafif Eğim)</span>
              <span>28° (İleri Derece Tech Neck)</span>
            </div>
          </div>

          {/* Slider 2: Shoulder Tilt */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Omuz Yükseklik Asimetrisi (High-Low Shoulder)</span>
              <span className="font-mono text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                {posture.shoulderTilt}° Eğim
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5.5"
              step="0.1"
              value={posture.shoulderTilt}
              onChange={(e) => setPosture({ ...posture, shoulderTilt: Number(e.target.value) })}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.0° (Dengeli)</span>
              <span>2.5° (Skapular Rotasyon)</span>
              <span>5.5° (Belirgin Skolyotik Duruş)</span>
            </div>
          </div>

          {/* Slider 3: Pelvic Tilt */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Pelvik Eğim (Anterior ASIS Eğim Açısı)</span>
              <span className="font-mono text-purple-300 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                +{posture.pelvicTilt}° Anterior
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={posture.pelvicTilt}
              onChange={(e) => setPosture({ ...posture, pelvicTilt: Number(e.target.value) })}
              className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0° (Nötr Pelvis)</span>
              <span>7° (Standart)</span>
              <span>15° (Aşırı Lordoz & Gluteal İnhibisyon)</span>
            </div>
          </div>

          {/* Slider 4: Body Fat % */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Vücut Yağ Oranı (BIA Empedans Ölçümü)</span>
              <span className="font-mono text-rose-300 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                %{posture.bodyFat}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="38"
              step="0.2"
              value={posture.bodyFat}
              onChange={(e) => setPosture({ ...posture, bodyFat: Number(e.target.value) })}
              className="w-full accent-rose-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>%6 (Yarışma Formu)</span>
              <span>%18 (Optimal Sağlık)</span>
              <span>%38 (Klinik Obezite)</span>
            </div>
          </div>

          {/* Slider 5: Skeletal Muscle Mass */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">İskelet Kas Kütlesi (SMM - kg)</span>
              <span className="font-mono text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                {posture.muscleMass} kg
              </span>
            </div>
            <input
              type="range"
              min="22"
              max="50"
              step="0.5"
              value={posture.muscleMass}
              onChange={(e) => setPosture({ ...posture, muscleMass: Number(e.target.value) })}
              className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>22 kg (Sarkopenik Risk)</span>
              <span>34 kg (Ortalama)</span>
              <span>50 kg (Hipertrofi / Sporcu)</span>
            </div>
          </div>
        </div>

        {/* Right: AI Prognosis & Segmental Lean Distribution */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Segmental Lean Analysis Box */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" /> Segmental Kas Kütlesi Dağılımı (BIA)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">DEXA Uyumlu</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Gövde (Trunk):</span>
                <span className="font-mono font-bold text-white">{segmentalLean.trunk} kg (%100 Normal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sağ Kol / Sol Kol:</span>
                <span className="font-mono font-bold text-cyan-300">{segmentalLean.rArm} kg / {segmentalLean.lArm} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sağ Uyluk / Sol Uyluk:</span>
                <span className="font-mono font-bold text-cyan-300">{segmentalLean.rLeg} kg / {segmentalLean.lLeg} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Faz Açısı (Phase Angle):</span>
                <span className="font-mono font-bold text-purple-400">{(6.2 + (posture.muscleMass - 30) * 0.08).toFixed(1)}° (Hücresel Sağlık)</span>
              </div>
            </div>
          </div>

          {/* AI Clinical Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20 backdrop-blur-md space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>VISBODY AI KLİNİK TAVSİYE & ÖNGÖRÜ</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              {posture.forwardHead > 15
                ? '⚠️ İleri servikal baş duruşu tespit edildi. Üst çapraz sendromu (Upper Crossed Syndrome) ve suboksipital kas spazmı riski yüksektir. Pektoralis germe ve derin boyun fleksörleri güçlendirme önerilir.'
                : posture.shoulderTilt > 3
                ? '⚠️ Belirgin omuz asimetrisi (+3° üzeri). Dominant kol aşırı kullanımı veya fonksiyonel skolyoz kompanzasyonu araştırılmalıdır.'
                : posture.bodyFat > 25
                ? 'ℹ️ Visseral yağ dokusu takip gerektirmektedir. Direnç antrenmanı ile segmental bacak kas kütlesi artırılarak bazal metabolizma hızı yükseltilmelidir.'
                : '✅ Biyomekanik aks dengesi mükemmel seviyede. Omurga yük dağılımı fizyolojik sınırlar dahilinde.'}
            </p>

            <button
              onClick={() => {
                sound.playSuccess();
                if (onGenerateReport) onGenerateReport();
              }}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Bu Simülasyon Verileriyle PDF/Klinik Rapor Hazırla</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
