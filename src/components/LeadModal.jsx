import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Building,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function LeadModal({ 
  initialData = {}, 
  onClose 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    clinicType: 'Diyetisyen Kliniği',
    device: initialData.name || 'Visbody S30 (Amiral Gemisi)',
    note: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti error handled
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#090f1d] shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
                HIZLI TEKLİF & RANDEVU
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">
                Kliniğinizi Geleceğe Taşıyın
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Yetkili Visbody danışmanımız 15 dakika içinde sizinle iletişime geçerek yerinde demo ve vadeli fiyat teklifini sunacaktır.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ad Soyad</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Adınız ve Soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Telefon Numarası</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">E-posta Adresi</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="adiniz@klinik.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">İşletme / Klinik Türü</label>
                  <select
                    value={formData.clinicType}
                    onChange={(e) => setFormData({ ...formData, clinicType: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Diyetisyen Kliniği">Diyetisyen Kliniği</option>
                    <option value="Reformer Pilates Stüdyosu">Reformer Pilates Stüdyosu</option>
                    <option value="Fizyoterapi & Rehabilitasyon">Fizyoterapi & Rehabilitasyon</option>
                    <option value="Fitness & Spor Kompleksi">Fitness & Spor Kompleksi</option>
                    <option value="Medikal Estetik & Plastik Cerrahi">Medikal Estetik</option>
                    <option value="Bireysel Danışan / Kullanıcı">Bireysel Danışan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">İlgilenilen Model</label>
                  <select
                    value={formData.device}
                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Visbody S30">Visbody S30 (Amiral Gemisi)</option>
                    <option value="Visbody M30 Mirror">Visbody M30 (Akıllı Ayna)</option>
                    <option value="Visbody R-Explorer">Visbody R-Explorer (DEXA Seviye)</option>
                    <option value="Visbody T30">Visbody T30 (Fizyoterapi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Not veya Özel İstek (Opsiyonel)</label>
                <textarea
                  rows="2"
                  placeholder="Yerinde demo randevusu, 12 ay vadeli teklif veya teknik şartname talebi..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:scale-102"
              >
                <Send className="w-4 h-4" />
                <span>Teklif Talebini Gönder (Ücretsiz Demo Dahil)</span>
              </button>

              <div className="text-[10px] text-slate-500 text-center font-mono">
                🔒 Bilgileriniz 6698 sayılı KVKK kapsamında şifrelenerek korunur.
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Talebiniz Başarıyla Alındı!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Sayın <span className="text-cyan-400 font-bold">{formData.name}</span>, <span className="text-white font-medium">{formData.device}</span> için demo ve özel fiyatlandırma dosyanız hazırlandı. Visbody Türkiye uzmanımız en kısa sürede sizinle iletişime geçecektir.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors mt-2"
            >
              Kapat
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
