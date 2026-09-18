import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageTab } from '../types';
import { WarehouseInMotion, HERO_SCENES } from './WarehouseInMotion';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote?: () => void;
  onOpenTracking?: () => void;
}

const TOTAL_TIMELINE_MS = 35000; // Exact 35-second master cinematic timeline (7 scenes x 5.0s)

export interface SceneEditorial {
  stageNumber: string;
  stageName: string;
  headline: string;
  supporting: string;
  positionClasses: string;
}

export const SCENE_EDITORIALS: Record<number, SceneEditorial> = {
  0: {
    stageNumber: '01',
    stageName: 'WAREHOUSE',
    headline: 'CENTRAL WAREHOUSE FACILITY.',
    supporting: '360,000+ sq. ft. primary logistics hub supporting integrated warehousing and supply chain operations.',
    positionClasses: 'top-[46%]',
  },
  1: {
    stageNumber: '01',
    stageName: 'RECEIVE',
    headline: 'INBOUND. ORGANIZED. READY.',
    supporting: 'Structured warehouse receiving and inventory intake as the first step in the supply chain.',
    positionClasses: 'top-[48%]',
  },
  2: {
    stageNumber: '02',
    stageName: 'STORE',
    headline: 'SPACE. STRUCTURE. VISIBILITY.',
    supporting: '360,000+ sq. ft. of warehousing footprint supporting organized storage and inventory handling.',
    positionClasses: 'top-[38%]', // Positioned higher to give breathing room to vertical high-bay racking
  },
  3: {
    stageNumber: '03',
    stageName: 'CONTROL',
    headline: 'INVENTORY WITH VISIBILITY.',
    supporting: 'Managing inventory assets valued at over ₹300 Crore with integrated storage and supply-chain support.',
    positionClasses: 'top-[54%]', // Balanced lower alongside inventory floor
  },
  4: {
    stageNumber: '04',
    stageName: 'VALUE-ADDED',
    headline: 'MORE THAN STORAGE.',
    supporting: 'Packaging, labeling, strapping, shrink-wrapping and other value-added warehouse services.',
    positionClasses: 'top-[46%]', // Shifted into negative space
  },
  5: {
    stageNumber: '05',
    stageName: 'FULFILMENT',
    headline: 'FROM STORAGE TO DESTINATION.',
    supporting: 'Integrated warehousing, distribution and downstream supply-chain support.',
    positionClasses: 'top-[42%]', // Upper-left
  },
  6: {
    stageNumber: '06',
    stageName: 'CONNECTED NETWORK',
    headline: 'ONE WAREHOUSE.\nA WIDER SUPPLY CHAIN.',
    supporting: "CFC's warehousing operation connects with its broader logistics and transportation capabilities.",
    positionClasses: 'top-[45%]', // Compact, expansive view
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigate, 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // 1. ONE MASTER TIMELINE: Single source of truth (0.0000 -> 1.0000)
  const [progress, setProgress] = useState<number>(0);
  const [isAssetsReady, setIsAssetsReady] = useState<boolean>(false);

  // References for deterministic timeline control
  const progressRef = useRef<number>(0);
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  
  // Requirement: Opening typography lifecycle
  // Visible during complete opening phase (0–5.0s), gradual dissolve (5.0–8.0s), then permanently cleared
  const hasDissolvedHeadlineRef = useRef<boolean>(false);

  // Staged entrance refs (once revealed, elements stay revealed)
  const hasRevealedEyebrowRef = useRef<boolean>(false);
  const hasRevealedHeadlineRef = useRef<boolean>(false);
  const hasRevealedCopyRef = useRef<boolean>(false);
  const hasRevealedCtaRef = useRef<boolean>(false);

  // =========================================================================
  // REQUIREMENT 5: PRELOAD ALL 7 HERO ASSETS BEFORE TIMELINE PLAYBACK
  // =========================================================================
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const totalAssets = HERO_SCENES.length;

    HERO_SCENES.forEach((scene) => {
      const img = new Image();
      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount === totalAssets) {
          setIsAssetsReady(true);
        }
      };
      img.onerror = () => {
        console.warn(`[HeroAssetLoader] Graceful fallback on: ${scene.image}`);
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount === totalAssets) {
          setIsAssetsReady(true);
        }
      };
      img.src = scene.image;
    });

    // Fallback: Never leave user stuck on slow connections
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled && !isAssetsReady) {
        setIsAssetsReady(true);
      }
    }, 2500);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  // =========================================================================
  // REQUIREMENT 1 & 12: THE ONE MASTER AUTOPLAY ANIMATION CONTROLLER
  // Continuous 60fps RAF loop that advances timeline progress deterministically
  // =========================================================================
  useEffect(() => {
    if (!isAssetsReady) return;

    let lastTimestamp: number | null = null;

    const tick = (now: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = now;
      }
      const delta = Math.min(64, now - lastTimestamp); // Cap delta to prevent large jumps on tab switch
      lastTimestamp = now;

      // Autoplay advances ONLY when user is not actively scrubbing via scroll
      if (!isUserScrollingRef.current) {
        accumulatedMsRef.current += delta;
        const currentMs = accumulatedMsRef.current % TOTAL_TIMELINE_MS;
        const newProgress = currentMs / TOTAL_TIMELINE_MS;
        
        progressRef.current = newProgress;
        setProgress(newProgress);

        // Check headline dissolve threshold (6.8s / 35.0s = ~0.19428)
        if (newProgress >= 0.19428) {
          hasDissolvedHeadlineRef.current = true;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isAssetsReady]);

  // =========================================================================
  // REQUIREMENT 13: CLEAN SCROLL INTEGRATION (NO COMPETING CONTROLLERS)
  // When visitor scrolls, pause autoplay, map progress to scroll, then resume
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (scrollableDist <= 0) return;

      const scrolled = -rect.top;
      
      // If user has scrolled past top threshold, synchronize scrub
      if (scrolled > 20) {
        isUserScrollingRef.current = true;
        const scrollP = Math.max(0, Math.min(1, scrolled / scrollableDist));
        
        progressRef.current = scrollP;
        setProgress(scrollP);

        if (scrollP >= 0.19428) {
          hasDissolvedHeadlineRef.current = true;
        }

        // Debounce: 1.2s after user stops scrolling, seamlessly resume autoplay from current progress
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isUserScrollingRef.current = false;
          // Synchronize autoplay clock to exact current progress position
          accumulatedMsRef.current = progressRef.current * TOTAL_TIMELINE_MS;
        }, 1200);
      } else {
        // At top of page: Autoplay remains active
        isUserScrollingRef.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Quick jump to next section
  const handleSkipToNext = useCallback(() => {
    const nextSection = document.getElementById('single-window');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' });
    }
  }, []);

  // Manual jump to specific stage by clicking step indicator
  const handleSelectStage = useCallback((stageIdx: number) => {
    const targetProgress = stageIdx / HERO_SCENES.length;
    progressRef.current = targetProgress;
    accumulatedMsRef.current = targetProgress * TOTAL_TIMELINE_MS;
    setProgress(targetProgress);
    if (stageIdx > 0) {
      hasDissolvedHeadlineRef.current = true;
    }
  }, []);

  // =========================================================================
  // DERIVED STATE: ALL VISUAL DATA DERIVED DIRECTLY FROM SINGLE PROGRESS VALUE
  // 35-second timeline: 7 scenes x 5.0 seconds each
  // =========================================================================
  const timelineTimeSec = progress * 35;
  const currentSceneIdx = Math.min(6, Math.floor(timelineTimeSec / 5.0));
  const activeScene = HERO_SCENES[currentSceneIdx] || HERO_SCENES[0];

  // =========================================================================
  // REFINED TYPOGRAPHY TIMING & LIFECYCLE CONTROLLER
  // 0–1.0s: Environment establishes
  // 1.0s: Eyebrow appears
  // 1.6s: Headline reveals (WAREHOUSING. INVENTORY. CONTROL.)
  // 2.4s: Supporting copy appears
  // 3.2s: CTA button appears
  // 0–5.0s: Full initial opening proposition remains visible
  // 5.0–6.0s: Initial proposition smoothly transitions out and is permanently cleared
  // =========================================================================
  if (timelineTimeSec >= 1.0) hasRevealedEyebrowRef.current = true;
  if (timelineTimeSec >= 1.6) hasRevealedHeadlineRef.current = true;
  if (timelineTimeSec >= 2.4) hasRevealedCopyRef.current = true;
  if (timelineTimeSec >= 3.2) hasRevealedCtaRef.current = true;

  const isEyebrowVisible = hasRevealedEyebrowRef.current;
  const isHeadlineVisible = hasRevealedHeadlineRef.current;
  const isCopyVisible = hasRevealedCopyRef.current;
  const isCtaVisible = hasRevealedCtaRef.current;

  // 1. Initial Opening Hero Proposition Lifecycle (Appears once, never repeats)
  const initialHeroState = useMemo(() => {
    if (hasDissolvedHeadlineRef.current) {
      return { opacity: 0, translateY: -20, isVisible: false };
    }
    
    // Kept visible longer through establishing phase (0 to 5.2s), then smooth gradual dissolve (5.2s to 6.8s)
    if (timelineTimeSec <= 5.2) {
      return { opacity: 1, translateY: 0, isVisible: true };
    } else if (timelineTimeSec < 6.8) {
      const t = (timelineTimeSec - 5.2) / 1.6;
      const eased = t * t * (3 - 2 * t);
      return { 
        opacity: Math.max(0, 1 - eased), 
        translateY: -20 * eased, 
        isVisible: true 
      };
    } else {
      hasDissolvedHeadlineRef.current = true;
      return { opacity: 0, translateY: -20, isVisible: false };
    }
  }, [timelineTimeSec]);

  // 2. Dynamic Scene-Specific Editorial Typography Layer
  // Factual, minimal film-title editorial text synchronized with the active photographic scene
  const activeEditorial = SCENE_EDITORIALS[currentSceneIdx];

  const sceneEditorialState = useMemo(() => {
    // If opening hero proposition is currently active on first play, don't show chapter 0 editorial
    if (!hasDissolvedHeadlineRef.current && currentSceneIdx === 0) {
      return { opacity: 0, translateY: 16, isActive: false };
    }

    // If opening hero proposition is dissolving during scene 1 entry, delay scene 1 editorial until 6.8s
    if (!hasDissolvedHeadlineRef.current && currentSceneIdx === 1 && timelineTimeSec < 6.8) {
      return { opacity: 0, translateY: 16, isActive: false };
    }

    const sceneTime = timelineTimeSec - (currentSceneIdx * 5.0); // 0.0 to 5.0s within the chapter

    // Special entry for scene 1 when delayed past opening hero dissolve
    if (!hasDissolvedHeadlineRef.current && currentSceneIdx === 1) {
      const s1DelayTime = timelineTimeSec - 6.8; // 0.0 to 3.2s
      if (s1DelayTime < 0.8) {
        const t = s1DelayTime / 0.8;
        const eased = t * t * (3 - 2 * t);
        return { opacity: eased, translateY: 16 * (1 - eased), isActive: true };
      } else if (timelineTimeSec < 9.1) {
        return { opacity: 1, translateY: 0, isActive: true };
      } else if (timelineTimeSec < 9.85) {
        const t = (timelineTimeSec - 9.1) / 0.75;
        const eased = t * t * (3 - 2 * t);
        return { opacity: Math.max(0, 1 - eased), translateY: -16 * eased, isActive: true };
      } else {
        return { opacity: 0, translateY: -16, isActive: true };
      }
    }

    // Standard Chapter Editorial Lifecycle:
    // Entry phase (0.25s - 1.0s): Text fades and gently slides into place
    if (sceneTime < 0.25) {
      return { opacity: 0, translateY: 16, isActive: true };
    } else if (sceneTime < 1.0) {
      const t = (sceneTime - 0.25) / 0.75;
      const eased = t * t * (3 - 2 * t);
      return {
        opacity: eased,
        translateY: 16 * (1 - eased),
        isActive: true,
      };
    } 
    // Settled reading phase (1.0s - 3.95s): Full contrast and clarity
    else if (sceneTime < 3.95) {
      return { opacity: 1, translateY: 0, isActive: true };
    } 
    // Exit transition phase (3.95s - 4.85s): Fades out before new visual arrives
    else if (sceneTime < 4.85) {
      const t = (sceneTime - 3.95) / 0.90;
      const eased = t * t * (3 - 2 * t);
      return {
        opacity: Math.max(0, 1 - eased),
        translateY: -16 * eased,
        isActive: true,
      };
    } 
    // Slate cleared before incoming transition
    else {
      return { opacity: 0, translateY: -16, isActive: true };
    }
  }, [currentSceneIdx, timelineTimeSec]);

  return (
    <section 
      ref={sectionRef}
      id="hero-experience"
      className="relative w-full bg-[#050b14] text-white h-[240vh]"
    >
      {/* Pinned Sticky Viewport: Remains crisp and centered throughout playback */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center">
        
        {/* =========================================================================
            1. THE CONTROLLED TWO-LAYER WAREHOUSE VISUAL CANVAS
           ========================================================================= */}
        <WarehouseInMotion 
          progress={progress}
          isAssetsReady={isAssetsReady}
        />

        {/* =========================================================================
            2. OPENING PROPOSITION TYPOGRAPHY (First 0–5s Only)
            WAREHOUSING. INVENTORY. CONTROL. — Gracefully transitions out
           ========================================================================= */}
        {initialHeroState.isVisible && (
          <div 
            className="relative z-20 w-full px-6 sm:px-10 lg:pl-[7.5vw] lg:pr-8 max-w-[1440px] mx-auto select-none pointer-events-none"
            style={{
              opacity: initialHeroState.opacity,
              transform: `translate3d(0, ${initialHeroState.translateY}px, 0)`,
              pointerEvents: initialHeroState.opacity > 0.3 ? 'auto' : 'none',
              transition: 'opacity 0.1s linear, transform 0.1s linear',
            }}
          >
            <div className="max-w-[500px] xl:max-w-[540px] space-y-8 sm:space-y-9">
              
              {/* 1. Refined Eyebrow */}
              <div 
                className={`transition-all duration-700 ease-out ${
                  isEyebrowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <div className="inline-flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.22em] font-heading">
                    WAREHOUSING & INVENTORY SOLUTIONS
                  </span>
                </div>
              </div>

              {/* 2. Headline: WAREHOUSING. INVENTORY. CONTROL. */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold tracking-tight leading-[1.03] uppercase text-white font-heading">
                <span className="block overflow-hidden pb-1">
                  <span 
                    className={`inline-block transition-transform duration-700 ease-out ${
                      isHeadlineVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    WAREHOUSING.
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span 
                    className={`inline-block transition-transform duration-700 ease-out delay-150 ${
                      isHeadlineVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    INVENTORY.
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span 
                    className={`inline-block text-[#F59E0B] transition-transform duration-700 ease-out delay-300 ${
                      isHeadlineVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    CONTROL.
                  </span>
                </span>
              </h1>

              {/* 3. Supporting CFC Facts */}
              <p 
                className={`text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal transition-all duration-700 ease-out ${
                  isCopyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                With a 360,000+ sq. ft. pan-India warehousing footprint and inventory assets valued at over ₹300 Crore under management, CFC Logistics delivers integrated storage, inventory handling and supply-chain support.
              </p>

              {/* 4. Minimal Refined Action Button */}
              <div 
                className={`pt-2 sm:pt-3 transition-all duration-700 ease-out ${
                  isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/45 bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs transition-all cursor-pointer font-heading backdrop-blur-sm"
                >
                  <span>EXPLORE WAREHOUSE NETWORK</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            3. DYNAMIC SCENE-SPECIFIC EDITORIAL TYPOGRAPHY
            Restrained film-title typography synchronized with each active chapter
            (Small Stage Indicator + Short Large Headline + One Short Line)
           ========================================================================= */}
        {sceneEditorialState.isActive && activeEditorial && (
          <div 
            className={`absolute left-6 sm:left-10 lg:left-[7.5vw] z-20 max-w-xl -translate-y-1/2 select-none pointer-events-none ${activeEditorial.positionClasses}`}
            style={{
              opacity: sceneEditorialState.opacity,
              transform: `translate3d(0, ${sceneEditorialState.translateY}px, 0)`,
              transition: 'opacity 0.1s linear, transform 0.1s linear',
            }}
          >
            <div className="space-y-3 sm:space-y-4">
              
              {/* Small stage indicator */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span className="text-[11px] sm:text-xs font-bold text-amber-400 font-mono tracking-[0.2em] uppercase">
                  {activeEditorial.stageNumber} / {activeEditorial.stageName}
                </span>
              </div>

              {/* Short large headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.05] uppercase text-white font-heading">
                {activeEditorial.headline.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>

              {/* One short supporting line */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg font-normal drop-shadow-xs">
                {activeEditorial.supporting}
              </p>

              {/* Official CFC Tagline on Final Hero Stage */}
              {currentSceneIdx === 6 && (
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 font-heading tracking-[0.2em] uppercase bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xs">
                    Logistically yours
                  </span>
                </div>
              )}

            </div>
          </div>
        )}

        {/* =========================================================================
            3. REQUIREMENT 11: SYNCHRONIZED STAGE ANNOTATION BAR
            Derived directly from the master timeline progress
           ========================================================================= */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-[7.5vw] right-4 sm:right-[7.5vw] z-20 flex items-center justify-between pointer-events-none select-none">
          
          {/* Synchronized Stage Indicator */}
          <div className="flex items-center gap-3 bg-[#050b14]/85 backdrop-blur-md px-3.5 py-2 rounded-xs border border-white/10 transition-all duration-300 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase">
              {activeScene.stageCode}
            </span>
            <span className="text-slate-600 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-slate-200 font-sans tracking-wide hidden sm:inline">
              {activeScene.desc}
            </span>

            {/* Deterministic 7-step track synchronized with master timeline */}
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-white/10">
              {HERO_SCENES.map((scene, stepIdx) => (
                <button
                  key={scene.id}
                  onClick={() => handleSelectStage(stepIdx)}
                  title={scene.title}
                  className="p-1 cursor-pointer group focus:outline-none"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      stepIdx === currentSceneIdx
                        ? 'w-4 bg-amber-400'
                        : stepIdx < currentSceneIdx
                        ? 'w-2 bg-amber-400/50 group-hover:bg-amber-400/80'
                        : 'w-2 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Jump to Next Section */}
          <button
            onClick={handleSkipToNext}
            className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors cursor-pointer group bg-[#050b14]/85 backdrop-blur-md px-3 py-2 rounded-xs border border-white/10 hover:border-amber-400/40"
          >
            <span className="tracking-wider uppercase text-[11px] sm:text-xs">
              EXPLORE INFRASTRUCTURE
            </span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-amber-400" />
          </button>

        </div>

      </div>
    </section>
  );
};
