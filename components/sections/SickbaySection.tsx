import React, { useState } from 'react';
import { SickbayPlant } from '../../types';
import { PlantImage } from '../PlantImage';
import confetti from 'canvas-confetti';
import {
  HeartPulse,
  Droplets,
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

interface SickbaySectionProps {
  plants: SickbayPlant[];
  onUpdatePlant: (updatedPlant: SickbayPlant) => void;
  onDeletePlant: (plantId: string) => void;
  onAddPlant: (newPlant: SickbayPlant) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const SickbaySection: React.FC<SickbaySectionProps> = ({
  plants,
  onUpdatePlant,
  onDeletePlant,
  onAddPlant,
  onShowToast,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPlantForLog, setSelectedPlantForLog] = useState<SickbayPlant | null>(null);
  const [newLogNote, setNewLogNote] = useState<string>('');
  const [newLogAction, setNewLogAction] = useState<'water' | 'fertilize' | 'prune' | 'spray' | 'check'>('water');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New plant form state
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantSpecies, setNewPlantSpecies] = useState('');
  const [newPlantIssue, setNewPlantIssue] = useState('');
  const [newPlantImage, setNewPlantImage] = useState('');

  const filteredPlants = plants.filter((p) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'recovering') return p.healthStatus === 'Recovering';
    if (filterStatus === 'attention') return p.healthStatus === 'Needs Attention' || p.healthStatus === 'Critical Issue';
    if (filterStatus === 'healthy') return p.healthStatus === 'Healthy';
    return true;
  });

  const handleProgressChange = (plant: SickbayPlant, newProgress: number) => {
    const isNowHealthy = newProgress >= 100;
    const updated: SickbayPlant = {
      ...plant,
      recoveryProgress: newProgress,
      healthStatus: isNowHealthy ? 'Healthy' : newProgress >= 50 ? 'Recovering' : 'Needs Attention',
    };

    if (isNowHealthy && plant.healthStatus !== 'Healthy') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onShowToast('🎉 Plant Recovered!', `${plant.name} has graduated from the Sickbay!`, 'success');
    }

    onUpdatePlant(updated);
  };

  const handleQuickWater = (plant: SickbayPlant) => {
    const today = new Date().toISOString().split('T')[0];
    const updated: SickbayPlant = {
      ...plant,
      lastWateredDate: 'Today',
      nextCareDate: 'In 7 days',
      careLog: [
        {
          id: `log-${Date.now()}`,
          date: today,
          note: 'Hydrated with filtered room-temperature water. Checked drainage.',
          actionType: 'water',
        },
        ...plant.careLog,
      ],
    };
    onUpdatePlant(updated);
    onShowToast('Watering Logged', `${plant.name} hydrated & schedule updated.`, 'success');
  };

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlantForLog || !newLogNote.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const updated: SickbayPlant = {
      ...selectedPlantForLog,
      careLog: [
        {
          id: `log-${Date.now()}`,
          date: today,
          note: newLogNote.trim(),
          actionType: newLogAction,
        },
        ...selectedPlantForLog.careLog,
      ],
    };

    onUpdatePlant(updated);
    setSelectedPlantForLog(updated);
    setNewLogNote('');
    onShowToast('Care Log Entry Added', `Logged care note for ${selectedPlantForLog.name}`, 'info');
  };

  const handleCreateNewPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim()) return;

    const created: SickbayPlant = {
      id: `sb-${Date.now()}`,
      name: newPlantName.trim(),
      scientificName: newPlantSpecies.trim() || 'Botanical Specimen',
      image: newPlantImage.trim() || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
      diagnosisIssue: newPlantIssue.trim() || 'General Botanical Care Recovery',
      healthStatus: 'Needs Attention',
      recoveryProgress: 20,
      treatmentStartedDate: new Date().toISOString().split('T')[0],
      nextCareAction: 'Initial moisture & light adjustment',
      nextCareDate: 'Tomorrow, 9:00 AM',
      lastWateredDate: 'Today',
      careLog: [
        {
          id: `log-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          note: 'Admitted to Botanical Sickbay for active recovery tracking.',
          actionType: 'check',
        },
      ],
    };

    onAddPlant(created);
    setIsAddModalOpen(false);
    setNewPlantName('');
    setNewPlantSpecies('');
    setNewPlantIssue('');
    setNewPlantImage('');
    onShowToast('Plant Added', `${created.name} added to My Sickbay!`, 'success');
  };

  return (
    <section id="sickbay" className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
              <span>Plant Hospital & Recovery Tracker</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white">
              My Botanical Sickbay
            </h2>
            <p className="text-sm text-stone-300 max-w-xl">
              Track recovery progress, log hydration & pruning events, and monitor treatment milestones for your recovering houseplants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs font-semibold">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'all' ? 'bg-emerald-900 text-emerald-200' : 'text-stone-400 hover:text-white'
                }`}
              >
                All ({plants.length})
              </button>
              <button
                onClick={() => setFilterStatus('attention')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'attention' ? 'bg-amber-900 text-amber-200' : 'text-stone-400 hover:text-white'
                }`}
              >
                Needs Care
              </button>
              <button
                onClick={() => setFilterStatus('recovering')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'recovering' ? 'bg-sky-900 text-sky-200' : 'text-stone-400 hover:text-white'
                }`}
              >
                Recovering
              </button>
              <button
                onClick={() => setFilterStatus('healthy')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'healthy' ? 'bg-emerald-950 text-emerald-300' : 'text-stone-400 hover:text-white'
                }`}
              >
                Graduated
              </button>
            </div>

            {/* Add Custom Plant Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all"
            >
              <Plus className="w-4 h-4 text-stone-950" />
              <span>Admit Plant</span>
            </button>
          </div>
        </div>

        {/* Sickbay Plant Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-stone-950/50 border border-stone-800 space-y-3">
            <HeartPulse className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="text-base font-bold text-stone-300">No Plants in this Sickbay View</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Scan a plant using the AI Scanner above and click "Track in Sickbay" to begin monitoring its recovery.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => {
              const isHealthy = plant.healthStatus === 'Healthy' || plant.recoveryProgress >= 100;

              return (
                <div
                  key={plant.id}
                  className="bg-stone-950/90 rounded-3xl p-5 sm:p-6 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-5 shadow-xl group"
                >
                  {/* Plant Card Header */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5">
                      <PlantImage
                        src={plant.image}
                        alt={plant.name}
                        specimenId={plant.id}
                        className="w-16 h-16 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                        containerClassName="w-16 h-16 rounded-2xl border border-stone-800 shrink-0 overflow-hidden"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isHealthy
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : plant.healthStatus === 'Recovering'
                                ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {plant.healthStatus}
                          </span>
                          <button
                            onClick={() => onDeletePlant(plant.id)}
                            className="text-stone-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                            title="Discharge / Remove from Sickbay"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h3 className="text-base font-bold text-white truncate mt-1">{plant.name}</h3>
                        <p className="text-xs text-stone-400 italic truncate">{plant.scientificName}</p>
                      </div>
                    </div>

                    {/* Diagnosis & Condition */}
                    <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Under Treatment For:
                      </span>
                      <p className="text-xs text-stone-200 line-clamp-1 font-medium">{plant.diagnosisIssue}</p>
                    </div>

                    {/* Recovery Progress Bar & Controls */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          Recovery Health
                        </span>
                        <span className="font-mono font-bold text-emerald-400">{plant.recoveryProgress}%</span>
                      </div>

                      <div className="w-full bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isHealthy ? 'bg-emerald-400' : plant.recoveryProgress > 50 ? 'bg-sky-400' : 'bg-amber-400'
                          }`}
                          style={{ width: `${plant.recoveryProgress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between gap-1 pt-1">
                        <button
                          onClick={() => handleProgressChange(plant, Math.max(0, plant.recoveryProgress - 15))}
                          className="text-[10px] font-bold px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                        >
                          -15%
                        </button>
                        <span className="text-[10px] text-stone-500">Update progress</span>
                        <button
                          onClick={() => handleProgressChange(plant, Math.min(100, plant.recoveryProgress + 15))}
                          className="text-[10px] font-bold px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 text-emerald-400"
                        >
                          +15%
                        </button>
                      </div>
                    </div>

                    {/* Schedule / Last Watered */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-0.5">
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-sky-400" /> Watered
                        </span>
                        <p className="font-semibold text-stone-200 text-xs truncate">{plant.lastWateredDate || '7 days ago'}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-0.5">
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-400" /> Next Action
                        </span>
                        <p className="font-semibold text-emerald-300 text-xs truncate">{plant.nextCareDate || 'In 2 days'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                    <button
                      onClick={() => handleQuickWater(plant)}
                      className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-sky-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-800 transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      <span>Water Now</span>
                    </button>

                    <button
                      onClick={() => setSelectedPlantForLog(plant)}
                      className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-800 transition-colors"
                      title="View Care Log & Notes"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Log ({plant.careLog.length})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Care Log & Notes Modal */}
      {selectedPlantForLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-800 shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <PlantImage
                  src={selectedPlantForLog.image}
                  alt={selectedPlantForLog.name}
                  specimenId={selectedPlantForLog.id}
                  className="w-12 h-12 rounded-xl object-cover"
                  containerClassName="w-12 h-12 rounded-xl border border-stone-800 shrink-0 overflow-hidden"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedPlantForLog.name}</h3>
                  <p className="text-xs text-stone-400">{selectedPlantForLog.diagnosisIssue}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlantForLog(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add New Care Note Form */}
            <form onSubmit={handleAddLogSubmit} className="space-y-3 p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400">
                Log New Care Intervention
              </label>

              <div className="flex gap-2">
                <select
                  value={newLogAction}
                  onChange={(e: any) => setNewLogAction(e.target.value)}
                  className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="water">💧 Water</option>
                  <option value="prune">✂️ Prune</option>
                  <option value="spray">🌿 Spray / Mist</option>
                  <option value="fertilize">✨ Fertilize</option>
                  <option value="check">🔍 Check-in</option>
                </select>

                <input
                  type="text"
                  value={newLogNote}
                  onChange={(e) => setNewLogNote(e.target.value)}
                  placeholder="e.g. 'Pruned yellow leaves, misted with neem oil...'"
                  className="flex-1 p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Add Log Entry
              </button>
            </form>

            {/* Historic Log List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Historical Recovery Timeline
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedPlantForLog.careLog.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5"
                  >
                    <span className="p-1 rounded-md bg-stone-900 text-emerald-400 mt-0.5 shrink-0">
                      {log.actionType === 'water' ? (
                        <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      ) : log.actionType === 'prune' ? (
                        <Scissors className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                        <span className="uppercase font-bold text-emerald-400">{log.actionType}</span>
                        <span>{log.date}</span>
                      </div>
                      <p className="text-stone-200 mt-0.5 leading-relaxed">{log.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Plant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-800 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-bold text-white font-serif-display">Admit Plant to Sickbay</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPlant} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Plant Nickname *</label>
                <input
                  type="text"
                  required
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                  placeholder="e.g. 'Bedroom Pothos'"
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Species / Botanical Name</label>
                <input
                  type="text"
                  value={newPlantSpecies}
                  onChange={(e) => setNewPlantSpecies(e.target.value)}
                  placeholder="e.g. 'Epipremnum Aureum'"
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Primary Issue / Diagnosis</label>
                <input
                  type="text"
                  value={newPlantIssue}
                  onChange={(e) => setNewPlantIssue(e.target.value)}
                  placeholder="e.g. 'Yellowing leaves & sluggish growth'"
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Photo Image URL (Optional)</label>
                <input
                  type="url"
                  value={newPlantImage}
                  onChange={(e) => setNewPlantImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-stone-800 text-stone-300 font-bold hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/40"
                >
                  Save Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
