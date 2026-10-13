import React, { useState } from 'react';
import { reelsData } from '../data/clinicsData';
import { 
  Play, 
  Heart, 
  Share2, 
  Eye, 
  Clock, 
  Sparkles, 
  X, 
  Check, 
  Volume2, 
  VolumeX,
  Tv
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function VideoReelsShowcase() {
  const [activeReel, setActiveReel] = useState(null);
  const [likes, setLikes] = useState({ 1: 1240, 2: 2180, 3: 1890, 4: 3120 });
  const [likedMap, setLikedMap] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleLike = (id) => {
    sound.playClick();
    const isLiked = likedMap[id];
    setLikedMap({ ...likedMap, [id]: !isLiked });
    setLikes({ ...likes, [id]: isLiked ? likes[id] - 1 : likes[id] + 1 });
  };

  const handleShare = (reel) => {
    sound.playClick();
    navigator.clipboard?.writeText(window.location.href + `#reel-${reel.id}`);
    setCopiedId(reel.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="reels-section" className="w-full py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
            <Tv className="w-3.5 h-3.5" /> KLİNİK VİDEO VE EĞİTİM AKIŞI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Uzmanların Gözünden 3D Beden Analizi
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Fizyoterapistler, klinik diyetisyenler ve spor bilimcilerinden gerçek vaka analizleri ve interaktif rehberler.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reelsData.map((reel) => (
            <div
              key={reel.id}
              className="rounded-2xl glass-panel overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              {/* Thumbnail / Video Simulation Trigger */}
              <div 
                onClick={() => {
                  sound.playScan();
                  setActiveReel(reel);
                }}
                className="relative aspect-[9/14] overflow-hidden cursor-pointer bg-slate-950"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                    {reel.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> {reel.duration}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-cyan-300 font-medium">{reel.speaker}</div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 mt-0.5">
                    {reel.title}
                  </h4>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(reel.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      likedMap[reel.id] ? 'text-rose-400 font-bold' : 'hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedMap[reel.id] ? 'fill-rose-400' : ''}`} />
                    <span>{likes[reel.id]}</span>
                  </button>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3.5 h-3.5" /> {reel.views}
                  </span>
                </div>

                <button
                  onClick={() => handleShare(reel)}
                  className="flex items-center gap-1 hover:text-cyan-400 transition-colors text-[11px]"
                >
                  {copiedId === reel.id ? (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Kopyalandı
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Share2 className="w-3.5 h-3.5" /> Paylaş
                    </span>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modern Fullscreen Reel Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden glass-panel-glow border border-cyan-500/30 shadow-2xl bg-[#090e1a]">
            
            {/* Modal Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                setActiveReel(null);
              }}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Viewport Simulation */}
            <div className="relative aspect-[9/16] bg-slate-950 flex flex-col justify-between p-6">
              
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/60" />

              {/* Top Reel Info */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/30">
                    {activeReel.category}
                  </span>
                  <div className="text-white text-xs font-bold mt-1.5">{activeReel.speaker}</div>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Center Simulation Graphic (Scanning Laser in reel) */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-20 h-20 rounded-full border-2 border-cyan-400/50 flex items-center justify-center animate-pulse">
                  <Play className="w-8 h-8 fill-cyan-400 text-cyan-400 ml-1" />
                </div>
                <div className="text-xs font-mono text-cyan-300">
                  Visbody 3D Vaka İncelemesi Oynatılıyor...
                </div>
              </div>

              {/* Bottom Reel Summary & Controls */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-sm font-bold text-white leading-snug">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeReel.summary}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-2/3 rounded-full animate-pulse" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleLike(activeReel.id)}
                    className="flex items-center gap-1.5 text-xs text-white"
                  >
                    <Heart className={`w-4 h-4 ${likedMap[activeReel.id] ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{likes[activeReel.id]} Beğeni</span>
                  </button>

                  <button
                    onClick={() => handleShare(activeReel)}
                    className="flex items-center gap-1.5 text-xs text-cyan-300"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Paylaş</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
