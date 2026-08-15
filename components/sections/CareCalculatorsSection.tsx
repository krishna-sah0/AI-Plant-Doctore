import React, { useState } from 'react';
import {
  Calculator,
  Sun,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Compass,
} from 'lucide-react';

export const CareCalculatorsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'light' | 'watering' | 'soil'>('light');

  // Light Calculator state
  const [windowDirection, setWindowDirection] = useState<'south' | 'east' | 'west' | 'north' | 'skylight'>('east');
  const [windowDistance, setWindowDistance] = useState<number>(3); // feet
  const [curtainType, setCurtainType] = useState<'none' | 'sheer' | 'blinds'>('none');

  // Watering Calculator state
  const [plantType, setPlantType] = useState<'aroid' | 'succulent' | 'calathea' | 'tree' | 'herb'>('aroid');
  const [potMaterial, setPotMaterial] = useState<'terracotta' | 'ceramic' | 'plastic'>('ceramic');
  const [potSize, setPotSize] = useState<number>(8); // inches
  const [season, setSeason] = useState<'summer' | 'spring' | 'fall' | 'winter'>('summer');

  // Soil Mixer state
  const [selectedSoilFamily, setSelectedSoilFamily] = useState<'aroid' | 'succulent' | 'calathea' | 'orchid' | 'palm'>('aroid');

  // Calculate Light Metrics
  const calculateLight = () => {
    let baseFootCandles = 2000;
    if (windowDirection === 'south') baseFootCandles = 4000;
    else if (windowDirection === 'west') baseFootCandles = 3200;
    else if (windowDirection === 'east') baseFootCandles = 2500;
    else if (windowDirection === 'north') baseFootCandles = 800;
    else if (windowDirection === 'skylight') baseFootCandles = 5000;

    // Distance attenuation: Inverse square reduction approximation for indoor light
    let distanceFactor = 1 / (1 + (windowDistance - 1) * 0.45);
    if (curtainType === 'sheer') distanceFactor *= 0.6;
    if (curtainType === 'blinds') distanceFactor *= 0.4;

    const estimatedFC = Math.round(baseFootCandles * distanceFactor);
    const estimatedLux = estimatedFC * 10.76;

    let lightCategory = 'Low Light';
    let suitability = 'ZZ Plant, Snake Plant, Cast Iron Plant, Pothos';
    if (estimatedFC >= 2500) {
      lightCategory = 'Bright Direct Sunlight';
      suitability = 'Cacti, Succulents, Citrus, Bird of Paradise, Jade';
    } else if (estimatedFC >= 1200) {
      lightCategory = 'Bright Indirect Light';
      suitability = 'Monstera, Ficus Lyrata, Philodendron, Rubber Tree, Hoyas';
    } else if (estimatedFC >= 500) {
      lightCategory = 'Medium Indirect Light';
      suitability = 'Pothos, Calathea, Peace Lily, Spider Plant, Ferns';
    }

    return { estimatedFC, estimatedLux: Math.round(estimatedLux), lightCategory, suitability };
  };

  // Calculate Watering Metrics
  const calculateWatering = () => {
    let baseDays = 7;
    if (plantType === 'succulent') baseDays = 21;
    else if (plantType === 'aroid') baseDays = 9;
    else if (plantType === 'calathea') baseDays = 5;
    else if (plantType === 'tree') baseDays = 11;
    else if (plantType === 'herb') baseDays = 4;

    // Pot material impact (terracotta breathes and dries fast, plastic retains)
    if (potMaterial === 'terracotta') baseDays *= 0.75;
    if (potMaterial === 'plastic') baseDays *= 1.25;

    // Size impact (larger volume holds moisture longer)
    if (potSize >= 10) baseDays *= 1.25;
    if (potSize <= 4) baseDays *= 0.75;

    // Season impact
    if (season === 'winter') baseDays *= 1.5;
    if (season === 'summer') baseDays *= 0.85;

    const estimatedDays = Math.max(2, Math.round(baseDays));
    const fingerDepth =
      plantType === 'succulent'
        ? 'Allow 100% of soil to dry completely'
        : plantType === 'aroid' || plantType === 'tree'
        ? 'Top 2–3 inches (5–7 cm) dry'
        : 'Top 1 inch (2.5 cm) dry to touch';

    return { estimatedDays, fingerDepth };
  };

  // Soil Recipes Data
  const SOIL_RECIPES = {
    aroid: {
      name: 'Chunky Aroid & Monstera Super-Mix',
      description: 'Maximizes root zone airflow while retaining moisture in organic bark crevices.',
      ingredients: [
        { name: 'Chunky Orchid Pine Bark', pct: 40, color: 'bg-amber-800' },
        { name: 'Coarse Horticultural Perlite / Pumice', pct: 30, color: 'bg-stone-300 text-stone-950' },
        { name: 'Coco Coir / Peat Fiber', pct: 20, color: 'bg-amber-950' },
        { name: 'Worm Castings (Organic Nutrients)', pct: 10, color: 'bg-stone-800' },
      ],
      ph: '5.8 – 6.5 (Slightly Acidic)',
    },
    succulent: {
      name: 'Gritty Desert Cactus & Succulent Mix',
      description: 'Rapidly drains excess water within 3 seconds to completely prevent root rot.',
      ingredients: [
        { name: 'Crushed Pumice / Coarse Grit', pct: 45, color: 'bg-stone-400 text-stone-950' },
        { name: 'Perlite', pct: 25, color: 'bg-stone-200 text-stone-950' },
        { name: 'Coarse Sharp Sand / Granite', pct: 15, color: 'bg-amber-700' },
        { name: 'Succulent Coco Peat', pct: 15, color: 'bg-stone-800' },
      ],
      ph: '6.0 – 7.0 (Neutral)',
    },
    calathea: {
      name: 'Spongy Tropical Prayer Plant & Fern Blend',
      description: 'Holds delicate moisture without compacting or starving fine fibrous root hairs.',
      ingredients: [
        { name: 'Coco Coir Fiber', pct: 40, color: 'bg-amber-950' },
        { name: 'Horticultural Perlite', pct: 30, color: 'bg-stone-300 text-stone-950' },
        { name: 'Vermiculite (Moisture Sponge)', pct: 20, color: 'bg-yellow-700' },
        { name: 'Worm Castings', pct: 10, color: 'bg-stone-800' },
      ],
      ph: '6.2 – 6.8',
    },
    orchid: {
      name: 'Epiphytic Aerial Root Orchid Medium',
      description: 'Mimics the bark canopy of tropical rainforests for epiphytic root breathing.',
      ingredients: [
        { name: 'Large New Zealand Pine Bark', pct: 60, color: 'bg-amber-900' },
        { name: 'Sphagnum Moss (Long-fiber)', pct: 25, color: 'bg-lime-800' },
        { name: 'Horticultural Charcoal Chunks', pct: 15, color: 'bg-stone-900' },
      ],
      ph: '5.5 – 6.2',
    },
    palm: {
      name: 'Aerated Tropical Palm & Ficus Blend',
      description: 'Stable structural footing with high aeration and steady nutrient release.',
      ingredients: [
        { name: 'Quality Indoor Potting Peat', pct: 50, color: 'bg-stone-800' },
        { name: 'Coarse Perlite / Pumice', pct: 30, color: 'bg-stone-300 text-stone-950' },
        { name: 'Orchid Bark Fines', pct: 10, color: 'bg-amber-900' },
        { name: 'Composted Leaf Mold & Worm Castings', pct: 10, color: 'bg-amber-950' },
      ],
      ph: '6.0 – 6.8',
    },
  };

  const lightResult = calculateLight();
  const wateringResult = calculateWatering();
  const currentSoilRecipe = SOIL_RECIPES[selectedSoilFamily];

  return (
    <section id="calculators" className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Botanical Environment Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white">
            Care & Environment Calculators
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Calibrate exact indoor light exposure in Lux, calculate custom watering intervals by pot material, and mix ideal potting substrates.
          </p>
        </div>

        {/* Calculator Tab Switcher */}
        <div className="flex justify-center">
          <div className="flex p-1.5 rounded-2xl bg-stone-950 border border-stone-800 gap-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('light')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'light'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light & Window Exposure</span>
            </button>

            <button
              onClick={() => setActiveTab('watering')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'watering'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Watering Interval</span>
            </button>

            <button
              onClick={() => setActiveTab('soil')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'soil'
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Soil Mix Recipes</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Light Meter & Window Placement */}
        {activeTab === 'light' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto animate-fade-in">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-stone-950/80 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                Window Parameters
              </h3>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                  Window Orientation / Exposure
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'south', label: 'South (Highest Sun)' },
                    { id: 'east', label: 'East (Gentle AM Sun)' },
                    { id: 'west', label: 'West (Warm PM Sun)' },
                    { id: 'north', label: 'North (Soft Ambient)' },
                    { id: 'skylight', label: 'Overhead Skylight' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWindowDirection(w.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        windowDirection === w.id
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-bold uppercase tracking-wider text-stone-300">
                    Distance from Window Pane
                  </label>
                  <span className="font-mono text-emerald-400 font-bold">{windowDistance} Feet</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={windowDistance}
                  onChange={(e) => setWindowDistance(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>1 ft (Window Sill)</span>
                  <span>6 ft (Mid-Room)</span>
                  <span>12 ft (Deep Room)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                  Window Filtration / Curtains
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Clear Glass' },
                    { id: 'sheer', label: 'Sheer Curtains' },
                    { id: 'blinds', label: 'Slatted Blinds' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCurtainType(c.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                        curtainType === c.id
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 bg-stone-950 p-6 sm:p-8 rounded-3xl border border-emerald-800/60 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Calculated Light Yield
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                    {lightResult.lightCategory}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                      Light Intensity (FC)
                    </span>
                    <p className="text-2xl font-bold font-mono text-amber-400">
                      {lightResult.estimatedFC.toLocaleString()} <span className="text-xs text-stone-400 font-sans">FC</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                      Lux Metric (Lumen/m²)
                    </span>
                    <p className="text-2xl font-bold font-mono text-emerald-400">
                      {lightResult.estimatedLux.toLocaleString()} <span className="text-xs text-stone-400 font-sans">Lux</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Ideal Plants for this Light Level:
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed font-medium">
                    {lightResult.suitability}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-emerald-400">Botanist Rule: </span>
                Light intensity drops by roughly 50% for every 2 feet you step away from the window pane.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Watering Schedule Estimator */}
        {activeTab === 'watering' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto animate-fade-in">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-stone-950/80 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-400" />
                Plant & Container Variables
              </h3>

              {/* Plant Family */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                  Plant Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'aroid', label: 'Aroid / Tropical' },
                    { id: 'succulent', label: 'Cactus / Succulent' },
                    { id: 'calathea', label: 'Calathea / Fern' },
                    { id: 'tree', label: 'Ficus / Indoor Tree' },
                    { id: 'herb', label: 'Herb / Soft Foliage' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlantType(p.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                        plantType === p.id
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pot Material */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                  Pot Material
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'terracotta', label: 'Terracotta (Porous)' },
                    { id: 'ceramic', label: 'Glazed Ceramic' },
                    { id: 'plastic', label: 'Plastic / Nursery' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPotMaterial(m.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                        potMaterial === m.id
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pot Size & Season */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                    Pot Diameter: {potSize}"
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="2"
                    value={potSize}
                    onChange={(e) => setPotSize(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-stone-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>4" (Small)</span>
                    <span>14" (Large)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                    Current Season
                  </label>
                  <select
                    value={season}
                    onChange={(e: any) => setSeason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="summer">☀️ Summer (High Heat)</option>
                    <option value="spring">🌱 Spring (Active Growth)</option>
                    <option value="fall">🍂 Fall (Cooling)</option>
                    <option value="winter">❄️ Winter (Dormant)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 bg-stone-950 p-6 sm:p-8 rounded-3xl border border-sky-800/60 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Calculated Hydration Rhythm
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-950 border border-sky-500/50 text-sky-300 text-xs font-bold">
                    Custom Schedule
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Water Roughly Every
                  </span>
                  <p className="text-4xl sm:text-5xl font-bold font-serif-display text-sky-400">
                    {wateringResult.estimatedDays} <span className="text-lg font-sans text-stone-300">Days</span>
                  </p>
                  <p className="text-xs text-stone-400">
                    (Varies slightly based on real-time household humidity)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Golden Finger Test Rule:
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed font-semibold">
                    {wateringResult.fingerDepth} before hydrating.
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-sky-400">Hydration Tip: </span>
                Always discard water collected in the bottom drainage tray after 20 minutes to prevent oxygen deprivation in the root zone.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Soil Substrate Custom Mixer */}
        {activeTab === 'soil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto animate-fade-in">
            {/* Family Selector */}
            <div className="lg:col-span-5 bg-stone-950/80 p-6 rounded-3xl border border-stone-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Select Houseplant Family
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'aroid', title: 'Aroids & Monsteras', sub: 'Swiss Cheese, Pothos, Philodendron' },
                  { id: 'succulent', title: 'Cacti & Succulents', sub: 'Snake Plant, Jade, Echeveria, Aloe' },
                  { id: 'calathea', title: 'Calatheas & Ferns', sub: 'Prayer Plants, Boston Fern, Maranta' },
                  { id: 'orchid', title: 'Epiphytic Orchids', sub: 'Phalaenopsis, Dendrobium, Vanda' },
                  { id: 'palm', title: 'Palms & Ficus Trees', sub: 'Areca Palm, Fiddle Leaf Fig, Rubber Tree' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSoilFamily(item.id as any)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                      selectedSoilFamily === item.id
                        ? 'bg-emerald-950 border-emerald-400 ring-1 ring-emerald-500 shadow-md'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{item.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Blueprint Output */}
            <div className="lg:col-span-7 bg-stone-950 p-6 sm:p-8 rounded-3xl border border-emerald-800/60 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div>
                    <h4 className="text-lg font-bold font-serif-display text-white">{currentSoilRecipe.name}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">{currentSoilRecipe.description}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-xs font-mono text-emerald-400 shrink-0">
                    pH {currentSoilRecipe.ph}
                  </span>
                </div>

                {/* Visual Proportion Bar */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Ratio Visualization Bar
                  </span>
                  <div className="h-6 w-full rounded-xl overflow-hidden flex border border-stone-800">
                    {currentSoilRecipe.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        className={`${ing.color} h-full flex items-center justify-center text-[10px] font-bold`}
                        style={{ width: `${ing.pct}%` }}
                        title={`${ing.name}: ${ing.pct}%`}
                      >
                        {ing.pct >= 15 ? `${ing.pct}%` : ''}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredients Ingredient List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Mixing Recipe Breakdown (By Parts):
                  </span>
                  <div className="space-y-2">
                    {currentSoilRecipe.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-3 h-3 rounded-md ${ing.color} shrink-0`}></span>
                          <span className="font-semibold text-stone-200">{ing.name}</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400">{ing.pct}% of Mix</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 bg-stone-900/50 p-3 rounded-xl border border-stone-800">
                <span className="font-bold text-emerald-400">Potting Pro Tip: </span>
                Always pre-moisten chunky substrate ingredients with warm water before repotting to prevent fine roots from dehydrating during transplantation.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
