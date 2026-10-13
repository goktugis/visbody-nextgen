import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundFx';

const storySlides = [
  {
    id: 1,
    title: 'Dünyanın 1 Numaralı 3D Vücut Analiz Teknolojisi',
    category: 'Tanıtım',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    desc: '32 saniyede milimetrik optik tarama ve BIA empedans füzyonu.'
  },
  {
    id: 2,
    title: 'Visbody S30 — Klinikler İçin Amiral Gemisi',
    category: 'Donanım',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    desc: 'DEXA ile %98.4 korelasyon kanıtlı 18 biyobelirteç.'
  },
  {
    id: 3,
    title: 'Visbody M30 — Akıllı 3D Ayna Formu',
    category: 'Tasarım',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    desc: 'Butik pilates stüdyoları ve estetik merkezlerine özel sihirli ayna HUD.'
  },
  {
    id: 4,
    title: '14 Otomatik Çevre Ölçümü (±1 mm)',
    category: 'Hassasiyet',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    desc: 'Manuel mezura hatalarını sıfırlayan optik derinlik haritası.'
  },
  {
    id: 5,
    title: '3D İskelet Postür Açısı Takibi',
    category: 'Biyomekanik',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
    desc: 'İleri baş duruşu, omuz asimetrisi ve pelvik tilt analizi.'
  },
  {
    id: 6,
    title: 'Faz Açısı (Phase Angle - θ) Analizi',
    category: 'Hücresel Sağlık',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
    desc: 'Hücre zarı geçirgenliği ve hücresel sağlık indeksi ölçümü.'
  },
  {
    id: 7,
    title: '4D Hacimsel Öncesi/Sonrası Örtüşme',
    category: 'Dönüşüm',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    desc: 'Gerçek cm³ yağ kaybı ve kas hipertrofisi karşılaştırması.'
  },
  {
    id: 8,
    title: '2.400+ Global Klinik & Visbody Point Ağı',
    category: 'Güvenilirlik',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    desc: 'Türkiye genelinde 50+ yetkili merkez ve showroom.'
  }
];

export default function StoryViewerModal({ onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const SLIDE_DURATION = 4500; // 4.5s per story

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      if (currentIdx < storySlides.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        onClose();
      }
    }, SLIDE_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [currentIdx, isPaused, onClose]);

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < storySlides.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const activeSlide = storySlides[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
      <div 
        className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] rounded-3xl overflow-hidden glass-panel-glow border border-cyan-500/40 shadow-2xl bg-[#080d19] flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Background Image */}
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/70" />

        {/* Top Progress Bars Header */}
        <div className="relative z-20 p-4 space-y-3">
          <div className="flex gap-1.5">
            {storySlides.map((_, idx) => (
              <div key={idx} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-cyan-400 rounded-full transition-all duration-300 ${
                    idx < currentIdx
                      ? 'w-full'
                      : idx === currentIdx
                      ? 'w-full animate-pulse'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 p-0.5 flex items-center justify-center">
                <span className="text-[10px] font-black text-cyan-300">VB</span>
              </div>
              <div>
                <div className="text-xs font-bold">VISBODY TÜRKİYE</div>
                <div className="text-[10px] text-cyan-300 font-mono">{activeSlide.category}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left & Right Tap Zones */}
        <div 
          onClick={handlePrev}
          className="absolute left-0 top-20 bottom-32 w-1/3 z-10 cursor-pointer"
          title="Önceki Hikaye"
        />
        <div 
          onClick={handleNext}
          className="absolute right-0 top-20 bottom-32 w-2/3 z-10 cursor-pointer"
          title="Sonraki Hikaye"
        />

        {/* Bottom Story Content */}
        <div className="relative z-20 p-6 space-y-2">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
            {currentIdx + 1} / {storySlides.length}
          </span>
          <h3 className="text-xl font-bold text-white leading-snug">
            {activeSlide.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeSlide.desc}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Durdurmak için basılı tutun</span>
            <span className="text-cyan-400">Dokunarak geç ➔</span>
          </div>
        </div>

      </div>
    </div>
  );
}
