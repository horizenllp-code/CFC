import React, { useState, useEffect } from 'react';
import { CfcLogo } from './CfcLogo';
import { PageTab } from '../types';
import { 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab?: (tab: PageTab) => void;
  onNavigate?: (tab: PageTab) => void;
  onOpenTracking: () => void;
  onOpenQuote: () => void;
  onOpenGateway?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onNavigate,
  onOpenTracking,
  onOpenQuote,
  onOpenGateway,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Support either onNavigate or onSelectTab
  const handleNav = onNavigate || onSelectTab || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'HOME' },
    { tab: 'about', label: 'ABOUT' },
    { tab: 'services', label: 'SOLUTIONS' },
    { tab: 'fleet', label: 'FLEET & CAPABILITIES' },
    { tab: 'clients', label: 'CLIENTS' },
    { tab: 'careers', label: 'CAREERS' },
    { tab: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Navigation Bar — Clean, Direct Entry */}
      <nav 
        className={`px-4 sm:px-8 transition-all ${
          isScrolled 
            ? 'py-2.5 shadow-xl bg-[#050d18]/95 backdrop-blur-md border-b border-slate-800' 
            : 'py-3.5 bg-[#071220]/90 backdrop-blur-sm border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Official CFC Logistics Logo & Official Tagline */}
          <button
            onClick={() => {
              handleNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 focus:outline-none cursor-pointer text-left"
            aria-label="CFC Logistics Homepage"
          >
            <CfcLogo size="md" />
            <div className="hidden xl:flex flex-col border-l border-slate-700/80 pl-3">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em] font-heading leading-tight">
                Logistically yours
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    handleNav(item.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {onOpenGateway && (
              <button
                onClick={onOpenGateway}
                title="View Interactive Supply Chain Architecture Gateway"
                className="hidden xl:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded border border-slate-700/80 hover:border-amber-400 text-slate-300 hover:text-amber-300 bg-[#071322] transition-all cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>GATEWAY</span>
              </button>
            )}

            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white bg-[#0f223a] transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>TRACK SHIPMENT</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer uppercase tracking-wider"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>REQUEST QUOTE</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenTracking}
              className="sm:hidden text-xs font-semibold px-2.5 py-1.5 rounded border border-slate-700 text-slate-200 bg-[#0f223a]"
              aria-label="Track Shipment"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 pb-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  handleNav(item.tab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-bold tracking-wider uppercase flex items-center justify-between rounded ${
                  currentTab === item.tab
                    ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-2 px-3">
              <button
                onClick={() => {
                  onOpenTracking();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-slate-700 text-xs font-bold text-slate-200 bg-[#0f223a]"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>TRACK YOUR CONSIGNMENT</span>
              </button>
              <button
                onClick={() => {
                  onOpenQuote();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-amber-500 text-slate-950 text-xs font-bold tracking-wider uppercase shadow"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>REQUEST FREIGHT QUOTE</span>
              </button>

              {onOpenGateway && (
                <button
                  onClick={() => {
                    onOpenGateway();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded border border-amber-400/40 text-xs font-bold text-amber-300 bg-[#0B192C] uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>SUPPLY CHAIN GATEWAY</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
