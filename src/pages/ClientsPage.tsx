import React, { useState } from 'react';
import { GENUINE_CLIENTS } from '../data/cfcData';
import { ShieldCheck, Award, Building, Filter, ArrowRight } from 'lucide-react';

interface ClientsPageProps {
  onOpenQuote: () => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onOpenQuote }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const categories = [
    'All',
    'Automotive & Engineering',
    'Tyres & Rubber',
    'Electrical & Industrial',
    'Chemicals & Pharma',
    'FMCG & Food',
  ];

  const filteredClients = GENUINE_CLIENTS.filter((c) => {
    if (selectedIndustry === 'All') return true;
    if (selectedIndustry === 'Automotive & Engineering') {
      return c.category.includes('Automotive') || c.category.includes('Machinery');
    }
    if (selectedIndustry === 'Tyres & Rubber') {
      return c.category.includes('Tyres');
    }
    if (selectedIndustry === 'Electrical & Industrial') {
      return c.category.includes('Electrical') || c.category.includes('Lighting') || c.category.includes('Industrial');
    }
    if (selectedIndustry === 'Chemicals & Pharma') {
      return c.category.includes('Chemicals');
    }
    if (selectedIndustry === 'FMCG & Food') {
      return c.category.includes('Food') || c.category.includes('FMCG');
    }
    return true;
  });

  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Page Header */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            ENTERPRISE LOGISTICS PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            OUR GENUINE CLIENTS & PARTNERS
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            From Fortune 500 multinationals to Indian manufacturing titans, CFC Logistics Pvt. Ltd. 
            delivers mission-critical single-window supply chain management with zero-defect handling standards.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Industry Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2 flex items-center gap-1 font-heading">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>INDUSTRY FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedIndustry(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-all cursor-pointer font-heading ${
                selectedIndustry === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                  : 'bg-[#091524] text-slate-300 border-slate-800 hover:bg-[#0e2136]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.name}
              className="bg-[#0e2238] border border-slate-800 rounded-xs p-6 hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header with Client Name */}
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-white font-heading tracking-tight group-hover:text-amber-400 transition-colors uppercase">
                      {client.name}
                    </h3>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mt-0.5">
                      {client.category}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xs bg-[#091524] border border-slate-700 flex items-center justify-center text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                </div>

                {/* Sector */}
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                  Sector: <span className="text-slate-200">{client.industry}</span>
                </div>

                {/* Scope Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {client.description}
                </p>
              </div>

              {/* Verified Partnership Tag */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 uppercase font-medium">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED CFC LOGISTICS ACCOUNT</span>
                </span>
                <span className="font-mono">ISO 9001</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Callout Banner */}
        <div className="mt-16 bg-[#091524] border border-slate-800 p-8 sm:p-12 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-heading">
              JOIN INDIA&apos;S PREFERRED SUPPLY CHAIN PARTNER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-heading">
              READY TO ELEVATE YOUR LOGISTICS EFFICIENCY?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Connect directly with our Head of Sales & Business Development, ManMohan Sharma, 
              for custom freight quotations, dedicated chartered fleet agreements, and port evacuation tenders.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xs shadow-xl cursor-pointer font-heading shrink-0 flex items-center gap-2"
          >
            <span>SUBMIT TENDER / ENQUIRY</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>

    </div>
  );
};
