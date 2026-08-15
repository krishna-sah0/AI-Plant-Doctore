import React from 'react';
import { Leaf, Sparkles, Heart, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-stone-950 shadow-md">
              <Leaf className="w-5 h-5 fill-stone-950 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold font-serif-display text-white">AI Plant Doctor</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                  Botany Vision
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Precision AI Health Diagnostics, Recovery Schedules & Plant Hospital
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-300">
            <button onClick={() => onNavigate('#scanner')} className="hover:text-emerald-400 transition-colors">
              Plant Scanner
            </button>
            <button onClick={() => onNavigate('#sickbay')} className="hover:text-emerald-400 transition-colors">
              My Sickbay
            </button>
            <button onClick={() => onNavigate('#encyclopedia')} className="hover:text-emerald-400 transition-colors">
              Disease Library
            </button>
            <button onClick={() => onNavigate('#calculators')} className="hover:text-emerald-400 transition-colors">
              Care Calculators
            </button>
            <button onClick={() => onNavigate('#ai-chat')} className="hover:text-emerald-400 transition-colors">
              AI Botanist
            </button>
            <button onClick={() => onNavigate('#faq')} className="hover:text-emerald-400 transition-colors">
              Botanical FAQ
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors flex items-center gap-1.5"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold">Top</span>
          </button>
        </div>

        {/* Bottom Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} AI Plant Doctor. Botanical recommendations are calibrated for indoor houseplants and ornamental species.
          </p>
          <div className="flex items-center gap-1">
            <span>Powered by Botanical Vision & Gemini Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
