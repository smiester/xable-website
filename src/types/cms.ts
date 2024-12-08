export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'services' | 'approach' | 'team' | 'contact';
  isPublished: boolean;
  lastModified: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  qualifications: string[];
  order: number;
}

export interface Images {
  [key: string]: string;
}

export interface CMSStore {
  sections: ContentSection[];
  services: ServiceItem[];
  teamMembers: TeamMember[];
  images: Images;
  updateSection: (id: string, content: Partial<ContentSection>) => void;
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  updateImage: (section: string, url: string) => void;
}