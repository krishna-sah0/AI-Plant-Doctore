import React, { useState } from 'react';
import { Leaf, Stethoscope, Menu, X, ShieldAlert, Sparkles, HeartPulse, BookOpen, Calculator, MessageSquareCode } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  activeSection: string;
  onNavigate: (href: string) => void;
  sickbayCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  sickbayCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="#scanner"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#scanner');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-stone-950 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display font-bold text-lg sm:text-xl tracking-tight text-white">
                  AI Plant Doctor
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Vision AI
                </span>
              </div>
              <p className="text-[10px] text-stone-400 -mt-0.5 hidden sm:block">
                Intelligent Botanical Health & Diagnostics
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              const isSickbay = link.href === '#sickbay';

              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase">
                      {link.badge}
                    </span>
                  )}
                  {isSickbay && sickbayCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                      {sickbayCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('#scanner')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Scan Plant</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            const isSickbay = link.href === '#sickbay';

            return (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-semibold'
                    : 'text-stone-300 hover:bg-stone-900'
                }`}
              >
                <span>{link.name}</span>
                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                      {link.badge}
                    </span>
                  )}
                  {isSickbay && sickbayCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center justify-center">
                      {sickbayCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
