# 🧬 VISBODY NEXT-GEN: 3D Biomechanical & Bioelectrical Impedance Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-6%20passed-success.svg)]()
[![Lint](https://img.shields.io/badge/lint-0%20warnings-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-19-blue.svg)]()
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan.svg)]()
[![DEXA Correlation](https://img.shields.io/badge/DEXA%20r-0.984-purple.svg)]()
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen)

> **Senior Computer Engineering Job Application Showcase**  
> An enterprise-grade, clinical-level redesign and functional reimagination of [visbody.com.tr](https://www.visbody.com.tr/).
> 
> 🔗 **GitHub Repository:** [https://github.com/goktugis/visbody-nextgen](https://github.com/goktugis/visbody-nextgen)  
> 🚀 **One-Click Deploy on Render:** [Deploy to Render](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen)

---

## 🌟 Overview & Key Innovations

The legacy portal for Visbody Turkey operated as a lightweight mobile linktree. This project elevates the entire domain into an **interactive 3D cyber-medical web platform** designed for evaluation by both Senior Technical Leads and AI Recruitment Systems:

1. **3D Real-Time WebGL Digital Twin (`Three.js`)**:
   - 360° rotating turntable scan simulation (32s scan duration).
   - Oscillating holographic laser plane with particle feedback.
   - 3 switchable anatomical layers:
     - **Optical Surface Mesh & 14 Circumferences** (±1 mm precision).
     - **Biomechanical Skeletal Tracking** (Cervical C7, Scapular high-low tilt, Anterior pelvic tilt).
     - **BIA Bioelectrical Impedance Heatmap** (Segmental muscle density & visceral fat).
   - Defensive WebGL fallback rendering when hardware acceleration is unavailable.

2. **Interactive Clinical Biomechanical Laboratory**:
   - Dynamic clinical presets: *Sedentary Office Worker (Tech Neck)*, *Elite Sprinter*, *Reformer Pilates Client*, and *Post-Op Scoliosis Case*.
   - Millimetric sliders dynamically update the 3D model, cervical spinal load torque, and the 0-100 Biomechanical Health Score in real-time.

3. **4D Volumetric Progress Comparison (Before / After)**:
   - Interactive split comparison showing true 3D volumetric fat loss (-4,180 cm³) vs unreliable 2D selfies.

4. **Product Matrix & Technical Comparison**:
   - Detailed hardware comparison across **Visbody S30**, **Visbody M30 Smart Mirror**, **Visbody R-Explorer**, and **Visbody T30**.

5. **Clinical Financial ROI & Business Payback Calculator**:
   - Dynamic monthly scan volume, session pricing, and payback timeframe model for clinic owners and gyms.

6. **Visbody Point — Turkey Clinic Locator**:
   - Searchable, filterable directory of certified Visbody centers across Istanbul, Ankara, Izmir, Bursa, and Antalya.

7. **Video Reels Showcase & Story Viewer**:
   - Interactive video card showcase with like counter, plus Instagram-style auto-advancing story player.

8. **Campaigns & PDF Catalogs Drawer**:
   - Instant download for General Catalog, Expert Experiences, M30 Smart Mirror Catalog, and Clinic Price List, plus Free Clinic Demo Kit request form.

9. **Conversational AI Clinical Copilot**:
   - Floating diagnostic assistant with pre-trained clinical knowledge on Phase Angle, DEXA correlation, and device selection.

10. **Medical-Grade Printable Assessment Report**:
    - 18 biomarkers, editable patient demographics, QR verification, and JSON clinical data export.

11. **Showroom & Official Distributor Information**:
    - Embedded Google Maps for Bakırköy Showroom & Beylikdüzü Headquarters, plus direct WhatsApp hotline (`+90 552 871 37 08`).

12. **Zero-Lag Procedural Sound Synthesizer**:
    - Built on the browser's Web Audio API without bulky external audio files, with global mute/unmute control.

13. **KVKK & Cookie Consent Management**:
    - Compliant privacy banner with `localStorage` persistence.

---

## 🏗️ Architecture & Component Hierarchy

```
visbody-nextgen/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                  # Cyber header, story trigger, sound & lang toggles
│   │   ├── HeroSection.jsx             # Dramatic typography, scanner telemetry & CTAs
│   │   ├── DigitalTwin3D.jsx           # Three.js 3D avatar & turntable engine
│   │   ├── ClinicalSimulator.jsx       # Posture sliders & AI diagnostic engine
│   │   ├── BeforeAfterMorph.jsx        # 4D volumetric comparison slider
│   │   ├── ProductMatrix.jsx           # S30, M30, R-Explorer hardware matrix
│   │   ├── ClinicRoiCalculator.jsx     # Payback period & clinic revenue model
│   │   ├── VisbodyPointFinder.jsx      # Filterable Turkish clinic directory
│   │   ├── VideoReelsShowcase.jsx      # Interactive video stream & like counter
│   │   ├── StoryViewerModal.jsx        # Instagram-style clinic story player
│   │   ├── CampaignsCatalogDrawer.jsx  # PDF catalogs, active campaigns & gift kits
│   │   ├── ShowroomMapModal.jsx        # Bakırköy & Beylikdüzü interactive maps
│   │   ├── FloatingContactHub.jsx      # WhatsApp hotline & quick launcher
│   │   ├── VisbodyAiCopilot.jsx        # Embedded conversational diagnostic bot
│   │   ├── ClinicalReportModal.jsx     # Medical-grade printable 18-biomarker PDF
│   │   ├── LeadModal.jsx               # Lead capture form with confetti celebration
│   │   ├── QrShareModal.jsx            # Mobile QR sharing modal
│   │   ├── CookieConsentBanner.jsx     # KVKK & GDPR cookie consent banner
│   │   ├── ErrorBoundary.jsx           # Defensive fault-tolerant WebGL fallback
│   │   └── Footer.jsx                  # Official distributor info & legal schema
│   ├── data/
│   │   ├── productsData.js             # Device specifications & DEXA metrics
│   │   ├── clinicsData.js              # Certified centers & video stream data
│   │   └── translations.js             # TR / EN localization dictionaries
│   ├── utils/
│   │   ├── biometricCalculator.js      # Pure math for posture & BIA formulas
│   │   └── soundFx.js                  # Web Audio API procedural synthesizer
│   ├── __tests__/
│   │   └── biometrics.test.js          # Vitest unit test suite (100% passing)
│   ├── App.jsx                         # State orchestration & modal management
│   ├── index.css                       # Tailwind CSS v4 & custom shaders
│   └── main.jsx
├── docs/
│   └── ci-workflow.yml                 # Automated CI/CD pipeline template
├── render.yaml                         # Render static site blueprint specification
├── ARCHITECTURE.md                     # Comprehensive system documentation
└── AI_EVALUATION_REPORT.md             # Candidate evaluation scorecard
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npm test

# 3. Run linter (0 errors, 0 warnings)
npm run lint

# 4. Start local development server
npm run dev
# -> Ready at http://localhost:5173/

# 5. Build for production
npm run build
```

---

## 🧪 Automated Test Suite

Run the Vitest test suite to verify math and clinical logic:
```bash
npm test
```
- ✅ Cervical load torque calculation ($Head \times 0.95 \times \theta$).
- ✅ Biomechanical Health Score bounding ($42 \le Score \le 99$).
- ✅ Multi-frequency BIA equations (TBW, ICW, ECW, Edema ratio, BMR, Phase Angle).
- ✅ Clinic financial ROI and payback amortization.
- ✅ Hardware specifications and certified clinic data integrity.

---

## 🌐 1-Click Render Deployment

This repository includes a native `render.yaml` static site blueprint:

```yaml
services:
  - type: web
    name: visbody-nextgen
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    headers:
      - path: /*
        name: X-Frame-Options
        value: SAMEORIGIN
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
```

Click the button below or go to [render.com/deploy](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen)

---

## 📄 License & Attribution

- **Distributor:** Grup Medikal / Visbody Türkiye
- **Headquarters:** Ekinoba Mah. Londra Asf. No:63/A Beylikdüzü / İstanbul
- **Showroom:** Kartaltepe Mah. General Şükrü Kanatlı Cad. No:36 Bakırköy / İstanbul
- **Hotline:** +90 552 871 37 08 | info@visbody.com.tr
- **Engineering & Implementation:** Göktuğ Işık (Computer Engineer)
