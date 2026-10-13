import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DigitalTwin3D from './components/DigitalTwin3D';
import ClinicalSimulator from './components/ClinicalSimulator';
import BeforeAfterMorph from './components/BeforeAfterMorph';
import ProductMatrix from './components/ProductMatrix';
import ClinicRoiCalculator from './components/ClinicRoiCalculator';
import VisbodyPointFinder from './components/VisbodyPointFinder';
import VideoReelsShowcase from './components/VideoReelsShowcase';
import Footer from './components/Footer';
import VisbodyAiCopilot from './components/VisbodyAiCopilot';
import ClinicalReportModal from './components/ClinicalReportModal';
import LeadModal from './components/LeadModal';
import QrShareModal from './components/QrShareModal';
import ErrorBoundary from './components/ErrorBoundary';
import StoryViewerModal from './components/StoryViewerModal';
import CampaignsCatalogDrawer from './components/CampaignsCatalogDrawer';
import ShowroomMapModal from './components/ShowroomMapModal';
import FloatingContactHub from './components/FloatingContactHub';
import CookieConsentBanner from './components/CookieConsentBanner';

export default function App() {
  const [lang, setLang] = useState('tr');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Shared Biomechanical Posture & Composition State
  const [posture, setPosture] = useState({
    forwardHead: 14,
    shoulderTilt: 2.8,
    pelvicTilt: 7,
    bodyFat: 21.4,
    muscleMass: 33.8
  });

  // Modal States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenQuote = (productData = {}) => {
    setQuoteInitialData(productData);
    setIsQuoteOpen(true);
  };

  const scrollToTwin = () => {
    document.getElementById('twin-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Top Futuristic Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenQuoteModal={() => handleOpenQuote()}
        onOpenStoryModal={() => setIsStoryOpen(true)}
        onOpenCampaignsModal={() => setIsCampaignsOpen(true)}
        onOpenShowroomModal={() => setIsMapOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreScan={scrollToTwin}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main 3D Digital Twin Viewport Section */}
      <section id="twin-section" className="w-full py-12 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                GERÇEK ZAMANLI 3D OPTİK HOLOGRAFİK MODEL
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                İnteraktif 3D Dijital İkiz
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Aşağıdaki 3D modeli fare veya dokunmatik ekranınızla 360° döndürebilir, 14 çevre ölçümünü veya iskelet aks sapmalarını inceleyebilirsiniz.
            </p>
          </div>

          <ErrorBoundary>
            <DigitalTwin3D
              currentPosture={posture}
              onOpenReport={() => setIsReportOpen(true)}
            />
          </ErrorBoundary>
        </div>
      </section>

      {/* Clinical Simulator & Biomechanical Controls */}
      <section id="simulator-section" className="w-full py-12 sm:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClinicalSimulator
            posture={posture}
            setPosture={setPosture}
            onGenerateReport={() => setIsReportOpen(true)}
          />
        </div>
      </section>

      {/* 4D Volumetric Progress Comparison (Before / After) */}
      <BeforeAfterMorph />

      {/* Hardware Evolution Showcase (S30, M30, R-Explorer, T30) */}
      <ProductMatrix
        onSelectProductForQuote={(product) => handleOpenQuote(product)}
      />

      {/* Clinic ROI & Business Payback Calculator */}
      <ClinicRoiCalculator
        onOpenLeadForm={() => handleOpenQuote()}
      />

      {/* Visbody Point Network (Turkey Clinic Locator) */}
      <VisbodyPointFinder
        onBookAppointment={(clinic) => handleOpenQuote({ name: `${clinic.name} (${clinic.device})` })}
      />

      {/* Video Reels & Stories Feed */}
      <VideoReelsShowcase />

      {/* Footer */}
      <Footer
        onOpenQrModal={() => setIsQrOpen(true)}
      />

      {/* Floating AI Diagnostic Copilot */}
      <VisbodyAiCopilot />

      {/* Floating Quick Contact Hub (WhatsApp & Phone & Showroom) */}
      <FloatingContactHub
        onOpenMap={() => setIsMapOpen(true)}
        onOpenCampaigns={() => setIsCampaignsOpen(true)}
      />

      {/* KVKK & Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Modals */}
      {isReportOpen && (
        <ClinicalReportModal
          posture={posture}
          onClose={() => setIsReportOpen(false)}
        />
      )}

      {isQuoteOpen && (
        <LeadModal
          initialData={quoteInitialData}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}

      {isQrOpen && (
        <QrShareModal
          onClose={() => setIsQrOpen(false)}
        />
      )}

      {isStoryOpen && (
        <StoryViewerModal
          onClose={() => setIsStoryOpen(false)}
        />
      )}

      {isCampaignsOpen && (
        <CampaignsCatalogDrawer
          onClose={() => setIsCampaignsOpen(false)}
          onOpenQuote={handleOpenQuote}
        />
      )}

      {isMapOpen && (
        <ShowroomMapModal
          onClose={() => setIsMapOpen(false)}
        />
      )}

    </div>
  );
}
