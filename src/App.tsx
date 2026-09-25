import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { FullscreenEntryExperience } from './components/FullscreenEntryExperience';
import { HeroSection } from './components/HeroSection';
import { SingleWindowSection } from './components/SingleWindowSection';
import { ReceivingInboundSection } from './components/ReceivingInboundSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { ServicesSection } from './components/ServicesSection';
import { FleetSection } from './components/FleetSection';
import { DirectLinkSection } from './components/DirectLinkSection';
import { ClientsTrustSection } from './components/ClientsTrustSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { TrackingModal } from './components/TrackingModal';

// Dedicated Sub-Pages
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { ClientsPage } from './pages/ClientsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  
  // Single fullscreen entry experience state
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.includes('gateway') || window.location.hash.includes('gateway')) {
        return false;
      }
      return sessionStorage.getItem('cfc_has_entered') === 'true';
    }
    return false;
  });

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleNavigate = (tab: PageTab) => {
    setCurrentTab(tab);
  };

  const handleEnter = () => {
    setHasEntered(true);
    try {
      sessionStorage.setItem('cfc_has_entered', 'true');
    } catch (e) {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenGateway = () => {
    setHasEntered(false);
    try {
      sessionStorage.removeItem('cfc_has_entered');
    } catch (e) {
      // ignore
    }
  };

  // If visitor has not entered yet, show ONLY the fullscreen entrance experience
  if (!hasEntered) {
    return <FullscreenEntryExperience onEnter={handleEnter} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B192C] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onSelectTab={handleNavigate}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenGateway={handleOpenGateway}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 1. First Normal Website Section: Warehouse Operations Cinematic Hero */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
              onOpenTracking={() => setIsTrackingOpen(true)}
            />

            {/* 2. Single-Window Logistics Value Prop (Screenshot 2) */}
            <SingleWindowSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />

            {/* 3. Receiving & Inbound Operations (Image 1) */}
            <ReceivingInboundSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />

            {/* 4. Core Principles & Values (Screenshot 3) */}
            <CoreValuesSection onNavigate={handleNavigate} />

            {/* 5. Core Services (Screenshot 4) */}
            <ServicesSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />

            {/* 6. Ground Transport Fleet Capabilities (Screenshot 5) */}
            <FleetSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />

            {/* 7. Corporate Direct Link & Executive Card (Screenshot 6) */}
            <DirectLinkSection
              onNavigate={handleNavigate}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />

            {/* 8. Verified Clients & Trust Showcase */}
            <ClientsTrustSection onNavigate={handleNavigate} />
          </>
        )}

        {currentTab === 'about' && (
          <AboutPage onOpenQuote={() => setIsQuoteOpen(true)} />
        )}

        {currentTab === 'services' && (
          <ServicesPage onOpenQuote={() => setIsQuoteOpen(true)} />
        )}

        {currentTab === 'fleet' && (
          <CapabilitiesPage
            onOpenQuote={() => setIsQuoteOpen(true)}
            onOpenTracking={() => setIsTrackingOpen(true)}
          />
        )}

        {currentTab === 'clients' && (
          <ClientsPage onOpenQuote={() => setIsQuoteOpen(true)} />
        )}

        {currentTab === 'careers' && (
          <CareersPage />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Comprehensive Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenGateway={handleOpenGateway}
      />

      {/* Global Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

    </div>
  );
};

export default App;
