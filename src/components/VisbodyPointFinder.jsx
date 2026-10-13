import React, { useState } from 'react';
import { clinicsData } from '../data/clinicsData';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Star
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function VisbodyPointFinder({ onBookAppointment }) {
  const [selectedCity, setSelectedCity] = useState('Hepsi');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Hepsi');
  const [searchTerm, setSearchTerm] = useState('');

  const cities = ['Hepsi', 'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'];
  const specialties = ['Hepsi', 'Diyetisyen', 'Pilates', 'Fizyoterapi', 'Spor Bilimleri', 'Medikal Estetik'];

  const filteredClinics = clinicsData.filter(clinic => {
    const matchesCity = selectedCity === 'Hepsi' || clinic.city === selectedCity;
    const matchesSpec = selectedSpecialty === 'Hepsi' || clinic.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          clinic.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          clinic.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCity && matchesSpec && matchesSearch;
  });

  return (
    <section id="visbody-point-section" className="w-full py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <MapPin className="w-3.5 h-3.5" /> VISBODY POINT TÜRKİYE MERKEZLERİ
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            En Yakın 3D Vücut Analiz Noktasını Bulun
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Türkiye genelinde tescilli Visbody S30 ve M30 teknolojisiyle donatılmış yetkili klinikler, diyetisyenler ve pilates stüdyoları.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="rounded-2xl glass-panel p-4 sm:p-6 border border-white/10 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Klinik adı, ilçe veya uzmanlık ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* City Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => {
                  sound.playClick();
                  setSelectedCity(e.target.value);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {cities.map(c => (
                  <option key={c} value={c}>Şehir: {c}</option>
                ))}
              </select>
            </div>

            {/* Specialty Selector */}
            <div className="md:col-span-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  sound.playClick();
                  setSelectedSpecialty(e.target.value);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {specialties.map(s => (
                  <option key={s} value={s}>Uzmanlık: {s}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono pt-3 border-t border-white/5">
            <span>Listelenen Merkez: {filteredClinics.length} Yetkili Nokta</span>
            <span className="text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tüm merkezlerde kalibrasyon kontrolü aktiftir
            </span>
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="rounded-2xl glass-panel p-5 border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {clinic.device}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{clinic.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {clinic.name}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{clinic.district}, {clinic.city}</span>
                </div>
                <div className="text-xs text-emerald-400 font-medium mt-1">
                  {clinic.specialty}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {clinic.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400 font-mono">
                  <span>{clinic.scansCompleted.toLocaleString('tr-TR')}+ Başarılı Tarama</span>
                </div>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    if (onBookAppointment) onBookAppointment(clinic);
                  }}
                  className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/15"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Randevu Al</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
