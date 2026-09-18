import React, { useState } from 'react';
import { BRANCH_LOCATIONS } from '../data/cfcData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Commercial Enquiry',
    message: '',
  });

  const regions = ['All', 'Delhi NCR', 'Western Region', 'Southern Region', 'Port Desks'];

  const filteredBranches = BRANCH_LOCATIONS.filter((b) => {
    if (selectedRegion === 'All') return true;
    if (selectedRegion === 'Port Desks') return b.type === 'Port Hub';
    if (selectedRegion === 'Delhi NCR') return b.state === 'Delhi NCR' || b.city.includes('Delhi');
    if (selectedRegion === 'Western Region') return b.state === 'Maharashtra' || b.state === 'Gujarat' || b.state === 'Rajasthan';
    if (selectedRegion === 'Southern Region') return b.state === 'Tamil Nadu' || b.state === 'Karnataka' || b.state === 'Telangana';
    return true;
  });

  const handleCopyLiaison = () => {
    navigator.clipboard?.writeText(
      'ManMohan Sharma | Head - Sales & Business Development | CFC Logistics Pvt. Ltd. | +91 8287 703703 | manmohansharma@cfclogistics.in'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#0B192C] text-white">
      
      {/* Page Header */}
      <div className="bg-[#071322] border-b border-slate-800 py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            PAN-INDIA TOUCHPOINTS & HEADQUARTERS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase font-heading text-white max-w-3xl">
            CONTACT CFC LOGISTICS PVT. LTD.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Reach our national corporate offices in New Delhi or connect with any of our 
            35 operating hubs and port clearance desks across India.
          </p>
        </div>
      </div>

      {/* Primary Executive Contact & Map Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Executive Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Executive Direct Link Card (Screenshot 6 Highlight) */}
          <div className="lg:col-span-6 bg-[#0e2238] border-2 border-amber-500 rounded-xs p-6 sm:p-8 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-heading">
                CORPORATE DIRECT LIAISON
              </span>
              <button
                onClick={handleCopyLiaison}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Details' : 'Copy Contact'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-black text-white font-heading">ManMohan Sharma</h3>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-0.5">
                  Head - Sales & New Business Development
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Single contact point for enterprise supply chain contracts, pan-India haulage tenders, 
                  dedicated commercial fleet chartering, and warehouse space allocations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <a
                  href="tel:+918287703703"
                  className="bg-[#091524] p-3 rounded-xs border border-slate-700 hover:border-amber-400 transition-colors flex items-center gap-2.5"
                >
                  <div className="p-2 bg-amber-500 text-slate-950 rounded-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">DIRECT PHONE</span>
                    <span className="font-bold text-white text-sm">8287 703703</span>
                  </div>
                </a>

                <a
                  href="mailto:manmohansharma@cfclogistics.in"
                  className="bg-[#091524] p-3 rounded-xs border border-slate-700 hover:border-amber-400 transition-colors flex items-center gap-2.5 truncate"
                >
                  <div className="p-2 bg-sky-500 text-slate-950 rounded-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 uppercase block">OFFICIAL EMAIL</span>
                    <span className="font-bold text-white text-xs truncate block">manmohansharma@cfclogistics.in</span>
                  </div>
                </a>
              </div>

              <div className="p-3 bg-[#091524] rounded-xs border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Corporate Sales Office:</strong>
                  A-20, First Floor, Okhla Phase 1, New Delhi - 110020, India
                </div>
              </div>
            </div>
          </div>

          {/* Registered Head Office */}
          <div className="lg:col-span-6 bg-[#091524] border border-slate-800 rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider font-heading">
                  REGISTERED CORPORATE HEAD OFFICE
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">EST. 09-04-2007</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase font-heading">
                  CFC LOGISTICS PRIVATE LIMITED
                </h3>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Address:</strong>
                      308, Rishabh Corporate Tower, Karkardooma Community Centre, Delhi - 110092, India
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="text-white">Statutory Approval:</strong> Indian Bank Association (I.B.A. Reg. DLC-1461)
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <strong className="text-white">Operating Hours:</strong> Monday – Saturday: 09:30 IST to 18:30 IST
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:info@cfclogistics.in"
                className="px-4 py-2 bg-[#0B192C] hover:bg-slate-800 border border-slate-700 text-xs font-bold uppercase rounded-xs transition-colors"
              >
                info@cfclogistics.in
              </a>
              <a
                href="mailto:accounts@cfclogistics.in"
                className="px-4 py-2 bg-[#0B192C] hover:bg-slate-800 border border-slate-700 text-xs font-bold uppercase rounded-xs transition-colors"
              >
                accounts@cfclogistics.in
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Form & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-[#0e2238] border border-slate-800 p-6 sm:p-8 rounded-xs shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-heading block">
                COMMERCIAL INQUIRY
              </span>
              <h2 className="text-2xl font-extrabold text-white uppercase font-heading mt-0.5">
                TRANSMIT A DIRECT BUSINESS MESSAGE
              </h2>
            </div>

            {formSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold font-heading text-white uppercase">
                  MESSAGE LOGGED IN CFC DISPATCH
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{contactForm.name}</strong>. Your message regarding{' '}
                  <span className="text-amber-400">{contactForm.subject}</span> has been assigned to our corporate commercial team.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-amber-500 text-slate-950 font-extrabold uppercase text-xs rounded-xs cursor-pointer font-heading"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      placeholder="e.g. Havells / Bajaj Auto"
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase mb-1">
                    Subject / Division
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="General Commercial Enquiry">General Commercial Enquiry</option>
                    <option value="Dedicated Chartered Fleet Contract">Dedicated Chartered Fleet Contract</option>
                    <option value="Port Container Evacuation (JNPT/Mundra/Pipavav)">Port Container Evacuation (JNPT/Mundra/Pipavav)</option>
                    <option value="Warehouse Space Booking (Sq. Ft.)">Warehouse Space Booking (Sq. Ft.)</option>
                    <option value="Rail & Road Multimodal Tender">Rail & Road Multimodal Tender</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase mb-1">
                    Requirement Message & Route Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Provide origin, destination, cargo nature, estimated monthly tonnage, or warehouse storage specs..."
                    className="w-full bg-[#081525] border border-slate-700 px-3 py-2.5 text-sm text-white rounded-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Direct liaison: Head - Sales ManMohan Sharma
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold uppercase tracking-wider rounded-xs cursor-pointer font-heading flex items-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>TRANSMIT ENQUIRY</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Visual Map Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#091524] border border-slate-800 rounded-xs p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-heading">
                  CENTRAL CORPORATE SALES DESK
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">ACTIVE DESK</span>
              </div>

              {/* Map Canvas / Visual */}
              <div className="relative rounded-xs overflow-hidden border border-slate-700 aspect-[4/3] bg-slate-900">
                <iframe
                  title="CFC Logistics Corporate Sales Office Okhla New Delhi"
                  src="https://maps.google.com/maps?q=Okhla%20Industrial%20Area%20Phase%201%20New%20Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-80"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#0B192C]/90 backdrop-blur-xs p-2 text-[11px] text-slate-200 border border-slate-700 rounded-xs flex items-center justify-between">
                  <span className="truncate">A-20, 1st Floor, Okhla Phase 1, New Delhi</span>
                  <a
                    href="https://maps.google.com/?q=Okhla+Phase+1+New+Delhi"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-bold shrink-0 ml-2"
                  >
                    <span>OPEN</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Delhi Registered Office:</span>
                  <span className="font-semibold text-white">Karkardooma Community Centre</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Western Port Control:</span>
                  <span className="font-semibold text-white">JNPT Nhava Sheva & Mundra</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Southern Hub:</span>
                  <span className="font-semibold text-white">Chennai & Bengaluru</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 35 Pan-India Branches Directory */}
        <div>
          <div className="border-b border-slate-800 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-heading block">
                NATIONWIDE FOOTPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-heading mt-1">
                35 PAN-INDIA BRANCH LOCATIONS & PORT DESKS
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Every branch is equipped with computer systems, online connectivity, and 24/7 telematics oversight.
              </p>
            </div>

            {/* Region Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xs border transition-all cursor-pointer font-heading ${
                    selectedRegion === reg
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-[#091524] text-slate-300 border-slate-800 hover:bg-[#0e2136]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBranches.map((branch, idx) => (
              <div
                key={`${branch.city}-${idx}`}
                className="bg-[#091524] border border-slate-800 p-5 rounded-xs hover:border-slate-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-xs bg-[#0B192C] text-amber-400 border border-slate-700 uppercase">
                      {branch.type}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">{branch.state}</span>
                  </div>

                  <h4 className="text-base font-bold text-white uppercase font-heading">
                    {branch.city}
                  </h4>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5">
                    {branch.state} Hub
                  </div>

                  <div className="text-xs text-slate-300 mt-2.5 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{branch.phone}</span>
                  </div>
                  <a
                    href={`mailto:${branch.email}`}
                    className="text-[11px] text-sky-400 hover:underline"
                  >
                    {branch.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
