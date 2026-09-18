import React from 'react';
import { ArrowRight, Warehouse, ShieldCheck, Activity, CheckCircle2, PackageCheck } from 'lucide-react';
import { PageTab } from '../types';
import warehouseImage from '../assets/images/module_warehouse.jpg';

interface SingleWindowSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote?: () => void;
}

export const SingleWindowSection: React.FC<SingleWindowSectionProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <section id="single-window" className="bg-white text-slate-900 py-16 lg:py-24 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Key Warehouse Capability Pillars */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Orange Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading">
                WAREHOUSING & INVENTORY INFRASTRUCTURE
              </span>
            </div>

            {/* Bold Dark Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B192C] uppercase leading-[1.08] font-heading">
              360,000+ SQ. FT. OF PRECISION WAREHOUSE CAPACITY
            </h2>

            {/* Editorial Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              CFC Logistics administers over <strong className="text-slate-900 font-semibold">360,000 sq. ft. of covered warehousing space</strong> across India's key industrial nodes, managing more than <strong className="text-slate-900 font-semibold">₹300 Crore in commercial inventory assets</strong>. Focused on operational reliability, our facilities provide organized vertical storage, dedicated inventory handling, and single-window logistics control.
            </p>

            {/* 4 Core Warehouse Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              {/* Box 1: Storage */}
              <div className="bg-[#F8FAFC] p-4.5 rounded border-l-4 border-[#0B192C] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Warehouse className="w-4 h-4 text-[#0B192C]" />
                    <h3 className="text-sm font-extrabold text-[#0B192C] uppercase tracking-wider font-heading">
                      HIGH-BAY STORAGE
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Organized vertical pallet racking, spacious covered facilities, and 24/7 security management.
                  </p>
                </div>
              </div>

              {/* Box 2: Inventory Value Safety */}
              <div className="bg-[#F8FAFC] p-4.5 rounded border-l-4 border-[#0284C7] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Activity className="w-4 h-4 text-[#0284C7]" />
                    <h3 className="text-sm font-extrabold text-[#0B192C] uppercase tracking-wider font-heading">
                      ₹300+ CR ASSET CONTROL
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive inventory administration, commercial asset protection, and regular stock reconciliation.
                  </p>
                </div>
              </div>

              {/* Box 3: Value-Added Handling */}
              <div className="bg-[#F8FAFC] p-4.5 rounded border-l-4 border-[#F59E0B] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <PackageCheck className="w-4 h-4 text-[#F59E0B]" />
                    <h3 className="text-sm font-extrabold text-[#0B192C] uppercase tracking-wider font-heading">
                      VALUE-ADDED SERVICES
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Packaging, product labeling, bundling, and specialized warehouse handling tailored to client operations.
                  </p>
                </div>
              </div>

              {/* Box 4: Factory Replenishment */}
              <div className="bg-[#F8FAFC] p-4.5 rounded border-l-4 border-[#DC2626] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                    <h3 className="text-sm font-extrabold text-[#0B192C] uppercase tracking-wider font-heading">
                      FACTORY REPLENISHMENT
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Synchronized inventory staging delivering dependable supply lines directly to manufacturing floors.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 bg-[#0B192C] hover:bg-[#071220] text-white px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors cursor-pointer font-heading group"
              >
                <span>EXPLORE WAREHOUSING SOLUTIONS</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {onOpenQuote && (
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors cursor-pointer font-heading"
                >
                  <span>REQUEST STORAGE QUOTE</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: High-Impact Authentic Warehouse Architecture Image */}
          <div className="lg:col-span-6 relative">
            
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Backing Amber Accent Offset Box */}
              <div className="absolute -bottom-3.5 -right-3.5 w-full h-full bg-[#F59E0B] rounded-xs -z-10" />
              
              {/* Foreground Image Container */}
              <div className="relative border-2 border-[#0B192C] bg-slate-950 rounded-xs overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={warehouseImage}
                  alt="CFC Logistics High-Bay Warehousing Infrastructure & Inventory Management"
                  className="w-full h-full object-cover object-center filter contrast-[1.08]"
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Corner Badge: Footprint Metric */}
                <div className="absolute top-4 left-4 bg-[#0B192C]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xs text-xs font-extrabold uppercase tracking-wider border border-slate-700 shadow-lg flex items-center gap-2">
                  <Warehouse className="w-3.5 h-3.5 text-amber-400" />
                  <span>360,000+ SQ. FT. COVERED</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#071220]/90 backdrop-blur-md border border-slate-700/80 p-3.5 rounded text-white shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                      INVENTORY ASSETS UNDER MANAGEMENT
                    </div>
                    <div className="text-lg font-extrabold font-heading text-white">
                      OVER ₹300 CRORE VALUATION
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px] text-slate-300">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    ACTIVE OPERATIONS
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
