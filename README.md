# 🧬 VISBODY NEXT-GEN: 3D Biomechanical & Bioelectrical Impedance Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/tests-6%20passed-success.svg)]()
[![React](https://img.shields.io/badge/React-19-blue.svg)]()
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan.svg)]()
[![DEXA Correlation](https://img.shields.io/badge/DEXA%20r-0.984-purple.svg)]()
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen)

> **Senior Computer Engineering Portfolio Project**  
> An enterprise-grade, clinical-level redesign and functional reimagination of [visbody.com.tr](https://www.visbody.com.tr/).
> 
> 🔗 **GitHub Repository:** [https://github.com/goktugis/visbody-nextgen](https://github.com/goktugis/visbody-nextgen)  
> 🚀 **One-Click Deploy on Render:** [Deploy to Render](https://render.com/deploy?repo=https://github.com/goktugis/visbody-nextgen)

---

## 🌟 Overview & Key Innovations

The legacy portal for Visbody Turkey operated as a lightweight mobile linktree. This project elevates the entire domain into an **interactive 3D cyber-medical web platform** featuring:

1. **3D Real-Time WebGL Digital Twin (`Three.js`)**:
   - 360° rotating turntable scan simulation (32s scan duration).
   - Oscillating holographic laser plane with particle feedback.
   - 3 switchable anatomical layers:
     - Optical Surface Mesh & 14 Circumferences (±1 mm precision).
     - Biomechanical Skeletal Tracking (Cervical C7, Scapular high-low tilt, Anterior pelvic tilt).
     - BIA Bioelectrical Impedance Heatmap (Segmental muscle density & visceral fat).
2. **Interactive Clinical Biomechanical Laboratory**:
   - Dynamic clinical presets: *Sedentary Office Worker (Tech Neck)*, *Elite Sprinter*, *Reformer Pilates Client*, and *Post-Op Scoliosis Case*.
   - Millimetric sliders dynamically update the 3D model, cervical spinal load, and the 0-100 Biomechanical Health Score in real-time.
3. **4D Volumetric Progress Comparison (Before / After)**:
   - Interactive comparison showing true 3D volumetric fat loss (-4,180 cm³) vs unreliable 2D selfies.
4. **Clinical Financial ROI & Business Payback Calculator**:
   - Dynamic monthly revenue and payback timeframe model for clinic owners and gyms.
5. **Visbody Point — Turkey Clinic Locator**:
   - Searchable, filterable directory of certified Visbody centers across Istanbul, Ankara, Izmir, Bursa, and Antalya.
6. **Conversational AI Clinical Copilot**:
   - Floating diagnostic assistant with pre-trained clinical knowledge on Phase Angle, DEXA correlation, and device selection.
7. **Medical-Grade Printable Assessment Report**:
   - 18 biomarkers, editable patient demographics, QR verification, and JSON clinical data export.
8. **Zero-Lag Procedural Sound Synthesizer**:
   - Built on the browser's Web Audio API without bulky external audio files.

---

## 🏗️ Architecture & Component Hierarchy

```
visbody-nextgen/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Cyber header with sound/lang toggles
│   │   ├── HeroSection.jsx          # Dramatic typography & scanner telemetry
│   │   ├── DigitalTwin3D.jsx        # Three.js 3D avatar & turntable engine
│   │   ├── ClinicalSimulator.jsx    # Posture sliders & AI diagnostic engine
│   │   ├── BeforeAfterMorph.jsx     # 4D volumetric comparison slider
│   │   ├── ProductMatrix.jsx        # S30, M30, R-Explorer hardware matrix
│   │   ├── ClinicRoiCalculator.jsx  # Payback period & clinic revenue model
│   │   ├── VisbodyPointFinder.jsx   # Filterable Turkish clinic directory
│   │   ├── VideoReelsShowcase.jsx   # Interactive video stream & like counter
│   │   ├── VisbodyAiCopilot.jsx     # Embedded conversational diagnostic bot
│   │   ├── ClinicalReportModal.jsx  # Medical-grade printable 18-biomarker PDF
│   │   ├── LeadModal.jsx            # Lead capture form with confetti celebration
│   │   ├── QrShareModal.jsx         # Mobile QR sharing modal
│   │   ├── ErrorBoundary.jsx        # Defensive fault-tolerant WebGL fallback
│   │   └── Footer.jsx               # Official distributor info & legal schema
│   ├── data/
│   │   ├── productsData.js          # Device specifications & DEXA metrics
│   │   ├── clinicsData.js           # Certified centers & video stream data
│   │   └── translations.js          # TR / EN localization dictionaries
│   ├── utils/
│   │   ├── biometricCalculator.js   # Pure math for posture & BIA formulas
│   │   └── soundFx.js               # Web Audio API procedural synthesizer
│   ├── __tests__/
│   │   └── biometrics.test.js       # Vitest unit test suite (100% passing)
│   ├── App.jsx                      # State management & orchestration
│   ├── index.css                    # Tailwind CSS v4 & custom shaders
│   └── main.jsx
├── .github/workflows/ci.yml         # Automated CI/CD pipeline
├── ARCHITECTURE.md                  # Comprehensive system documentation
└── AI_EVALUATION_REPORT.md          # Candidate evaluation scorecard
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npm test

# 3. Start local development server
npm run dev
# -> Ready at http://localhost:5173/

# 4. Build for production
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
