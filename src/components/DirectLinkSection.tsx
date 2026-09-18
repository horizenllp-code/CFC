import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Check, Copy } from 'lucide-react';
import { CfcLogo } from './CfcLogo';
import { PageTab } from '../types';

interface DirectLinkSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQuote: () => void;
}

export const DirectLinkSection: React.FC<DirectLinkSectionProps> = ({ onNavigate, onOpenQuote }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCard = () => {
    navigator.clipboard?.writeText(
      'ManMohan Sharma | Head - Sales & New Business Development | CFC Logistics Pvt. Ltd. | Phone: +91 8287 703703 | Email: manmohansharma@cfclogistics.in | A-20, First Floor, Okhla Phase 1, New Delhi - 110020'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-[#081424] text-white py-16 lg:py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Two-Column Corporate Direct Link Container (Exact to Screenshot 6) */}
        <div className="bg-[#0B192C] border border-slate-800 rounded-xs shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Corporate Direct Link with Red Vertical Bar (Exact to Screenshot 6) */}
          <div className="lg:col-span-6 p-8 sm:p-12 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Thick Red Vertical Bar on Left Edge */}
            <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-[#DC2626]" />

            <div className="pl-3 sm:pl-4 space-y-4">
              {/* Orange Eyebrow */}
              <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block">
                CORPORATE DIRECT LINK
              </span>

              {/* Company Legal Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase font-heading">
                CFC LOGISTICS PVT. LIMITED
              </h2>

              {/* Exact Tagline Subtext from Screenshot 6 */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                Single-window logistics management engineered to maximize satisfaction across every segment of your business operations.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pl-3 sm:pl-4 pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white px-6 py-3.5 text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xs transition-all shadow-md cursor-pointer font-heading flex items-center gap-2"
              >
                <span>REQUEST DIRECT PROPOSAL</span>
                <ExternalLink className="w-4 h-4 text-sky-200" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="border border-slate-700 hover:border-slate-500 bg-[#0f223a] text-slate-200 hover:text-white px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer font-heading"
              >
                VIEW 35 BRANCHES
              </button>
            </div>
          </div>

          {/* Right Column: Digital Business Card of ManMohan Sharma (Exact to Screenshot 6) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex items-center justify-center bg-[#071322]/80">
            
            <div className="w-full max-w-md bg-gradient-to-br from-[#0e2136] via-[#0b1b2d] to-[#071322] border-2 border-slate-700/80 rounded-xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              
              {/* Subtle metallic texture accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Top Card Row */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-5">
                {/* Official CFC Logo & Tagline on Card */}
                <div>
                  <CfcLogo size="sm" />
                  <div className="text-[9px] text-amber-400 uppercase tracking-widest mt-1.5 font-bold font-heading">
                    Logistically yours
                  </div>
                </div>

                {/* ISO Badge & Copy Action */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-[#091524] text-amber-400 px-2 py-1 rounded border border-slate-700 uppercase">
                    ISO 9001:2008
                  </span>
                  <button
                    onClick={handleCopyCard}
                    title="Copy Contact Info"
                    className="text-slate-400 hover:text-amber-400 p-1.5 rounded hover:bg-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Executive Details (Exact to Screenshot 6) */}
              <div className="pt-5 space-y-3.5">
                <div>
                  <h3 className="text-lg font-bold text-amber-400 font-heading">
                    ManMohan Sharma.
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    Head - Sales & New Business Development
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-1">
                  {/* Phone */}
                  <a
                    href="tel:+918287703703"
                    className="flex items-center gap-2.5 hover:text-amber-400 transition-colors group"
                  >
                    <div className="p-1.5 bg-[#0e2744] rounded text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold tracking-wide">8287 703703</span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:manmohansharma@cfclogistics.in"
                    className="flex items-center gap-2.5 hover:text-amber-400 transition-colors group truncate"
                  >
                    <div className="p-1.5 bg-[#0e2744] rounded text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">manmohansharma@cfclogistics.in</span>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <div className="p-1.5 bg-[#0e2744] rounded text-amber-400 shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] leading-relaxed">
                      A-20, First Floor, Okhla Phase 1, New Delhi - 110020, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Motto (Exact to Screenshot 6) */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                <span>PEOPLE</span>
                <span>•</span>
                <span>PLACES</span>
                <span>•</span>
                <span>POSSIBILITIES</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
