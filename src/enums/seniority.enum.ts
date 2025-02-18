export const seniorities = [
  'Intern',
  'Junior',
  'Mid-Level',
  'Senior',
  'Expert',
] as const;
export type Seniority = (typeof seniorities)[number];
