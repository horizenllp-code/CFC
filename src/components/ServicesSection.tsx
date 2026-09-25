import React, { useState } from 'react';
import { SERVICES } from '../data/cfcData';
import { PageTab, ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Strategic Priority Ordering: Warehousing First, Inventory & Value-Added Solutions Next, Supporting Transport Follows
  const sortedServices = [...SERVICES].sort((a, b) => {
    const priority: Record<string, number> = {
      'warehouse-inventory': 1,
      'supply-chain-solutions': 2,
      'rail-road-transportation': 3,
      'port-customs-clearance': 4,
      'air-freight': 5,
      'project-cargo': 6,
    };
    return (priority[a.id] || 99) - (priority[b.id] || 99);
  });

  return (
    <section id="services-section" className="bg-[#F8FAFC] text-slate-900 py-16 lg:py-24 border-b border-slate-200 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            CORE WAREHOUSING & INTEGRATED CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B192C] uppercase font-heading">
            WAREHOUSING-FIRST SUPPLY CHAIN SOLUTIONS
          </h2>
          {/* Central Red Accent Underline */}
          <div className="h-1 w-16 bg-[#DC2626] mx-auto mt-3 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            From 360,000+ sq. ft. of high-bay Grade-A storage and ₹300+ Cr inventory asset control to synchronized kitting and supporting pan-India distribution.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedServices.map((service, index) => {
            const semanticAnchorId = 
              service.id === 'freight-forwarding' ? 'freight-forwarding' :
              service.id === 'supply-chain-solutions' ? 'supply-chain-network' :
              service.id === '3pl-value-added' ? 'value-added-operations' :
              service.id === 'port-customs-clearance' ? 'documentation-compliance' : null;

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className={`bg-white border rounded-xs overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group scroll-mt-24 ${
                  index === 0 ? 'border-amber-400/80 ring-2 ring-amber-400/30' : 'border-slate-200'
                }`}
              >
                {semanticAnchorId && (
                  <div id={semanticAnchorId} className="scroll-mt-24" />
                )}
                <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className={`absolute bottom-3 left-3 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-xs tracking-wider uppercase border ${
                    index === 0 
                      ? 'bg-[#8B1818] border-red-400/50' 
                      : 'bg-[#0B192C]/90 border-slate-700'
                  }`}>
                    {index === 0 ? 'PRIMARY CORE // 360,000+ SQ. FT.' : 'SUPPORTING CAPABILITY'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0B192C] tracking-wide uppercase font-heading group-hover:text-[#F59E0B] transition-colors">
                    {service.title}
                  </h3>

                  {/* Amber Underline Under Title (Exact to Screenshot 4) */}
                  <div className="h-0.5 w-14 bg-[#F59E0B] my-3" />

                  {/* Factual Introduction Text */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Quick Capabilities Snapshot */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {service.capabilities.slice(0, 2).map((cap, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-[#0B192C] hover:text-[#F59E0B] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>SPECIFICATIONS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenQuote}
                  className="text-[11px] font-extrabold px-3 py-1.5 rounded-xs bg-[#0B192C] hover:bg-[#F59E0B] text-white hover:text-slate-950 uppercase tracking-wider transition-all cursor-pointer"
                >
                  ENQUIRE
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 bg-[#0B192C] hover:bg-[#152e50] text-white px-7 py-3.5 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xs transition-all shadow-md cursor-pointer font-heading"
          >
            <span>VIEW ALL DETAILED SOLUTIONS & CAPABILITIES</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>

      {/* Service Detailed Specifications Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xs max-w-2xl w-full border-2 border-[#0B192C] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b-2 border-amber-500">
              <div>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest font-heading">
                  CFC LOGISTICS PVT. LTD. SERVICE SPECIFICATIONS
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide font-heading mt-0.5">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xs">
                <h4 className="text-xs font-extrabold text-[#0B192C] uppercase tracking-wider mb-3 font-heading">
                  OPERATIONAL PARAMETERS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedService.specs.map((spec, i) => (
                    <div key={i} className="bg-white p-3 border border-slate-200 rounded-xs">
                      <div className="text-[11px] text-slate-500 uppercase">{spec.label}</div>
                      <div className="text-xs font-bold text-[#0B192C] mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Capabilities */}
              <div>
                <h4 className="text-xs font-extrabold text-[#0B192C] uppercase tracking-wider mb-2 font-heading">
                  KEY CAPABILITIES & PROTOCOLS
                </h4>
                <div className="space-y-2">
                  {selectedService.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600 font-medium">
                ISO 9001:2008 & I.B.A. Reg. DLC-1461 Compliant
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold uppercase rounded-xs hover:bg-slate-200 cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenQuote();
                  }}
                  className="px-5 py-2 bg-[#F59E0B] text-slate-950 text-xs font-extrabold uppercase rounded-xs hover:bg-amber-400 shadow cursor-pointer font-heading tracking-wider"
                >
                  REQUEST SERVICE PROPOSAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
