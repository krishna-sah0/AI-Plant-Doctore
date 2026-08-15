export enum PlantDoctorSectionId {
  Scanner = 'scanner',
  Sickbay = 'sickbay',
  Encyclopedia = 'encyclopedia',
  Calculators = 'calculators',
  AiChat = 'ai-chat',
  Faqs = 'faqs',
}

export interface NavLink {
  name: string;
  href: string;
  badge?: string;
  iconName?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export interface PlantDiagnosisResult {
  id?: string;
  plantName: string;
  scientificName: string;
  family?: string;
  imageUrl?: string;
  confidence: string;
  healthStatus: 'Healthy' | 'Mild Stress' | 'Needs Attention' | 'Critical Issue';
  primaryIssue: string;
  symptoms: string[];
  causes: string[];
  treatmentPlan: {
    phase: string;
    action: string;
    timing: string;
  }[];
  careInstructions: {
    watering: string;
    sunlight: string;
    humidity: string;
    temperature: string;
    fertilizer: string;
    soilType: string;
  };
  toxicity: {
    isPetSafe: boolean;
    details: string;
  };
  preventiveTips: string[];
  notes?: string;
  timestamp?: string;
}

export interface SickbayPlant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  diagnosisIssue: string;
  healthStatus: 'Needs Attention' | 'Critical Issue' | 'Recovering' | 'Healthy';
  recoveryProgress: number; // 0 - 100
  treatmentStartedDate: string;
  nextCareAction: string;
  nextCareDate: string;
  lastWateredDate?: string;
  careLog: {
    id: string;
    date: string;
    note: string;
    actionType: 'water' | 'fertilize' | 'prune' | 'spray' | 'check';
  }[];
}

export interface PlantDiseaseItem {
  id: string;
  name: string;
  type: 'Pest' | 'Fungal' | 'Bacterial' | 'Environmental' | 'Nutrient';
  severity: 'Low' | 'Moderate' | 'High';
  commonVictims: string[];
  visualSymptoms: string[];
  primaryCauses?: string[];
  causes?: string[];
  organicTreatment: string;
  chemicalTreatment?: string;
  prevention: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  sender?: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
