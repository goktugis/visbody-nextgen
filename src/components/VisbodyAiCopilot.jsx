import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Cpu, 
  RefreshCw
} from 'lucide-react';
import { sound } from '../utils/soundFx';

const defaultKnowledge = [
  {
    keywords: ['s30', 'm30', 'fark', 'hangisi', 'diyetisyen', 'pilates'],
    answer: `**Visbody S30 vs M30 Seçim Kılavuzu:**

1. **Visbody S30 (Amiral Gemisi Kule Tasarım):**
- **Hedef:** Yoğun hasta sirkülasyonu olan Diyetisyen Klinikleri, Büyük Spor Kompleksleri ve Ortopedi Merkezleri.
- **Teknoloji:** 4 Frekanslı BIA (5-500 kHz) + Çoklu Intel RealSense optik kameralar. 18 klinik biyobelirteç.
- **Ekran:** 15.6 inç bağımsız medikal dokunmatik konsol.

2. **Visbody M30 (Akıllı 3D Ayna):**
- **Hedef:** Butik Reformer Pilates stüdyoları, Medikal Estetik klinikleri ve VIP Personal Training merkezleri.
- **Avantajı:** Lüks ayna içine gizlenmiş optik sensörler, estetik duruş ve alandan tasarruf.

*Özet Tavsiye:* Beslenme ve klinik kilo kontrolü odaklıysanız **S30**, butik pilates veya estetik vücut şekillendirme odaklıysanız **M30** önerilir.`
  },
  {
    keywords: ['forward head', 'tech neck', 'boyun', 'duruş', 'postür'],
    answer: `**İleri Baş Duruşu (Forward Head Carriage / Tech Neck) Analizi:**

- **Biyomekanik Mekanizma:** Başın nötr omurga aksından her 2.5 cm öne kayması, C7 servikal omurgaya binen yükü yaklaşık **4.5 - 5 kg** artırır.
- **Visbody Tespiti:** 3D iskelet taraması, tragus ile C7 spinöz çıkıntı arasındaki açıyı milimetrik olarak ölçer (Örn: +18° sapma).
- **Klinik Öneri:** Üst çapraz sendromu (Upper Crossed Syndrome) önlenmesi için derin servikal fleksörlerin güçlendirilmesi ve pektoral kasların miyofasiyal gevşetilmesi önerilir.`
  },
  {
    keywords: ['faz açısı', 'phase angle', 'hücre', 'sağlık', 'bia'],
    answer: `**BIA Faz Açısı (Phase Angle - θ) Klinik Önemi:**

- **Nedir?** Hücre membranlarının (zarlarının) biyoelektrik akıma gösterdiği kapasitif direnç açısıdır.
- **Normal Aralık:** 6.0° - 8.5° (Genç ve atletik bireylerde daha yüksektir).
- **Klinik Yorum:**
  - **Düşük Faz Açısı (<5.0°):** Hücresel bütünlük zayıflaması, malnütrisyon, kronik inflamasyon veya kas yıkımı (sarkopeni) işareti.
  - **Yüksek Faz Açısı (>7.5°):** Güçlü hücresel membran bütünlüğü, yüksek kas kütlesi ve kaliteli hücresel yenilenme.`
  },
  {
    keywords: ['dexa', 'doğruluk', 'hassasiyet', 'güvenilirlik', 'hata'],
    answer: `**DEXA Doğrulama ve Klinik Hassasiyet Standartları:**

- **Korelasyon Skoru (r):** Visbody 3D vücut kompozisyonu ölçümleri, medikal altın standart kabul edilen **DEXA (Dual-Energy X-ray Absorptiometry)** ile **r = 0.984** düzeyinde istatistiksel korelasyona sahiptir.
- **Tekrarlanabilirlik:** Varyasyon katsayısı (CV) <%1.2'dir.
- **Çevre Ölçüm Hassasiyeti:** 14 anatomik çevre ölçümünde manuel mezura hatalarını sıfırlayan **±1 mm** optik derinlik hassasiyeti sunar.`
  },
  {
    keywords: ['roi', 'fiyat', 'amortisman', 'maliyet', 'kazanç'],
    answer: `**Yatırım Geri Dönüşü (ROI) ve Gelir Modeli:**

- **Ortalama Seans Ücreti:** 3D Tarama + Postür Raporu: 600 - 1.200 TL / seans.
- **Aylık 120 Danışan Senaryosu:** 
  - Yalnızca tarama geliri: ~90.000 TL / ay.
  - 3D raporun sağladığı premium paket dönüşümleri: ~60.000 TL / ay.
  - Toplam aylık katkı: **~150.000 TL / ay**.
- **Amortisman Süresi:** Cihaz kendisini ortalama **2.5 - 3.5 ayda** tamamen finanse eder.`
  }
];

export default function VisbodyAiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Merhaba! Ben **Visbody AI Biyo-Mekanik Danışmanı**. Cihaz donanımları (S30/M30/R-Explorer), BIA Faz Açısı, postür ölçümleri veya kliniğiniz için ROI analizleri hakkında sorularınızı yanıtlayabilirim.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Diyetisyen kliniğim için S30 vs M30 hangisi uygun?",
    "Forward Head (Boyun İleri Eğim) açısı nasıl analiz edilir?",
    "BIA Faz Açısı (Phase Angle) ne anlama gelir?",
    "DEXA ile doğruluk oranı nedir?",
    "Yatırım Geri Dönüşü (ROI) ve amortisman süresi"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    sound.playClick();
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = defaultKnowledge.find(item => 
        item.keywords.some(k => lower.includes(k))
      );

      let reply = matched 
        ? matched.answer 
        : `Sorunuz için teşekkürler! "${query}" konusuyla ilgili detaylı klinik parametreleri Visbody 3D raporunuzda görüntüleyebilirsiniz. Ayrıca doğrudan teknik uzmanımızla görüşmek için Hızlı Teklif & Randevu formunu doldurabilirsiniz.`;

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
      sound.playSuccess();
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all border border-cyan-300/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs sm:text-sm tracking-wide">Visbody AI Danışman</span>
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[580px] rounded-3xl glass-panel-glow border border-cyan-500/30 shadow-2xl bg-[#090f1d] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>VISBODY BIO-COPILOT</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono border border-emerald-500/30">
                    V4.2 AKTİF
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Biyomekanik & Donanım Danışmanı</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-br-none shadow-md'
                      : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-none shadow-lg'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 rounded-bl-none text-cyan-300 flex items-center gap-1.5 font-mono text-[11px]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Klinik veri taranıyor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-black/40 border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/40 text-[10px] text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Klinik veya cihaz sorusu sorun..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="w-8 h-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
