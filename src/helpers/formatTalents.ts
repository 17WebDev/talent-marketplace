import { Attachment, FieldSet, Records } from 'airtable';
import { Talent } from '../types/Talent';
import { Seniority } from '../enums/seniority.enum';
import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';

export default function formatTalents(records: Records<FieldSet>): Talent[] {
  const formattedTalent = records.map((record) => {
    const { id, fields } = record;

    const headshot = fields.Headshot as Attachment[];

    return {
      id,
      firstName: fields['First Name'] as string,
      lastName: fields['Last Name'] as string,
      seniority: fields.Seniority as Seniority,
      email: fields.Email as string,
      englishLevel: fields['English Level'] as EnglishLevel,
      role: fields.Role as Role,
      yearsOfExperience: fields['Years of Experience'] as number,
      linkedinUrl: fields['Linkedin URL'] as string,
      chargesHourly: !!fields['Charges Hourly'],
      hourlyRate: fields['Hourly Rate'] as number,
      monthlyRate: fields['Monthly Rate'] as number,
      skills: (fields.Skills as TechStack[]) ?? [],
      pastCompanies: (fields['Past Companies'] as string[]) ?? [],
      status: fields.Status as string,
      headshotUrl: headshot?.[0]?.url,
      location: fields.Location as string,
      description: fields.Description as string,
      pastRoles: (fields['Top 1-5 most notable past roles'] as string[]) ?? [],
    } satisfies Talent;
  });

  return formattedTalent;
}
