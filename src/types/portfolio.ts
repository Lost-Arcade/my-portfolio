export type Chapter = {
  number: string;
  label: string;
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  contributions: string[];
  technologies: string[];
};

export type Project = {
  number: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  stack: string[];
  problem: string;
  idea: string;
  architecture: string;
  built: string[];
  features: string[];
  result: string;
  github?: string;
  liveDemo?: string;
};

export type SkillDomain = {
  label: string;
  items: string[];
};

export type Achievement = {
  value: string;
  label: string;
  note?: string;
};
