export type PageTab = 
  | 'home'
  | 'about'
  | 'services'
  | 'fleet'
  | 'clients'
  | 'careers'
  | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  capabilities: string[];
  specs: { label: string; value: string }[];
  accentColor?: string;
}

export interface ValueItem {
  number: string;
  title: string;
  desc: string;
  topBorderColor: string;
}

export interface ClientItem {
  name: string;
  category: string;
  industry: string;
  description: string;
}

export interface BranchLocation {
  city: string;
  state: string;
  type: 'Head Office' | 'Corporate Office' | 'Port Hub' | 'Regional Hub' | 'Branch Office';
  address: string;
  phone: string;
  email: string;
  region?: string;
}

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface ScrollStage {
  id: string;
  stageNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  operationalDetail: string;
  activeModules: string[];
  specs: string[];
}
