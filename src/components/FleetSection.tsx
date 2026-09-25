import React from 'react';
import { ArrowRight, Truck, Navigation, ShieldCheck, MapPin } from 'lucide-react';
import { PageTab } from '../types';

interface FleetSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote: () => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <section id="transportation-fleet" className="bg-[#0B192C] text-white py-16 lg:py-24 border-b border-slate-800 scroll-mt-20 sm:scroll-mt-24">
      {/* Secondary anchor for backwards compatibility */}
      <div id="fleet-section" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image of CFC Commercial Fleet (Exact to Screenshot 5) */}
          <div className="lg:col-span-6">
            <div className="relative border-2 border-sky-600/40 rounded-xs p-2 bg-[#091626] shadow-2xl">
              <div className="relative overflow-hidden aspect-[4/3] rounded-xs bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop"
                  alt="CFC Logistics Dedicated Commercial Cargo Trucks"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Fleet Livery Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#0B192C]/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xs text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>CFC LOGISTICS (P.) LTD. FLEET</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 px-3 py-1 text-xs font-extrabold tracking-wider uppercase rounded-xs">
                  1,580 ACTIVE VEHICLES
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Information */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Orange Eyebrow */}
            <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block">
              SUPPORTING LOGISTICS INFRASTRUCTURE
            </span>

            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.1] font-heading">
              1,580 FLEET CONNECTING WAREHOUSE ARTERIES
            </h2>

            {/* Factual Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Operating in direct synchronization with our 360,000+ sq. ft. warehousing footprint, 
              CFC's managed fleet of 1,580 dedicated commercial vehicles provides dependable arterial 
              ground haulage—connecting plant intake, inventory staging, and downstream dealer distribution.
            </p>

            {/* 3 Outlined Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="border border-sky-600 bg-[#0f253d] text-sky-200 px-4 py-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xs font-heading">
                WAREHOUSE SYNCHRONIZED
              </span>
              <span className="border border-sky-600 bg-[#0f253d] text-sky-200 px-4 py-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xs font-heading">
                ROAD & RAIL INTEGRATED
              </span>
              <span className="border border-sky-600 bg-[#0f253d] text-sky-200 px-4 py-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xs font-heading">
                1,580 MANAGED VEHICLES
              </span>
            </div>

            {/* Quick Fleet Technical Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
              <div className="bg-[#091524] p-3 border border-slate-800 rounded-xs">
                <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-amber-400" />
                  <span>TRACKING</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">24/7 GPS Live</div>
              </div>

              <div className="bg-[#091524] p-3 border border-slate-800 rounded-xs">
                <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>COMPLIANCE</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">I.B.A. DLC-1461</div>
              </div>

              <div className="bg-[#091524] p-3 border border-slate-800 rounded-xs col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>PRESENCE</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">35 Pan-India Hubs</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('fleet')}
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#d97706] text-slate-950 px-6 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xs transition-all shadow cursor-pointer font-heading"
              >
                <span>VIEW COMPLETE FLEET CAPABILITIES</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onOpenQuote}
                className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                REQUEST CHARTER FLEET
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
