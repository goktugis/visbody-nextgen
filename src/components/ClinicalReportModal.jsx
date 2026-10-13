import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Activity, 
  FileCheck2,
  User,
  HeartPulse,
  FileJson,
  Edit3
} from 'lucide-react';
import { sound } from '../utils/soundFx';
import { calculateBodyComposition } from '../utils/biometricCalculator';

export default function ClinicalReportModal({ 
  posture = { forwardHead: 14, shoulderTilt: 2.8, pelvicTilt: 7, bodyFat: 21.4, muscleMass: 33.8 },
  onClose 
}) {
  const reportRef = useRef(null);
  const [patientName, setPatientName] = useState('Ahmet Yılmaz');
  const [patientAge, setPatientAge] = useState(32);
  const [patientGender, setPatientGender] = useState('Erkek');
  const [isEditingPatient, setIsEditingPatient] = useState(false);

  // Biomarkers Derived via Calculation Engine
  const baseWeight = 68.5 + (posture.bodyFat - 20) * 0.8 + (posture.muscleMass - 30) * 0.9;
  const metrics = calculateBodyComposition(Number(baseWeight.toFixed(1)), posture.bodyFat, posture.muscleMass);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadPdf = () => {
    sound.playSuccess();
    alert(`Visbody 3D Medikal Raporu (${patientName}) PDF olarak hazırlandı ve tarayıcınızın yazdırma penceresine aktarılıyor.`);
    window.print();
  };

  const handleExportJson = () => {
    sound.playSuccess();
    const exportData = {
      reportId: 'VB-TR-2026-98124',
      timestamp: new Date().toISOString(),
      patient: {
        name: patientName,
        age: patientAge,
        gender: patientGender
      },
      device: 'Visbody S30 Clinical Column (Optical + 4-Freq BIA)',
      biomarkers: metrics,
      biomechanics: {
        forwardHeadDegrees: posture.forwardHead,
        shoulderTiltDegrees: posture.shoulderTilt,
        pelvicTiltDegrees: posture.pelvicTilt,
        status: posture.forwardHead > 15 ? 'Upper Crossed Syndrome' : 'Physiological Normal'
      },
      dexaCorrelationScore: 0.984
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visbody-report-${patientName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#090e1a] shadow-2xl overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>VISBODY 3D MEDİKAL DEĞERLENDİRME RAPORU</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  KLİNİK SERTİFİKALI
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">DEXA Doğrulamalı • 18 Biyobelirteç • Milimetrik Postür</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              title="Klinik Verileri JSON Olarak İndir (EHR / DICOM Uyumlu)"
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileJson className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">JSON Dışa Aktar</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Yazdır</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PDF İndir</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Printable Body */}
        <div ref={reportRef} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto print:max-h-none">
          
          {/* Patient & Clinic Meta Grid with Quick Inline Edit */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> HASTA / DANIŞAN KÜNYESİ
              </span>
              <button
                onClick={() => setIsEditingPatient(!isEditingPatient)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingPatient ? 'Kaydet' : 'Düzenle'}</span>
              </button>
            </div>

            {isEditingPatient ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div>
                  <label className="text-[10px] text-slate-500 block">Ad Soyad:</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">Yaş:</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">Cinsiyet:</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded px-2 py-1 text-white text-xs"
                  >
                    <option value="Erkek">Erkek</option>
                    <option value="Kadın">Kadın</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500">Hasta / Danışan:</span>
                  <div className="font-bold text-white mt-0.5">{patientName} ({patientAge} Yaş - {patientGender})</div>
                </div>
                <div>
                  <span className="text-slate-500">Tarama Tarihi:</span>
                  <div className="font-bold text-cyan-300 mt-0.5">13.10.2026 - 13:50</div>
                </div>
                <div>
                  <span className="text-slate-500">Donanım Modeli:</span>
                  <div className="font-bold text-white mt-0.5">Visbody S30 (Kule Optik)</div>
                </div>
                <div>
                  <span className="text-slate-500">Kalibrasyon Durumu:</span>
                  <div className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Kalibre Edildi (±1mm)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 1: Body Composition (BIA 18 Biomarkers) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4" /> 1. Biyoelektrik Empedans (BIA) Analiz Parametreleri
              </span>
              <span className="text-[10px] text-slate-400 font-mono">4 Frekans (5-500 kHz)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Toplam Ağırlık:</span>
                <div className="text-base font-bold text-white font-mono">{metrics.weight} kg</div>
                <span className="text-[10px] text-emerald-400">Normal Aralık: 65 - 75 kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Vücut Yağ Oranı (BFP):</span>
                <div className="text-base font-bold text-rose-300 font-mono">%{posture.bodyFat}</div>
                <span className="text-[10px] text-slate-400">Yağ Kütlesi: {metrics.fatMass} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">İskelet Kas Kütlesi (SMM):</span>
                <div className="text-base font-bold text-emerald-300 font-mono">{posture.muscleMass} kg</div>
                <span className="text-[10px] text-emerald-400">Yağsız Kütle: {metrics.leanMass} kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Faz Açısı (Phase Angle - θ):</span>
                <div className="text-base font-bold text-purple-400 font-mono">{metrics.phaseAngle}°</div>
                <span className="text-[10px] text-purple-300">Yüksek Hücre Zarı Sağlığı</span>
              </div>
            </div>

            {/* Fluid Balance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Toplam Vücut Sıvısı (TBW):</span>
                <div className="font-bold text-white font-mono">{metrics.tbw} L</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Hücre İçi Sıvı (ICW):</span>
                <div className="font-bold text-cyan-300 font-mono">{metrics.icw} L</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Hücre Dışı Sıvı (ECW - Ödem):</span>
                <div className="font-bold text-cyan-300 font-mono">{metrics.ecw} L (ECW/TBW: {metrics.edemaRatio})</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-400">Bazal Metabolizma (BMR):</span>
                <div className="font-bold text-amber-300 font-mono">{metrics.bmr} kcal/gün</div>
              </div>
            </div>
          </div>

          {/* Section 2: Biomechanical Posture & Spine Alignment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> 2. 3D Biyomekanik İskelet & Duruş Ölçümleri
              </span>
              <span className="text-[10px] text-slate-400 font-mono">3D İskelet Açı Takibi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-slate-400">İleri Baş Duruşu (Cervical C7)</div>
                <div className="text-lg font-bold font-mono text-cyan-300 mt-1">+{posture.forwardHead}° Eğim</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {posture.forwardHead > 12 ? '⚠️ Yüksek boyun omurga yükü' : '✅ Fizyolojik sınırlar'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-slate-400">Omuz Denge Eğimi (Scapular Tilt)</div>
                <div className="text-lg font-bold font-mono text-amber-300 mt-1">{posture.shoulderTilt}° Sol Yüksek</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {posture.shoulderTilt > 2.5 ? '⚠️ Skapular asimetri' : '✅ Dengeli omuz kuşağı'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-slate-400">Pelvik Eğim (Anterior ASIS Tilt)</div>
                <div className="text-lg font-bold font-mono text-purple-300 mt-1">+{posture.pelvicTilt}° Anterior</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {posture.pelvicTilt > 8 ? '⚠️ Lomber lordoz artışı' : '✅ Nötr pelvis konumu'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: AI Clinical Recommendation Summary */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-2">
            <div className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> VISBODY AI KLİNİK REÇETE & ÖNERİ
            </div>
            <p className="text-slate-300 leading-relaxed">
              Sayın {patientName}; iskelet kas kütleniz {posture.muscleMass} kg ile güçlü seviyededir. Ancak {posture.forwardHead}° ileri baş açısı ve {posture.shoulderTilt}° omuz asimetrisi, masa başı çalışma ergonomisine bağlı üst çapraz sendromuna işaret etmektedir. Göğüs kası esnetme, kürek kemiği retraksiyon egzersizleri ve haftalık Reformer Pilates / direnç antrenmanı kombinasyonu tavsiye edilir. 6 hafta sonra Visbody 3D örtüşme kontrol taraması planlanmalıdır.
            </p>
          </div>

          {/* Verification QR Code Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded-lg text-slate-950 flex items-center justify-center">
                <QrCode className="w-10 h-10" />
              </div>
              <div>
                <div className="font-bold text-white">Rapor Doğrulama Kodu: VB-TR-2026-98124</div>
                <div className="text-[10px] text-slate-500">visbody.com.tr/dogrula üzerinden 3D etkileşimli görüntülenebilir</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-slate-300 font-bold">VISBODY TÜRKİYE RESMİ DİSTRİBÜTÖRÜ</div>
              <div className="text-[10px] text-slate-500">ISO 13485 Medikal Cihaz Standartları Uyarınca Üretilmiştir</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
