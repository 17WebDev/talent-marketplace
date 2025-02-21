import { Attachment, FieldSet, Records } from 'airtable';
import { Talent } from '../types/Talent';
import { Seniority } from '../enums/seniority.enum';
import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';

export default function formatTalents(records: Records<FieldSet>): Talent[] {
  const formattedTalent = records.map((record) => {
    const headshot = record.fields.Headshot as Attachment[];

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
      pastCompanies: (record.fields['Past Companies'] as string[]) ?? [],
      status: record.fields.Status as string,
      headshotUrl: headshot?.[0]?.url,
    } satisfies Talent;
  });

  return formattedTalent;
}
