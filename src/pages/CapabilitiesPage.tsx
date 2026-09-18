import React, { useState } from 'react';
import { 
  Truck, 
  Warehouse, 
  Anchor, 
  Navigation, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Gauge
} from 'lucide-react';
import { COMPANY_INFO } from '../data/cfcData';

interface CapabilitiesPageProps {
  onOpenQuote: () => void;
  onOpenTracking: () => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onOpenQuote, onOpenTracking }) => {
  const [activePort, setActivePort] = useState<'nhava-sheva' | 'mundra' | 'pipavav' | 'chennai'>('nhava-sheva');

  const portDetails = {
    'nhava-sheva': {
      title: 'Nhava Sheva (JNPT Mumbai)',
      location: 'Dronagiri Logistics Node, Navi Mumbai, Maharashtra',
      capabilities: 'Dedicated container evacuation desks, bonded CFS cartage, 24/7 customs liaisons, direct access to Western Dedicated Freight Corridor.',
      cargoProfiles: 'Automotive CKD/SKD units, industrial machinery, chemicals, consumer durables.',
    },
    'mundra': {
      title: 'Mundra Port (APSEZ)',
      location: 'Port User Complex, APSEZ Mundra, Kutch, Gujarat',
      capabilities: 'Deep-draft vessel cargo evacuation, bulk raw material handling, agrochemical export clearances, dedicated heavy haulage trailers.',
      cargoProfiles: 'Polymers, resins, engineering components, heavy industrial project cargo.',
    },
    'pipavav': {
      title: 'Pipavav Port',
      location: 'Logistics Zone, Rajula, Amreli District, Gujarat',
      capabilities: 'Liquid & bulk break-bulk cargo clearance, multimodal rail connectivity, rapid container evacuation with minimal dwell time.',
      cargoProfiles: 'Fertilizers, agro commodities, engineering equipment, automobile components.',
    },
    'chennai': {
      title: 'Chennai Port',
      location: 'Moore Street, George Town & Ennore Corridor, Tamil Nadu',
      capabilities: 'Southern industrial corridor gateway, automotive plant direct JIT feeds (Sriperumbudur / Oragadam), bonded container haulage.',
      cargoProfiles: 'Automotive tyres, precision electronics, heavy farm machinery, electrical goods.',
    },
  };

  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Hero Header */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            OPERATIONAL INFRASTRUCTURE & NETWORK
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            TRANSPORTATION & LOGISTICS CAPABILITIES
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Harnessing a managed fleet of 1,580 commercial vehicles, 360,000+ sq. ft. of strategically 
            located warehousing, and dedicated port desks at India’s premier maritime gateways.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onOpenTracking}
              className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>TEST 24/7 TELEMATICS TRACKER</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading flex items-center gap-2"
            >
              <span>REQUEST FLEET CHARTER TARIFF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Fleet & Haulage Infrastructure */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase font-heading">
              <Truck className="w-4 h-4" />
              <span>COMMERCIAL FLEET DEPLOYMENT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white">
              1,580 DEDICATED COMMERCIAL VEHICLES
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              CFC Logistics operates a robust commercial fleet designed to meet the rigorous demands of 
              India’s primary industrial sectors. Every vehicle is integrated with automated GPS tracking, 
              electronic toll integration, and monitored for continuous driver safety.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Full Truck Load (FTL) Line-Haul', desc: 'Direct point-to-point transportation connecting major manufacturing plants to regional mother warehouses.' },
                { title: 'Chartered Dedicated Fleets', desc: 'Custom liveried commercial vehicles dedicated to single enterprise accounts with customized delivery routes.' },
                { title: 'Multi-Axle Container Trailers', desc: 'Heavy-duty 20ft & 40ft container chassis engineered for high-cube port cartage and heavy industrial equipment.' },
                { title: 'Road & Rail Multi-Modal Haulage', desc: 'Synchronized rail rake bookings combined with CFC last-mile ground fleet for long-haul carbon and cost efficiency.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#091524] border border-slate-800 rounded-xs flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-heading">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="border-2 border-slate-700 bg-slate-900 rounded-xs overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop"
                alt="CFC Logistics Fleet Park"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#091524]/95 p-4 border border-slate-700 rounded-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase font-heading">FLEET TELEMATICS</div>
                  <div className="text-[11px] text-slate-300">Continuous 24/7 central control room monitoring</div>
                </div>
                <Gauge className="w-6 h-6 text-sky-400" />
              </div>
            </div>

            {/* IBA Compliance Box */}
            <div className="bg-[#091524] p-4 border-l-4 border-emerald-500 rounded-xs text-xs text-slate-300">
              <strong className="text-white uppercase font-heading block mb-1">
                Indian Bank Association (I.B.A.) Approved Carrier — DLC-1461
              </strong>
              Authorized to issue official bank consignments, freight notes, and tender documentation recognized 
              by all scheduled commercial and nationalized banks across India.
            </div>
          </div>

        </div>
      </section>

      {/* 2. Warehousing & Inventory Footprint */}
      <section className="py-16 px-4 sm:px-8 bg-[#091524] border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="border-2 border-slate-700 bg-slate-900 rounded-xs overflow-hidden aspect-[4/3] relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="CFC Logistics High-Bay Warehousing"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B192C]/90 p-4 border border-slate-700 rounded-xs">
                <div className="text-xs font-bold text-amber-400 uppercase font-heading">360,000+ SQ. FT. SPACE</div>
                <div className="text-[11px] text-slate-300">High-cube racking, transloading docks & computerized WMS</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-400 uppercase font-heading">
              <Warehouse className="w-4 h-4" />
              <span>STRATEGIC WAREHOUSING INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white">
              ₹300+ CRORE INVENTORY SAFEKEEPING
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              CFC administers more than 360,000 square feet of state-of-the-art warehousing real estate. 
              Designed for industrial goods, consumer durables, and raw materials, our facilities safeguard 
              over ₹300 Crore in cumulative client inventory value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#0B192C] p-4 border border-slate-800 rounded-xs">
                <div className="text-amber-400 font-bold uppercase text-xs font-heading">Transloading & Cross-Dock</div>
                <p className="text-xs text-slate-400 mt-1">Direct freight transfer reducing dwell times and warehouse holding fees.</p>
              </div>
              <div className="bg-[#0B192C] p-4 border border-slate-800 rounded-xs">
                <div className="text-amber-400 font-bold uppercase text-xs font-heading">Pick, Pack & Barcoding</div>
                <p className="text-xs text-slate-400 mt-1">Automated item-level scanning, customized labeling and crate packaging.</p>
              </div>
              <div className="bg-[#0B192C] p-4 border border-slate-800 rounded-xs">
                <div className="text-amber-400 font-bold uppercase text-xs font-heading">JIT Line Replenishment</div>
                <p className="text-xs text-slate-400 mt-1">Synchronized deliveries matched to automotive and factory manufacturing shifts.</p>
              </div>
              <div className="bg-[#0B192C] p-4 border border-slate-800 rounded-xs">
                <div className="text-amber-400 font-bold uppercase text-xs font-heading">Online WMS Inventory</div>
                <p className="text-xs text-slate-400 mt-1">Real-time stock ledger access through 35 connected online branches.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Port & Maritime Gateways */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-heading block mb-1">
            MARITIME GATEWAYS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading text-white">
            MAJOR INDIAN PORT PRESENCE
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Permanent physical operational desks facilitating immediate container clearance and evacuation.
          </p>
          <div className="h-1 w-16 bg-[#DC2626] mx-auto mt-3 rounded-full" />
        </div>

        {/* Port Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {[
            { id: 'nhava-sheva', label: 'NHAVA SHEVA / JNPT' },
            { id: 'mundra', label: 'MUNDRA PORT' },
            { id: 'pipavav', label: 'PIPAVAV PORT' },
            { id: 'chennai', label: 'CHENNAI PORT' },
          ].map((port) => (
            <button
              key={port.id}
              onClick={() => setActivePort(port.id as any)}
              className={`py-3 px-4 text-xs font-extrabold uppercase tracking-wider rounded-xs border transition-all cursor-pointer font-heading ${
                activePort === port.id
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                  : 'bg-[#091524] text-slate-300 border-slate-800 hover:bg-[#0e2136]'
              }`}
            >
              {port.label}
            </button>
          ))}
        </div>

        {/* Active Port Info Card */}
        <div className="bg-[#0e2238] border border-slate-800 p-6 sm:p-8 rounded-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <span className="text-[10px] text-amber-400 uppercase font-mono tracking-widest">
                ACTIVE PORT TERMINAL DESK
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase font-heading text-white mt-1">
                {portDetails[activePort].title}
              </h3>
              <div className="text-xs text-slate-300 mt-1">
                {portDetails[activePort].location}
              </div>
            </div>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading shrink-0"
            >
              BOOK CONTAINER EVACUATION
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <h4 className="font-extrabold text-amber-400 uppercase font-heading text-xs mb-2">
                CLEARANCE & CARTAGE CAPABILITIES:
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {portDetails[activePort].capabilities}
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-sky-400 uppercase font-heading text-xs mb-2">
                PRIMARY CARGO PROFILES HANDLED:
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {portDetails[activePort].cargoProfiles}
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
