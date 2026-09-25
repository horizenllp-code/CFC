import React from 'react';
import { CfcLogo } from './CfcLogo';
import { PageTab } from '../types';
import { ShieldCheck, Phone, Mail, MapPin, ChevronRight, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenTracking: () => void;
  onOpenQuote: () => void;
  onOpenGateway?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracking, onOpenQuote, onOpenGateway }) => {
  return (
    <footer className="bg-[#071220] text-slate-300 border-t-2 border-amber-500">
      
      {/* Top Banner with Key Highlights */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <CfcLogo size="md" />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-heading">
                Logistically yours
              </span>
              <span className="text-[11px] text-slate-400">
                Warehousing & Integrated Supply Chain Solutions Since 2007
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenTracking}
              className="px-4 py-2 bg-[#0F223A] hover:bg-[#152e50] text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              TRACK CONSIGNMENT
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow transition-colors cursor-pointer font-heading"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Company Profile (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider font-heading">
              CFC LOGISTICS PVT. LIMITED
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              An ISO 9001:2008 certified logistics and supply chain solution provider established on April 9, 2007.
              Offering single-window logistics management across purchasing, manufacturing, distribution, and marketing.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ISO 9001:2008 Certified Management</span>
              </div>
              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>I.B.A. Approved Carrier: DLC-1461</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              <span className="text-white font-semibold block">CIN & Corporate Registry:</span>
              <span>Registrar of Companies, Delhi • Est. 09-04-2007</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider font-heading border-b border-slate-800 pb-2">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { tab: 'home' as PageTab, label: 'Home Page' },
                { tab: 'about' as PageTab, label: 'About CFC' },
                { tab: 'services' as PageTab, label: 'Core Solutions' },
                { tab: 'fleet' as PageTab, label: 'Fleet & Capabilities' },
                { tab: 'clients' as PageTab, label: 'Client Portfolio' },
                { tab: 'careers' as PageTab, label: 'Careers at CFC' },
                { tab: 'contact' as PageTab, label: 'Contact & Branches' },
              ].map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => {
                      onNavigate(link.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Logistics Services (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider font-heading border-b border-slate-800 pb-2">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Single-Window Supply Chain',
                'Warehouse & Inventory Management',
                'Rail & Road Haulage (1,580 Fleet)',
                'Port & Customs Clearance (JNPT/Mundra)',
                'International Freight Forwarding',
                'Third-Party Logistics (3PL)',
                'Value-Added Packaging & Labeling',
              ].map((svc, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{svc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office Locations (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-wider font-heading border-b border-slate-800 pb-2">
              EXECUTIVE CONTACTS
            </h4>

            <div className="space-y-3 text-xs">
              {/* Head Sales Office */}
              <div className="bg-[#0b1b2d] p-3 rounded-xs border border-slate-800">
                <span className="text-amber-400 font-bold block text-[11px] uppercase">
                  Sales & Business Development:
                </span>
                <span className="text-white font-medium">ManMohan Sharma</span>
                <div className="mt-1 flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <a href="tel:+918287703703" className="hover:text-amber-400">+91 8287 703703</a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 truncate mt-0.5">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <a href="mailto:manmohansharma@cfclogistics.in" className="hover:text-amber-400 truncate">
                    manmohansharma@cfclogistics.in
                  </a>
                </div>
                <div className="flex items-start gap-1.5 text-slate-400 text-[11px] mt-1.5">
                  <MapPin className="w-3 h-3 text-sky-400 shrink-0 mt-0.5" />
                  <span>A-20, First Floor, Okhla Phase 1, New Delhi - 110020</span>
                </div>
              </div>

              {/* Registered HO */}
              <div className="text-[11px] text-slate-400">
                <strong className="text-slate-300 block">Registered & Head Office:</strong>
                308, Rishabh Corporate Tower, Karkardooma Community Centre, Delhi - 110092, India
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar (Exact to Screenshot 6 bottom) */}
      <div className="bg-[#050D17] py-6 px-4 sm:px-8 border-t border-slate-800/80 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-1.5">
          <p className="font-semibold text-slate-200">
            CFC Logistics Pvt. Limited — Logistically yours
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-500 text-xs">
            <span>cfclogistics.in</span>
            {onOpenGateway && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenGateway}
                  className="text-amber-400/80 hover:text-amber-300 underline font-mono cursor-pointer"
                >
                  Interactive Architecture Gateway
                </button>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            © CFC Logistics Pvt. Limited. All rights reserved. • ISO 9001:2008 & I.B.A. Approved Carrier
          </p>
        </div>
      </div>

    </footer>
  );
};
