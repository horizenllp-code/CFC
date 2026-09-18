import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Anchor, 
  Globe, 
  Truck, 
  Train, 
  Warehouse, 
  PackageCheck, 
  Boxes, 
  Layers, 
  Activity, 
  ArrowRight,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

import heroEcosystemImage from '../assets/images/hero_logistics.jpg';
import warehouseImage from '../assets/images/module_warehouse.jpg';
import roadFreightImage from '../assets/images/module_road.jpg';
import portTerminalImage from '../assets/images/module_port.jpg';
import railFreightImage from '../assets/images/module_rail.jpg';
import oceanFreightImage from '../assets/images/module_ocean.jpg';
import fulfilmentImage from '../assets/images/module_fulfilment.jpg';
import distributionImage from '../assets/images/module_distribution.jpg';

export interface CinematicPlane {
  id: string;
  category: string;
  title: string;
  telemetryCode: string;
  metricBadge: string;
  shortDesc: string;
  specs: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: 'sky' | 'amber' | 'emerald' | 'rose' | 'orange' | 'indigo';
  // Spatial coordinates per stage (0: Origin, 1: Transport, 2: Warehouse, 3: Distribution, 4: Connected)
  stageCoords: Record<number, {
    x: number;       // percentage offset from center (biased toward right)
    y: number;       // percentage offset from center
    z: number;       // depth in pixels
    rx: number;      // tilt X deg
    ry: number;      // tilt Y deg
    scale: number;   // scale factor
    opacity: number; // opacity
    prominence: 'hero' | 'supporting' | 'ambient';
  }>;
}

interface SupplyChainInMotionProps {
  activeStage?: number;
  scrollProgress?: number;
  onExploreCategory?: (categoryId: string) => void;
  onOpenQuote?: () => void;
}

export const SupplyChainInMotion: React.FC<SupplyChainInMotionProps> = ({
  activeStage = 0,
  scrollProgress = 0,
  onExploreCategory,
  onOpenQuote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredPlaneId, setHoveredPlaneId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    window.addEventListener('resize', checkViewport);

    const timer = setTimeout(() => setMounted(true), 150);
    return () => {
      window.removeEventListener('resize', checkViewport);
      motionQuery.removeEventListener('change', handleMotion);
      clearTimeout(timer);
    };
  }, []);

  // Subtle cursor parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredPlaneId(null);
  };

  // 8 Large Cinematic Logistics Planes
  const planes: CinematicPlane[] = useMemo(() => [
    {
      id: 'port',
      category: 'PORT TERMINAL & CUSTOMS',
      title: 'Deep-Water Gateway Operations',
      telemetryCode: 'NODE_01 // JNPT • MUNDRA • PIPAVAV',
      metricBadge: 'DIRECT PORT DELIVERY (DPD)',
      shortDesc: 'On-dock container de-stuffing, expedited customs examination lanes, and direct maritime terminal transfers.',
      specs: ['Direct Port Delivery (DPD) Priority', 'On-Dock Customs Verification'],
      image: portTerminalImage,
      icon: Anchor,
      accent: 'sky',
      stageCoords: {
        0: { x: 22, y: -4, z: 90, rx: 4, ry: -8, scale: 1.25, opacity: 1, prominence: 'hero' },
        1: { x: 38, y: -26, z: -20, rx: 8, ry: -12, scale: 0.85, opacity: 0.55, prominence: 'supporting' },
        2: { x: 42, y: -30, z: -50, rx: 10, ry: -14, scale: 0.72, opacity: 0.35, prominence: 'ambient' },
        3: { x: 44, y: -32, z: -70, rx: 12, ry: -16, scale: 0.65, opacity: 0.25, prominence: 'ambient' },
        4: { x: 28, y: -22, z: 35, rx: 6, ry: -10, scale: 0.96, opacity: 0.92, prominence: 'supporting' },
      }
    },
    {
      id: 'ocean',
      category: 'GLOBAL FREIGHT FORWARDING',
      title: 'Ocean Carrier & Multi-Modal Corridors',
      telemetryCode: 'NODE_02 // GLOBAL NVOCC ALLIANCES',
      metricBadge: 'FCL & LCL CONSOLIDATION',
      shortDesc: 'Tier-1 container liner slots, global sea-freight chartering, and multimodal cross-border documentation.',
      specs: ['Tier-1 Container Carrier Slots', 'Multimodal Bill of Lading (MBL)'],
      image: oceanFreightImage,
      icon: Globe,
      accent: 'indigo',
      stageCoords: {
        0: { x: 44, y: 16, z: 65, rx: -3, ry: -14, scale: 1.12, opacity: 0.95, prominence: 'hero' },
        1: { x: 48, y: -10, z: -35, rx: 6, ry: -16, scale: 0.76, opacity: 0.45, prominence: 'supporting' },
        2: { x: 46, y: -22, z: -60, rx: 8, ry: -16, scale: 0.68, opacity: 0.3, prominence: 'ambient' },
        3: { x: 48, y: -24, z: -75, rx: 10, ry: -18, scale: 0.62, opacity: 0.22, prominence: 'ambient' },
        4: { x: 42, y: -12, z: 25, rx: 5, ry: -12, scale: 0.88, opacity: 0.85, prominence: 'supporting' },
      }
    },
    {
      id: 'road',
      category: 'ROAD TRANSPORTATION FLEET',
      title: '1,580 Fleet Highway Network',
      telemetryCode: 'NODE_03 // 100% GPS TELEMATICS',
      metricBadge: '1,580 HEAVY COMMERCIAL FLEET',
      shortDesc: 'Pan-India national highway trunk haulage with continuous satellite tracking, geo-fenced routes, and I.B.A. certification.',
      specs: ['1,580 Heavy Prime Movers & Trailers', 'I.B.A. Approved DLC-1461'],
      image: roadFreightImage,
      icon: Truck,
      accent: 'orange',
      stageCoords: {
        0: { x: 26, y: 34, z: -20, rx: -8, ry: -10, scale: 0.82, opacity: 0.45, prominence: 'supporting' },
        1: { x: 20, y: -2, z: 95, rx: 3, ry: -6, scale: 1.28, opacity: 1, prominence: 'hero' },
        2: { x: 22, y: 32, z: -15, rx: -6, ry: -8, scale: 0.85, opacity: 0.55, prominence: 'supporting' },
        3: { x: 38, y: 30, z: -40, rx: -8, ry: -12, scale: 0.72, opacity: 0.35, prominence: 'ambient' },
        4: { x: 18, y: 26, z: 40, rx: -6, ry: -8, scale: 0.98, opacity: 0.92, prominence: 'supporting' },
      }
    },
    {
      id: 'rail',
      category: 'INTERMODAL RAIL HAULAGE',
      title: 'Scheduled Container Rail Rakes',
      telemetryCode: 'NODE_04 // PORT-TO-ICD CORRIDORS',
      metricBadge: 'SCHEDULED RAIL RAKES',
      shortDesc: 'High-volume intermodal freight trains bridging coastal maritime ports directly with inland container dry ports.',
      specs: ['Direct Maritime Port-to-ICD Rakes', 'Low Carbon & High Capacity Transit'],
      image: railFreightImage,
      icon: Train,
      accent: 'emerald',
      stageCoords: {
        0: { x: 42, y: -26, z: -40, rx: 8, ry: -14, scale: 0.74, opacity: 0.35, prominence: 'ambient' },
        1: { x: 42, y: 18, z: 70, rx: -4, ry: -12, scale: 1.15, opacity: 0.95, prominence: 'hero' },
        2: { x: 40, y: 24, z: -25, rx: -6, ry: -12, scale: 0.8, opacity: 0.5, prominence: 'supporting' },
        3: { x: 44, y: 26, z: -50, rx: -8, ry: -14, scale: 0.68, opacity: 0.3, prominence: 'ambient' },
        4: { x: 36, y: 24, z: 30, rx: -5, ry: -10, scale: 0.9, opacity: 0.88, prominence: 'supporting' },
      }
    },
    {
      id: 'warehouse',
      category: 'STRATEGIC WAREHOUSING',
      title: '360,000+ Sq. Ft. High-Bay Storage',
      telemetryCode: 'NODE_05 // HIGH-BAY VNA RACKING',
      metricBadge: '360,000+ SQ. FT. COVERED',
      shortDesc: 'Engineered high-density pallet racking, automated FIFO/LIFO batch tracking, and direct factory assembly line replenishment.',
      specs: ['High-Bay VNA Racking Systems', 'Real-Time WMS & ERP Integration'],
      image: warehouseImage,
      icon: Warehouse,
      accent: 'amber',
      stageCoords: {
        0: { x: 38, y: -16, z: -50, rx: 6, ry: -12, scale: 0.7, opacity: 0.3, prominence: 'ambient' },
        1: { x: 36, y: -22, z: -20, rx: 6, ry: -10, scale: 0.82, opacity: 0.55, prominence: 'supporting' },
        2: { x: 22, y: -2, z: 100, rx: 2, ry: -6, scale: 1.3, opacity: 1, prominence: 'hero' },
        3: { x: 38, y: -20, z: -15, rx: 6, ry: -12, scale: 0.85, opacity: 0.6, prominence: 'supporting' },
        4: { x: 24, y: -4, z: 45, rx: 2, ry: -8, scale: 1.02, opacity: 0.95, prominence: 'hero' },
      }
    },
    {
      id: 'fulfilment',
      category: '3PL & VALUE-ADDED SERVICES',
      title: 'High-Speed Custom Fulfilment',
      telemetryCode: 'NODE_06 // PICK, PACK & REVERSE',
      metricBadge: 'VALUE-ADDED 3PL OPERATIONS',
      shortDesc: 'Automated sortation conveyors, custom retail bundling, shrink-wrapping, barcode tagging, and reverse logistics recovery.',
      specs: ['Automated Sortation & Kitting', 'Barcode Verification & Traceability'],
      image: fulfilmentImage,
      icon: PackageCheck,
      accent: 'rose',
      stageCoords: {
        0: { x: 44, y: 30, z: -60, rx: -8, ry: -14, scale: 0.68, opacity: 0.25, prominence: 'ambient' },
        1: { x: 42, y: 32, z: -40, rx: -8, ry: -12, scale: 0.74, opacity: 0.35, prominence: 'ambient' },
        2: { x: 42, y: 16, z: 20, rx: -4, ry: -12, scale: 0.9, opacity: 0.75, prominence: 'supporting' },
        3: { x: 20, y: -4, z: 88, rx: 2, ry: -6, scale: 1.22, opacity: 1, prominence: 'hero' },
        4: { x: 40, y: 14, z: 32, rx: -3, ry: -10, scale: 0.92, opacity: 0.88, prominence: 'supporting' },
      }
    },
    {
      id: 'distribution',
      category: 'REGIONAL DISTRIBUTION HUBS',
      title: 'Cross-Docking & Regional Depots',
      telemetryCode: 'NODE_07 // NEAR-ZERO DWELL TIME',
      metricBadge: 'PAN-INDIA HUB-AND-SPOKE',
      shortDesc: 'Rapid cross-dock platforms, scheduled dealer deliveries, and guaranteed delivery windows with electronic Proof-of-Delivery.',
      specs: ['Cross-Dock Platforms with Zero Dwell', 'Electronic Proof-of-Delivery (e-POD)'],
      image: distributionImage,
      icon: Boxes,
      accent: 'sky',
      stageCoords: {
        0: { x: 48, y: 32, z: -70, rx: -10, ry: -16, scale: 0.65, opacity: 0.22, prominence: 'ambient' },
        1: { x: 46, y: 34, z: -50, rx: -8, ry: -14, scale: 0.7, opacity: 0.3, prominence: 'ambient' },
        2: { x: 44, y: 28, z: -15, rx: -6, ry: -12, scale: 0.82, opacity: 0.55, prominence: 'supporting' },
        3: { x: 38, y: 16, z: 80, rx: -4, ry: -10, scale: 1.18, opacity: 0.98, prominence: 'hero' },
        4: { x: 34, y: 30, z: 28, rx: -6, ry: -8, scale: 0.88, opacity: 0.85, prominence: 'supporting' },
      }
    },
    {
      id: 'integrated',
      category: 'SINGLE-WINDOW CONTROL',
      title: 'Integrated Supply Chain Ecosystem',
      telemetryCode: 'NODE_08 // NATIONAL CONTROL TOWER',
      metricBadge: 'SINGLE-WINDOW ORCHESTRATION',
      shortDesc: 'End-to-end synchronization uniting purchasing, manufacturing, warehouse storage, and dealer distribution under one single window.',
      specs: ['End-to-End Operational Visibility', '24/7 National Command Tower'],
      image: heroEcosystemImage,
      icon: Layers,
      accent: 'amber',
      stageCoords: {
        0: { x: 32, y: -24, z: -30, rx: 6, ry: -10, scale: 0.78, opacity: 0.4, prominence: 'supporting' },
        1: { x: 30, y: -26, z: -25, rx: 6, ry: -10, scale: 0.8, opacity: 0.45, prominence: 'supporting' },
        2: { x: 18, y: -28, z: 15, rx: 6, ry: -6, scale: 0.88, opacity: 0.7, prominence: 'supporting' },
        3: { x: 24, y: -26, z: 20, rx: 6, ry: -8, scale: 0.88, opacity: 0.75, prominence: 'supporting' },
        4: { x: 22, y: -2, z: 110, rx: 0, ry: -4, scale: 1.32, opacity: 1, prominence: 'hero' },
      }
    }
  ], []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none transition-opacity duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ perspective: reducedMotion ? 'none' : '1500px' }}
    >
      {/* Cinematic Deep Atmospheric Background */}
      <div className="absolute inset-0 bg-[#050d18] pointer-events-none" />

      {/* Atmospheric Spatial Depth Gradients */}
      <div 
        className="absolute top-1/4 right-1/4 w-[750px] h-[550px] rounded-full bg-sky-600/12 blur-[140px] pointer-events-none transition-transform duration-700"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 16}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 w-[650px] h-[450px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none transition-transform duration-700"
        style={{
          transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -14}px)`
        }}
      />

      {/* Industrial Perspective Grid Floor (Subtle deep architectural structure) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '54px 54px',
          transform: reducedMotion 
            ? 'none' 
            : `rotateX(66deg) translateY(-14%) translateZ(-120px) rotateZ(${mousePos.x * 1.8}deg)`,
          transformOrigin: '65% 65%',
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* 3D Spatial Canvas Wrapper */}
      <div 
        className="w-full h-full relative"
        style={{
          transformStyle: reducedMotion ? 'flat' : 'preserve-3d',
          transform: reducedMotion 
            ? 'none' 
            : `rotateY(${mousePos.x * 3.5}deg) rotateX(${-mousePos.y * 2.5}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Subtle Animated Conduits connecting supply chain nodes */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          viewBox="-200 -200 400 400"
          style={{ transform: reducedMotion ? 'none' : 'translateZ(10px)' }}
        >
          <defs>
            <linearGradient id="cfcLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="cfcGlowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Center-Right Orbital & Corridor Vectors */}
          <path 
            d="M 60 -110 Q 150 -60 110 50" 
            fill="none" 
            stroke={activeStage === 0 ? '#38BDF8' : 'rgba(56, 189, 248, 0.2)'} 
            strokeWidth={activeStage === 0 ? 2.5 : 1.4} 
            strokeDasharray="6 4"
            className="transition-all duration-500"
          />
          <path 
            d="M 110 50 Q 80 120 40 140" 
            fill="none" 
            stroke={activeStage === 1 ? '#F59E0B' : 'rgba(245, 158, 11, 0.2)'} 
            strokeWidth={activeStage === 1 ? 2.5 : 1.4} 
            strokeDasharray="5 4"
            className="transition-all duration-500"
          />
          <path 
            d="M 40 140 Q -10 110 60 -20" 
            fill="none" 
            stroke={activeStage === 2 ? '#F59E0B' : 'rgba(245, 158, 11, 0.18)'} 
            strokeWidth={activeStage === 2 ? 2.5 : 1.4} 
            strokeDasharray="6 4"
            className="transition-all duration-500"
          />
          <path 
            d="M 60 -20 Q 130 0 110 90" 
            fill="none" 
            stroke={activeStage === 3 ? '#FB7185' : 'rgba(251, 113, 133, 0.2)'} 
            strokeWidth={activeStage === 3 ? 2.5 : 1.4} 
            strokeDasharray="5 4"
            className="transition-all duration-500"
          />

          {/* Continuous flowing pulses */}
          {!reducedMotion && (
            <>
              <circle r="3" fill="#38BDF8" filter="url(#cfcGlowBlur)">
                <animateMotion 
                  path="M 60 -110 Q 150 -60 110 50" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <circle r="3" fill="#F59E0B" filter="url(#cfcGlowBlur)">
                <animateMotion 
                  path="M 110 50 Q 80 120 40 140" 
                  dur="4.5s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <circle r="3" fill="#10B981" filter="url(#cfcGlowBlur)">
                <animateMotion 
                  path="M 40 140 Q -10 110 60 -20" 
                  dur="4.2s" 
                  repeatCount="indefinite" 
                />
              </circle>
            </>
          )}
        </svg>

        {/* 8 Large Photographic Planes / Cinematic Surfaces */}
        {planes.map((plane) => {
          const coords = plane.stageCoords[activeStage] || plane.stageCoords[0];
          const isHovered = hoveredPlaneId === plane.id;
          const isHero = coords.prominence === 'hero';
          const isSupporting = coords.prominence === 'supporting';

          // Visual calculations for scale, depth, and positioning
          let posX = isMobile ? coords.x * 0.4 + 10 : coords.x;
          let posY = isMobile ? coords.y * 0.5 : coords.y;
          let zDepth = coords.z;
          let scaleFactor = coords.scale * (isMobile ? 0.78 : 1.0);
          let currentOpacity = coords.opacity;

          if (isHovered) {
            zDepth += 45;
            scaleFactor *= 1.08;
            currentOpacity = 1;
          } else if (hoveredPlaneId) {
            zDepth -= 15;
            scaleFactor *= 0.96;
            currentOpacity *= 0.65;
          }

          // Mouse parallax per layer
          const parallaxMultiplier = zDepth > 60 ? 1.3 : zDepth > 0 ? 0.8 : 0.4;
          const px = mousePos.x * 14 * parallaxMultiplier;
          const py = mousePos.y * 10 * parallaxMultiplier;

          const Icon = plane.icon;

          return (
            <div
              key={plane.id}
              onMouseEnter={() => setHoveredPlaneId(plane.id)}
              onMouseLeave={() => setHoveredPlaneId(null)}
              onClick={() => {
                if (onExploreCategory) {
                  onExploreCategory(plane.id);
                }
              }}
              className={`absolute transition-all duration-700 pointer-events-auto cursor-pointer ${
                isHovered ? 'z-40' : isHero ? 'z-30' : isSupporting ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `calc(50% + ${posX}%)`,
                top: `calc(50% + ${posY}%)`,
                transform: reducedMotion
                  ? `translate(-50%, -50%) scale(${scaleFactor})`
                  : `
                    translate(-50%, -50%)
                    translate3d(${px}px, ${py}px, ${zDepth}px)
                    rotateX(${coords.rx}deg)
                    rotateY(${coords.ry}deg)
                    scale(${scaleFactor})
                  `,
                opacity: currentOpacity,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Large Dimensional Photographic Plane */}
              <div 
                className={`relative rounded-xl overflow-hidden backdrop-blur-md transition-all duration-500 group ${
                  isHero
                    ? 'w-[320px] sm:w-[420px] md:w-[460px] lg:w-[490px] xl:w-[530px] h-[210px] sm:h-[260px] md:h-[290px] lg:h-[310px] xl:h-[330px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/20'
                    : 'w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[170px] sm:h-[200px] md:h-[225px] lg:h-[240px] shadow-[0_15px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10'
                } ${
                  isHovered 
                    ? 'ring-2 ring-amber-400 shadow-[0_30px_70px_rgba(245,158,11,0.25)]' 
                    : isHero
                    ? 'ring-1 ring-amber-400/50'
                    : ''
                }`}
              >
                {/* Genuine Photographic Surface */}
                <img 
                  src={plane.image} 
                  alt={plane.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                  loading="lazy"
                />

                {/* Film Noir / Atmospheric Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040c17]/95 via-[#040c17]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#040c17]/70 via-transparent to-[#040c17]/40" />

                {/* Subtle Chamfered Edge Highlight */}
                <div className="absolute inset-0 border border-white/15 rounded-xl pointer-events-none" />

                {/* Restrained Telemetry Micro-Badges */}
                <div className="absolute top-2.5 sm:top-3 left-3 right-3 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-300 pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#050e1a]/85 border border-slate-700/80 backdrop-blur-sm">
                    <Icon className="w-3 h-3 text-amber-400" />
                    <span className="font-bold tracking-wider uppercase truncate max-w-[170px]">
                      {plane.category}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-xs bg-[#050e1a]/70 text-slate-400 text-[8px] font-mono border border-slate-800">
                    {plane.telemetryCode}
                  </span>
                </div>

                {/* Bottom Photographic Editorial Plate */}
                <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 pointer-events-none">
                  <div className="inline-block mb-1">
                    <span className="px-2 py-0.5 rounded-xs bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                      {plane.metricBadge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white uppercase font-heading tracking-wide leading-tight truncate drop-shadow-md">
                    {plane.title}
                  </h3>
                  
                  {/* Progressive Specifications Reveal on Hover */}
                  {isHovered && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-300 animate-fadeIn">
                      <span className="text-amber-300 font-mono truncate max-w-[280px]">
                        • {plane.specs[0]}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 font-mono text-[9px] shrink-0 ml-2">
                        INSPECT <ArrowRight className="w-2.5 h-2.5 text-amber-400" />
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}

        {/* Central Anchor Monolith: CFC CORE (Stage 5 Dominant) */}
        {activeStage === 4 && (
          <div 
            className="absolute left-[62%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-700"
            style={{
              transform: reducedMotion ? 'translate(-50%, -50%)' : `translate(-50%, -50%) translateZ(120px) scale(1.1)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="w-40 h-40 rounded-2xl bg-[#071728]/95 border-2 border-amber-400 ring-4 ring-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.35)] flex flex-col items-center justify-center p-3 text-center backdrop-blur-md">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mb-1.5">
                <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div className="text-xs font-black tracking-widest text-white uppercase font-heading">
                CFC CORE
              </div>
              <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-mono">
                SINGLE-WINDOW
              </div>
              <div className="mt-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[8px] text-slate-300 font-mono tracking-wider">
                ORCHESTRATION
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
