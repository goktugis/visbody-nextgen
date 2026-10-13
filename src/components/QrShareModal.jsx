import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function QrShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://visbody.com.tr';

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#090e1a] shadow-2xl p-6 text-center space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 pt-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            MOBİL ERİŞİM
          </span>
          <h3 className="text-xl font-bold text-white">QR Kod ile Telefonda Aç</h3>
          <p className="text-xs text-slate-400">
            Kameranızla okutarak 3D simülasyonu telefonunuzda doğrudan deneyimleyin.
          </p>
        </div>

        {/* QR Code Graphic Box */}
        <div className="p-4 rounded-2xl bg-white text-slate-950 inline-block shadow-2xl shadow-cyan-500/20 border-4 border-cyan-400/40">
          <div className="w-48 h-48 flex items-center justify-center">
            {/* SVG QR Code Illustration */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-950">
              <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
              <rect x="35" y="10" width="8" height="8" />
              <rect x="50" y="10" width="12" height="6" />
              <rect x="40" y="25" width="20" height="8" />
              <rect x="10" y="38" width="12" height="10" />
              <rect x="28" y="42" width="10" height="15" />
              <rect x="45" y="38" width="14" height="8" />
              <rect x="65" y="40" width="8" height="14" />
              <rect x="80" y="45" width="12" height="8" />
              <rect x="38" y="55" width="15" height="12" />
              <rect x="60" y="60" width="12" height="8" />
              <rect x="75" y="68" width="18" height="10" />
              <rect x="45" y="75" width="8" height="18" />
              <rect x="60" y="82" width="15" height="10" />
            </svg>
          </div>
        </div>

        {/* Link Copy */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent px-2 text-slate-300 font-mono text-[11px] focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all text-xs flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
