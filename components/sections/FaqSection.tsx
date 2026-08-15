import React, { useState } from 'react';
import { PLANT_DOCTOR_FAQS } from '../../constants';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Botanical Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white">
            Frequently Asked Plant Questions
          </h2>
          <p className="text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Essential care principles, diagnosis tips, and best practices for keeping your indoor jungle vibrant and thriving.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {PLANT_DOCTOR_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-stone-950/80 border border-stone-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-900/50 transition-colors"
                >
                  <span className="text-sm font-bold text-white flex items-center gap-2.5">
                    <span className="text-emerald-400 font-mono text-xs">0{idx + 1}.</span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="p-1 rounded-lg bg-stone-900 text-emerald-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 bg-stone-950/40 animate-fade-in">
                    <p className="pl-6 border-l-2 border-emerald-500/40">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
