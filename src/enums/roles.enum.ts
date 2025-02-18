export const roles = [
  'AI Engineer',
  'Backend Engineer',
  'Frontend Engineer',
  'Fullstack Engineer',
  'Product Manager',
  'QA Engineer',
  'UX/UI Designer',
] as const;
export type Role = (typeof roles)[number];
