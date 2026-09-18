import React from 'react';
import { GENUINE_CLIENTS } from '../data/cfcData';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { PageTab } from '../types';

interface ClientsTrustSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const ClientsTrustSection: React.FC<ClientsTrustSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white text-slate-900 py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
              CLIENT PORTFOLIO & REPUTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B192C] uppercase font-heading">
              TRUSTED BY INDUSTRY LEADERS
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Delivering specialized multi-modal logistics and single-window supply chain operations 
              to global conglomerates and national pioneers across India.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              onClick={() => onNavigate('clients')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B192C] hover:text-[#F59E0B] uppercase tracking-wider transition-colors cursor-pointer group"
            >
              <span>VIEW ALL ENTERPRISE ACCOUNTS</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {GENUINE_CLIENTS.slice(0, 12).map((client) => (
            <div
              key={client.name}
              className="bg-[#F8FAFC] border border-slate-200/90 rounded-xs p-4 flex flex-col items-center justify-center text-center hover:border-amber-500 hover:bg-white transition-all shadow-xs group"
            >
              <div className="h-10 flex items-center justify-center font-heading font-black text-lg sm:text-xl text-[#0B192C] group-hover:text-amber-600 transition-colors uppercase tracking-tight">
                {client.name}
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1 truncate w-full">
                {client.category}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-10 bg-[#0B192C] text-white p-6 rounded-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400 font-heading">
                ISO 9001:2008 CERTIFIED
              </div>
              <div className="text-xs text-slate-300">
                Audited operational quality & zero-defect handling protocols.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-600 text-white rounded-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-sky-300 font-heading">
                I.B.A. APPROVED DLC-1461
              </div>
              <div className="text-xs text-slate-300">
                Indian Bank Association certified bank consignment transport.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#DC2626] text-white rounded-xs">
              <span className="font-heading font-extrabold text-sm">₹300Cr</span>
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-red-300 font-heading">
                INVENTORY UNDER MANAGEMENT
              </div>
              <div className="text-xs text-slate-300">
                Safeguarding client assets across 360,000+ sq. ft. warehousing.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
