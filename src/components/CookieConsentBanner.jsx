import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('visbody_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    sound.playClick();
    localStorage.setItem('visbody_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    sound.playClick();
    localStorage.setItem('visbody_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-xl p-4 rounded-2xl glass-panel-glow border border-cyan-500/30 bg-[#090e1a]/95 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-slate-300 leading-relaxed text-[11px]">
          🍪 <span className="font-semibold text-white">KVKK & Çerez Bildirimi:</span> Deneyiminizi optimize etmek, 3D simülasyonları kişiselleştirmek ve analitik veriler için çerezler kullanıyoruz.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
        <button
          onClick={handleDecline}
          className="flex-1 sm:flex-initial py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
        >
          Yalnızca Zorunlu
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 sm:flex-initial py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          Tümünü Kabul Et
        </button>
      </div>
    </div>
  );
}
