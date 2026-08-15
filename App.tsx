import React, { useState, useEffect } from 'react';
import { ToastMessage, SickbayPlant } from './types';
import { INITIAL_SICKBAY_PLANTS } from './constants';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HeroScannerSection } from './components/sections/HeroScannerSection';
import { SickbaySection } from './components/sections/SickbaySection';
import { EncyclopediaSection } from './components/sections/EncyclopediaSection';
import { CareCalculatorsSection } from './components/sections/CareCalculatorsSection';
import { AiBotanistChatSection } from './components/sections/AiBotanistChatSection';
import { FaqSection } from './components/sections/FaqSection';
import { ArrowUp, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('scanner');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [sickbayPlants, setSickbayPlants] = useState<SickbayPlant[]>(() => {
    const saved = localStorage.getItem('ai_plant_sickbay');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing sickbay localStorage', e);
      }
    }
    return INITIAL_SICKBAY_PLANTS;
  });
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Sync sickbay to local storage
  useEffect(() => {
    localStorage.setItem('ai_plant_sickbay', JSON.stringify(sickbayPlants));
  }, [sickbayPlants]);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'error' = 'info'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (href: string) => {
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveToSickbay = (newPlant: SickbayPlant) => {
    setSickbayPlants((prev) => [newPlant, ...prev]);
  };

  const handleUpdateSickbayPlant = (updatedPlant: SickbayPlant) => {
    setSickbayPlants((prev) =>
      prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
  };

  const handleDeleteSickbayPlant = (plantId: string) => {
    setSickbayPlants((prev) => prev.filter((p) => p.id !== plantId));
    showToast('Plant Discharged', 'Removed from active Sickbay tracker.', 'info');
  };

  const handleNavigateToChat = (prompt?: string) => {
    setChatPrompt(prompt);
    handleNavigate('#ai-chat');
  };

  // Scroll listener for back-to-top & active section detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      const sections = ['scanner', 'sickbay', 'encyclopedia', 'calculators', 'ai-chat', 'faq'];

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-emerald-500 selection:text-stone-950 flex flex-col justify-between">
      {/* Botanical Header Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        sickbayCount={sickbayPlants.filter((p) => p.healthStatus !== 'Healthy').length}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Flagship AI Scanner & Diagnostic Prescription Terminal */}
        <HeroScannerSection
          onShowToast={showToast}
          onSaveToSickbay={handleSaveToSickbay}
          onNavigateToChat={handleNavigateToChat}
        />

        {/* My Botanical Sickbay (Plant Hospital & Recovery Tracker) */}
        <SickbaySection
          plants={sickbayPlants}
          onUpdatePlant={handleUpdateSickbayPlant}
          onDeletePlant={handleDeleteSickbayPlant}
          onAddPlant={handleSaveToSickbay}
          onShowToast={showToast}
        />

        {/* Plant Pathology & Disease Encyclopedia */}
        <EncyclopediaSection onShowToast={showToast} />

        {/* Botanical Care Calculators (Light, Watering, Soil Mix) */}
        <CareCalculatorsSection />

        {/* Live AI Botanist Chat Consultation */}
        <AiBotanistChatSection
          initialPrompt={chatPrompt}
          onShowToast={showToast}
        />

        {/* Botanical FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Floating Toast Container */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-2xl bg-stone-900/90 hover:bg-emerald-500 hover:text-stone-950 text-emerald-400 border border-stone-800 hover:border-emerald-400 shadow-2xl transition-all duration-200 active:scale-95 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </div>
  );
};

export default App;
