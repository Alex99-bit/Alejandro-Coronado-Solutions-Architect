import { DashboardData } from '../types/dashboard.types';

export const dashboardData: DashboardData = {
  skillCategories: [
    {
      name: 'Backend & Systems',
      skills: [
        { name: 'C# (.NET)', level: 95, years: 5, isCore: true },
        { name: 'Java', level: 80, years: 3, isCore: true },
        { name: 'Node.js', level: 90, years: 4, isCore: true },
        { name: 'Python', level: 70, years: 2, isCore: false },
      ],
      expertiseLevel: 90,
      yearsOfExperience: 5,
    },
    {
      name: 'Frontend & Frameworks',
      skills: [
        { name: 'React', level: 85, years: 3, isCore: true },
        { name: 'Vue', level: 75, years: 2, isCore: false },
        { name: 'TypeScript', level: 90, years: 4, isCore: true },
        { name: 'Tailwind CSS', level: 88, years: 3, isCore: true },
      ],
      expertiseLevel: 85,
      yearsOfExperience: 4,
    },
    {
      name: 'AI & Data Engineering',
      skills: [
        { name: 'LLM Orchestration', level: 85, years: 2, isCore: true },
        { name: 'AI Agents', level: 80, years: 2, isCore: true },
        { name: 'SQL/NoSQL', level: 78, years: 3, isCore: false },
      ],
      expertiseLevel: 80,
      yearsOfExperience: 2,
    },
    {
      name: 'Immersive & 3D',
      skills: [
        { name: 'Unity', level: 90, years: 4, isCore: true },
        { name: 'Unreal Engine', level: 75, years: 2, isCore: true },
        { name: 'Blender', level: 70, years: 3, isCore: true },
        { name: 'XR Development', level: 88, years: 4, isCore: true },
        { name: 'C++', level: 72, years: 2, isCore: false },
      ],
      expertiseLevel: 95,
      yearsOfExperience: 4,
    },
    {
      name: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', level: 80, years: 2, isCore: true },
        { name: 'Vercel', level: 85, years: 3, isCore: true },
        { name: 'CI/CD', level: 75, years: 2, isCore: false },
      ],
      expertiseLevel: 75,
      yearsOfExperience: 3,
    },
  ],
  techStack: [
    { technology: 'Unity', level: 90, years: 4, category: 'Immersive' },
    { technology: 'C#', level: 95, years: 5, category: 'Backend' },
    { technology: 'TypeScript', level: 90, years: 4, category: 'Frontend' },
    { technology: 'React', level: 85, years: 3, category: 'Frontend' },
    { technology: 'Node.js', level: 90, years: 4, category: 'Backend' },
    { technology: 'Unreal Engine', level: 75, years: 2, category: 'Immersive' },
    { technology: 'Blender', level: 70, years: 3, category: 'Immersive' },
    { technology: 'Docker', level: 80, years: 2, category: 'DevOps' },
  ],
  expertiseDistribution: [
    { area: 'Immersive & XR', years: 4, percentage: 30, color: '#6366f1' },
    { area: 'Backend Development', years: 5, percentage: 35, color: '#8b5cf6' },
    { area: 'AI Engineering', years: 2, percentage: 15, color: '#a78bfa' },
    { area: 'Frontend Development', years: 4, percentage: 25, color: '#c4b5fd' },
    { area: 'DevOps & Cloud', years: 3, percentage: 20, color: '#ddd6fe' },
  ],
  languages: [
    { language: 'TypeScript', commits: 185, percentage: 35, color: '#3178c6' },
    { language: 'C#', commits: 132, percentage: 25, color: '#68217a' },
    { language: 'JavaScript', commits: 79, percentage: 15, color: '#f7df1e' },
    { language: 'C++', commits: 53, percentage: 10, color: '#00599c' },
    { language: 'Python', commits: 42, percentage: 8, color: '#3776ab' },
    { language: 'Java', commits: 37, percentage: 7, color: '#ed8b00' },
  ],
  lastUpdated: '2026-07-08',
};

export const getDashboardData = (): DashboardData => dashboardData;