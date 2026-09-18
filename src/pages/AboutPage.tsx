import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Building2, 
  CheckCircle2, 
  Users, 
  Truck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { COMPANY_INFO, CORE_VALUES } from '../data/cfcData';

interface AboutPageProps {
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Page Hero Header */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            INSTITUTIONAL PROFILE & CREDENTIALS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            ABOUT CFC LOGISTICS PVT. LTD.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Incorporated on April 9, 2007, CFC Logistics Pvt. Ltd. is an ISO 9001:2008 certified Indian logistics 
            and single-window supply chain solution provider, approved by the Indian Bank Association (I.B.A. Reg. DLC-1461).
          </p>
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10 pt-8 border-t border-slate-800">
            {COMPANY_INFO.metrics.map((m, i) => (
              <div key={i} className="bg-[#0B192C] p-3 border border-slate-800 rounded-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-heading">{m.value}</div>
                <div className="text-xs font-bold text-white uppercase mt-0.5">{m.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Company Overview */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 border-b border-slate-800 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-extrabold text-amber-400 tracking-wider uppercase font-heading">
              18+ YEARS OF LOGISTICS EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase font-heading text-white">
              AN INTEGRATED SINGLE-WINDOW SUPPLY CHAIN ENTERPRISE
            </h2>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Established on April 9, 2007 under the Registrar of Companies in Delhi, CFC Logistics Private Limited 
                has grown into a prominent pan-India logistics partner. The company delivers end-to-end supply chain 
                governance spanning purchasing logistics, raw material intake, in-factory staging, multi-tier 
                finished-goods distribution, and marketing channel fulfillment.
              </p>
              <p>
                Approved by the Indian Bank Association (Registration No: <strong className="text-white">DLC-1461</strong>), 
                CFC Logistics operates with strict banking, insurance, and regulatory compliance. With a managed commercial fleet 
                of 1,580 vehicles, 35 strategically located branches, and over 360,000 square feet of modern warehousing space 
                managing more than ₹300 Crore in inventory valuation, CFC provides seamless transportation across road, rail, and sea.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5 p-3 bg-[#0e2238] border border-slate-800 rounded-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-heading">ISO 9001:2008 Certified</div>
                  <div className="text-[11px] text-slate-400">Audited quality management and cargo handling standards.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#0e2238] border border-slate-800 rounded-xs">
                <Building2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-heading">I.B.A. Approved DLC-1461</div>
                  <div className="text-[11px] text-slate-400">Authorized for high-value banking and institutional freight.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-slate-700 rounded-xs overflow-hidden bg-slate-900 aspect-[4/3] shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1000&auto=format&fit=crop"
                alt="CFC Logistics Pan-India Container Transit Hub"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#091524]/90 p-4 border border-slate-700 rounded-xs">
                <div className="text-xs font-extrabold text-amber-400 uppercase font-heading">
                  PAN-INDIA PRESENCE
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  35 Connected Operating Hubs across Northern, Western, Southern & Eastern economic corridors.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 bg-[#091524] border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-[#0B192C] border-t-4 border-amber-500 border-x border-b border-slate-800 p-8 rounded-xs shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-heading tracking-wide">
                OUR MISSION
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              To provide quality logistics services with an unyielding commitment to safety, security, 
              flexibility, and innovation. We aim to achieve logistics landmarks through effective planning 
              and disciplined execution, valuing teamwork and treating the handling of clients&apos; products 
              as a solemn responsibility.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 italic">
              &quot;We endeavor to act as an organic extension and reliable representative of our clients, 
              ensuring the highest quality of service across all domestic and international freight needs.&quot;
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#0B192C] border-t-4 border-sky-500 border-x border-b border-slate-800 p-8 rounded-xs shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase font-heading tracking-wide">
                OUR VISION
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              To deliver integrated logistics solutions and services that redefine customer satisfaction, 
              optimize supply chain costs, strengthen enduring business relationships, and bridge the gap 
              between specific client needs and available logistics capabilities across India.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 italic">
              &quot;Logistically yours — dedicated to continuous improvement, technological integration, 
              and single-window accountability.&quot;
            </div>
          </div>

        </div>
      </section>

      {/* 3. Quality Policy & Strategic Objectives */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 border-b border-slate-800 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quality Policy */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold text-[#DC2626] tracking-wider uppercase font-heading">
              QUALITY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-heading text-white">
              CFC QUALITY POLICY
            </h2>
            <div className="bg-[#0e2238] border-l-4 border-amber-500 p-5 rounded-xs space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                CFC Logistics Pvt. Ltd. is committed to achieving absolute customer contentment by providing 
                world-class supply chain solutions. Our philosophy mandates performing every task correctly 
                from inception and persistently seeking enhancements in handling mechanisms and transit techniques.
              </p>
              <p>
                We believe in forging effective partnerships for successful supply chain management, creating 
                distribution schedules that conserve client time and financial capital while elevating service benchmarks.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-400">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>24/7 GPS Tracking in all 1,580 vehicles & fully computerized online branches.</span>
              </div>
            </div>
          </div>

          {/* Corporate Objectives */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold text-amber-400 tracking-wider uppercase font-heading">
              PERFORMANCE BENCHMARKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-heading text-white">
              STRATEGIC OBJECTIVES
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Zero-Defect Cargo Transit', desc: 'Uncompromising adherence to cargo securing, lashing, and waterproof containerized haulage.' },
                { title: 'Sub-24h Port Evacuation', desc: 'Rapid clearance and container de-stuffing at Nhava Sheva (JNPT), Mundra, Pipavav & Chennai.' },
                { title: 'Predictable Pan-India Lead Times', desc: 'Dedicated line-hauls and scheduled rail rake coordination to eliminate bottleneck delays.' },
                { title: 'Real-Time Visibility & Accountability', desc: 'Single-point customer relationship management backed by automated milestone notifications.' },
              ].map((obj, i) => (
                <div key={i} className="p-3.5 bg-[#091524] border border-slate-800 rounded-xs flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xs bg-[#0B192C] text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-700">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase font-heading">{obj.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Corporate Structure & Governance */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 bg-[#071322] border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-1">
              GOVERNANCE & LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-heading">
              CORPORATE STRUCTURE
            </h2>
            <div className="h-1 w-16 bg-[#DC2626] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Legal Entity Card */}
            <div className="bg-[#0B192C] border border-slate-800 p-6 rounded-xs space-y-3">
              <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-heading">
                REGISTRATION & CLASSIFICATION
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block">Company Type:</span>
                  <span className="font-semibold text-white">Private Unlisted Company Limited by Shares</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date of Incorporation:</span>
                  <span className="font-semibold text-white">April 9, 2007 (18+ Years Active)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Registrar of Companies:</span>
                  <span className="font-semibold text-white">ROC Delhi, Ministry of Corporate Affairs</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Banking Authorization:</span>
                  <span className="font-semibold text-white">Indian Bank Association Approved (DLC-1461)</span>
                </div>
              </div>
            </div>

            {/* Board of Directors */}
            <div className="bg-[#0B192C] border border-slate-800 p-6 rounded-xs space-y-3">
              <div className="text-xs font-extrabold text-sky-400 uppercase tracking-wider font-heading">
                BOARD OF DIRECTORS
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-[#091524] rounded-xs border border-slate-800">
                  <div className="font-bold text-white uppercase font-heading text-sm">Darshika Sharma</div>
                  <div className="text-slate-400 text-[11px]">Director • Corporate Affairs & Administration</div>
                </div>
                <div className="p-3 bg-[#091524] rounded-xs border border-slate-800">
                  <div className="font-bold text-white uppercase font-heading text-sm">Neeraj Sharma</div>
                  <div className="text-slate-400 text-[11px]">Director • Strategic Logistics & Infrastructure</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Leading CFC Logistics with prudent corporate oversight and deep-seated industrial logistics expertise.
                </p>
              </div>
            </div>

            {/* Commercial Leadership */}
            <div className="bg-[#0B192C] border border-slate-800 p-6 rounded-xs space-y-3">
              <div className="text-xs font-extrabold text-[#DC2626] uppercase tracking-wider font-heading">
                COMMERCIAL & SALES LEADERSHIP
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-[#091524] rounded-xs border border-slate-800">
                  <div className="font-bold text-amber-400 uppercase font-heading text-sm">ManMohan Sharma</div>
                  <div className="text-white font-medium text-xs">Head - Sales & New Business Development</div>
                  <div className="text-slate-400 text-[11px] mt-1">Direct: +91 8287 703703</div>
                  <div className="text-slate-400 text-[11px]">Email: manmohansharma@cfclogistics.in</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Direct liaison for national tenders, corporate 3PL contracts, dedicated fleet chartering, and multimodal solutions.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xs transition-all shadow-lg cursor-pointer font-heading"
            >
              <span>DISCUSS ENTERPRISE LOGISTICS PARTNERSHIP</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
