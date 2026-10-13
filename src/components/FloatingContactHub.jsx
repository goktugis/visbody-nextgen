import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function FloatingContactHub({ onOpenMap, onOpenCampaigns }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      
      {/* Expanded Quick Links */}
      {expanded && (
        <div className="p-3 rounded-2xl glass-panel-glow border border-cyan-500/30 bg-[#090f1d] shadow-2xl space-y-2 text-xs mb-2 animate-in fade-in slide-in-from-bottom-2">
          <a
            href="https://wa.me/905528713708"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span className="font-semibold">WhatsApp ile Görüş</span>
            <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
          </a>

          <a
            href="tel:+905528713708"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">Doğrudan Ara (+90 552 871 37 08)</span>
            <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
          </a>

          <button
            onClick={() => {
              sound.playClick();
              if (onOpenMap) onOpenMap();
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Showroom'a Git (Harita)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (onOpenCampaigns) onOpenCampaigns();
            }}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <span className="text-amber-400 font-bold">%</span>
            <span>Kampanyalar & Kataloglar</span>
          </button>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        onClick={() => {
          sound.playClick();
          setExpanded(!expanded);
        }}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 hover:text-white hover:border-emerald-400 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
        <span>Hızlı İletişim / WhatsApp</span>
      </button>

    </div>
  );
}
