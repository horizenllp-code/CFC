import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote?: () => void;
  onOpenTracking?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section 
      id="hero-warehouse"
      className="relative w-full max-w-full m-0 p-0 bg-[#050d18] text-white overflow-hidden select-none border-b border-slate-800/80 lg:min-h-[85vh] lg:flex lg:items-center scroll-mt-20 sm:scroll-mt-24"
    >
      {/* =========================================================================
          MOBILE PRESENTATION: WAREHOUSE HERO SECTION
          - Full width (100%), exact native 1672/941 aspect ratio image
          - Pure, clean mobile presentation of the warehouse hero
          - Exact requested headline, copy, and CTA
         ========================================================================= */}
      <div className="lg:hidden w-full">
        <div className="relative w-full aspect-[1672/941] overflow-hidden">
          <img
            src="/assets/images/9.png"
            alt="CFC Logistics High-Bay Warehousing and Inventory Operations"
            className="w-full h-full object-cover object-center pointer-events-none block m-0 p-0"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d18] via-[#050d18]/40 to-transparent" />
        </div>

        <div className="px-6 py-8 text-left space-y-4 max-w-xl mx-auto -mt-6 relative z-10">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em] font-heading">
              STRATEGIC INFRASTRUCTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05] uppercase text-white font-heading">
            <span>WAREHOUSING. </span>
            <span>INVENTORY. </span>
            <span className="text-[#F59E0B]">CONTROL.</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed font-normal">
            Integrated warehouse and inventory solutions built around your supply chain.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('single-window');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('services');
                }
              }}
              className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-xs transition-all cursor-pointer font-heading"
            >
              <span>EXPLORE WAREHOUSE NETWORK</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP PRESENTATION: CINEMATIC WAREHOUSE HERO
          - Full-bleed background with restrained Ken Burns motion
          - Directional scrims preserving reach truck and aisle clarity
         ========================================================================= */}
      <div className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/assets/images/9.png"
          alt="CFC Logistics High-Bay Warehousing and Inventory Operations"
          className="w-full h-full object-cover object-center hero-ken-burns"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Desktop directional scrim: Preserves contrast behind text block; keeps center aisle, reach truck, and right racks bright & natural */}
      <div 
        className="hidden lg:block absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(5, 13, 24, 0.72) 0%, rgba(5, 13, 24, 0.55) 30%, rgba(5, 13, 24, 0.20) 52%, rgba(5, 13, 24, 0.03) 68%, transparent 85%)',
        }}
      />

      {/* Desktop top/bottom transitions */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050d18]/45 to-transparent pointer-events-none z-10" />
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050d18]/35 to-transparent pointer-events-none z-10" />

      {/* Desktop Content: Exact headline, supporting copy, and CTA */}
      <div className="hidden lg:block relative z-20 w-full px-6 sm:px-10 lg:pl-[7.5vw] lg:pr-8 max-w-[1440px] mx-auto py-16 lg:py-20">
        <div className="max-w-[520px] xl:max-w-[560px] space-y-8 sm:space-y-9">
          
          {/* Eyebrow */}
          <div 
            className={`transition-all duration-700 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.22em] font-heading">
                STRATEGIC INFRASTRUCTURE
              </span>
            </div>
          </div>

          {/* Headline: WAREHOUSING. INVENTORY. CONTROL. */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-extrabold tracking-tight leading-[1.03] uppercase text-white font-heading">
            <span className="block overflow-hidden pb-1">
              <span 
                className={`inline-block transition-transform duration-700 ease-out ${
                  isMounted ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                WAREHOUSING.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span 
                className={`inline-block transition-transform duration-700 ease-out delay-100 ${
                  isMounted ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                INVENTORY.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span 
                className={`inline-block text-[#F59E0B] transition-transform duration-700 ease-out delay-200 ${
                  isMounted ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                CONTROL.
              </span>
            </span>
          </h2>

          {/* Supporting Copy */}
          <p 
            className={`text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal transition-all duration-700 ease-out delay-300 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Integrated warehouse and inventory solutions built around your supply chain.
          </p>

          {/* Action CTA: EXPLORE WAREHOUSE NETWORK */}
          <div 
            className={`pt-2 sm:pt-3 transition-all duration-700 ease-out delay-400 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <button
              onClick={() => {
                const el = document.getElementById('single-window');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('services');
                }
              }}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/45 bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs transition-all cursor-pointer font-heading backdrop-blur-sm"
            >
              <span>EXPLORE WAREHOUSE NETWORK</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
