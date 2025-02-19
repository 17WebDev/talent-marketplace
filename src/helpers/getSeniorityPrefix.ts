import { Seniority } from '../enums/seniority.enum';

export function getSeniorityPrefix(seniority: Seniority | undefined): string {
  let prefix = '';

  switch (seniority) {
    case 'Intern':
      prefix = 'Intern';
      break;
    case 'Junior':
      prefix = 'Jr.';
      break;
    case 'Mid-Level':
      prefix = 'Mid';
      break;
    case 'Senior':
    case 'Expert':
      prefix = 'Sr.';
      break;
  }

  return prefix;
}
