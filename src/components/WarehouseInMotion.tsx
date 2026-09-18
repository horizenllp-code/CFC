import React, { useState, useEffect, useRef, useMemo } from 'react';

// The Exact 7 Dedicated 4K UHD High-Resolution (3840x2160) Architectural Commercial Photographs
import establishingImage from '../assets/images/cfc_warehouse_establishing_4k.jpg';
import receiveDockImage from '../assets/images/cfc_receive_dock_4k.jpg';
import storeHighbayImage from '../assets/images/cfc_storage_highbay_4k.jpg';
import inventoryControlImage from '../assets/images/cfc_inventory_control_4k.jpg';
import valueAddedImage from '../assets/images/cfc_value_added_4k.jpg';
import outboundStagingImage from '../assets/images/cfc_fulfilment_dispatch_4k.jpg';
import networkPulloutImage from '../assets/images/cfc_network_aerial_4k.jpg';

export interface SceneDefinition {
  id: string;
  stageCode: string;
  shortCode: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  transitionType: 'intake_push' | 'corridor_dive' | 'aisle_shift' | 'process_glide' | 'dispatch_flow' | 'aerial_pullout' | 'seamless_reset';
  // Subtle camera bounds (max scale 1.035, gentle translation, zero blurriness)
  enter: { scale: number; x: number; y: number };
  exit: { scale: number; x: number; y: number };
}

export const HERO_SCENES: SceneDefinition[] = [
  // SCENE 01: WAREHOUSE / ESTABLISHING (0–5s)
  {
    id: 'establishing',
    stageCode: '01 / WAREHOUSE',
    shortCode: '01 / WAREHOUSE',
    title: 'Primary Facility & Operations Center',
    desc: '360,000+ sq. ft. central logistics warehouse hub',
    image: establishingImage,
    alt: 'CFC Logistics Premier Central Distribution Center & Warehouse Facility Establishing View',
    transitionType: 'intake_push',
    enter: { scale: 1.00, x: 0, y: 0 },
    exit: { scale: 1.024, x: 0, y: -6 },
  },
  // SCENE 02: RECEIVE (5–10s)
  {
    id: 'receive',
    stageCode: '02 / RECEIVE',
    shortCode: '02 / RECEIVE',
    title: 'Inbound Dock Intake & Verification',
    desc: 'Intake loading bays, dock levelers & cargo inspection',
    image: receiveDockImage,
    alt: 'CFC Logistics Inbound Warehouse Receiving Dock and Loading Bay Intake',
    transitionType: 'corridor_dive',
    enter: { scale: 1.02, x: 8, y: 0 },
    exit: { scale: 1.00, x: -6, y: -4 },
  },
  // SCENE 03: STORE (10–15s)
  {
    id: 'store',
    stageCode: '03 / STORE',
    shortCode: '03 / STORE',
    title: 'High-Bay Vertical Pallet Storage',
    desc: 'Organized heavy-duty racking & reach truck operations',
    image: storeHighbayImage,
    alt: 'CFC Logistics High-Bay Vertical Pallet Racking Warehouse Storage',
    transitionType: 'aisle_shift',
    enter: { scale: 1.00, x: 0, y: 4 },
    exit: { scale: 1.026, x: 0, y: -6 },
  },
  // SCENE 04: CONTROL (15–20s)
  {
    id: 'control',
    stageCode: '04 / CONTROL',
    shortCode: '04 / CONTROL',
    title: 'Inventory Operations & Stock Control',
    desc: 'Barcode scanning, batch tracking & verified stock audits',
    image: inventoryControlImage,
    alt: 'CFC Logistics Warehouse Inventory Control and Stock Management Operations',
    transitionType: 'process_glide',
    enter: { scale: 1.022, x: -6, y: 0 },
    exit: { scale: 1.00, x: 6, y: 3 },
  },
  // SCENE 05: VALUE-ADDED OPERATIONS (20–25s)
  {
    id: 'value_added',
    stageCode: '05 / VALUE-ADDED',
    shortCode: '05 / VALUE-ADDED',
    title: 'Specialized Handling, Packaging & Kitting',
    desc: 'Customized packaging, shrink-wrapping & kitting lines',
    image: valueAddedImage,
    alt: 'CFC Logistics Value-Added Packaging, Labeling and Kitting Operations Floor',
    transitionType: 'dispatch_flow',
    enter: { scale: 1.00, x: 5, y: 0 },
    exit: { scale: 1.025, x: -4, y: -4 },
  },
  // SCENE 06: FULFILMENT & DISTRIBUTION (25–30s)
  {
    id: 'fulfilment',
    stageCode: '06 / FULFILMENT',
    shortCode: '06 / FULFILMENT',
    title: 'Outbound Dispatch & Downstream Staging',
    desc: 'Pre-dispatch trailer staging bays & rapid cross-docking',
    image: outboundStagingImage,
    alt: 'CFC Logistics Outbound Dispatch Staging and Trailer Loading Dock Bays',
    transitionType: 'aerial_pullout',
    enter: { scale: 1.025, x: 0, y: 4 },
    exit: { scale: 1.00, x: 0, y: -4 },
  },
  // SCENE 07: FINAL PULL-OUT / CFC NETWORK (30–35s)
  {
    id: 'network_pullout',
    stageCode: '07 / NETWORK',
    shortCode: '07 / NETWORK',
    title: 'Connected Arterial Logistics Network',
    desc: 'Central warehouse facility connected to pan-India corridors',
    image: networkPulloutImage,
    alt: 'CFC Logistics Central Warehouse Node Linked to 1,580 Fleet and Rail Network',
    transitionType: 'seamless_reset',
    enter: { scale: 1.035, x: 0, y: 3 },
    exit: { scale: 1.005, x: 0, y: -4 },
  },
];

interface WarehouseInMotionProps {
  progress: number; // Master timeline progress 0.0000 -> 1.0000
  isAssetsReady: boolean;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const WarehouseInMotion: React.FC<WarehouseInMotionProps> = ({
  progress,
  isAssetsReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);
    return () => motionQuery.removeEventListener('change', handleMotion);
  }, []);

  // Subtle architectural mouse parallax (restrained, does NOT affect timeline progression)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x: nx * 6, y: ny * 4 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // =========================================================================
  // DETERMINISTIC SCENE CALCULATION FROM SINGLE MASTER PROGRESS (0 -> 1)
  // Total 7 scenes, 5.0s each = 35.0s total. 1.35s cinematic transition window.
  // =========================================================================
  const renderState = useMemo(() => {
    const TOTAL_SCENES = HERO_SCENES.length; // 7
    const clampedP = Math.max(0, Math.min(0.9999, progress));
    
    // Total virtual seconds across timeline: 0.00 to 35.00
    const totalSeconds = clampedP * 35;
    const sceneDuration = 5.0;
    const transitionWindow = 1.35;

    // Current scene index (0 to 6)
    const currentIdx = Math.min(TOTAL_SCENES - 1, Math.floor(totalSeconds / sceneDuration));
    
    // Time spent in current scene (0.00 to 5.00s)
    const sceneTime = totalSeconds - (currentIdx * sceneDuration);
    
    // Normalized camera travel inside current scene (0.0 to 1.0)
    const cameraT = Math.max(0, Math.min(1, sceneTime / sceneDuration));

    // Check if in transition window (last 1.35s of scene)
    const isTransitioning = sceneTime >= (sceneDuration - transitionWindow);
    
    let nextIdx: number | null = null;
    let transitionProgress = 0;

    if (isTransitioning) {
      // Loop smoothly from Scene 6 back to Scene 0 if at the end of the full timeline
      nextIdx = (currentIdx + 1) % TOTAL_SCENES;
      const rawT = (sceneTime - (sceneDuration - transitionWindow)) / transitionWindow;
      transitionProgress = smoothstep(0, 1, Math.max(0, Math.min(1, rawT)));
    }

    const currentScene = HERO_SCENES[currentIdx];
    const nextScene = nextIdx !== null ? HERO_SCENES[nextIdx] : null;

    // Base camera transforms with restrained scaling (max scale 1.035 for tack-sharp clarity)
    let curScale = lerp(currentScene.enter.scale, currentScene.exit.scale, cameraT);
    let curX = lerp(currentScene.enter.x, currentScene.exit.x, cameraT) + mouseOffset.x;
    let curY = lerp(currentScene.enter.y, currentScene.exit.y, cameraT) + mouseOffset.y;

    let nextScale = 1.0;
    let nextX = mouseOffset.x;
    let nextY = mouseOffset.y;
    let nextClip = 'none';
    let nextOpacity = transitionProgress;

    // Dedicated cinematic transition kinematics per chapter
    if (isTransitioning && nextScene) {
      const t = transitionProgress;
      const type = currentScene.transitionType;

      if (type === 'intake_push') {
        // 01 WAREHOUSE -> 02 RECEIVE: Camera pushes forward/left, intake dock enters from direction of cargo arrival
        curX -= t * 18;
        curScale += t * 0.008;

        nextScale = 1.02 - (1 - t) * 0.012;
        nextX = 28 * (1 - t) + mouseOffset.x;
        nextY = -4 * t + mouseOffset.y;
        nextClip = `inset(0 0 0 ${((1 - t) * 35).toFixed(1)}%)`;
        nextOpacity = t;
      } else if (type === 'corridor_dive') {
        // 02 RECEIVE -> 03 STORE: Continuous axial dive from intake dock into towering high-bay aisles
        curScale += t * 0.018;
        curY -= t * 6;

        nextScale = 0.985 + t * 0.025; // emerges through center depth canyon
        nextX = mouseOffset.x;
        nextY = 8 * (1 - t) + mouseOffset.y;
        nextClip = 'none';
        nextOpacity = Math.min(1, t * 1.15);
      } else if (type === 'aisle_shift') {
        // 03 STORE -> 04 CONTROL: Lateral dolly track across racking end-caps into inventory audit aisle
        curX += t * 24;

        nextScale = 1.018 - (1 - t) * 0.01;
        nextX = -32 * (1 - t) + mouseOffset.x;
        nextY = 2 * t + mouseOffset.y;
        nextClip = `inset(0 ${((1 - t) * 40).toFixed(1)}% 0 0)`;
        nextOpacity = t;
      } else if (type === 'process_glide') {
        // 04 CONTROL -> 05 VALUE-ADDED: Downward/forward line tracking into packaging & kitting stations
        curY -= t * 12;

        nextScale = 1.00 + t * 0.018;
        nextX = 18 * (1 - t) + mouseOffset.x;
        nextY = 22 * (1 - t) + mouseOffset.y;
        nextClip = 'none';
        nextOpacity = t;
      } else if (type === 'dispatch_flow') {
        // 05 VALUE-ADDED -> 06 FULFILMENT: Forward flow toward open outbound dispatch doors
        curScale += t * 0.015;
        curY -= t * 8;

        nextScale = 1.02 - (1 - t) * 0.015;
        nextX = -20 * (1 - t) + mouseOffset.x;
        nextY = 8 * (1 - t) + mouseOffset.y;
        nextClip = 'none';
        nextOpacity = t;
      } else if (type === 'aerial_pullout') {
        // 06 FULFILMENT -> 07 NETWORK PULL-OUT: Upward panoramic pull-out from dispatch floor into wide aerial network reveal
        curScale -= t * 0.01;

        // Aerial view emerges through an expanding panoramic aperture, pulling outward
        nextScale = 1.036 - t * 0.018;
        nextX = mouseOffset.x;
        nextY = 3 * (1 - t) + mouseOffset.y;
        nextClip = `circle(${(t * 85 + 15).toFixed(1)}% at 50% 50%)`;
        nextOpacity = Math.min(1, t * 1.25);
      } else {
        // 07 NETWORK -> 01 WAREHOUSE: Smooth reset back to ground establishing view
        nextScale = 1.00 + t * 0.01;
        nextX = mouseOffset.x;
        nextY = mouseOffset.y;
        nextClip = 'none';
        nextOpacity = t;
      }
    }

    return {
      currentIdx,
      currentScene,
      nextIdx,
      nextScene,
      isTransitioning,
      transitionProgress,
      nextClip,
      nextOpacity,
      currentTransform: `scale(${curScale.toFixed(4)}) translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`,
      nextTransform: `scale(${nextScale.toFixed(4)}) translate3d(${nextX.toFixed(1)}px, ${nextY.toFixed(1)}px, 0)`,
    };
  }, [progress, mouseOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-[#050b14]"
    >
      {/* Permanent Solid Base Anchor (Prevents browser sub-pixel rendering glitches) */}
      <div className="absolute inset-0 bg-[#050b14] pointer-events-none" />

      {/* =========================================================================
          ONE VISUAL LAYER SYSTEM (ZERO BLACK FRAMES GUARANTEED)
          Layer 1 (Base): Always renders currentScene at opacity 1.
          Layer 2 (Next): Renders ONLY during transition with cinematic direction.
          Because Layer 1 is always 100% opaque, the screen is NEVER empty or black.
         ========================================================================= */}
      
      {/* 1. CURRENT SCENE (Always 100% Opaque Base) */}
      <div 
        key={`current-${renderState.currentScene.id}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <img
          src={renderState.currentScene.image}
          alt={renderState.currentScene.alt}
          className="w-full h-full object-cover object-center will-change-transform"
          style={{
            transform: reducedMotion ? 'none' : renderState.currentTransform,
            transformOrigin: 'center center',
            filter: 'contrast(1.06) brightness(0.98) saturate(1.03)',
          }}
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Subtle radial falloff to softly frame the industrial environment */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 65% 50%, transparent 45%, rgba(5, 11, 20, 0.70) 100%)',
          }}
        />
      </div>

      {/* 2. NEXT SCENE (Renders ONLY during intentional cinematic transition window) */}
      {renderState.isTransitioning && renderState.nextScene && (
        <div 
          key={`next-${renderState.nextScene.id}`}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{ 
            zIndex: 2,
            opacity: renderState.nextOpacity,
            clipPath: renderState.nextClip !== 'none' ? renderState.nextClip : undefined,
            WebkitClipPath: renderState.nextClip !== 'none' ? renderState.nextClip : undefined,
          }}
        >
          <img
            src={renderState.nextScene.image}
            alt={renderState.nextScene.alt}
            className="w-full h-full object-cover object-center will-change-transform"
            style={{
              transform: reducedMotion ? 'none' : renderState.nextTransform,
              transformOrigin: 'center center',
              filter: 'contrast(1.06) brightness(0.98) saturate(1.03)',
            }}
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div 
            className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 65% 50%, transparent 45%, rgba(5, 11, 20, 0.70) 100%)',
            }}
          />
        </div>
      )}

      {/* Editorial Reading Scrim: Provides contrast on the left for editorial typography while keeping 70%+ of the warehouse photograph crisp and open */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(5,11,20,0.75) 0%, rgba(5,11,20,0.50) 30%, rgba(5,11,20,0.16) 52%, transparent 74%)'
        }}
      />

      {/* Natural Edge Vignettes for seamless viewport framing */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050b14]/90 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050b14] to-transparent pointer-events-none z-10" />

      {/* Subtle Preload Initialization Indicator (Dissolves immediately once ready) */}
      {!isAssetsReady && (
        <div className="absolute inset-0 bg-[#050b14] z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500">
          <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>INITIALIZING CINEMATIC FACILITY TIMELINE...</span>
          </div>
        </div>
      )}
    </div>
  );
};
