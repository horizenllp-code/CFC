import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { CfcLogo } from './CfcLogo';

interface HotspotData {
  id: string;
  category: string;
  description: string;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
  annotationClass: string;
  bridgeClass: string;
  iconSrc?: string;
}

interface ConnectorLine {
  bulb: { x: number; y: number };
  icon: { x: number; y: number };
}

// ---------------------------------------------------------------------------
// DESKTOP (LANDSCAPE) 16:9 CONFIGURATION
// Matches the original photograph composition (1672x941 canvas)
// ---------------------------------------------------------------------------
const DESKTOP_HOTSPOTS: HotspotData[] = [
  {
    id: 'transport',
    category: 'Transportation & Fleet',
    description: 'Pan-India multi-modal fleet managing 1,580+ commercial vehicles with active GPS tracking and schedule precision.',
    x: 41.3,
    y: 24.5,
    annotationClass: 'bottom-full mb-3 left-1/2 -translate-x-1/2 text-center items-center',
    bridgeClass: '-bottom-5 h-6 -left-6 -right-6'
  },
  {
    id: 'warehousing',
    category: 'Warehousing & Inventory',
    description: 'Strategic warehousing and inventory control across 360,000+ sq. ft. of covered capacity and ₹300+ Cr inventory asset management.',
    x: 52.0,
    y: 31.5,
    annotationClass: 'right-0 sm:right-auto sm:left-full sm:ml-3.5 top-full sm:top-1/2 mt-2 sm:mt-0 sm:-translate-y-1/2 text-left items-start',
    bridgeClass: '-left-5 w-6 -top-4 -bottom-4'
  },
  {
    id: 'airfreight',
    category: 'Freight Forwarding',
    description: 'Expedited air cargo and multi-modal freight connectivity ensuring time-critical transit across domestic and international trade lanes.',
    x: 56.0,
    y: 45.5,
    annotationClass: 'right-0 sm:right-auto sm:left-full sm:ml-3.5 top-full sm:top-1/2 mt-2 sm:mt-0 sm:-translate-y-1/2 text-left items-start',
    bridgeClass: '-left-5 w-6 -top-4 -bottom-4'
  },
  {
    id: 'network',
    category: 'Supply Chain Network',
    description: 'Comprehensive pan-India logistics network spanning 35 regional branch offices and major port terminals.',
    x: 25.5,
    y: 46.5,
    annotationClass: 'left-0 sm:left-auto sm:right-full sm:mr-3.5 top-full sm:top-1/2 mt-2 sm:mt-0 sm:-translate-y-1/2 text-left sm:text-right items-start sm:items-end',
    bridgeClass: '-right-5 w-6 -top-4 -bottom-4'
  },
  {
    id: 'security',
    category: 'Secure Handling',
    description: 'Rigorous chain-of-custody protocols, cargo escort operations, and round-the-clock facility security management.',
    x: 31.0,
    y: 62.5,
    annotationClass: 'left-0 sm:left-auto sm:right-full sm:mr-3.5 bottom-full sm:bottom-auto sm:top-1/2 mb-2 sm:mb-0 sm:-translate-y-1/2 text-left sm:text-right items-start sm:items-end',
    bridgeClass: '-right-5 w-6 -top-4 -bottom-4'
  },
  {
    id: 'compliance',
    category: 'Documentation & Compliance',
    description: 'Customs clearance at major port gateways, statutory E-Way documentation, and I.B.A. approved carrier documentation.',
    x: 50.5,
    y: 61.0,
    annotationClass: 'right-0 sm:right-auto sm:left-full sm:ml-3.5 bottom-full sm:bottom-auto sm:top-1/2 mb-2 sm:mb-0 sm:-translate-y-1/2 text-left items-start',
    bridgeClass: '-left-5 w-6 -top-4 -bottom-4'
  },
  {
    id: 'operations',
    category: 'Value-Added Operations',
    description: 'Customized industrial packaging, palletization, shrink-wrapping, and synchronized factory replenishment staging.',
    x: 41.0,
    y: 70.5,
    annotationClass: 'top-full mt-3 left-1/2 -translate-x-1/2 text-center items-center',
    bridgeClass: '-top-5 h-6 -left-6 -right-6'
  },
  {
    id: 'distribution',
    category: 'Distribution & Fulfilment',
    description: 'Structured B2B order fulfillment, retail distribution dispatch, and single-window inventory administration.',
    x: 29.8,
    y: 31.5,
    annotationClass: 'left-0 sm:left-auto sm:right-full sm:mr-3.5 top-full sm:top-1/2 mt-2 sm:mt-0 sm:-translate-y-1/2 text-left sm:text-right items-start sm:items-end',
    bridgeClass: '-right-5 w-6 -top-4 -bottom-4'
  }
];

const DESKTOP_CONNECTOR_PATHS: Record<string, ConnectorLine> = {
  transport: {
    bulb: { x: 684.5, y: 405.0 },
    icon: { x: 684.5, y: 269.0 }
  },
  warehousing: {
    bulb: { x: 705.0, y: 418.0 },
    icon: { x: 850.0, y: 306.0 }
  },
  airfreight: {
    bulb: { x: 715.0, y: 434.0 },
    icon: { x: 890.0, y: 434.0 }
  },
  network: {
    bulb: { x: 655.0, y: 434.0 },
    icon: { x: 445.0, y: 434.0 }
  },
  security: {
    bulb: { x: 660.0, y: 464.0 },
    icon: { x: 550.0, y: 555.0 }
  },
  compliance: {
    bulb: { x: 710.0, y: 450.0 },
    icon: { x: 815.0, y: 550.0 }
  },
  operations: {
    bulb: { x: 684.5, y: 465.0 },
    icon: { x: 685.5, y: 632.0 }
  },
  distribution: {
    bulb: { x: 660.0, y: 416.0 },
    icon: { x: 500.0, y: 308.0 }
  }
};

// ---------------------------------------------------------------------------
// DEDICATED PORTRAIT (9:16) CONFIGURATION
// Beautifully balanced, non-overlapping constellation around the central lightbulb (1080x1920)
// Central lightbulb is at (540, 885.5) = (50.0%, 46.12%)
// Guaranteed generous physical separation between all 8 capability icons (330px+ separation)
// ---------------------------------------------------------------------------
const PORTRAIT_HOTSPOTS: HotspotData[] = [
  {
    id: 'transport',
    category: 'Transportation & Fleet',
    description: 'Pan-India fleet of 1,580+ vehicles with GPS tracking and schedule precision.',
    x: 50.0,
    y: 19.0,
    annotationClass: 'top-full mt-2.5 left-1/2 -translate-x-1/2 text-center items-center w-48 max-w-[70vw]',
    bridgeClass: '-bottom-4 h-5 -left-8 -right-8',
    iconSrc: '/assets/images/icons/transport.png'
  },
  {
    id: 'distribution',
    category: 'Distribution & Fulfilment',
    description: 'Structured B2B order fulfillment and regional inventory dispatch.',
    x: 24.0,
    y: 28.0,
    annotationClass: 'top-full mt-2 left-0 text-left items-start w-38 sm:w-44 max-w-[42vw]',
    bridgeClass: '-bottom-4 h-5 -left-4 -right-4',
    iconSrc: '/assets/images/icons/distribution.png'
  },
  {
    id: 'warehousing',
    category: 'Warehousing & Inventory',
    description: 'Strategic warehousing across 360,000+ sq. ft. of covered capacity.',
    x: 76.0,
    y: 28.0,
    annotationClass: 'top-full mt-2 right-0 text-right items-end w-38 sm:w-44 max-w-[42vw]',
    bridgeClass: '-bottom-4 h-5 -left-4 -right-4',
    iconSrc: '/assets/images/icons/warehousing.png'
  },
  {
    id: 'network',
    category: 'Supply Chain Network',
    description: 'Connected logistics network across 35 branch offices and major ports.',
    x: 18.0,
    y: 46.12,
    annotationClass: 'left-full ml-2.5 top-1/2 -translate-y-1/2 text-left items-start w-36 sm:w-40 max-w-[40vw]',
    bridgeClass: '-right-4 w-5 -top-4 -bottom-4',
    iconSrc: '/assets/images/icons/network.png'
  },
  {
    id: 'airfreight',
    category: 'Freight Forwarding',
    description: 'Expedited air cargo and multi-modal freight connectivity nationwide.',
    x: 82.0,
    y: 46.12,
    annotationClass: 'right-full mr-2.5 top-1/2 -translate-y-1/2 text-right items-end w-36 sm:w-40 max-w-[40vw]',
    bridgeClass: '-left-4 w-5 -top-4 -bottom-4',
    iconSrc: '/assets/images/icons/airfreight.png'
  },
  {
    id: 'security',
    category: 'Secure Handling',
    description: 'Strict chain-of-custody protocols, cargo escort, and 24/7 security.',
    x: 24.0,
    y: 64.0,
    annotationClass: 'bottom-full mb-2 left-0 text-left items-start w-38 sm:w-44 max-w-[42vw]',
    bridgeClass: '-top-4 h-5 -left-4 -right-4',
    iconSrc: '/assets/images/icons/security.png'
  },
  {
    id: 'compliance',
    category: 'Documentation & Compliance',
    description: 'Customs clearance, statutory documentation, and I.B.A. carrier approval.',
    x: 76.0,
    y: 64.0,
    annotationClass: 'bottom-full mb-2 right-0 text-right items-end w-38 sm:w-44 max-w-[42vw]',
    bridgeClass: '-top-4 h-5 -left-4 -right-4',
    iconSrc: '/assets/images/icons/compliance.png'
  },
  {
    id: 'operations',
    category: 'Value-Added Operations',
    description: 'Custom industrial packaging, palletization, and synchronized replenishment.',
    x: 50.0,
    y: 73.0,
    annotationClass: 'bottom-full mb-2.5 left-1/2 -translate-x-1/2 text-center items-center w-48 max-w-[70vw]',
    bridgeClass: '-top-4 h-5 -left-8 -right-8',
    iconSrc: '/assets/images/icons/operations.png'
  }
];

const PORTRAIT_CONNECTOR_PATHS: Record<string, ConnectorLine> = {
  transport: {
    bulb: { x: 540.0, y: 855.0 },
    icon: { x: 540.0, y: 415.0 }
  },
  distribution: {
    bulb: { x: 512.0, y: 860.0 },
    icon: { x: 295.0, y: 565.0 }
  },
  warehousing: {
    bulb: { x: 568.0, y: 860.0 },
    icon: { x: 785.0, y: 565.0 }
  },
  network: {
    bulb: { x: 500.0, y: 885.5 },
    icon: { x: 245.0, y: 885.5 }
  },
  airfreight: {
    bulb: { x: 580.0, y: 885.5 },
    icon: { x: 835.0, y: 885.5 }
  },
  security: {
    bulb: { x: 512.0, y: 910.0 },
    icon: { x: 295.0, y: 1200.0 }
  },
  compliance: {
    bulb: { x: 568.0, y: 910.0 },
    icon: { x: 785.0, y: 1200.0 }
  },
  operations: {
    bulb: { x: 540.0, y: 915.0 },
    icon: { x: 540.0, y: 1350.0 }
  }
};

interface FullscreenEntryExperienceProps {
  onEnter: () => void;
}

export const FullscreenEntryExperience: React.FC<FullscreenEntryExperienceProps> = ({ onEnter }) => {
  // Hotspot interaction state
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Responsive orientation detection (phones, portrait tablets, iPad portrait vs desktop / landscape)
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  });

  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkOrientation = () => {
      // True portrait: height > width
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      clearLeaveTimer();
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleMouseEnterRegion = (id: string) => {
    clearLeaveTimer();
    setHoveredHotspotId(id);
  };

  const handleMouseLeaveRegion = (id: string) => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setHoveredHotspotId((prev) => (prev === id ? null : prev));
    }, 180);
  };

  const handleHotspotClick = (id: string) => {
    clearLeaveTimer();
    setActiveHotspotId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerEnterTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearLeaveTimer();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning]);

  const triggerEnterTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Restrained cinematic transition into the website
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const currentHotspotId = hoveredHotspotId || activeHotspotId;

  // Active configuration based on orientation
  const hotspots = isPortrait ? PORTRAIT_HOTSPOTS : DESKTOP_HOTSPOTS;
  const connectorPaths = isPortrait ? PORTRAIT_CONNECTOR_PATHS : DESKTOP_CONNECTOR_PATHS;
  const viewBox = isPortrait ? '0 0 1080 1920' : '0 0 1672 941';

  return (
    <div 
      id="cfc-entry-experience"
      role="region"
      aria-label="CFC Logistics Interactive Gateway"
      onClick={(e) => {
        if (activeHotspotId && !(e.target as HTMLElement).closest('button')) {
          setActiveHotspotId(null);
        }
      }}
      className={`fixed inset-0 w-screen h-[100svh] z-50 bg-[#050d18] text-white overflow-hidden select-none transition-opacity duration-700 ease-out flex flex-col justify-between items-center ${
        isPortrait ? 'p-0' : 'justify-center md:block'
      } ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scoped CSS ensuring desktop edge-to-edge cover is preserved and portrait stage fills viewport perfectly */}
      <style>{`
        @media (orientation: landscape) and (min-width: 768px) {
          .cfc-hero-stage-desktop {
            width: max(100vw, calc(100svh * 1672 / 941)) !important;
            height: max(100svh, calc(100vw * 941 / 1672)) !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
        @media (orientation: landscape) and (max-width: 767px) {
          .cfc-hero-stage-desktop {
            width: 100% !important;
            max-width: min(100vw - 16px, calc((100svh - 180px) * 1672 / 941)) !important;
            max-height: calc(100svh - 180px) !important;
            height: auto !important;
          }
        }
        .cfc-portrait-stage {
          width: 100%;
          height: 100%;
          max-height: 100svh;
          aspect-ratio: 9 / 16;
        }
      `}</style>

      {/* =========================================================================
          1. FULL-VIEWPORT HERO VISUAL & INTERACTIVE COMPOSITION
          - Portrait (orientation: portrait / mobile): Dedicated 9:16 portrait composition
            with person and central bulb anchored, 8 balanced nodes radiating outwards
          - Desktop / Landscape (orientation: landscape): Exact 16:9 desktop experience
         ========================================================================= */}
      {isPortrait ? (
        /* -----------------------------------------------------------------------
           PORTRAIT MODE (9:16)
           ----------------------------------------------------------------------- */
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          <div 
            className={`cfc-portrait-stage relative shrink-0 pointer-events-auto transition-transform duration-800 ease-out ${
              isTransitioning ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Dedicated 9:16 Portrait Master Asset */}
            <img
              src="/assets/images/cfc_supply_chain_portrait_1080.png"
              alt="CFC Logistics Interactive Supply Chain Portrait Architecture"
              className="w-full h-full object-cover object-center block m-0 p-0 pointer-events-none"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />

            {/* Transition illumination bloom over the central lightbulb (50.0% X, 46.1% Y) */}
            <div 
              className={`absolute inset-0 pointer-events-none z-25 transition-opacity duration-700 ease-out ${
                isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle at 50% 46.1%, rgba(245, 158, 11, 0.95) 0%, rgba(245, 158, 11, 0.45) 28%, rgba(5, 13, 24, 0.92) 65%, transparent 100%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* Subtle atmospheric vignette framing portrait */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#050d18]/70 via-transparent to-[#050d18]/80" />

            {/* SVG Connector Lines radiating from central lightbulb to 8 portrait elements */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-15"
              viewBox="0 0 1080 1920" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="entry-connector-glow-portrait" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="entry-endpoint-glow-portrait" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5.5" result="dotBlur" />
                  <feMerge>
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base ambient thin connector lines */}
              {hotspots.map((hotspot) => {
                const connector = connectorPaths[hotspot.id];
                if (!connector) return null;
                const isSelected = hotspot.id === currentHotspotId;

                return (
                  <g key={`portrait-base-${hotspot.id}`}>
                    {/* Thin subtle base line (solid, elegant, subtle) */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="rgba(245, 158, 11, 0.32)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="pointer-events-none"
                    />

                    {/* Interactive broader hit area along connector */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="transparent"
                      strokeWidth="44"
                      className="pointer-events-auto cursor-pointer"
                      onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                      onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                      onClick={() => handleHotspotClick(hotspot.id)}
                    />

                    {/* Active highlighted connector line */}
                    {isSelected && (
                      <>
                        <line
                          x1={connector.bulb.x}
                          y1={connector.bulb.y}
                          x2={connector.icon.x}
                          y2={connector.icon.y}
                          stroke="#F59E0B"
                          strokeWidth="5"
                          strokeLinecap="round"
                          filter="url(#entry-connector-glow-portrait)"
                          opacity="0.95"
                          className="pointer-events-none"
                        />
                        <line
                          x1={connector.bulb.x}
                          y1={connector.bulb.y}
                          x2={connector.icon.x}
                          y2={connector.icon.y}
                          stroke="#FEF3C7"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          opacity="0.95"
                          className="pointer-events-none"
                        />
                        <circle
                          cx={connector.bulb.x}
                          cy={connector.bulb.y}
                          r="6.5"
                          fill="#F59E0B"
                          filter="url(#entry-endpoint-glow-portrait)"
                          className="pointer-events-none"
                        />
                        <circle
                          cx={connector.icon.x}
                          cy={connector.icon.y}
                          r="6.5"
                          fill="#F59E0B"
                          filter="url(#entry-endpoint-glow-portrait)"
                          className="pointer-events-none"
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* 8 Interactive Nodes in Dedicated Portrait Constellation (Guaranteed Separation, No Popups) */}
            {hotspots.map((hotspot) => {
              const isHovered = hoveredHotspotId === hotspot.id;
              const isActive = activeHotspotId === hotspot.id;
              const isCurrent = isHovered || isActive;

              return (
                <div
                  key={`portrait-node-${hotspot.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  style={{ 
                    left: `${hotspot.x}%`, 
                    top: `${hotspot.y}%`,
                    width: '9.0%',
                    height: '5.0625%', // (9.0% * 1080 / 1920 = 5.0625% for true circular aspect)
                  }}
                  onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                  onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                >
                  {/* Hotspot Target Button with Authentic Circular Badge */}
                  <button
                    type="button"
                    onClick={() => handleHotspotClick(hotspot.id)}
                    onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                    onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                    onFocus={() => handleMouseEnterRegion(hotspot.id)}
                    onBlur={() => handleMouseLeaveRegion(hotspot.id)}
                    aria-label={hotspot.category}
                    aria-expanded={isCurrent}
                    className={`relative w-full h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-hidden after:content-[''] after:absolute after:-inset-3 after:rounded-full after:z-10 ${
                      isCurrent
                        ? 'scale-115 ring-4 ring-amber-400/50 shadow-[0_0_24px_rgba(245,158,11,0.9)] border-2 border-amber-300'
                        : 'border border-amber-400/40 hover:border-amber-400/90 shadow-[0_4px_12px_rgba(0,0,0,0.7)]'
                    }`}
                  >
                    {/* Badge Image */}
                    {hotspot.iconSrc ? (
                      <img 
                        src={hotspot.iconSrc} 
                        alt={hotspot.category}
                        className="w-full h-full rounded-full object-cover pointer-events-none"
                      />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    )}

                    {/* Subtle pulsing beacon when inactive */}
                    {!isCurrent && (
                      <span className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-25 pointer-events-none" />
                    )}

                    {/* Active highlight ring */}
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full border border-amber-400 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Floating Capability Text Annotation (Direct Digital Overlay, Zero Rectangular Containers) */}
                  {isCurrent && (
                    <>
                      {/* Pointer-safe bridge for seamless hover transition on tablet/portrait cursors */}
                      <div
                        aria-hidden="true"
                        className={`absolute ${hotspot.bridgeClass} pointer-events-auto bg-transparent z-25`}
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                      />

                      {/* Floating Text Directly Over Background Photography */}
                      <div
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                        className={`absolute z-30 pointer-events-none transition-all duration-300 ease-out flex flex-col ${hotspot.annotationClass} select-none animate-in fade-in zoom-in-95 duration-200`}
                      >
                        <h3 className="text-white font-bold uppercase tracking-wider font-heading text-[11px] sm:text-xs leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          {hotspot.category}
                        </h3>

                        {/* Subtle refined amber accent line */}
                        <div className="w-5 h-[1.5px] bg-amber-400 my-1 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />

                        <p className="text-slate-200 text-[10px] sm:text-[11px] leading-snug font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          {hotspot.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* -----------------------------------------------------------------------
           DESKTOP / LANDSCAPE MODE (16:9)
           Exact unaltered 16:9 desktop experience
           ----------------------------------------------------------------------- */
        <div 
          className="relative z-10 w-full flex-none flex items-center justify-center overflow-visible px-2 pointer-events-none md:absolute md:inset-0 md:w-full md:h-full md:px-0 md:overflow-hidden"
        >
          <div 
            className={`cfc-hero-stage-desktop relative shrink-0 aspect-[1672/941] pointer-events-auto transition-transform duration-800 ease-out ${
              isTransitioning ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Static Background Logistics Visual (Pure Unaltered Original Asset) */}
            <img
              src="/assets/images/cfc_supply_chain_interactive.png"
              alt="CFC Logistics Interactive Supply Chain Architecture"
              className="w-full h-full object-contain md:object-cover block m-0 p-0 pointer-events-none"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />

            {/* Transition illumination bloom over the central lightbulb (41% X, 46.1% Y) */}
            <div 
              className={`absolute inset-0 pointer-events-none z-25 transition-opacity duration-700 ease-out ${
                isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle at 41% 46.1%, rgba(245, 158, 11, 0.95) 0%, rgba(245, 158, 11, 0.45) 28%, rgba(5, 13, 24, 0.92) 65%, transparent 100%)',
                mixBlendMode: 'screen'
              }}
            />

            {/* SVG Connector Line Highlight Layer */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-15"
              viewBox="0 0 1672 941" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="entry-connector-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="entry-endpoint-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4.5" result="dotBlur" />
                  <feMerge>
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {hotspots.map((hotspot) => {
                const isSelected = hotspot.id === currentHotspotId;
                const connector = connectorPaths[hotspot.id];
                if (!connector) return null;

                return (
                  <g 
                    key={`entry-conn-${hotspot.id}`}
                    className="transition-opacity duration-200 ease-out"
                    style={{ opacity: isSelected ? 1 : 0 }}
                  >
                    {/* Broad hit-target along connector line */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="transparent"
                      strokeWidth="36"
                      className="pointer-events-auto cursor-pointer"
                      onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                      onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                      onClick={() => handleHotspotClick(hotspot.id)}
                    />

                    {/* Amber glow overlaying existing line */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="#F59E0B"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      filter="url(#entry-connector-glow)"
                      opacity="0.85"
                      className="pointer-events-none"
                    />

                    {/* Warm amber transition stroke */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="#FDE68A"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.9"
                      className="pointer-events-none"
                    />

                    {/* Crisp core line */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.95"
                      className="pointer-events-none"
                    />

                    {/* Endpoint anchor beacon at the icon connection */}
                    <circle
                      cx={connector.icon.x}
                      cy={connector.icon.y}
                      r="7.5"
                      fill="#F59E0B"
                      filter="url(#entry-endpoint-glow)"
                      opacity="0.9"
                      className="pointer-events-none"
                    />
                    <circle
                      cx={connector.icon.x}
                      cy={connector.icon.y}
                      r="4.2"
                      fill="#FEF3C7"
                      className="pointer-events-none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Hotspots & Temporary Hover/Tap Floating Annotations */}
            {hotspots.map((hotspot) => {
              const isHovered = hoveredHotspotId === hotspot.id;
              const isActive = activeHotspotId === hotspot.id;
              const isCurrent = isHovered || isActive;

              return (
                <div
                  key={hotspot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  style={{ 
                    left: `${hotspot.x}%`, 
                    top: `${hotspot.y}%`,
                    width: '4.2%',
                    height: '7.46%',
                  }}
                  onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                  onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                >
                  {/* Hotspot Target Button */}
                  <button
                    type="button"
                    onClick={() => handleHotspotClick(hotspot.id)}
                    onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                    onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                    onFocus={() => handleMouseEnterRegion(hotspot.id)}
                    onBlur={() => handleMouseLeaveRegion(hotspot.id)}
                    aria-label={hotspot.category}
                    aria-expanded={isCurrent}
                    className={`relative min-w-[22px] min-h-[22px] md:min-w-0 md:min-h-0 w-full h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-hidden after:content-[''] after:absolute after:-inset-3 sm:after:-inset-2 md:after:hidden after:rounded-full after:z-10 ${
                      isCurrent
                        ? 'scale-110 border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_22px_rgba(245,158,11,0.85)] ring-4 ring-amber-400/25'
                        : 'border border-white/25 bg-white/5 hover:border-amber-400/60 hover:bg-amber-500/10'
                    }`}
                  >
                    {!isCurrent && (
                      <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20 pointer-events-none" />
                    )}

                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full border border-amber-400/70 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Temporary Floating Capability Annotation */}
                  {isCurrent && (
                    <>
                      <div
                        aria-hidden="true"
                        className={`absolute ${hotspot.bridgeClass} pointer-events-auto bg-transparent z-25`}
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                      />

                      <div
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                        className={`absolute z-30 pointer-events-auto transition-all duration-200 ease-out flex flex-col ${hotspot.annotationClass} w-44 sm:w-56 md:w-64 max-w-[calc(100vw-32px)] select-none bg-[#050d18]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xs border border-slate-700/80 shadow-xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200`}
                      >
                        <h3 className="text-white font-bold uppercase tracking-wider font-heading text-[11px] sm:text-xs md:text-sm leading-tight">
                          {hotspot.category}
                        </h3>

                        <div className="w-5 h-[1.5px] bg-amber-400 my-1 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />

                        <p className="text-slate-300 text-[10px] sm:text-[11px] leading-relaxed font-normal">
                          {hotspot.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          2. OFFICIAL CFC LOGISTICS LOGO (TRANSPARENT BACKGROUND)
          - Positioned cleanly with generous breathing room
          - Exact official artwork, proportions, and colors
          - Clickable entrance trigger using the exact same cinematic transition
         ========================================================================= */}
      <header className={`relative z-30 w-full flex justify-center items-center px-4 pointer-events-none ${
        isPortrait 
          ? 'pt-4 sm:pt-5 pb-0 shrink-0' 
          : 'pt-4 sm:pt-5 pb-0 md:pt-10 md:pb-1 md:absolute md:top-0 md:left-0 md:right-0'
      }`}>
        <button
          type="button"
          onClick={triggerEnterTransition}
          disabled={isTransitioning}
          aria-label="Enter CFC Logistics website"
          className="pointer-events-auto bg-transparent border-0 p-1 -m-1 rounded-xs cursor-pointer transition-[opacity,filter] duration-300 ease-out hover:opacity-95 hover:brightness-110 active:opacity-90 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 select-none inline-flex items-center justify-center"
        >
          <CfcLogo size="lg" className="drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] pointer-events-none" />
        </button>
      </header>

      {/* =========================================================================
          3. HERO STATEMENT & CLICK TO EXPLORE
          - Large, elegant tagline: "Logistically yours"
          - Minimal, understated interaction: "CLICK TO EXPLORE →"
          - Positioned safely at the bottom in both portrait and desktop
          - Portrait establishes 3 distinct visual tiers:
            LEVEL 1: Logo
                     ↓ (28px - 32px breathing room)
            LEVEL 2: "Logistically yours"
                     ↓ (14px - 16px refined gap)
            LEVEL 3: "CLICK TO EXPLORE →"
         ========================================================================= */}
      <footer className={`relative z-30 w-full px-4 flex flex-col items-center justify-center text-center pointer-events-none ${
        isPortrait 
          ? 'pt-7 sm:pt-8 pb-5 sm:pb-6 shrink-0' 
          : 'pt-2.5 sm:pt-3 pb-2 md:pt-1 md:pb-10 md:absolute md:bottom-0 md:left-0 md:right-0'
      }`}>
        <div className={`pointer-events-auto flex flex-col items-center justify-center ${
          isPortrait ? 'gap-3.5 sm:gap-4' : 'gap-2.5 sm:gap-3'
        }`}>
          <h1 className="font-serif italic font-normal text-xl sm:text-2xl md:text-4xl lg:text-5xl text-slate-100 tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] select-none">
            Logistically yours
          </h1>

          <button
            type="button"
            onClick={triggerEnterTransition}
            disabled={isTransitioning}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-amber-400 hover:text-amber-300 hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-all duration-300 cursor-pointer pt-0.5 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 select-none"
            aria-label="Enter CFC Logistics Website"
          >
            <span>CLICK TO EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </footer>
    </div>
  );
};
