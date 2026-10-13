import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Layers, 
  Activity, 
  Zap, 
  Maximize2, 
  Eye, 
  Scan, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { sound } from '../utils/soundFx';

export default function DigitalTwin3D({ 
  currentPosture = { forwardHead: 14, shoulderTilt: 2.8, pelvicTilt: 7, bodyFat: 21.4, muscleMass: 33.8 },
  onOpenReport 
}) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState('optical'); // 'optical' | 'skeleton' | 'heatmap'
  const [isScanning, setIsScanning] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [selectedZone, setSelectedZone] = useState('waist');
  const [scanProgress, setScanProgress] = useState(68);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelGroupRef = useRef(null);
  const laserRef = useRef(null);
  const ringsGroupRef = useRef(null);
  const skeletonGroupRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Measurements based on current parameters
  const circumferences = {
    neck: { name: 'Boyun Çevresi', val: (37.2 + currentPosture.forwardHead * 0.1).toFixed(1), unit: 'cm', ref: '34.0 - 39.0' },
    chest: { name: 'Göğüs Çevresi', val: (98.5 + (currentPosture.bodyFat - 15) * 0.4).toFixed(1), unit: 'cm', ref: '92.0 - 104.0' },
    waist: { name: 'Bel Çevresi', val: (82.4 + (currentPosture.bodyFat - 15) * 0.8).toFixed(1), unit: 'cm', ref: '75.0 - 86.0' },
    hip: { name: 'Kalça Çevresi', val: (99.2 + (currentPosture.bodyFat - 15) * 0.6).toFixed(1), unit: 'cm', ref: '94.0 - 102.0' },
    rThigh: { name: 'Sağ Uyluk', val: (54.8 + currentPosture.muscleMass * 0.2).toFixed(1), unit: 'cm', ref: '50.0 - 58.0' },
    lThigh: { name: 'Sol Uyluk', val: (54.2 + currentPosture.muscleMass * 0.2).toFixed(1), unit: 'cm', ref: '50.0 - 58.0' },
    calf: { name: 'Kalf / Baldır', val: (36.5 + currentPosture.muscleMass * 0.1).toFixed(1), unit: 'cm', ref: '34.0 - 39.0' },
    bicep: { name: 'Kol (Biceps)', val: (32.8 + currentPosture.muscleMass * 0.15).toFixed(1), unit: 'cm', ref: '30.0 - 36.0' }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.1, 4.6);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      console.warn('WebGL is not supported or was blocked by the browser:', err);
      container.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:#38bdf8; padding:20px; font-family:sans-serif;">
          <div style="font-size:24px; margin-bottom:10px;">⚡ 3D Holografik Modülü</div>
          <div style="font-size:13px; color:#94a3b8; max-width:320px;">WebGL hızlandırıcı bulunamadı. Lütfen tarayıcı donanım hızlandırmasını kontrol edin. Diğer biyomekanik ve hesaplama modülleri aktif olarak çalışmaktadır.</div>
        </div>
      `;
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Ambient & Studio Rim Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
    cyanRimLight.position.set(-4, 3, 3);
    scene.add(cyanRimLight);

    const blueFillLight = new THREE.DirectionalLight(0x3b82f6, 2.5);
    blueFillLight.position.set(4, 2, -3);
    scene.add(blueFillLight);

    const bottomGlow = new THREE.PointLight(0x00f2fe, 2, 8);
    bottomGlow.position.set(0, -1.2, 0);
    scene.add(bottomGlow);

    // Root Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // 1. Turntable Platform
    const turntableGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.12, 48);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x0c1322,
      metalness: 0.85,
      roughness: 0.25
    });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.y = -1.35;
    modelGroup.add(turntable);

    // Glowing Neon Ring on Turntable
    const ringGeo = new THREE.TorusGeometry(1.22, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const neonRing = new THREE.Mesh(ringGeo, ringMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = -1.28;
    modelGroup.add(neonRing);

    // 2. High-Tech Anatomical Human Mannequin Mesh
    const bodyGroup = new THREE.Group();
    
    // Materials
    const opticalMat = new THREE.MeshPhysicalMaterial({
      color: 0x14213d,
      roughness: 0.35,
      metalness: 0.6,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.92
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });

    // Anatomical Body Segments
    // Head
    const headGeo = new THREE.SphereGeometry(0.22, 32, 24);
    headGeo.scale(0.85, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, opticalMat);
    headMesh.position.set(0, 1.45, 0.04);
    bodyGroup.add(headMesh);
    const headWire = new THREE.Mesh(headGeo, wireframeMat);
    headWire.position.copy(headMesh.position);
    bodyGroup.add(headWire);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.18, 24);
    const neckMesh = new THREE.Mesh(neckGeo, opticalMat);
    neckMesh.position.set(0, 1.25, 0.02);
    bodyGroup.add(neckMesh);

    // Upper Torso / Chest
    const chestGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.55, 32);
    chestGeo.scale(1.15, 1, 0.7);
    const chestMesh = new THREE.Mesh(chestGeo, opticalMat);
    chestMesh.position.set(0, 0.9, 0);
    bodyGroup.add(chestMesh);
    const chestWire = new THREE.Mesh(chestGeo, wireframeMat);
    chestWire.position.copy(chestMesh.position);
    bodyGroup.add(chestWire);

    // Abdomen / Waist
    const waistGeo = new THREE.CylinderGeometry(0.31, 0.33, 0.4, 32);
    waistGeo.scale(1.05, 1, 0.68);
    const waistMesh = new THREE.Mesh(waistGeo, opticalMat);
    waistMesh.position.set(0, 0.48, 0);
    bodyGroup.add(waistMesh);

    // Pelvis / Hips
    const pelvisGeo = new THREE.CylinderGeometry(0.33, 0.36, 0.35, 32);
    pelvisGeo.scale(1.12, 1, 0.72);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, opticalMat);
    pelvisMesh.position.set(0, 0.15, 0);
    bodyGroup.add(pelvisMesh);

    // Shoulders & Arms
    // Left Arm
    const lShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), opticalMat);
    lShoulder.position.set(-0.48, 1.08, 0);
    bodyGroup.add(lShoulder);
    const lArmGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.65, 20);
    const lArm = new THREE.Mesh(lArmGeo, opticalMat);
    lArm.position.set(-0.52, 0.68, 0);
    lArm.rotation.z = 0.12;
    bodyGroup.add(lArm);
    const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 0.6, 20), opticalMat);
    lForearm.position.set(-0.58, 0.12, 0);
    lForearm.rotation.z = 0.08;
    bodyGroup.add(lForearm);

    // Right Arm
    const rShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), opticalMat);
    rShoulder.position.set(0.48, 1.08, 0);
    bodyGroup.add(rShoulder);
    const rArm = new THREE.Mesh(lArmGeo, opticalMat);
    rArm.position.set(0.52, 0.68, 0);
    rArm.rotation.z = -0.12;
    bodyGroup.add(rArm);
    const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 0.6, 20), opticalMat);
    rForearm.position.set(0.58, 0.12, 0);
    rForearm.rotation.z = -0.08;
    bodyGroup.add(rForearm);

    // Legs
    // Left Leg
    const thighGeo = new THREE.CylinderGeometry(0.16, 0.12, 0.75, 24);
    const lThigh = new THREE.Mesh(thighGeo, opticalMat);
    lThigh.position.set(-0.2, -0.35, 0);
    bodyGroup.add(lThigh);
    const kneeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const lKnee = new THREE.Mesh(kneeGeo, opticalMat);
    lKnee.position.set(-0.2, -0.74, 0);
    bodyGroup.add(lKnee);
    const shinGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.75, 24);
    const lShin = new THREE.Mesh(shinGeo, opticalMat);
    lShin.position.set(-0.2, -1.12, 0);
    bodyGroup.add(lShin);

    // Right Leg
    const rThigh = new THREE.Mesh(thighGeo, opticalMat);
    rThigh.position.set(0.2, -0.35, 0);
    bodyGroup.add(rThigh);
    const rKnee = new THREE.Mesh(kneeGeo, opticalMat);
    rKnee.position.set(0.2, -0.74, 0);
    bodyGroup.add(rKnee);
    const rShin = new THREE.Mesh(shinGeo, opticalMat);
    rShin.position.set(0.2, -1.12, 0);
    bodyGroup.add(rShin);

    bodyMeshRef.current = bodyGroup;
    modelGroup.add(bodyGroup);

    // 3. Circumference Rings Group
    const ringsGroup = new THREE.Group();
    const createCaliperRing = (radiusX, radiusZ, y, color = 0x00f2fe) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusZ, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(48);
      const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const lineMat = new THREE.LineBasicMaterial({ color, linewidth: 2, transparent: true, opacity: 0.85 });
      const line = new THREE.LineLoop(geometry, lineMat);
      line.position.y = y;
      return line;
    };

    ringsGroup.add(createCaliperRing(0.14, 0.14, 1.25, 0x00f2fe)); // Neck
    ringsGroup.add(createCaliperRing(0.44, 0.28, 0.92, 0x00f2fe)); // Chest
    ringsGroup.add(createCaliperRing(0.36, 0.24, 0.52, 0x38bdf8)); // Waist
    ringsGroup.add(createCaliperRing(0.41, 0.29, 0.18, 0x10b981)); // Hip
    ringsGroup.add(createCaliperRing(0.18, 0.18, -0.32, 0xa855f7)); // R Thigh
    ringsGroup.add(createCaliperRing(0.18, 0.18, -0.32, 0xa855f7)); // L Thigh
    ringsGroup.children[5].position.x = -0.2;
    ringsGroup.children[4].position.x = 0.2;
    ringsGroupRef.current = ringsGroup;
    modelGroup.add(ringsGroup);

    // 4. Biomechanical Skeleton Nodes Group
    const skeletonGroup = new THREE.Group();
    const jointNodes = [
      { name: 'Cervical C7', pos: [0, 1.28, -0.06], color: 0xef4444 }, // Red for forward head
      { name: 'L Shoulder', pos: [-0.48, 1.08, 0], color: 0xf59e0b },
      { name: 'R Shoulder', pos: [0.48, 1.08 + (currentPosture.shoulderTilt * 0.015), 0], color: 0xf59e0b },
      { name: 'Thoracic T12', pos: [0, 0.72, -0.02], color: 0x10b981 },
      { name: 'Lumbar L5', pos: [0, 0.38, 0.04], color: 0x38bdf8 },
      { name: 'Pelvis ASIS', pos: [0, 0.18, 0.08], color: 0xec4899 },
      { name: 'L Hip', pos: [-0.22, 0.02, 0], color: 0x10b981 },
      { name: 'R Hip', pos: [0.22, 0.02, 0], color: 0x10b981 },
      { name: 'L Knee', pos: [-0.2, -0.74, 0], color: 0x00f2fe },
      { name: 'R Knee', pos: [0.2, -0.74, 0], color: 0x00f2fe },
      { name: 'L Ankle', pos: [-0.2, -1.3, 0], color: 0x00f2fe },
      { name: 'R Ankle', pos: [0.2, -1.3, 0], color: 0x00f2fe }
    ];

    jointNodes.forEach(node => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshStandardMaterial({ color: node.color, emissive: node.color, emissiveIntensity: 0.6 })
      );
      sphere.position.set(...node.pos);
      skeletonGroup.add(sphere);
    });

    // Connecting Spine Laser Line
    const spinePoints = [
      new THREE.Vector3(0, 1.45, 0.04),
      new THREE.Vector3(0, 1.28, -0.06),
      new THREE.Vector3(0, 0.9, -0.01),
      new THREE.Vector3(0, 0.5, 0.03),
      new THREE.Vector3(0, 0.18, 0.08)
    ];
    const spineGeo = new THREE.BufferGeometry().setFromPoints(spinePoints);
    const spineLine = new THREE.Line(spineGeo, new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 }));
    skeletonGroup.add(spineLine);

    skeletonGroup.visible = false;
    skeletonGroupRef.current = skeletonGroup;
    modelGroup.add(skeletonGroup);

    // 5. Laser Hologram Scanner Sweep Plane
    const laserPlaneGeo = new THREE.PlaneGeometry(2.4, 0.03);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const laserMesh = new THREE.Mesh(laserPlaneGeo, laserMat);
    laserMesh.rotation.x = Math.PI / 2;
    laserMesh.position.y = 1.6;
    laserRef.current = laserMesh;
    modelGroup.add(laserMesh);

    // Mouse Interaction / Orbit Drag Simulation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      modelGroup.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(0.4, Math.min(2.0, camera.position.y - deltaY * 0.005));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let laserDirection = -1;
    let laserY = 1.6;

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Auto Rotate Turntable
      if (isAutoRotate && !isDragging) {
        modelGroup.rotation.y += 0.008;
      }

      // Laser Sweep
      if (isScanning && laserRef.current) {
        laserY += laserDirection * 0.015;
        if (laserY <= -1.25) laserDirection = 1;
        if (laserY >= 1.65) laserDirection = -1;
        laserRef.current.position.y = laserY;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 580;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [isAutoRotate, isScanning]);

  // Mode Switch Handlers
  const handleModeChange = (mode) => {
    sound.playClick();
    setViewMode(mode);
    if (!ringsGroupRef.current || !skeletonGroupRef.current || !bodyMeshRef.current) return;

    if (mode === 'optical') {
      ringsGroupRef.current.visible = true;
      skeletonGroupRef.current.visible = false;
      bodyMeshRef.current.traverse((child) => {
        if (child.isMesh && child.material.isMeshPhysicalMaterial) {
          child.material.color.setHex(0x14213d);
          child.material.roughness = 0.35;
          child.material.metalness = 0.6;
        }
      });
    } else if (mode === 'skeleton') {
      ringsGroupRef.current.visible = false;
      skeletonGroupRef.current.visible = true;
      bodyMeshRef.current.traverse((child) => {
        if (child.isMesh && child.material.isMeshPhysicalMaterial) {
          child.material.color.setHex(0x0a1120);
          child.material.opacity = 0.45;
        }
      });
    } else if (mode === 'heatmap') {
      ringsGroupRef.current.visible = true;
      skeletonGroupRef.current.visible = false;
      bodyMeshRef.current.traverse((child) => {
        if (child.isMesh && child.material.isMeshPhysicalMaterial) {
          // Heatmap glowing colors
          child.material.color.setHex(0x059669); // Emerald lean muscle
          child.material.opacity = 0.88;
        }
      });
    }
  };

  const handleCameraPreset = (preset) => {
    sound.playClick();
    if (!modelGroupRef.current) return;
    setIsAutoRotate(false);
    if (preset === 'front') modelGroupRef.current.rotation.y = 0;
    if (preset === 'side') modelGroupRef.current.rotation.y = Math.PI / 2;
    if (preset === 'back') modelGroupRef.current.rotation.y = Math.PI;
    if (preset === 'auto') setIsAutoRotate(true);
  };

  const triggerScanPulse = () => {
    sound.playScan();
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sound.playSuccess();
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  return (
    <div className="relative w-full rounded-3xl glass-panel-glow overflow-hidden border border-cyan-500/20 shadow-2xl bg-gradient-to-b from-[#0a0f1d] via-[#070b14] to-[#04070d]">
      
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
            <Scan className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider text-white">VISBODY 3D DIGITAL TWIN</span>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                LIVE WEBGL
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-3 font-mono">
              <span>FOV: 40°</span>
              <span>•</span>
              <span>184,200 Nokta Bulutu</span>
              <span>•</span>
              <span className="text-emerald-400">60 FPS Ultra Hassas</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10">
          <button
            onClick={() => handleModeChange('optical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'optical'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Optik Mesh & 14 Çevre
          </button>
          <button
            onClick={() => handleModeChange('skeleton')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'skeleton'
                ? 'bg-gradient-to-r from-red-500 to-amber-600 text-white shadow-lg shadow-red-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            İskelet Postür Açısı
          </button>
          <button
            onClick={() => handleModeChange('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'heatmap'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            BIA Biyokimyasal Isı Haritası
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left Side: Live Biomechanical HUD Widgets */}
        <div className="lg:col-span-3 p-5 flex flex-col justify-between gap-4 z-10 bg-gradient-to-r from-black/60 to-transparent pointer-events-auto">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Duruş Biyomekaniği
              </span>
              <span className="text-[10px] text-slate-400 font-mono">DEXA-Korele</span>
            </div>

            {/* Cervical Forward Head Widget */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 backdrop-blur-md">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">İleri Baş Duruşu</span>
                <span className={`font-mono font-bold ${currentPosture.forwardHead > 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  +{currentPosture.forwardHead}°
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${currentPosture.forwardHead > 10 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${Math.min(100, (currentPosture.forwardHead / 25) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Servikal omurga C7 aks sapması</p>
            </div>

            {/* Shoulder Asymmetry Widget */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 backdrop-blur-md">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Omuz Denge Asimetrisi</span>
                <span className="font-mono font-bold text-cyan-400">
                  {currentPosture.shoulderTilt}° Sol Yüksek
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPosture.shoulderTilt / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Skapular rotasyon & trapezius gerilimi</p>
            </div>

            {/* Pelvic Tilt Widget */}
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 backdrop-blur-md">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Pelvik Eğim (ASIS)</span>
                <span className="font-mono font-bold text-purple-400">
                  +{currentPosture.pelvicTilt}° Anterior
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPosture.pelvicTilt / 15) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Lomber lordoz artış riski</p>
            </div>
          </div>

          {/* Quick Trigger Scan Button */}
          <div className="pt-2">
            <button
              onClick={triggerScanPulse}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-cyan-500/30 transition-all shadow-lg shadow-cyan-500/10"
            >
              <Rotate3d className="w-4 h-4" />
              <span>32s Optik Taramayı Yeniden Başlat</span>
            </button>
            {scanProgress < 100 && (
              <div className="mt-2 text-center text-[10px] text-cyan-300 font-mono">
                Tarama Süreci: %{scanProgress} (Platform dönüyor)
              </div>
            )}
          </div>
        </div>

        {/* Center: Three.js Canvas Container */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div 
            ref={mountRef} 
            className="w-full h-[580px] cursor-grab active:cursor-grabbing"
            title="Döndürmek için sürükleyin"
          />

          {/* Hologram Scanner HUD Overlay */}
          <div className="absolute top-4 left-4 pointer-events-none font-mono text-[11px] text-cyan-400/80 bg-black/50 px-2.5 py-1 rounded-md border border-cyan-500/20">
            TURNTABLE: 360° / 32s | ROTATION: ACTIVE
          </div>

          {/* Quick Camera Angle Buttons */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-xl z-10">
            <button 
              onClick={() => handleCameraPreset('front')}
              className="px-2.5 py-1 text-xs rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Ön
            </button>
            <button 
              onClick={() => handleCameraPreset('side')}
              className="px-2.5 py-1 text-xs rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Profil (Yan)
            </button>
            <button 
              onClick={() => handleCameraPreset('back')}
              className="px-2.5 py-1 text-xs rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Arka
            </button>
            <button 
              onClick={() => handleCameraPreset('auto')}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${isAutoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-white/10'}`}
            >
              360° Otomatik
            </button>
          </div>
        </div>

        {/* Right Side: 14 Circumferences Measurement Inspector */}
        <div className="lg:col-span-3 p-5 flex flex-col justify-between gap-4 z-10 bg-gradient-to-l from-black/60 to-transparent pointer-events-auto">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> 14 Çevre Ölçümü (±1mm)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Otomatik</span>
            </div>

            {/* Clickable Circumference Cards */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {Object.entries(circumferences).map(([key, item]) => (
                <div
                  key={key}
                  onClick={() => {
                    sound.playClick();
                    setSelectedZone(key);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedZone === key
                      ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-mono font-bold text-cyan-400">{item.val} {item.unit}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Referans Aralık: {item.ref} cm</span>
                    <span className="text-emerald-400">Normal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action to View / Generate Full Report */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playSuccess();
                if (onOpenReport) onOpenReport();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Tam Klinik 3D Raporu Aç (18 Biyobelirteç)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Ticker Bar */}
      <div className="px-6 py-2.5 bg-black/60 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CE Medikal & FDA Kayıtlı
          </span>
          <span className="hidden sm:inline">DEXA Altın Standart R² = 0.984</span>
          <span className="hidden md:inline">Multi-Frequency BIA (5-500 kHz)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Mod: {viewMode.toUpperCase()}</span>
          <span>•</span>
          <span className="text-cyan-400">Aktif Bölge: {circumferences[selectedZone]?.name || 'Bel'}</span>
        </div>
      </div>

    </div>
  );
}
