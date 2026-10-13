import React from 'react';
import { 
  Scan, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  QrCode
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function Footer({ onOpenQrModal }) {
  return (
    <footer className="w-full bg-[#04060a] border-t border-white/10 pt-16 pb-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Scan className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-widest text-white">VISBODY TÜRKİYE</span>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Dünyanın bir numaralı 3D Vücut Analiz Teknolojisi. Biyomekanik iskelet takibi ve çok frekanslı BIA empedans füzyonu ile gerçek değişimi görünür kılıyoruz.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/visbody.tr/" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 border border-white/10 flex items-center justify-center transition-colors"
                title="Visbody Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenQrModal) onOpenQrModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-colors font-mono text-[11px]"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mobil QR Paylaş</span>
              </button>
            </div>
          </div>

          {/* Quick Hardware Navigation */}
          <div>
            <h4 className="text-white font-bold mb-3 font-mono text-xs uppercase tracking-wider text-cyan-400">
              Donanımlar
            </h4>
            <ul className="space-y-2">
              <li><a href="#hardware-section" className="hover:text-cyan-300 transition-colors">Visbody S30 (Amiral Gemisi)</a></li>
              <li><a href="#hardware-section" className="hover:text-cyan-300 transition-colors">Visbody M30 (Akıllı Ayna)</a></li>
              <li><a href="#hardware-section" className="hover:text-cyan-300 transition-colors">Visbody R-Explorer (DEXA Seviye)</a></li>
              <li><a href="#hardware-section" className="hover:text-cyan-300 transition-colors">Visbody T30 (Rehabilitasyon)</a></li>
              <li><a href="#hardware-section" className="hover:text-cyan-300 transition-colors">Visbody A600 / Creator</a></li>
            </ul>
          </div>

          {/* Clinical Disciplines */}
          <div>
            <h4 className="text-white font-bold mb-3 font-mono text-xs uppercase tracking-wider text-cyan-400">
              Kullanım Alanları
            </h4>
            <ul className="space-y-2">
              <li><a href="#visbody-point-section" className="hover:text-cyan-300 transition-colors">Diyetisyen & Beslenme</a></li>
              <li><a href="#visbody-point-section" className="hover:text-cyan-300 transition-colors">Reformer & Mat Pilates</a></li>
              <li><a href="#visbody-point-section" className="hover:text-cyan-300 transition-colors">Fizyoterapi & Ortopedi</a></li>
              <li><a href="#visbody-point-section" className="hover:text-cyan-300 transition-colors">Spor Bilimleri & Kulüpler</a></li>
              <li><a href="#visbody-point-section" className="hover:text-cyan-300 transition-colors">Medikal Estetik & Wellness</a></li>
            </ul>
          </div>

          {/* Official Distributor Contact */}
          <div>
            <h4 className="text-white font-bold mb-3 font-mono text-xs uppercase tracking-wider text-cyan-400">
              İletişim & Dağıtım
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>İstanbul & Ankara Showroom & Eğitim Merkezleri</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+90 (850) 840 34 33</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>info@visbody.com.tr</span>
              </li>
              <li className="pt-1">
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Türkiye Yetkili Distribütör Garantisi
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Engineering Signature */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 VISBODY TÜRKİYE. Tüm hakları saklıdır. CE Medikal & FDA Uyumludur.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Next-Gen Redesign & Architecture by</span>
            <span className="text-cyan-400 font-bold">Bilgisayar Mühendisi Portfolyosu</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
