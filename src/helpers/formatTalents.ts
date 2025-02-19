import { FieldSet, Records } from 'airtable';
import { Talent } from '../types/Talent';
import { Seniority } from '../enums/seniority.enum';
import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';

export default function formatTalents(records: Records<FieldSet>): Talent[] {
  const formattedTalent = records.map((record) => {
    return {
      id: record.id,
      name: record.fields.Name as string,
      seniority: record.fields.Seniority as Seniority,
      email: record.fields.Email as string,
      englishLevel: record.fields['English Level'] as EnglishLevel,
      role: record.fields.Role as Role,
      yearsOfExperience: record.fields['Years of Experience'] as number,
      linkedinUrl: record.fields['Linkedin URL'] as string,
      chargesHourly: !!record.fields['Charges Hourly'],
      hourlyRate: record.fields['Hourly Rate'] as number,
      monthlyRate: record.fields['Monthly Rate'] as number,
      skills: (record.fields.Skills as TechStack[]) ?? [],
    } satisfies Talent;
  });
  console.log(formattedTalent);
  return formattedTalent;
}
