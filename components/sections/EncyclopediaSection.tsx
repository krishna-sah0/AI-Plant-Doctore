import React, { useState } from 'react';
import { PLANT_DISEASES_ENCYCLOPEDIA } from '../../constants';
import { PlantDiseaseItem } from '../../types';
import { PlantImage } from '../PlantImage';
import {
  BookOpen,
  Search,
  Bug,
  AlertTriangle,
  ShieldCheck,
  Leaf,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface EncyclopediaSectionProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  onSelectDiseaseToScan?: (diseaseName: string) => void;
}

export const EncyclopediaSection: React.FC<EncyclopediaSectionProps> = ({
  onShowToast,
  onSelectDiseaseToScan,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(null);

  const categories = ['All', 'Pest', 'Fungal', 'Bacterial', 'Nutrient', 'Environmental'];

  const filteredDiseases = PLANT_DISEASES_ENCYCLOPEDIA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.type === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.visualSymptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.commonVictims.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.organicTreatment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedDiseaseId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="encyclopedia" className="py-16 sm:py-20 bg-stone-950 text-white border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Botanical Pathology Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white">
            Plant Disease & Pest Encyclopedia
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Explore verified diagnostic profiles, identification markers, organic biological controls, and chemical treatments for common houseplant ailments.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, symptoms, or plants..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Encyclopedia Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((item) => {
            const isExpanded = expandedDiseaseId === item.id;

            return (
              <div
                key={item.id}
                className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-44 w-full bg-stone-950 overflow-hidden">
                    <PlantImage
                      src={item.image}
                      alt={item.name}
                      specimenId={item.id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent pointer-events-none"></div>

                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        {item.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.severity === 'High'
                            ? 'bg-rose-950/90 text-rose-300 border border-rose-700/60'
                            : 'bg-amber-950/90 text-amber-300 border border-amber-700/60'
                        }`}
                      >
                        {item.severity} Severity
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-base font-bold text-white line-clamp-1">{item.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 text-xs">
                    {/* Common Victims */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Frequently Affects:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.commonVictims.map((v, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[11px] text-stone-300"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Symptoms Bullet List */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                        Visual Identification:
                      </span>
                      <ul className="space-y-1 text-stone-300">
                        {item.visualSymptoms.slice(0, isExpanded ? undefined : 2).map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                            <span className="line-clamp-2 leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expanded Treatment & Prevention Details */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-stone-800 animate-fade-in">
                        {/* Organic Remedy */}
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                            <Leaf className="w-3 h-3 text-emerald-400" />
                            Organic / Biological Remedy:
                          </span>
                          <p className="text-[11px] text-stone-200 leading-relaxed">{item.organicTreatment}</p>
                        </div>

                        {/* Chemical Option if any */}
                        {item.chemicalTreatment && (
                          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              Systemic / Chemical Treatment:
                            </span>
                            <p className="text-[11px] text-stone-300 leading-relaxed">{item.chemicalTreatment}</p>
                          </div>
                        )}

                        {/* Prevention */}
                        <div className="text-[11px] text-stone-400 pt-1">
                          <span className="font-bold text-stone-300">Prevention: </span>
                          {item.prevention}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Toggle */}
                <div className="p-4 bg-stone-950/70 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Full Treatment Protocol'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
