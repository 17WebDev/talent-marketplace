import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';
import { Talent } from '../types/Talent';

export default function filterTalents(
  talents: Talent[],
  techStack: TechStack[],
  roles: Role[],
  showAllTalent: boolean
): Talent[] {
  const filteredTalents = talents
    .filter((talent) => talent.firstName && talent.role)
    .filter((talent) => {
      if (techStack.length === 0 && roles.length === 0) {
        return true;
      }

      const matchesRole =
        roles.length === 0 || (talent.role && roles.includes(talent.role));

      const matchesTechStack =
        techStack.length === 0 ||
        techStack.every((tech) => talent.skills.includes(tech));

      return matchesRole && matchesTechStack;
    })
    .filter((talent) => showAllTalent || talent.vetted);

  return filteredTalents;
}
