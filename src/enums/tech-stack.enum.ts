import { Role } from './roles.enum';

const sortArray = <T extends string>(arr: T[]): T[] => [...arr].sort();

const frontendTechnologies: TechStack[] = [
  'React',
  'Angular',
  'Vue',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Redux',
  'Vite',
] as const;

const backendTechnologies: TechStack[] = [
  'Node.js',
  'Python',
  'TypeScript',
  'JavaScript',
  'NestJS',
  'Express',
  'FastAPI',
  'Flask',
  'Go',
  'Ruby on Rails',
  'Laravel',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Prisma',
  'TypeOrm',
  'Docker',
  'Kubernetes',
  'AWS',
] as const;

export const techStackByRole: { [key in Role]: TechStack[] } = {
  'AI Engineer': sortArray([
    'Python',
    'TensorFlow',
    'Chat GPT',
    'Claude 3.5 Sonnet',
    'Hugging Face',
    'Docker',
    'AWS',
  ]),
  'Backend Engineer': sortArray([...backendTechnologies]),
  'Frontend Engineer': sortArray([...frontendTechnologies]),
  'Fullstack Engineer': sortArray([
    ...new Set([...frontendTechnologies, ...backendTechnologies]),
  ]),
  'Product Manager': sortArray(['Jira', 'Linear', 'ClickUp', 'Figma']),
  'QA Engineer': sortArray([
    'Cypress',
    'Playwright',
    'Selenium',
    'JavaScript',
    'TypeScript',
    'Python',
  ]),
  'UX/UI Designer': sortArray(['Figma']),
};

export const techStack = [
  '.NET',
  'Angular',
  'AWS',
  'C#',
  'C / C++',
  'Chat GPT',
  'CI/CD',
  'Claude 3.5 Sonnet',
  'ClickUp',
  'Cypress',
  'Docker',
  'Express',
  'Expo',
  'FastAPI',
  'Figma',
  'Firebase',
  'Flask',
  'Flutter',
  'Go',
  'Hugging Face',
  'JavaScript',
  'Jira',
  'Kubernetes',
  'Laravel',
  'Linear',
  'MongoDB',
  'MySQL',
  'NestJS',
  'Next.js',
  'Node.js',
  'Playwright',
  'PostgreSQL',
  'Prisma',
  'Python',
  'React',
  'React Native',
  'Redis',
  'Redux',
  'Ruby on Rails',
  'Rust',
  'Selenium',
  'Tailwind CSS',
  'TensorFlow',
  'Terraform',
  'TypeOrm',
  'TypeScript',
  'Vite',
  'Vue',
] as const;
export type TechStack = (typeof techStack)[number];
