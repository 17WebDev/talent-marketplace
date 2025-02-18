import { EnglishLevel } from './enums/english-levels.enum';
import { Role } from './enums/roles.enum';
import { Seniority } from './enums/seniority.enum';

export interface Talent {
  id: string;
  name: string | undefined;
  email: string | undefined;
  seniority: Seniority | undefined;
  englishLevel: EnglishLevel | undefined;
  role: Role | undefined;
  yearsOfExperience: number | undefined;
  linkedinUrl: string | undefined;
}
