import React, { useState } from 'react';
import { SERVICES } from '../data/cfcData';
import { ServiceItem } from '../types';
import { CheckCircle2, ArrowRight, ShieldCheck, Truck, Warehouse, Anchor, Globe, Layers } from 'lucide-react';

interface ServicesPageProps {
  onOpenQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'supply-chain-solutions':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'warehouse-inventory':
        return <Warehouse className="w-5 h-5 text-sky-400" />;
      case 'rail-road-transportation':
        return <Truck className="w-5 h-5 text-red-400" />;
      case 'port-customs-clearance':
        return <Anchor className="w-5 h-5 text-amber-400" />;
      case 'freight-forwarding':
        return <Globe className="w-5 h-5 text-sky-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Page Hero */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            SINGLE-WINDOW LOGISTICS PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            LOGISTICS & SUPPLY CHAIN SOLUTIONS
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            From vendor purchasing logistics and multi-modal ground transportation to port container evacuation 
            and temperature-controlled inventory management, CFC Logistics offers uncompromised single-window execution.
          </p>
        </div>
      </div>

      {/* Services Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Service Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-12">
          {SERVICES.map((s) => {
            const isSelected = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`p-3 sm:p-4 text-left border rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#122740] border-amber-500 shadow-lg'
                    : 'bg-[#091524] border-slate-800 hover:bg-[#0e2136] text-slate-400'
                }`}
              >
                <div className="mb-2">{getServiceIcon(s.id)}</div>
                <div className={`text-xs font-extrabold uppercase font-heading tracking-wider ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Detailed View */}
        <div className="bg-[#0e2238] border border-slate-800 rounded-xs overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image & Parameters */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2238] via-transparent to-transparent lg:hidden" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#0B192C]/90 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-xs text-xs font-bold text-amber-400 uppercase tracking-wider">
                ISO 9001:2008 CERTIFIED SERVICE
              </div>
            </div>

            {/* Right Detailed Copy & Capabilities */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-heading block">
                  CAPABILITY OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide font-heading mt-1">
                  {activeService.title}
                </h2>
                <div className="h-0.5 w-16 bg-[#F59E0B] my-3" />

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                  {activeService.fullDesc}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 my-6 bg-[#091524] p-3 rounded-xs border border-slate-800">
                  {activeService.specs.map((spec, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] text-slate-500 uppercase">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Capabilities List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-heading">
                    CORE DELIVERABLES & SLA COMMITMENTS:
                  </h4>
                  {activeService.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenQuote}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow cursor-pointer font-heading flex items-center gap-2"
                >
                  <span>REQUEST SPECIFIC PROPOSAL</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
                <span className="text-xs text-slate-400">
                  Direct commercial enquiry handled by Sales Head ManMohan Sharma
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* All 6 Services Quick Grid Breakdown */}
        <div className="mt-20">
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase font-heading text-white">
              ALL LOGISTICS OFFERINGS AT A GLANCE
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Engineered to meet specific industrial requirements across purchasing, manufacturing, and distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-[#091524] border border-slate-800 p-6 rounded-xs hover:border-slate-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-400 uppercase">
                      SERVICE NO. {SERVICES.indexOf(srv) + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h4 className="text-base font-extrabold text-white uppercase font-heading">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveTab(srv.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider cursor-pointer flex items-center gap-1"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenQuote}
                    className="text-[11px] font-bold text-slate-300 hover:text-white uppercase tracking-wider"
                  >
                    GET QUOTE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
