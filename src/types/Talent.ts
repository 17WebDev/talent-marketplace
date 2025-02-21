import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';
import { Seniority } from '../enums/seniority.enum';
import { TechStack } from '../enums/tech-stack.enum';

export interface Talent {
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  seniority: Seniority | undefined;
  englishLevel: EnglishLevel | undefined;
  role: Role | undefined;
  yearsOfExperience: number | undefined;
  linkedinUrl: string | undefined;
  chargesHourly: boolean;
  hourlyRate: number | undefined;
  monthlyRate: number | undefined;
  skills: TechStack[];
  pastCompanies: string[];
  status: string | undefined;
  headshotUrl: string | undefined;
}
