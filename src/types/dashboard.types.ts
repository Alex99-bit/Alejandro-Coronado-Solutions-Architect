export interface Skill {
  name: string;
  level: number;
  years: number;
  isCore: boolean;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  expertiseLevel: number;
  yearsOfExperience: number;
}

export interface TechSkill {
  technology: string;
  level: number;
  years: number;
  category: string;
}

export interface ExpertiseDistribution {
  area: string;
  years: number;
  percentage: number;
  color: string;
}

export interface LanguageUsage {
  language: string;
  commits: number;
  percentage: number;
  color: string;
}

export interface DashboardData {
  skillCategories: SkillCategory[];
  techStack: TechSkill[];
  expertiseDistribution: ExpertiseDistribution[];
  languages: LanguageUsage[];
  lastUpdated: string;
}