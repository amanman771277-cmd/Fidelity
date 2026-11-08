export type SectorId = 'all' | 'architects' | 'branding' | 'furniture';

export interface Project {
  id: string;
  title: string;
  titleAm?: string;
  sector: 'architects' | 'branding' | 'furniture';
  description: string;
  descriptionAm?: string;
  imageUrl: string;
  featured?: boolean;
  client?: string;
  clientAm?: string;
  location?: string;
  locationAm?: string;
  year?: string;
  createdAt: number;
}

export interface FirebaseConfigState {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface SectorInfo {
  id: 'architects' | 'branding' | 'furniture';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
}
