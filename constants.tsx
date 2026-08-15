import {
  NavLink,
  PlantDiagnosisResult,
  SickbayPlant,
  PlantDiseaseItem,
} from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'AI Scanner', href: '#scanner', badge: 'Vision AI' },
  { name: 'My Sickbay', href: '#sickbay', badge: 'Tracker' },
  { name: 'Disease Encyclopedia', href: '#encyclopedia' },
  { name: 'Care Calculators', href: '#calculators' },
  { name: 'Ask Botanist AI', href: '#ai-chat', badge: 'Live Q&A' },
  { name: 'Botanical FAQs', href: '#faqs' },
];

export const PLANT_SAMPLE_PRESETS: PlantDiagnosisResult[] = [
  {
    id: 'preset-monstera',
    plantName: 'Swiss Cheese Plant',
    scientificName: 'Monstera Deliciosa (Arecaceae / Araceae)',
    family: 'Araceae',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
    confidence: '98.6%',
    healthStatus: 'Needs Attention',
    primaryIssue: 'Root Moisture Saturation & Early Chlorosis',
    symptoms: [
      'Lower leaves showing pale yellow discoloration (chlorosis)',
      'Slight loss of turgidity in lower petioles',
      'Dense potting medium holding moisture beyond 9 days',
      'Absence of fenestrations on newest unfurling leaf',
    ],
    causes: [
      'Inadequate potting drainage causing rhizosphere oxygen depletion',
      'Overly dense peat-based substrate with low aeration',
      'Seasonal drop in sunlight reducing vegetative transpiration rate',
    ],
    treatmentPlan: [
      {
        phase: 'Phase 1: Immediate Aeration',
        action: 'Withhold all watering for 7–10 days until top 50% of rootball is completely dry. Aerate soil with a wooden skewer.',
        timing: 'Day 1–3',
      },
      {
        phase: 'Phase 2: Sanitation & Relocation',
        action: 'Prune completely yellow leaves with sterilized pruning shears at the petiole base to redirect photosynthetic energy. Move 2ft closer to an east-facing window.',
        timing: 'Day 4–7',
      },
      {
        phase: 'Phase 3: Substrate Upgrade',
        action: 'If drainage does not improve, repot into an aroid chunky mix containing 40% chunky pine bark, 30% perlite, and 30% coco coir.',
        timing: 'Week 2',
      },
      {
        phase: 'Phase 4: Balanced Maintenance',
        action: 'Resume hydration only when moisture meter reads 2/10. Apply diluted 3-1-2 nitrogen liquid fertilizer monthly.',
        timing: 'Ongoing',
      },
    ],
    careInstructions: {
      watering: 'Water thoroughly only when top 2–3 inches (5–7 cm) of soil are dry. Ensure saucer runoff is discarded after 15 minutes.',
      sunlight: 'Bright indirect natural daylight (1,500 – 2,500 Foot-Candles / 15,000 – 25,000 Lux). Protect from direct mid-day UV scorching.',
      humidity: 'Optimal at 60% – 75% RH. Tolerate 45% minimum.',
      temperature: '65°F – 85°F (18°C – 29°C). Keep protected from cold AC vents under 60°F.',
      fertilizer: 'Balanced 20-20-20 or 3-1-2 aroid liquid formulation at half strength during active growth (Spring/Summer).',
      soilType: 'Chunky, airy Aroid mix: 40% Orchid bark, 30% Perlite, 20% Peat/Coir, 10% Worm castings.',
    },
    toxicity: {
      isPetSafe: false,
      details: 'Contains insoluble calcium oxalate crystals. Mildly toxic to cats and dogs if chewed; keep out of reach.',
    },
    preventiveTips: [
      'Wipe foliage monthly with a damp microfiber cloth to remove dust and optimize photosynthetic gas exchange.',
      'Provide a moss pole or coir totem to stimulate aerial root attachment and encourage larger fenestrated leaves.',
    ],
  },
  {
    id: 'preset-fiddle',
    plantName: 'Fiddle Leaf Fig',
    scientificName: 'Ficus Lyrata',
    family: 'Moraceae',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?w=800&auto=format&fit=crop&q=80',
    confidence: '97.2%',
    healthStatus: 'Needs Attention',
    primaryIssue: 'Low Ambient Humidity & Inconsistent Moisture Stress',
    symptoms: [
      'Crispy brown necrotic margins on mature leaf perimeters',
      'Inward curling and brittle edges',
      'Minor edema reddish freckles on newest juvenile leaves',
    ],
    causes: [
      'Air conditioning drafts and low indoor relative humidity (<35%)',
      'Irregular hydration swings (extreme drought followed by heavy drenching)',
      'Tap water with high fluoride or mineral salt accumulation',
    ],
    treatmentPlan: [
      {
        phase: 'Phase 1: Hydration Equilibrium',
        action: 'Perform a deep, slow bottom-watering soak for 25 minutes until the soil column is evenly hydrated, then let drain completely.',
        timing: 'Day 1',
      },
      {
        phase: 'Phase 2: Microclimate Calibration',
        action: 'Install a cool-mist humidifier 3 feet away or place on a wide gravel pebble tray filled with water to elevate local RH to 55%+.',
        timing: 'Day 2–5',
      },
      {
        phase: 'Phase 3: Leaf Grooming',
        action: 'Trim purely dead, crispy brown tips following the natural leaf contour, leaving a tiny margin of brown to prevent new tissue wounding.',
        timing: 'Week 2',
      },
      {
        phase: 'Phase 4: Consistent Care Cadence',
        action: 'Establish a rigid weekly soil moisture check using a 6-inch wooden chopstick. Hydrate when top 2 inches dry out.',
        timing: 'Ongoing',
      },
    ],
    careInstructions: {
      watering: 'Deep drenching when top 2 inches feel dry. Never allow roots to sit permanently in standing water.',
      sunlight: 'High indirect light with 2–3 hours of gentle morning direct sunlight. Rotate pot 90° every 2 weeks.',
      humidity: '55% – 70% RH required. Sensitive to dry winter furnace drafts.',
      temperature: '65°F – 80°F (18°C – 27°C). Avoid sudden thermal drops below 55°F (13°C).',
      fertilizer: 'High-nitrogen 3-1-2 houseplant feed every 3–4 weeks throughout active spring/summer growth.',
      soilType: 'Well-draining potting soil enriched with 25% pumice/perlite and 15% horticultural charcoal.',
    },
    toxicity: {
      isPetSafe: false,
      details: 'Contains irritating white latex sap and calcium oxalate crystals. Toxic to dogs and cats.',
    },
    preventiveTips: [
      'Never rotate location abruptly; Ficus Lyrata easily drops leaves in response to sudden lighting environment changes.',
      'Use filtered or distilled water if municipal tap water is heavily chlorinated or hard.',
    ],
  },
  {
    id: 'preset-snake',
    plantName: 'Snake Plant / Mother-in-Law’s Tongue',
    scientificName: 'Sansevieria Trifasciata (Dracaena Trifasciata)',
    family: 'Asparagaceae',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=80',
    confidence: '99.1%',
    healthStatus: 'Critical Issue',
    primaryIssue: 'Rhizome & Root Rot (Pythium / Phytophthora Infection)',
    symptoms: [
      'Translucent, mushy, water-soaked foliage near the soil base',
      'Leaves leaning or collapsing from soft basal stems',
      'Musty decaying odor from the root zone',
    ],
    causes: [
      'Frequent watering schedule during winter dormancy or low-light conditions',
      'Pot without drainage holes or standing drainage saucer water',
      'Dense organic clay/peat mix trapping stagnant water around rhizomes',
    ],
    treatmentPlan: [
      {
        phase: 'Phase 1: Emergency Surgical Extraction',
        action: 'Unpot the plant immediately. Wash away wet soil and use flame-sterilized shears to excise all black, slimy, or hollow roots.',
        timing: 'Immediate (Hour 1)',
      },
      {
        phase: 'Phase 2: Antifungal Disinfection',
        action: 'Submerge remaining healthy rhizomes in a 3% hydrogen peroxide solution (1 part H2O2 : 4 parts water) for 10 minutes. Dust cuts with sulfur or cinnamon.',
        timing: 'Day 1',
      },
      {
        phase: 'Phase 3: Dry Air Callusing',
        action: 'Allow the plant to air-dry on newspaper in a shaded, warm room for 48 hours to callus open wounds before repotting.',
        timing: 'Day 2–3',
      },
      {
        phase: 'Phase 4: Repotting in Desert Medium',
        action: 'Pot into an unglazed terracotta pot with 60% gritty pumice/perlite and 40% succulent soil. Do NOT water for 14 days.',
        timing: 'Day 4–18',
      },
    ],
    careInstructions: {
      watering: 'Extremely drought tolerant. Water only every 3–6 weeks after soil is 100% dry from top to bottom.',
      sunlight: 'Versatile: from low ambient light to bright filtered sun. Growth is fastest in bright indirect light.',
      humidity: 'Low to moderate (30% – 50%). Highly resilient to dry household air.',
      temperature: '60°F – 85°F (15°C – 29°C). Highly intolerant to frost or freezing temperatures.',
      fertilizer: 'Minimal feeding needed: diluted succulent fertilizer once in spring and once in mid-summer.',
      soilType: 'Ultra-fast draining cactus/succulent substrate: 50% pumice/coarse grit, 30% coco peat, 20% perlite.',
    },
    toxicity: {
      isPetSafe: false,
      details: 'Contains saponins which cause gastrointestinal upset and nausea in pets.',
    },
    preventiveTips: [
      'Always use an unglazed terracotta clay pot which allows moisture to evaporate through pot walls.',
      'Remember the golden rule: when in doubt with Sansevieria, wait another week before watering.',
    ],
  },
  {
    id: 'preset-calathea',
    plantName: 'Pinstripe Calathea / Prayer Plant',
    scientificName: 'Calathea Ornata (Goeppertia Ornata)',
    family: 'Marantaceae',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80',
    confidence: '96.8%',
    healthStatus: 'Needs Attention',
    primaryIssue: 'Tap Water Mineral Toxicity & Humidity Scorch',
    symptoms: [
      'Crispy dry edges on pink pinstripe leaves',
      'Leaves failing to fold upwards at night (prayer movement sluggish)',
      'Subtle webbing underneath leaf axils (early spider mite sign)',
    ],
    causes: [
      'Municipal water containing chloramine, fluoride, and dissolved hard mineral salts',
      'Indoor humidity falling below the critical 50% threshold',
      'Spider mite colonization thriving in hot, dry micro-environments',
    ],
    treatmentPlan: [
      {
        phase: 'Phase 1: Water Source Switch',
        action: 'Immediately switch to distilled, rainwater, or reverse-osmosis water. Flush the pot thoroughly to leach accumulated mineral salts.',
        timing: 'Day 1',
      },
      {
        phase: 'Phase 2: Foliar Insecticide Wash',
        action: 'Wipe all undersides of leaves with a 1% cold-pressed neem oil and mild castile soap solution to eliminate emerging spider mites.',
        timing: 'Day 2 & Day 7',
      },
      {
        phase: 'Phase 3: Humidity Sanctuary',
        action: 'Cluster with other tropical plants or place beside an ultrasonic cool-mist humidifier maintaining 60%–70% RH.',
        timing: 'Ongoing',
      },
      {
        phase: 'Phase 4: Light Softening',
        action: 'Position in soft, dappled light; avoid any direct ray that can bleach the intricate pink pinstripes.',
        timing: 'Ongoing',
      },
    ],
    careInstructions: {
      watering: 'Keep substrate consistently moist like a wrung-out sponge, but never waterlogged or sitting in stagnant runoff.',
      sunlight: 'Medium to bright indirect light; strictly no direct sun.',
      humidity: 'High (60% – 80% RH). Very sensitive to dry air.',
      temperature: '65°F – 78°F (18°C – 26°C). Avoid drafts.',
      fertilizer: 'Very gentle half-strength organic fish hydrolysate or seaweed extract once every 4 weeks in summer.',
      soilType: 'Spongy, moisture-retentive yet aerated mix: 40% peat/coco coir, 30% perlite, 20% vermiculite, 10% worm castings.',
    },
    toxicity: {
      isPetSafe: true,
      details: '100% Non-Toxic and completely safe for cats, dogs, and curious household pets.',
    },
    preventiveTips: [
      'Calatheas are famous divas: never let the soil dry out completely to bone-dry, and never use cold tap water.',
    ],
  },
  {
    id: 'preset-peacelily',
    plantName: 'Peace Lily',
    scientificName: 'Spathiphyllum Wallisii',
    family: 'Araceae',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=800&auto=format&fit=crop&q=80',
    confidence: '98.9%',
    healthStatus: 'Mild Stress',
    primaryIssue: 'Acute Dehydration Wilt (Temporary Turgor Loss)',
    symptoms: [
      'Dramatic drooping and floppy leaves touching the pot rim',
      'Foliage feels soft and limp, without yellowing or leaf drop',
      'Dry, lightweight pot with soil pulling away from the container rim',
    ],
    causes: [
      'Potting medium completely exhausted of available moisture',
      'High ambient transpiration on warm afternoon',
      'Root-bound condition with dense root mass absorbing water rapidly',
    ],
    treatmentPlan: [
      {
        phase: 'Phase 1: Bottom-Watering Hydration Bath',
        action: 'Submerge the bottom 1/3 of the pot in a basin of lukewarm water for 30 minutes until moisture wicks to the surface.',
        timing: 'Immediate (Hour 1)',
      },
      {
        phase: 'Phase 2: Recovery Observation',
        action: 'Drain excess water completely. Foliage will restore full hydraulic turgor within 2 to 4 hours.',
        timing: 'Hour 2–6',
      },
      {
        phase: 'Phase 3: Root-Bound Check',
        action: 'Gently slide plant from pot to inspect root density. If roots form a solid spiral cage, up-pot by 2 inches with fresh moisture-retentive soil.',
        timing: 'Week 1',
      },
    ],
    careInstructions: {
      watering: 'Water when top 1 inch of soil is dry or just as leaves begin a very slight initial dip.',
      sunlight: 'Low to bright indirect light. Excellent low-light tolerance.',
      humidity: '50% – 65% RH. Appreciates regular light misting.',
      temperature: '65°F – 80°F (18°C – 27°C). Protect from cold winter drafts.',
      fertilizer: 'Diluted balanced houseplant fertilizer every 6 weeks during spring and summer.',
      soilType: 'Rich, moisture-retaining organic potting soil with 20% perlite and 10% worm castings.',
    },
    toxicity: {
      isPetSafe: false,
      details: 'Contains insoluble calcium oxalate crystals which irritate pet mouths and mucous membranes.',
    },
    preventiveTips: [
      'Peace Lilies are great communicators — they tell you exactly when they are thirsty before severe cellular damage occurs.',
    ],
  },
  {
    id: 'preset-pothos',
    plantName: 'Golden Pothos / Devil’s Ivy',
    scientificName: 'Epipremnum Aureum',
    family: 'Araceae',
    imageUrl: 'https://images.unsplash.com/photo-1596724855546-f6c6d2d46e33?w=800&auto=format&fit=crop&q=80',
    confidence: '99.4%',
    healthStatus: 'Healthy',
    primaryIssue: 'Optimal Vitality & Healthy Foliage (Maintenance Guide)',
    symptoms: [
      'Lush emerald and gold variegated leaves with high gloss',
      'Strong active vine growth with emerging node roots',
      'Healthy white root tips visible in soil inspection',
    ],
    causes: [
      'Ideal balance of indirect light, proper watering rhythm, and porous medium',
    ],
    treatmentPlan: [
      {
        phase: 'Routine Maintenance',
        action: 'Continue current watering and lighting cadence. Rotate vine trailing directions for balanced light exposure.',
        timing: 'Weekly',
      },
      {
        phase: 'Optional Propagation',
        action: 'Take 4-inch stem cuttings with at least 2 nodes and root in water to produce new full planter pots.',
        timing: 'Spring / Summer',
      },
    ],
    careInstructions: {
      watering: 'Water when top 50% of soil feels dry. Highly forgiving of occasional drought.',
      sunlight: 'Adapts to almost all indoor lighting from low office fluorescent to bright indirect window light.',
      humidity: '40% – 60% RH. Highly adaptable to standard home environments.',
      temperature: '60°F – 85°F (15°C – 29°C).',
      fertilizer: 'Standard balanced liquid feed monthly during active growth.',
      soilType: 'Standard all-purpose potting soil mixed with 20% perlite for healthy aeration.',
    },
    toxicity: {
      isPetSafe: false,
      details: 'Toxic to cats and dogs if ingested due to calcium oxalate crystals.',
    },
    preventiveTips: [
      'Prune long leggy vines occasionally to stimulate dense, bushy growth at the crown of the pot.',
    ],
  },
];

export const INITIAL_SICKBAY_PLANTS: SickbayPlant[] = [
  {
    id: 'sb-1',
    name: 'Living Room Monstera',
    scientificName: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    diagnosisIssue: 'Overwatering & Root Chlorosis',
    healthStatus: 'Recovering',
    recoveryProgress: 65,
    treatmentStartedDate: '2026-08-01',
    nextCareAction: 'Check soil moisture & aerate top 2 inches',
    nextCareDate: 'Tomorrow, 10:00 AM',
    lastWateredDate: '6 days ago',
    careLog: [
      {
        id: 'log-1',
        date: '2026-08-01',
        note: 'Diagnosed with AI Doctor. Yellow leaves pruned, aeration performed.',
        actionType: 'prune',
      },
      {
        id: 'log-2',
        date: '2026-08-08',
        note: 'Substrate dried out well. Bottom-watered with light seaweed solution.',
        actionType: 'water',
      },
      {
        id: 'log-3',
        date: '2026-08-14',
        note: 'New green leaf unfurling with healthy fenestration!',
        actionType: 'check',
      },
    ],
  },
  {
    id: 'sb-2',
    name: 'Balcony Fiddle Leaf Fig',
    scientificName: 'Ficus Lyrata',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?w=600&auto=format&fit=crop&q=80',
    diagnosisIssue: 'Low Humidity & Brown Tip Scorch',
    healthStatus: 'Needs Attention',
    recoveryProgress: 35,
    treatmentStartedDate: '2026-08-10',
    nextCareAction: 'Refill humidifier & mist surrounding foliage',
    nextCareDate: 'Today, 6:00 PM',
    lastWateredDate: '3 days ago',
    careLog: [
      {
        id: 'log-4',
        date: '2026-08-10',
        note: 'Initial scan. Moved away from AC draft. Installed pebble tray.',
        actionType: 'check',
      },
      {
        id: 'log-5',
        date: '2026-08-12',
        note: 'Cleaned leaves with distilled water cloth.',
        actionType: 'spray',
      },
    ],
  },
];

export const PLANT_DISEASES_ENCYCLOPEDIA: PlantDiseaseItem[] = [
  {
    id: 'dis-1',
    name: 'Spider Mites (Tetranychidae)',
    type: 'Pest',
    severity: 'High',
    commonVictims: ['Calathea', 'Fiddle Leaf Fig', 'Palms', 'Alocasia', 'English Ivy'],
    visualSymptoms: [
      'Fine silky webbing around leaf axils and petiole joints',
      'Tiny yellow or bronze stippling spots on the upper leaf blade',
      'Dull, faded foliage texture with microscopic moving dots on leaf undersides',
    ],
    primaryCauses: [
      'Hot, dry indoor air with relative humidity under 40%',
      'Poor air circulation and dusty leaf surfaces allowing colonies to multiply',
    ],
    organicTreatment:
      'Thoroughly shower the entire plant with lukewarm water to physically dislodge colonies. Spray top and bottom of all leaves with 1% cold-pressed organic Neem oil emulsified with castile soap every 4 days for 3 cycles.',
    chemicalTreatment:
      'Insecticidal soap or mite-specific miticide (Abamectin or Bifenthrin).',
    prevention:
      'Maintain humidity above 55% RH and wipe leaves clean every 2 weeks.',
    image: 'https://images.unsplash.com/photo-1585336261026-7bc2858b4f17?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-2',
    name: 'Mealybugs (Pseudococcidae)',
    type: 'Pest',
    severity: 'High',
    commonVictims: ['Pothos', 'Succulents', 'Jade Plant', 'Orchids', 'Dracaena'],
    visualSymptoms: [
      'Fluffy white cotton-like clusters in leaf joints and stems',
      'Sticky honeydew substance on leaves followed by black sooty mold',
      'Distorted, stunted new growth',
    ],
    primaryCauses: [
      'Introduced from newly acquired nursery plants',
      'High nitrogen fertilization creating tender tissue attractants',
    ],
    organicTreatment:
      'Dip a cotton swab in 70% Isopropyl alcohol and touch directly onto mealybugs to dissolve their waxy protective coating instantly. Follow with insecticidal soap foliar wash.',
    chemicalTreatment:
      'Systemic insecticide granules (Imidacloprid) applied to the soil.',
    prevention:
      'Quarantine new houseplants for 14 days before introducing them to your collection.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-3',
    name: 'Root Rot (Pythium / Phytophthora)',
    type: 'Fungal',
    severity: 'High',
    commonVictims: ['Snake Plant', 'ZZ Plant', 'Monstera', 'Peace Lily', 'Succulents'],
    visualSymptoms: [
      'Yellowing, wilted foliage that does not perk up after watering',
      'Black, mushy, foul-smelling roots that slough off when touched',
      'Soft water-soaked lower stem collar',
    ],
    causes: [
      'Chronic overwatering and low oxygen in waterlogged potting medium',
      'Pots lacking drainage holes or sitting in standing tray water',
    ],
    organicTreatment:
      'Unpot plant, rinse roots, excise all decayed brown/black root material with sterilized shears. Soak remaining roots in 3% hydrogen peroxide diluted 1:4 with water, then repot into sterile, well-aerated soil.',
    chemicalTreatment:
      'Copper-based fungicide or Biofungicide containing Bacillus subtilis.',
    prevention:
      'Use porous chunky potting soil with perlite/bark and always allow soil to dry to proper species threshold.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-4',
    name: 'Powdery Mildew (Erysiphales)',
    type: 'Fungal',
    severity: 'Moderate',
    commonVictims: ['Begonias', 'African Violets', 'Pilea', 'Roses', 'Zinnias'],
    visualSymptoms: [
      'White powdery talcum-like spots coating leaf surfaces and stems',
      'Leaves crinkling, curling, or drying prematurely',
      'Stunted flowering and yellowing patches under the white fungal film',
    ],
    causes: [
      'High relative humidity combined with poor stagnant air circulation',
      'Overcrowded plants with wet foliage during nighttime',
    ],
    organicTreatment:
      'Mix 1 tablespoon of baking soda, 1/2 teaspoon liquid soap, and 1 gallon of water. Spray thoroughly on affected foliage once weekly in morning light.',
    chemicalTreatment:
      'Sulfur-based or Potassium bicarbonate organic fungicide spray.',
    prevention:
      'Increase spacing between plants and use an oscillating room fan to promote gentle continuous air movement.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-5',
    name: 'Fungus Gnats (Bradysia spp.)',
    type: 'Pest',
    severity: 'Low',
    commonVictims: ['All potted houseplants with damp topsoil'],
    visualSymptoms: [
      'Small black mosquito-like flies hovering near the soil surface',
      'Larvae feeding on delicate root hairs causing subtle seedling decline',
    ],
    causes: [
      'Top 2 inches of soil perpetually moist providing breeding grounds for organic matter decay',
    ],
    organicTreatment:
      'Water with Mosquito Bits / BTI (Bacillus thuringiensis israelensis) tea to eliminate larvae in soil. Place yellow sticky traps at soil level to capture flying adults.',
    chemicalTreatment:
      'Hydrogen peroxide 1:4 soil drench to kill larvae on contact.',
    prevention:
      'Bottom-water plants and allow top 2 inches of soil to completely dry out between waterings.',
    image: 'https://images.unsplash.com/photo-1596724855546-f6c6d2d46e33?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-6',
    name: 'Nitrogen Deficiency (Chlorosis)',
    type: 'Nutrient',
    severity: 'Moderate',
    commonVictims: ['Monstera', 'Pothos', 'Philodendron', 'Ficus', 'Citrus'],
    visualSymptoms: [
      'General uniform yellowing of older, lower leaves while veins remain same color',
      'Slow, stunted growth and smaller new foliage',
      'Pale lime-green hue across entire plant',
    ],
    causes: [
      'Exhausted potting substrate lacking macro-nutrients',
      'Soil pH outside 5.8–6.8 preventing root nitrogen absorption',
    ],
    organicTreatment:
      'Apply liquid fish emulsion, seaweed extract, or top-dress with organic worm castings to replenish organic nitrogen.',
    chemicalTreatment:
      'Balanced water-soluble 20-20-20 or high-N 3-1-2 houseplant fertilizer at half strength.',
    prevention:
      'Establish a monthly fertilizer routine during active spring/summer growing months.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-7',
    name: 'Leaf Edema (Cellular Rupture)',
    type: 'Environmental',
    severity: 'Low',
    commonVictims: ['Peperomia', 'Fiddle Leaf Fig', 'Jade Plant', 'Schefflera'],
    visualSymptoms: [
      'Tiny water-soaked blisters or corky reddish-brown pimples on leaf undersides',
      'Brittle, thick leaf patches',
    ],
    causes: [
      'Roots taking up water faster than foliage can transpire it during cool, overcast, or high-humidity periods',
    ],
    organicTreatment:
      'Adjust watering cadence. Never water late in the evening when transpiration halts. Increase light and airflow.',
    prevention:
      'Ensure soil drains quickly and do not over-water during cloudy or cold winter weather.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'dis-8',
    name: 'Bacterial Leaf Spot (Xanthomonas)',
    type: 'Bacterial',
    severity: 'High',
    commonVictims: ['Anthurium', 'Philodendron', 'Syngonium', 'Dieffenbachia'],
    visualSymptoms: [
      'Water-soaked dark brown spots with prominent bright yellow halos around each lesion',
      'Rapidly spreading necrotic areas, especially on wet leaves',
    ],
    causes: [
      'Water splashing onto leaves spreading bacterial pathogens between wet foliage',
    ],
    organicTreatment:
      'Immediately isolate the plant. Prune all affected leaves with sanitized shears. Avoid overhead misting.',
    chemicalTreatment:
      'Liquid copper fungicide spray applied to healthy foliage to prevent further spread.',
    prevention:
      'Always water at the base of the soil without wetting the foliage.',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?w=600&auto=format&fit=crop&q=80',
  },
];

export const BOTANICAL_FAQS = [
  {
    q: 'How does the AI Plant Doctor diagnose diseases from a photo?',
    a: 'Our AI Botanical Vision Engine analyzes chromatic pigment distribution, leaf venation patterns, edge necrosis, lesion margins (such as fungal rings vs bacterial yellow halos), and stem turgor to cross-reference over 1,200 plant pathogens, physiological stressors, and nutrient deficiencies.',
  },
  {
    q: 'Why are my plant’s leaf tips turning brown and crispy?',
    a: 'Crispy brown tips are most commonly caused by low ambient humidity (<40%), tap water fluoride/chlorine sensitivity, or letting the soil dry out excessively between waterings. Use a humidifier, switch to filtered/rain water, and keep watering consistent.',
  },
  {
    q: 'How do I tell if my plant is overwatered or underwatered?',
    a: 'Overwatered leaves turn soft, limp, and pale yellow with soggy dark soil. Underwatered leaves feel dry, crispy, and brittle, and the entire plant droops uniformly while the pot feels very lightweight.',
  },
  {
    q: 'What is the "Golden Finger Test" for soil moisture?',
    a: 'Insert your index finger 2 inches (5 cm) into the soil. If it feels cool and damp with soil clinging to your skin, wait. If it feels completely dry and warm like dust, it is time to thoroughly water your plant.',
  },
  {
    q: 'Can I save a plant with root rot?',
    a: 'Yes, if at least 20–30% of healthy white or tan roots remain. Unpot the plant, cut away all black mushy roots, disinfect with diluted hydrogen peroxide (1:4), and repot into fresh dry well-aerated chunky soil without watering for 10–14 days.',
  },
  {
    q: 'Which houseplants are completely non-toxic to cats and dogs?',
    a: 'Pet-safe houseplants include Calathea / Prayer Plants, Boston Ferns, Spider Plants (Chlorophytum), Peperomias, Hoyas, Money Tree (Pachira Aquatica), and Phalaenopsis Orchids.',
  },
];

export const PLANT_DOCTOR_FAQS = BOTANICAL_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.a,
}));

export const QUICK_AI_PROMPTS = [
  'How do I get rid of persistent fungus gnats?',
  'Why are my Monstera leaves not producing fenestration slits?',
  'How to safely propagate Pothos in water?',
  'What is the ideal soil mix for Aroids and Philodendrons?',
  'How do I calibrate grow lights for winter indoor plants?',
  'Why are my Calathea leaves curling into tubes?',
];
