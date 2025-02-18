export const roles = [
  'Frontend Engineer',
  'Backend Engineer',
  'Fullstack Engineer',
  'AI Engineer',
  'Product Manager',
  'QA Engineer',
  'UX/UI Designer',
] as const;
export type Role = (typeof roles)[number];
