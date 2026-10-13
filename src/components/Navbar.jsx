import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Globe, 
  Menu, 
  X, 
  Scan, 
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function Navbar({ 
  lang = 'tr', 
  setLang, 
  soundEnabled, 
  setSoundEnabled, 
  onOpenQuoteModal,
  onOpenStoryModal,
  onOpenCampaignsModal,
  onOpenShowroomModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
    if (newState) sound.playClick();
  };

  const navLinks = [
    { label: '3D Dijital İkiz', href: '#twin-section' },
    { label: 'Klinik Simülatör', href: '#simulator-section' },
    { label: 'Cihazlar (S30/M30)', href: '#hardware-section' },
    { label: 'ROI Hesapla', href: '#roi-section' },
    { label: 'Visbody Point', href: '#visbody-point-section' },
    { label: 'Eğitim Akışı', href: '#reels-section' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090e]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Instagram Story Ring */}
        <div className="flex items-center gap-3">
          
          {/* Instagram-style Story Trigger Ring (From original site) */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenStoryModal) onOpenStoryModal();
            }}
            title="Visbody Hikayelerini İzle"
            className="relative group p-0.5 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 hover:scale-105 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-[#07090e] p-1 flex items-center justify-center">
              <Scan className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-gradient-to-r from-cyan-500 to-blue-600 text-[8px] font-black text-slate-950 rounded-full uppercase">
              Hikaye
            </span>
          </button>

          <a href="#" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-widest text-white">VISBODY</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                NEXT-GEN
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider">
              3D Biyomekanik & BIA Füzyon
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => sound.playClick()}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="hidden sm:flex items-center gap-2">
          
          {/* Catalogs & Campaigns Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenCampaignsModal) onOpenCampaignsModal();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs transition-colors"
          >
            E-Kataloglar
          </button>

          {/* Showroom Map Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenShowroomModal) onOpenShowroomModal();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs transition-colors"
          >
            Showroom
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Ses Efektlerini Kapat' : 'Ses Efektlerini Aç'}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              sound.playClick();
              setLang(lang === 'tr' ? 'en' : 'tr');
            }}
            className="px-2 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playSuccess();
              if (onOpenQuoteModal) onOpenQuoteModal();
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
          >
            <span>Hızlı Teklif & Randevu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleSound}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 text-slate-300 flex items-center justify-center"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#090e1a]/95 backdrop-blur-2xl p-6 space-y-4 animate-in fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                sound.playSuccess();
                setMobileMenuOpen(false);
                if (onOpenQuoteModal) onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Hızlı Teklif & Randevu Al</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
