import React, { useState, useRef, useEffect } from 'react';
import { PageTab } from '../types';
import { 
  Truck, 
  Package, 
  Plane, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Cog, 
  ShoppingCart, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface HotspotData {
  id: string;
  category: string;
  subtitle: string;
  shortDescription: string;
  icon: React.ElementType;
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
  targetSectionId: string;
  targetTab: PageTab;
  actionText: string;
  // Positioning classes for floating editorial annotation on desktop
  annotationPositionClass: string;
  textAlignClass: string;
  accentAlignClass: string;
  // Invisible hit-area bridge connecting icon and annotation
  bridgeClass: string;
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 'transport',
    category: 'TRANSPORTATION & FLEET',
    subtitle: 'Commercial Ground Transport',
    shortDescription: 'Pan-India multi-modal fleet managing 1,580+ commercial vehicles with active GPS tracking and schedule precision.',
    icon: Truck,
    x: 41.3,
    y: 24.5,
    targetSectionId: 'transportation-fleet',
    targetTab: 'fleet',
    actionText: 'EXPLORE TRANSPORT & FLEET',
    annotationPositionClass: 'bottom-full mb-3.5 left-1/2 -translate-x-1/2',
    textAlignClass: 'text-center items-center',
    accentAlignClass: 'mx-auto',
    bridgeClass: '-bottom-6 h-7 -left-6 -right-6'
  },
  {
    id: 'warehousing',
    category: 'WAREHOUSING & INVENTORY',
    subtitle: 'Strategic Storage & Inventory Control',
    shortDescription: 'Strategic warehousing and inventory control across 360,000+ sq. ft. of covered storage capacity and ₹300+ Cr inventory asset management.',
    icon: Package,
    x: 52.0,
    y: 31.5,
    targetSectionId: 'warehousing-inventory',
    targetTab: 'services',
    actionText: 'EXPLORE WAREHOUSE NETWORK',
    annotationPositionClass: 'left-full ml-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-left items-start',
    accentAlignClass: 'mr-auto',
    bridgeClass: '-left-6 w-7 top-0 bottom-0'
  },
  {
    id: 'airfreight',
    category: 'FREIGHT FORWARDING',
    subtitle: 'Multi-Modal & Air Cargo Transit',
    shortDescription: 'Expedited air cargo and multi-modal freight connectivity ensuring time-critical transit across domestic and international trade lanes.',
    icon: Plane,
    x: 56.0,
    y: 45.5,
    targetSectionId: 'freight-forwarding',
    targetTab: 'services',
    actionText: 'EXPLORE FREIGHT FORWARDING',
    annotationPositionClass: 'left-full ml-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-left items-start',
    accentAlignClass: 'mr-auto',
    bridgeClass: '-left-6 w-7 top-0 bottom-0'
  },
  {
    id: 'network',
    category: 'SUPPLY CHAIN NETWORK',
    subtitle: 'Pan-India Gateway Infrastructure',
    shortDescription: 'Comprehensive pan-India logistics network spanning 35 regional branch offices and major port terminals.',
    icon: Globe,
    x: 25.5,
    y: 46.5,
    targetSectionId: 'supply-chain-network',
    targetTab: 'services',
    actionText: 'EXPLORE SUPPLY CHAIN NETWORK',
    annotationPositionClass: 'right-full mr-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-right items-end',
    accentAlignClass: 'ml-auto',
    bridgeClass: '-right-6 w-7 top-0 bottom-0'
  },
  {
    id: 'security',
    category: 'SECURE HANDLING',
    subtitle: 'Asset Protection Safeguards',
    shortDescription: 'Rigorous chain-of-custody protocols, cargo escort operations, and round-the-clock facility security management.',
    icon: ShieldCheck,
    x: 31.0,
    y: 62.5,
    targetSectionId: 'secure-handling',
    targetTab: 'about',
    actionText: 'EXPLORE SECURE HANDLING',
    annotationPositionClass: 'right-full mr-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-right items-end',
    accentAlignClass: 'ml-auto',
    bridgeClass: '-right-6 w-7 top-0 bottom-0'
  },
  {
    id: 'compliance',
    category: 'DOCUMENTATION & COMPLIANCE',
    subtitle: 'Regulatory Assurance & Clearance',
    shortDescription: 'Customs clearance at major port gateways, statutory E-Way documentation, and I.B.A. approved carrier documentation (DLC-1461).',
    icon: FileText,
    x: 50.5,
    y: 61.0,
    targetSectionId: 'documentation-compliance',
    targetTab: 'services',
    actionText: 'EXPLORE COMPLIANCE & CUSTOMS',
    annotationPositionClass: 'left-full ml-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-left items-start',
    accentAlignClass: 'mr-auto',
    bridgeClass: '-left-6 w-7 top-0 bottom-0'
  },
  {
    id: 'operations',
    category: 'VALUE-ADDED OPERATIONS',
    subtitle: 'Tailored Warehouse Handling',
    shortDescription: 'Customized industrial packaging, palletization, shrink-wrapping, and synchronized factory replenishment staging.',
    icon: Cog,
    x: 41.0,
    y: 70.5,
    targetSectionId: 'value-added-operations',
    targetTab: 'services',
    actionText: 'EXPLORE VALUE-ADDED SERVICES',
    annotationPositionClass: 'top-full mt-3.5 left-1/2 -translate-x-1/2',
    textAlignClass: 'text-center items-center',
    accentAlignClass: 'mx-auto',
    bridgeClass: '-top-6 h-7 -left-6 -right-6'
  },
  {
    id: 'distribution',
    category: 'DISTRIBUTION & FULFILMENT',
    subtitle: 'Synchronized Cargo Dispatch',
    shortDescription: 'Structured B2B order fulfillment, retail distribution dispatch, and single-window inventory administration.',
    icon: ShoppingCart,
    x: 29.8,
    y: 31.5,
    targetSectionId: 'distribution-fulfilment',
    targetTab: 'services',
    actionText: 'EXPLORE DISTRIBUTION & FULFILMENT',
    annotationPositionClass: 'right-full mr-4 top-1/2 -translate-y-1/2',
    textAlignClass: 'text-right items-end',
    accentAlignClass: 'ml-auto',
    bridgeClass: '-right-6 w-7 top-0 bottom-0'
  }
];

interface ConnectorLine {
  bulb: { x: number; y: number };
  icon: { x: number; y: number };
}

// Exact connector line endpoints matching the photograph's existing white lines and connection dots (1672x941 canvas)
const CONNECTOR_PATHS: Record<string, ConnectorLine> = {
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

interface InteractiveSupplyChainSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote?: () => void;
}

export const InteractiveSupplyChainSection: React.FC<InteractiveSupplyChainSectionProps> = ({
  onNavigate
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('warehousing');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear grace timer if pending
  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  // Immediate activation on entering any part of the continuous hover region
  const handleMouseEnterRegion = (id: string) => {
    clearLeaveTimer();
    setHoveredHotspotId(id);
  };

  // Graceful departure timeout (300ms) to allow seamless cursor movement between icon and annotation
  const handleMouseLeaveRegion = (id: string) => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setHoveredHotspotId(current => (current === id ? null : current));
      leaveTimerRef.current = null;
    }, 300);
  };

  // Close active hotspot if user clicks outside on touch devices
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Keep selected on mobile for stability
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      clearLeaveTimer();
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Display either the hovered hotspot (on desktop) or the actively selected hotspot (on touch)
  const currentHotspotId = hoveredHotspotId || activeHotspotId || 'warehousing';
  const activeHotspot = HOTSPOTS.find(h => h.id === currentHotspotId) || HOTSPOTS[0];

  const navigateToDestination = (targetSectionId: string, targetTab?: PageTab) => {
    const element = document.getElementById(targetSectionId);
    if (element) {
      const fixedHeaderOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - fixedHeaderOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      // Highlight target element momentarily
      element.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-amber-400');
      }, 2200);
    } else if (targetTab) {
      onNavigate(targetTab);
    }
  };

  const handleIconClick = (hotspot: HotspotData) => {
    // If on touch device, update the selected hotspot and allow instant navigation
    setActiveHotspotId(hotspot.id);
    navigateToDestination(hotspot.targetSectionId, hotspot.targetTab);
  };

  return (
    <section 
      id="hero-supply-chain"
      className="relative w-full max-w-full m-0 p-0 bg-[#050d18] text-slate-100 overflow-hidden select-none border-b border-slate-800/80 lg:min-h-[calc(100svh-76px)] lg:flex lg:flex-col lg:justify-center lg:items-center"
    >
      {/* Anchor identifier for internal links */}
      <div id="interactive-supply-chain" className="absolute top-0" />

      {/* Ambient Top Subtle Status Badge on Desktop */}
      <div className="hidden lg:flex absolute top-4 left-1/2 -translate-x-1/2 z-25 items-center gap-2 px-3.5 py-1 rounded-full bg-[#050d18]/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono tracking-widest text-amber-400 uppercase pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
        <span>INTEGRATED SUPPLY CHAIN ARCHITECTURE // SELECT A CAPABILITY TO NAVIGATE</span>
      </div>

      {/* =========================================================================
          CINEMATIC INTERACTIVE STAGE CONTAINER
          Mobile: Full width vertical stacking (Image -> Capability annotation)
          Desktop: Immersive 1672/941 canvas scaled to occupy the first viewport
         ========================================================================= */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-full m-0 p-0 flex flex-col items-center justify-center lg:h-full overflow-hidden z-15 py-2 lg:py-6"
      >
        <div 
          className="relative w-full max-w-full m-0 p-0 lg:aspect-[1672/941] lg:max-h-[calc(100svh-120px)]"
          style={{
            maxWidth: 'calc((100svh - 110px) * 1672 / 941)',
          }}
        >
          {/* =========================================================================
              PRIMARY INTERACTIVE IMAGE STAGE
              Mobile: Full width (100%), exact native 1672/941 aspect ratio,
              zero margins, zero horizontal overflow, zero distortion, all 8 icons intact.
              Desktop: Full stage canvas.
             ========================================================================= */}
          <div className="relative w-full max-w-full m-0 p-0 aspect-[1672/941] lg:h-full">
            {/* Static Background Logistics Concept Image - Pure Unaltered Original Asset */}
            <img
              src="/assets/images/cfc_supply_chain_interactive.png"
              alt="CFC Logistics Interactive Supply Chain Capabilities Architecture"
              className="w-full h-full object-contain pointer-events-none block m-0 p-0"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />

            {/* SVG Connector Line Highlight Layer - Illuminates existing photograph lines in place */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-15"
              viewBox="0 0 1672 941" 
              preserveAspectRatio="none"
            >
              <defs>
                {/* Luminous amber energy glow for connector lines */}
                <filter id="connector-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Luminous glow for illuminated connection endpoint dots */}
                <filter id="endpoint-dot-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="4.5" result="dotBlur" />
                  <feMerge>
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="dotBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {HOTSPOTS.map((hotspot) => {
                const isSelected = hotspot.id === currentHotspotId;
                const connector = CONNECTOR_PATHS[hotspot.id];
                if (!connector) return null;

                return (
                  <g 
                    key={`connector-${hotspot.id}`}
                    className="transition-opacity duration-200 ease-out"
                    style={{
                      opacity: isSelected ? 1 : 0
                    }}
                  >
                    {/* Wide invisible hit-target along the existing connector line for comfortable mouse movement */}
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
                    />

                    {/* Luminous amber bloom/glow precisely overlaying the existing line */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="#F59E0B"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      filter="url(#connector-amber-glow)"
                      opacity="0.8"
                      className="pointer-events-none"
                    />

                    {/* Warmer brighter transition stroke toward CFC gold/amber */}
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

                    {/* Core brilliant white highlight illuminating the existing white line in place */}
                    <line
                      x1={connector.bulb.x}
                      y1={connector.bulb.y}
                      x2={connector.icon.x}
                      y2={connector.icon.y}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.9"
                      className="pointer-events-none"
                    />

                    {/* Central lightbulb connection point - subtle amber/gold illumination */}
                    <circle
                      cx={connector.bulb.x}
                      cy={connector.bulb.y}
                      r="6.5"
                      fill="#F59E0B"
                      filter="url(#endpoint-dot-glow)"
                      opacity="0.8"
                      className="pointer-events-none"
                    />
                    <circle
                      cx={connector.bulb.x}
                      cy={connector.bulb.y}
                      r="3.5"
                      fill="#FEF3C7"
                      className="pointer-events-none"
                    />
                    <circle
                      cx={connector.bulb.x}
                      cy={connector.bulb.y}
                      r="1.8"
                      fill="#FFFFFF"
                      className="pointer-events-none"
                    />

                    {/* Icon endpoint dot - illuminates and glows amber/gold */}
                    <circle
                      cx={connector.icon.x}
                      cy={connector.icon.y}
                      r="7.5"
                      fill="#F59E0B"
                      filter="url(#endpoint-dot-glow)"
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
                    <circle
                      cx={connector.icon.x}
                      cy={connector.icon.y}
                      r="2.2"
                      fill="#FFFFFF"
                      className="pointer-events-none"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Hotspot Targets & Connected Floating Editorial Annotations */}
            {HOTSPOTS.map((hotspot) => {
              const isHovered = hoveredHotspotId === hotspot.id;
              const isActive = activeHotspotId === hotspot.id;
              const isCurrent = isHovered || isActive;

              return (
                <div
                  key={hotspot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                  onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                >
                  {/* Hotspot Interactive Button (Aligned over the photograph's icon badge) */}
                  <button
                    type="button"
                    onClick={() => handleIconClick(hotspot)}
                    onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                    onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                    onFocus={() => handleMouseEnterRegion(hotspot.id)}
                    onBlur={() => handleMouseLeaveRegion(hotspot.id)}
                    aria-label={`${hotspot.category}: ${hotspot.subtitle}. Click to navigate to section.`}
                    aria-expanded={isCurrent}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-hidden ${
                      isCurrent
                        ? 'scale-110 border-2 border-amber-400 bg-amber-400/15 shadow-[0_0_22px_rgba(245,158,11,0.85)] ring-4 ring-amber-400/25'
                        : 'border border-white/25 bg-white/5 hover:border-amber-400/60 hover:bg-amber-500/10'
                    }`}
                  >
                    {/* Radiating pulsing guide when inactive */}
                    {!isCurrent && (
                      <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20 pointer-events-none" />
                    )}

                    {/* Highlight ring when active */}
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-full border border-amber-400/70 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Connected Editorial Annotation on Desktop: Entire Annotation is Clickable */}
                  {isCurrent && (
                    <div className="hidden lg:contents">
                      {/* Invisible Hover Bridge connecting Icon Button and Annotation */}
                      <div
                        aria-hidden="true"
                        className={`absolute ${hotspot.bridgeClass} pointer-events-auto bg-transparent z-25`}
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                      />

                      {/* Visible Editorial Annotation */}
                      <a
                        href={`#${hotspot.targetSectionId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToDestination(hotspot.targetSectionId, hotspot.targetTab);
                        }}
                        onMouseEnter={() => handleMouseEnterRegion(hotspot.id)}
                        onMouseLeave={() => handleMouseLeaveRegion(hotspot.id)}
                        aria-label={`Navigate to ${hotspot.category} section`}
                        className={`absolute z-30 pointer-events-auto cursor-pointer transition-all duration-200 ease-out flex flex-col ${hotspot.annotationPositionClass} ${hotspot.textAlignClass} w-60 md:w-72 select-none animate-annotation group/annotation focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-xs bg-[#050d18]/65 backdrop-blur-xs p-2.5 rounded-sm border border-slate-700/40`}
                      >
                        {/* Capability Title */}
                        <h3 className="text-white group-hover/annotation:text-amber-300 font-extrabold uppercase tracking-wider font-heading text-xs md:text-sm leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors">
                          {hotspot.category}
                        </h3>

                        {/* Subtle Amber Accent Line */}
                        <div 
                          className={`w-8 h-[2px] bg-amber-400 group-hover/annotation:bg-amber-300 group-hover/annotation:shadow-[0_0_12px_rgba(245,158,11,1)] my-1.5 shadow-[0_0_8px_rgba(245,158,11,0.9)] transition-all ${hotspot.accentAlignClass}`} 
                        />

                        {/* Short Supporting Description */}
                        <p className="text-slate-200 group-hover/annotation:text-slate-100 text-[11px] md:text-xs leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors">
                          {hotspot.shortDescription}
                        </p>

                        {/* Clean Direct Navigation Link */}
                        <div
                          className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 group-hover/annotation:text-amber-300 uppercase tracking-wider font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors ${hotspot.accentAlignClass}`}
                        >
                          <span className="underline underline-offset-2 decoration-amber-400/40 group-hover/annotation:decoration-amber-300">
                            {hotspot.actionText}
                          </span>
                          <ArrowRight className="w-3 h-3 group-hover/annotation:translate-x-1 transition-transform" />
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              MOBILE CAPABILITY INFORMATION
              Sits directly below the Interactive Visual on mobile/tablet.
              Dynamically presents the tapped capability with full visibility,
              zero clipping, zero horizontal overflow, and a direct navigation action.
             ========================================================================= */}
          <div className="lg:hidden w-full px-4 sm:px-6 pt-4 pb-4 max-w-xl mx-auto text-left">
            <div className="bg-[#0b1728]/95 border border-slate-700/80 rounded-xs p-4 sm:p-5 shadow-xl space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                    {activeHotspot.category}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                  TAP ICONS TO SWITCH
                </span>
              </div>

              <h3 className="text-white font-extrabold uppercase tracking-wide font-heading text-sm sm:text-base leading-snug">
                {activeHotspot.subtitle}
              </h3>

              <div className="w-8 h-[2px] bg-amber-400 my-1" />

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {activeHotspot.shortDescription}
              </p>

              <div className="pt-2">
                <a
                  href={`#${activeHotspot.targetSectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToDestination(activeHotspot.targetSectionId, activeHotspot.targetTab);
                  }}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-5 py-2.5 rounded-xs uppercase tracking-wider font-heading cursor-pointer transition-colors shadow-md w-full sm:w-auto"
                >
                  <span>{activeHotspot.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle top boundary transition from header */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050d18]/70 to-transparent pointer-events-none z-10" />

      {/* Subtle Scroll Transition Cue on Desktop */}
      <a 
        href="#hero-warehouse" 
        onClick={(e) => { 
          e.preventDefault(); 
          navigateToDestination('hero-warehouse'); 
        }} 
        className="hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-25 items-center gap-2 px-4 py-1.5 rounded-full bg-[#050d18]/80 backdrop-blur-md border border-slate-700/50 text-[11px] font-mono text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition-all uppercase tracking-widest cursor-pointer group"
      >
        <span>EXPLORE WAREHOUSE INFRASTRUCTURE</span>
        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
      </a>
    </section>
  );
};
