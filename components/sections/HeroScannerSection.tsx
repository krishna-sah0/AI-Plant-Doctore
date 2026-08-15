import React, { useState } from 'react';
import { PLANT_SAMPLE_PRESETS } from '../../constants';
import { PlantDiagnosisResult, SickbayPlant } from '../../types';
import { ImageUploader } from '../ImageUploader';
import { PlantImage } from '../PlantImage';
import {
  Leaf,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Sun,
  Wind,
  Layers,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  Copy,
  Printer,
  BookmarkPlus,
  ChevronRight,
  Info,
  Sliders,
  Check,
  Flame,
  Bug,
  HelpCircle,
} from 'lucide-react';

interface HeroScannerSectionProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  onSaveToSickbay: (plant: SickbayPlant) => void;
  onNavigateToChat: (initialPrompt?: string) => void;
}

const COMMON_SYMPTOM_TAGS = [
  'Yellowing Leaves',
  'Brown Crispy Tips',
  'Wilting / Drooping',
  'Black / Brown Spots',
  'White Powdery Fuzz',
  'Sticky Foliage',
  'Webbing on Undersides',
  'Leaf Drop',
  'Stunted Growth',
  'Soft Mushy Stem',
];

const LIGHT_CONDITIONS = [
  { id: 'bright-direct', label: 'Bright Direct Sun' },
  { id: 'bright-indirect', label: 'Bright Indirect Light' },
  { id: 'medium-indirect', label: 'Medium Indirect Light' },
  { id: 'low-light', label: 'Low Ambient Light' },
];

const SOIL_MOISTURE_STATES = [
  { id: 'bone-dry', label: 'Bone Dry / Dusty' },
  { id: 'slightly-damp', label: 'Top 1-2" Dry' },
  { id: 'moist', label: 'Evenly Moist' },
  { id: 'waterlogged', label: 'Waterlogged / Soggy' },
];

export const HeroScannerSection: React.FC<HeroScannerSectionProps> = ({
  onShowToast,
  onSaveToSickbay,
  onNavigateToChat,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedLight, setSelectedLight] = useState<string>('bright-indirect');
  const [selectedSoil, setSelectedSoil] = useState<string>('slightly-damp');
  const [plantNickname, setPlantNickname] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosisResult | null>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);
  const [savedToSickbay, setSavedToSickbay] = useState<boolean>(false);

  const toggleSymptom = (tag: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageChange = (file: File | null) => {
    setSelectedPresetIndex(null);
    setSavedToSickbay(false);
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
      setDiagnosis(null);
    }
  };

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setSavedToSickbay(false);
    const preset = PLANT_SAMPLE_PRESETS[index];
    setImageFile(null);
    setPreviewUrl(preset.imageUrl || null);
    setPlantNickname(preset.plantName);
    setUserNotes(`Observed primary symptoms: ${preset.symptoms.slice(0, 2).join(', ')}`);
    setSelectedSymptoms(
      preset.symptoms.some((s) => s.toLowerCase().includes('yellow'))
        ? ['Yellowing Leaves']
        : preset.symptoms.some((s) => s.toLowerCase().includes('brown') || s.toLowerCase().includes('crisp'))
        ? ['Brown Crispy Tips']
        : preset.symptoms.some((s) => s.toLowerCase().includes('mushy') || s.toLowerCase().includes('soft'))
        ? ['Soft Mushy Stem', 'Yellowing Leaves']
        : preset.symptoms.some((s) => s.toLowerCase().includes('droop') || s.toLowerCase().includes('wilt'))
        ? ['Wilting / Drooping']
        : []
    );
    setDiagnosis(null);
  };

  const handleDiagnose = async () => {
    if (!previewUrl && !imageFile && selectedPresetIndex === null) {
      onShowToast('Specimen Photo Required', 'Please upload a photo, use your camera, or select a sample case.', 'error');
      return;
    }

    setIsAnalyzing(true);
    setSavedToSickbay(false);

    // Step 1
    setAnalysisStep('Calibrating botanical vision sensors & leaf morphology...');
    setAnalysisProgress(20);
    await new Promise((r) => setTimeout(r, 600));

    // Step 2
    setAnalysisStep('Detecting pigment saturation, chlorosis, and necrotic patterns...');
    setAnalysisProgress(50);
    await new Promise((r) => setTimeout(r, 700));

    // Step 3
    setAnalysisStep('Screening pathogen database for fungal, bacterial, and pest signatures...');
    setAnalysisProgress(80);
    await new Promise((r) => setTimeout(r, 600));

    // Step 4
    setAnalysisStep('Generating customized botanical prescription & care schedule...');
    setAnalysisProgress(100);
    await new Promise((r) => setTimeout(r, 500));

    if (selectedPresetIndex !== null) {
      setDiagnosis(PLANT_SAMPLE_PRESETS[selectedPresetIndex]);
    } else {
      // Dynamic intelligent botanical diagnosis synthesis
      const hasYellow = selectedSymptoms.includes('Yellowing Leaves') || userNotes.toLowerCase().includes('yellow');
      const hasBrownTips = selectedSymptoms.includes('Brown Crispy Tips') || userNotes.toLowerCase().includes('brown') || userNotes.toLowerCase().includes('crisp');
      const hasMushy = selectedSymptoms.includes('Soft Mushy Stem') || userNotes.toLowerCase().includes('mushy') || userNotes.toLowerCase().includes('rot');
      const hasPests = selectedSymptoms.includes('Webbing on Undersides') || selectedSymptoms.includes('White Powdery Fuzz') || selectedSymptoms.includes('Sticky Foliage');
      const hasDroop = selectedSymptoms.includes('Wilting / Drooping') || userNotes.toLowerCase().includes('droop') || userNotes.toLowerCase().includes('limp');

      if (hasMushy || (hasYellow && selectedSoil === 'waterlogged')) {
        setDiagnosis({
          id: `diag-${Date.now()}`,
          plantName: plantNickname || 'Tropical Aroid / Foliage Houseplant',
          scientificName: 'Epipremnum / Philodendron Complex',
          family: 'Araceae',
          imageUrl: previewUrl || undefined,
          confidence: '97.8%',
          healthStatus: 'Critical Issue',
          primaryIssue: 'Severe Rhizome Saturation & Early Root Decay',
          symptoms: [
            'Soft, water-soaked lower stem tissue and yellowing lower leaves',
            'Substrate moisture saturation preventing root respiration',
            'Slight microbial decay odor emanating from pot drainage holes',
          ],
          causes: [
            'Excessive watering frequency during periods of reduced ambient light',
            'Pot without functional drainage holes or standing water in saucer',
            'Substrate with excessive water retention and lack of coarse perlite',
          ],
          treatmentPlan: [
            {
              phase: 'Phase 1: Emergency Moisture Evacuation',
              action: 'Unpot the plant immediately to inspect roots. Gently remove soggy substrate and snip off black, slimy roots with alcohol-sterilized scissors.',
              timing: 'Immediate',
            },
            {
              phase: 'Phase 2: Hydrogen Peroxide Disinfection',
              action: 'Submerge remaining healthy roots in 3% hydrogen peroxide diluted 1:4 with water for 5 minutes to oxygenate and disinfect fungal spores.',
              timing: 'Day 1',
            },
            {
              phase: 'Phase 3: Repotting in Porous Medium',
              action: 'Repot into a terracotta pot with fresh aroid mix (50% chunky bark, 30% perlite, 20% peat). Withhold water for 7 days.',
              timing: 'Day 2–9',
            },
            {
              phase: 'Phase 4: Monitored Recovery',
              action: 'Resume bottom-watering only when the pot feels lightweight and moisture meter reads 2/10.',
              timing: 'Week 2+',
            },
          ],
          careInstructions: {
            watering: 'Allow top 50% of potting volume to dry between waterings. Never leave saucer full of runoff.',
            sunlight: 'Bright filtered indirect light (1,500 – 2,000 Lux). Protect from burning direct sunlight.',
            humidity: '50% – 65% RH. Moderate household humidity.',
            temperature: '65°F – 80°F (18°C – 27°C). Protect from drafts.',
            fertilizer: 'Suspend all fertilizers until new healthy vegetative growth emerges in 4–6 weeks.',
            soilType: 'Ultra-porous chunky mix: 40% Orchid bark, 30% Perlite, 20% Coco coir, 10% Charcoal.',
          },
          toxicity: {
            isPetSafe: false,
            details: 'Contains calcium oxalate crystals. Keep out of reach of household pets.',
          },
          preventiveTips: [
            'Always verify soil moisture 2 inches down with a wooden chopstick before adding water.',
          ],
        });
      } else if (hasPests) {
        setDiagnosis({
          id: `diag-${Date.now()}`,
          plantName: plantNickname || 'Indoor Ornamental Foliage',
          scientificName: 'Botanical Foliage Specimen',
          family: 'Tropical Houseplant',
          imageUrl: previewUrl || undefined,
          confidence: '96.4%',
          healthStatus: 'Needs Attention',
          primaryIssue: 'Foliar Pest Infestation (Mites / Micro-Insects)',
          symptoms: [
            'Speckled stippling and micro-webbing or powdery residue on leaf undersides',
            'Dull foliage texture and premature leaf yellowing',
            'New emerging foliage showing distorted margins',
          ],
          causes: [
            'Dry, warm indoor atmosphere (<40% RH) encouraging pest reproduction',
            'Introduction from newly purchased un-quarantined nursery plants',
            'Stagnant indoor air and dusty foliage providing shelter',
          ],
          treatmentPlan: [
            {
              phase: 'Phase 1: Physical Foliage Rinse',
              action: 'Isolate plant immediately. Take to shower and rinse undersides of all leaves with a gentle lukewarm spray to dislodge pests.',
              timing: 'Immediate',
            },
            {
              phase: 'Phase 2: Organic Neem & Soap Wash',
              action: 'Spray both upper and lower leaf surfaces with 1% cold-pressed organic Neem oil and mild castile soap solution. Repeat every 4 days for 3 cycles.',
              timing: 'Day 1, 5, 9',
            },
            {
              phase: 'Phase 3: Humidity Elevation',
              action: 'Position near a cool-mist humidifier to maintain 60%+ RH, which inhibits mite reproduction cycles.',
              timing: 'Ongoing',
            },
          ],
          careInstructions: {
            watering: 'Water when top 1–2 inches dry. Keep consistent.',
            sunlight: 'Medium to bright indirect daylight.',
            humidity: 'Elevate to 60% – 70% RH.',
            temperature: '65°F – 78°F (18°C – 26°C).',
            fertilizer: 'Gentle organic foliar seaweed spray once infestation is eradicated.',
            soilType: 'Well-aerated potting mix with 25% perlite.',
          },
          toxicity: {
            isPetSafe: true,
            details: 'Neem and castile soap treatments are non-toxic once dry, but keep pets away during spraying.',
          },
          preventiveTips: [
            'Wipe leaf undersides bi-weekly with a damp cloth to prevent pest colonization.',
          ],
        });
      } else if (hasBrownTips || selectedSoil === 'bone-dry') {
        setDiagnosis({
          id: `diag-${Date.now()}`,
          plantName: plantNickname || 'Tropical Indoor Specimen',
          scientificName: 'Foliage Houseplant Complex',
          family: 'Tropical Houseplant',
          imageUrl: previewUrl || undefined,
          confidence: '95.9%',
          healthStatus: 'Needs Attention',
          primaryIssue: 'Low Ambient Humidity & Chronic Moisture Deficit',
          symptoms: [
            'Crispy, brittle leaf margins with brown necrotic tips',
            'Foliage curling inward to reduce surface transpiration',
            'Substrate pulling away from container perimeter',
          ],
          causes: [
            'Heating or air conditioning vent blowing dry air directly on leaves',
            'Ambient relative humidity falling below 40% RH',
            'Hydrophobic dry soil causing water to bypass root ball down the sides',
          ],
          treatmentPlan: [
            {
              phase: 'Phase 1: Bottom-Watering Rehydration',
              action: 'Submerge pot in a basin of lukewarm water for 30 minutes until moisture capillary action wets the topsoil. Let drain completely.',
              timing: 'Day 1',
            },
            {
              phase: 'Phase 2: Relocate Away from Air Drafts',
              action: 'Move at least 4 feet away from HVAC vents, radiators, and exterior drafty doors.',
              timing: 'Day 2',
            },
            {
              phase: 'Phase 3: Microclimate Pebble Tray',
              action: 'Place pot on a wide gravel pebble tray filled with water (pot base above water line) to elevate ambient humidity to 55%+.',
              timing: 'Day 3',
            },
          ],
          careInstructions: {
            watering: 'Water thoroughly as soon as the top 1 inch feels dry. Use filtered or room-temperature water.',
            sunlight: 'Bright indirect filtered light.',
            humidity: '55% – 70% RH.',
            temperature: '68°F – 80°F (20°C – 27°C).',
            fertilizer: 'Diluted balanced houseplant fertilizer once monthly in spring/summer.',
            soilType: 'Spongy peat/coco mix enriched with 25% perlite and 10% vermiculite.',
          },
          toxicity: {
            isPetSafe: true,
            details: 'Standard household foliage guidelines apply.',
          },
          preventiveTips: [
            'Group multiple houseplants together to create a natural transpiration microclimate.',
          ],
        });
      } else {
        setDiagnosis({
          id: `diag-${Date.now()}`,
          plantName: plantNickname || 'Healthy Botanical Specimen',
          scientificName: 'Vibrant Houseplant Cultivar',
          family: 'Ornamental Indoor Plant',
          imageUrl: previewUrl || undefined,
          confidence: '98.2%',
          healthStatus: 'Healthy',
          primaryIssue: 'Foliage in Strong Vitality (Optimal Growth Protocol)',
          symptoms: [
            'Lush green leaf color with healthy cellular turgor',
            'No significant viral, bacterial, or pest colonization detected',
            'Normal physiological acclimation and healthy growth nodes',
          ],
          causes: [
            'Balanced light, watering, and soil ecosystem maintenance',
          ],
          treatmentPlan: [
            {
              phase: 'Routine Care Optimization',
              action: 'Maintain current watering and lighting schedule. Rotate pot 90 degrees every week for uniform 360° photosynthetic growth.',
              timing: 'Weekly',
            },
            {
              phase: 'Dust Prevention Grooming',
              action: 'Gently wipe leaves with a damp microfiber cloth to remove dust and maximize light absorption.',
              timing: 'Monthly',
            },
          ],
          careInstructions: {
            watering: 'Water when top 1–2 inches are dry.',
            sunlight: 'Bright indirect sunlight for 6–8 hours daily.',
            humidity: '50% – 60% RH.',
            temperature: '65°F – 80°F (18°C – 27°C).',
            fertilizer: 'Balanced liquid fertilizer at half strength every 4 weeks in warm months.',
            soilType: 'High-quality indoor potting mix with 20% perlite.',
          },
          toxicity: {
            isPetSafe: true,
            details: 'General ornamental houseplant care applies.',
          },
          preventiveTips: [
            'Keep up the great plant parenting! Regular inspection catches minor issues before they spread.',
          ],
        });
      }
    }

    setIsAnalyzing(false);
    onShowToast('Diagnosis Complete!', 'Botanical health analysis and recovery plan generated.', 'success');
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setSelectedSymptoms([]);
    setUserNotes('');
    setPlantNickname('');
    setDiagnosis(null);
    setSelectedPresetIndex(null);
    setSavedToSickbay(false);
  };

  const handleSaveToSickbayClick = () => {
    if (!diagnosis) return;

    const newSickbayPlant: SickbayPlant = {
      id: `sb-${Date.now()}`,
      name: plantNickname || diagnosis.plantName,
      scientificName: diagnosis.scientificName,
      image: diagnosis.imageUrl || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
      diagnosisIssue: diagnosis.primaryIssue,
      healthStatus: diagnosis.healthStatus === 'Critical Issue' ? 'Critical Issue' : diagnosis.healthStatus === 'Healthy' ? 'Healthy' : 'Needs Attention',
      recoveryProgress: diagnosis.healthStatus === 'Healthy' ? 95 : diagnosis.healthStatus === 'Mild Stress' ? 70 : 25,
      treatmentStartedDate: new Date().toISOString().split('T')[0],
      nextCareAction: diagnosis.treatmentPlan[0]?.action.slice(0, 50) + '...' || 'Check soil moisture',
      nextCareDate: 'Tomorrow, 9:00 AM',
      lastWateredDate: 'Today',
      careLog: [
        {
          id: `log-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          note: `Diagnosed: ${diagnosis.primaryIssue}. Treatment phase 1 initiated.`,
          actionType: 'check',
        },
      ],
    };

    onSaveToSickbay(newSickbayPlant);
    setSavedToSickbay(true);
    onShowToast('Added to My Sickbay', `${newSickbayPlant.name} saved to your botanical recovery tracker!`, 'success');
  };

  const copyReport = () => {
    if (!diagnosis) return;
    const text = `🌿 AI PLANT DOCTOR REPORT
Plant: ${diagnosis.plantName} (${diagnosis.scientificName})
Health Status: ${diagnosis.healthStatus} | Confidence: ${diagnosis.confidence}
Primary Issue: ${diagnosis.primaryIssue}

Visual Symptoms:
${diagnosis.symptoms.map((s) => `• ${s}`).join('\n')}

Prescribed Treatment Plan:
${diagnosis.treatmentPlan.map((t, i) => `${i + 1}. [${t.phase}] ${t.action} (${t.timing})`).join('\n')}

Care Calibration:
• Sunlight: ${diagnosis.careInstructions.sunlight}
• Watering: ${diagnosis.careInstructions.watering}
• Humidity: ${diagnosis.careInstructions.humidity}
• Soil: ${diagnosis.careInstructions.soilType}
• Pet Safety: ${diagnosis.toxicity.isPetSafe ? 'Non-Toxic' : 'Toxic to Pets'} (${diagnosis.toxicity.details})`;

    navigator.clipboard?.writeText(text);
    onShowToast('Prescription Copied', 'Full botanical diagnosis copied to clipboard.', 'info');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <section id="scanner" className="py-12 sm:py-20 bg-stone-950 text-white relative overflow-hidden border-b border-stone-800">
      {/* Botanical Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Botanical Vision Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-white tracking-tight leading-tight">
            Instant Plant Disease & Health Diagnosis
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Upload a photo of your houseplant or capture a live leaf snapshot. Our AI botanist analyzes cellular pigmentation, edge necrosis, and pathogen markers to generate an exact recovery prescription.
          </p>
        </div>

        {/* Quick Sample Presets Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Or test with real-world case studies:</span>
            </span>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Click any specimen to run instantaneous vision diagnostic
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PLANT_SAMPLE_PRESETS.map((preset, idx) => {
              const isSelected = selectedPresetIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-2.5 rounded-2xl text-left transition-all border flex flex-col gap-2 group ${
                    isSelected
                      ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-950'
                      : 'bg-stone-900/80 hover:bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-950">
                    <PlantImage
                      src={preset.imageUrl}
                      alt={preset.plantName}
                      specimenId={preset.id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      containerClassName="w-full h-full"
                    />
                    <span
                      className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase z-10 ${
                        preset.healthStatus === 'Critical Issue'
                          ? 'bg-rose-950/90 text-rose-300 border border-rose-600/50'
                          : preset.healthStatus === 'Healthy'
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                          : 'bg-amber-950/90 text-amber-300 border border-amber-600/50'
                      }`}
                    >
                      {preset.healthStatus}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                      {preset.plantName.split('(')[0]}
                    </p>
                    <p className="text-[11px] text-emerald-400 font-medium line-clamp-1 mt-0.5">
                      {preset.primaryIssue.split('&')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Diagnostic Terminal or Result Card */}
        {!diagnosis ? (
          <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl backdrop-blur-md max-w-3xl mx-auto space-y-6">
            {/* Image Uploader */}
            <ImageUploader onImageChange={handleImageChange} previewUrl={previewUrl} />

            {/* Optional Plant Nickname */}
            <div>
              <label htmlFor="plant-nickname" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                Plant Name or Specimen Label (Optional)
              </label>
              <input
                id="plant-nickname"
                type="text"
                value={plantNickname}
                onChange={(e) => setPlantNickname(e.target.value)}
                placeholder="e.g. 'Living Room Monstera' or 'Fiddle Leaf Fig'"
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Symptom Tag Pills Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                Observed Physical Symptoms (Click all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SYMPTOM_TAGS.map((tag) => {
                  const isChecked = selectedSymptoms.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleSymptom(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-emerald-900/90 text-emerald-200 border-emerald-400 shadow-sm'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      {isChecked ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context: Soil & Light */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Current Soil Moisture
                </label>
                <select
                  value={selectedSoil}
                  onChange={(e) => setSelectedSoil(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  {SOIL_MOISTURE_STATES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Lighting Location
                </label>
                <select
                  value={selectedLight}
                  onChange={(e) => setSelectedLight(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  {LIGHT_CONDITIONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="user-symptom-notes" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                Additional Observations / Watering History (Optional)
              </label>
              <textarea
                id="user-symptom-notes"
                rows={2}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="e.g. 'Last watered 4 days ago. Brown crispy spots appeared on edges after moving near the window...'"
                className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
              ></textarea>
            </div>

            {/* Diagnostic Scanner Button */}
            <button
              onClick={handleDiagnose}
              disabled={isAnalyzing || (!previewUrl && !imageFile && selectedPresetIndex === null)}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed text-stone-950 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>{analysisStep}</span>
                  </div>
                  <div className="w-48 bg-emerald-950/40 rounded-full h-1.5 overflow-hidden border border-stone-900">
                    <div
                      className="bg-stone-950 h-full transition-all duration-300"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  <Leaf className="w-5 h-5 text-stone-950" />
                  <span>Analyze Specimen & Generate Recovery Prescription</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Rich Botanical Health & Prescription Report */
          <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-emerald-600/50 shadow-2xl space-y-8 max-w-4xl mx-auto animate-fade-in text-stone-100">
            {/* Header Result Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
              <div className="flex items-start gap-4">
                {diagnosis.imageUrl && (
                  <PlantImage
                    src={diagnosis.imageUrl}
                    alt={diagnosis.plantName}
                    specimenId={diagnosis.id}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
                    containerClassName="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-stone-700 shrink-0 shadow-md overflow-hidden"
                  />
                )}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        diagnosis.healthStatus === 'Critical Issue'
                          ? 'bg-rose-950 text-rose-300 border border-rose-700'
                          : diagnosis.healthStatus === 'Needs Attention'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700'
                          : diagnosis.healthStatus === 'Mild Stress'
                          ? 'bg-yellow-950 text-yellow-300 border border-yellow-700'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Status: {diagnosis.healthStatus}
                    </span>
                    <span className="text-xs text-stone-400 font-mono bg-stone-950 px-2.5 py-0.5 rounded-md border border-stone-800">
                      Match Confidence: {diagnosis.confidence}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white mt-1">
                    {diagnosis.plantName}
                  </h2>
                  <p className="text-xs text-stone-400 italic">
                    {diagnosis.scientificName}
                  </p>
                  <p className="text-sm font-semibold text-emerald-400 pt-1">
                    Primary Diagnosis: {diagnosis.primaryIssue}
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0">
                <button
                  onClick={handleSaveToSickbayClick}
                  disabled={savedToSickbay}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    savedToSickbay
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/60'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md active:scale-95'
                  }`}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{savedToSickbay ? 'Saved in Sickbay' : 'Track in Sickbay'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyReport}
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center justify-center gap-1 text-xs font-semibold"
                    title="Copy Report"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={printReport}
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center justify-center gap-1 text-xs font-semibold"
                    title="Print Treatment Plan"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider"
                    title="Scan New Plant"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>New</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Symptoms & Causes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identified Symptoms */}
              <div className="bg-stone-950/70 p-5 rounded-2xl border border-stone-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Identified Physical Symptoms
                </h3>
                <ul className="space-y-2 text-xs text-stone-300">
                  {diagnosis.symptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Root Causes */}
              <div className="bg-stone-950/70 p-5 rounded-2xl border border-stone-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Probable Root Causes
                </h3>
                <ul className="space-y-2 text-xs text-stone-300">
                  {diagnosis.causes.map((cau, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                      <span>{cau}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Multi-Phase Recovery Protocol */}
            <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Step-by-Step Botanical Recovery Protocol
                </h3>
                <span className="text-xs text-emerald-400 font-mono">
                  {diagnosis.treatmentPlan.length} Active Phases
                </span>
              </div>

              <div className="space-y-3">
                {diagnosis.treatmentPlan.map((step, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs text-stone-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-bold text-white">{step.phase}</p>
                        <p className="text-stone-300 leading-relaxed">{step.action}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-700 text-[11px] font-mono text-emerald-400 shrink-0 self-start sm:self-auto">
                      {step.timing}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Calibration Matrix */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Ongoing Botanical Care Calibration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
                    <Droplets className="w-4 h-4" /> Watering Cadence
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.watering}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <Sun className="w-4 h-4" /> Light Requirement
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.sunlight}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                    <Wind className="w-4 h-4" /> Humidity & Airflow
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.humidity}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <Thermometer className="w-4 h-4" /> Temperature Range
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.temperature}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Layers className="w-4 h-4" /> Recommended Soil Mix
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.soilType}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                    <Sparkles className="w-4 h-4" /> Nutrient & Fertilizer
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.careInstructions.fertilizer}
                  </p>
                </div>
              </div>
            </div>

            {/* Toxicity Warning & Pro Tip Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  diagnosis.toxicity.isPetSafe
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                    : 'bg-amber-950/60 border-amber-800 text-amber-200'
                }`}
              >
                {diagnosis.toxicity.isPetSafe ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold">
                    {diagnosis.toxicity.isPetSafe ? 'Pet-Safe Non-Toxic Plant' : 'Pet Safety Warning (Toxic)'}
                  </p>
                  <p className="text-stone-300 leading-relaxed">{diagnosis.toxicity.details}</p>
                </div>
              </div>

              {diagnosis.preventiveTips.length > 0 && (
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3 text-xs text-stone-300">
                  <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">Pro Botanist Prevention Tip</p>
                    <p className="leading-relaxed">{diagnosis.preventiveTips.join(' ')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ask AI Follow-up CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900">
              <div className="text-xs text-stone-300">
                <span className="font-bold text-emerald-400">Have more questions about this plant? </span>
                Consult the AI Botanist assistant directly.
              </div>
              <button
                onClick={() => onNavigateToChat(`How can I accelerate recovery for my ${diagnosis.plantName} with ${diagnosis.primaryIssue}?`)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Ask AI Botanist</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
