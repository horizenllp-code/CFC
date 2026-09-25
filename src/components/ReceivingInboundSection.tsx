import React from 'react';
import { PageTab } from '../types';
import { Truck, PackageCheck, ArrowDownToLine, CheckCircle2 } from 'lucide-react';

interface ReceivingInboundSectionProps {
  onNavigate?: (tab: PageTab) => void;
  onOpenQuote?: () => void;
}

export const ReceivingInboundSection: React.FC<ReceivingInboundSectionProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <section 
      id="distribution-fulfilment" 
      className="bg-[#0B192C] text-slate-100 py-16 sm:py-20 lg:py-24 border-b border-slate-800 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Secondary anchor for backwards compatibility */}
      <div id="receiving-inbound" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Context */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading">
              INBOUND WAREHOUSE LOGISTICS
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.08] font-heading">
            RECEIVING & INBOUND OPERATIONS
          </h2>

          {/* Supporting Copy */}
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Structured receiving and inbound handling designed to bring inventory into the warehouse with clarity and control.
          </p>
        </div>

        {/* Large-Format Single Section Photograph */}
        <div className="relative w-full overflow-hidden rounded-xs border border-slate-700/70 bg-[#071220] shadow-2xl mb-10">
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/10] overflow-hidden">
            <img
              src="/assets/images/1.png"
              alt="CFC Logistics Active Receiving, Dock Operations, and Inbound Cargo Handling"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Operational Highlights (HTML Elements Outside the Photograph) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          
          <div className="border-t-2 border-[#F59E0B] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-heading">
                DOCK MANAGEMENT
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Organized commercial vehicle turnaround and dock bay scheduling to prevent yard congestion.
            </p>
          </div>

          <div className="border-t-2 border-[#0284C7] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownToLine className="w-4 h-4 text-[#0284C7]" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-heading">
                CARGO UNLOADING
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Safe container destuffing and palletized cargo discharge using dedicated material handling equipment.
            </p>
          </div>

          <div className="border-t-2 border-[#10B981] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-heading">
                INBOUND VERIFICATION
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Systematic piece-count checking, condition audits, and barcode verification at initial receiving intake.
            </p>
          </div>

          <div className="border-t-2 border-slate-600 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <PackageCheck className="w-4 h-4 text-slate-300" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-heading">
                PALLET STAGING
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Standardized palletization and immediate transition to high-bay vertical storage locations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
