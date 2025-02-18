export const englishLevels = [
  'Intermediate',
  'Upper Intermediate',
  'Advanced',
  'Fluent',
] as const;
export type EnglishLevel = (typeof englishLevels)[number];
