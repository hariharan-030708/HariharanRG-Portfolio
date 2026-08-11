export interface Skill {
  name: string;
  category: 'languages' | 'concepts' | 'tools' | 'mathematics' | 'softskills';
  iconName: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  timeline: string;
  details: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}
