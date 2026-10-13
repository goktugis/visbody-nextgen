import React, { useState } from 'react';
import { X, MapPin, Building, Navigation, Phone, ExternalLink } from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function ShowroomMapModal({ onClose }) {
  const [activeLocation, setActiveLocation] = useState('showroom'); // 'showroom' | 'headquarters'

  const locations = {
    showroom: {
      name: 'Visbody & Anduwell Deneyim Showroom',
      address: 'Yeşilköy Mah. Atatürk Cad. No: 12/A, Bakırköy / İstanbul',
      phone: '+90 (552) 871 37 08',
      desc: 'Tüm Visbody modellerini (S30, M30 Mirror) canlı deneyimleyebilir, ücretsiz 3D vücut analizi yaptırabilirsiniz.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2725.5067594074353!2d28.8290958!3d40.9862321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa31964710a8b%3A0x513cae837e01138!2zQU5EVVdFTEwgV0VMTE5FU1MgRVNURVTEsEsgR8OcWkVMTMSwSyDDnFLDnE4gVkUgVEVLTk9MT0rEsExFUsSwIFNIT1dST09N!5e1!3m2!1str!2str!4v1778931019492!5m2!1str!2str',
      directionsUrl: 'https://maps.google.com/?q=40.9862321,28.8290958'
    },
    headquarters: {
      name: 'Visbody Türkiye Genel Merkez & Operasyon',
      address: 'Zigana Tria Plaza Kat: 4, Yakuplu Mah., Beylikdüzü / İstanbul',
      phone: '+90 (850) 840 34 33',
      desc: 'Yetkili distribütörlük yönetimi, teknik servis kalibrasyon laboratuvarı ve lojistik merkezi.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.2081734766125!2d28.624592675513203!3d40.993455820338305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55fcb48a2dc57%3A0xf1506ff13f731d21!2zWsSwR0FOQSBUUsSwQQ!5e1!3m2!1str!2str!4v1778930748337!5m2!1str!2str',
      directionsUrl: 'https://maps.google.com/?q=40.9934558,28.6245926'
    }
  };

  const loc = locations[activeLocation];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-glow border border-cyan-500/30 bg-[#090f1d] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
              LOKASYON & HARİTA
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">
              Visbody Showroom & Genel Merkez
            </h3>
          </div>

          {/* Location Toggle Tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveLocation('showroom');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeLocation === 'showroom'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Deneyim Showroom (Bakırköy)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveLocation('headquarters');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeLocation === 'headquarters'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Genel Merkez (Beylikdüzü)</span>
            </button>
          </div>

          {/* Info Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{loc.name}</span>
              <a
                href={loc.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Yol Tarifi Al</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{loc.address}</span>
            </div>
            <div className="text-slate-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{loc.phone}</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
              {loc.desc}
            </p>
          </div>

          {/* Interactive Map Embed */}
          <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
            <iframe
              src={loc.mapUrl}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              title={loc.name}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
