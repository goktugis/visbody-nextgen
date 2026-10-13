import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Gift, 
  Percent, 
  Download, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function CampaignsCatalogDrawer({ onClose, onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('catalogs'); // 'catalogs' | 'campaigns' | 'gift'
  const [giftForm, setGiftForm] = useState({ name: '', phone: '', clinic: '', address: '' });
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  const catalogs = [
    { title: 'Visbody Genel Katalog (2026)', desc: 'Tüm donanım serileri, optik sensör parametreleri ve teknik detaylar.', size: '4.8 MB PDF' },
    { title: 'Visbody Uzman Deneyimleri', desc: 'Diyetisyen, Fizyoterapist ve Hekimlerin klinik vaka değerlendirmeleri.', size: '6.2 MB PDF' },
    { title: 'Visbody M30 Akıllı Ayna Kataloğu', desc: 'Pilates ve estetik klinikleri için boyut ve tasarım rehberi.', size: '3.4 MB PDF' },
    { title: 'Klinik Grup Fiyat Listesi & Ödeme Yöntemleri', desc: 'Peşin indirimleri, 12 ay vadeli teklifler ve finansman planı.', size: '1.9 MB PDF' }
  ];

  const campaigns = [
    {
      title: 'M30 Reformer Pilates Özel Lansman Paketi',
      discount: '%15 İndirim + Hediye Tablet HUD',
      desc: 'Boutique pilates stüdyolarına özel kurulum, eğitmen eğitim sertifikası ve 2 yıl tam garanti.',
      deadline: 'Sınırlı Kontenjan'
    },
    {
      title: 'S30 Klinik Diyetisyen Değişim Kampanyası',
      discount: 'Eski Cihazını Getir, 50.000 TL Destek Al',
      desc: 'Mevcut 2D veya tek frekanslı baskülünü vererek yeni nesil S30 kule analizörüne geçiş fırsatı.',
      deadline: 'Aktif Kampanya'
    },
    {
      title: 'S30 Kıdem & Kurumsal Sağlık Kampanyası',
      discount: '12 Ay Vade Farksız Taksit',
      desc: 'Hastaneler ve tıp merkezleri için leasing & kurumsal vadeli ödeme seçenekleri.',
      deadline: 'Devam Ediyor'
    }
  ];

  const handleDownloadCatalog = (title) => {
    sound.playSuccess();
    alert(`"${title}" başarıyla indirildi.`);
  };

  const handleGiftSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setGiftSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#090f1d] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="mb-6">
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
              DÖKÜMANLAR & ÖZEL FIRSATLAR
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">
              E-Kataloglar, Kampanyalar & Hediye Paketi
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Orijinal sitedeki tüm PDF kataloglar, indirim kampanyaları ve kliniğinize özel hediye numune talepleri.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-white/10 mb-6 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('catalogs');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'catalogs'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>E-Kataloglar</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('campaigns');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'campaigns'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Percent className="w-4 h-4" />
              <span>Aktif Kampanyalar</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('gift');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'gift'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Adresine Hediye İste</span>
            </button>
          </div>

          {/* Tab 1: Catalogs */}
          {activeTab === 'catalogs' && (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {catalogs.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{cat.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400">{cat.desc}</p>
                    <span className="text-[10px] font-mono text-cyan-400">{cat.size}</span>
                  </div>

                  <button
                    onClick={() => handleDownloadCatalog(cat.title)}
                    className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>İndir</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Campaigns */}
          {activeTab === 'campaigns' && (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {campaigns.map((camp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {camp.discount}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{camp.deadline}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{camp.title}</h4>
                  <p className="text-xs text-slate-400">{camp.desc}</p>
                  {onOpenQuote && (
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onClose();
                          onOpenQuote();
                        }}
                        className="w-full py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Kampanyadan Yararlan / Teklif Al</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Gift Request Form (Adresine Hediye İste) */}
          {activeTab === 'gift' && (
            <div>
              {!giftSubmitted ? (
                <form onSubmit={handleGiftSubmit} className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Kliniğinize ücretsiz Visbody 3D Tanıtım Kiti ve Medikal Postür Cetveli gönderelim.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">Ad Soyad</label>
                      <input
                        type="text"
                        required
                        placeholder="Adınız Soyadınız"
                        value={giftForm.name}
                        onChange={(e) => setGiftForm({ ...giftForm, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Telefon</label>
                      <input
                        type="tel"
                        required
                        placeholder="05XX XXX XX XX"
                        value={giftForm.phone}
                        onChange={(e) => setGiftForm({ ...giftForm, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Klinik / Merkez Adı</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: BioFit Diyet Kliniği"
                      value={giftForm.clinic}
                      onChange={(e) => setGiftForm({ ...giftForm, clinic: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Teslimat Adresi</label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Kargo teslimat adresi..."
                      value={giftForm.address}
                      onChange={(e) => setGiftForm({ ...giftForm, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Hediye Paketimi Ücretsiz Gönder</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Hediye Talebiniz Alındı!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Tanıtım kitiniz ve medikal cetveliniz en kısa sürede kargoya teslim edilecektir.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
