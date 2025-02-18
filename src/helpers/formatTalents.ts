import { FieldSet, Records } from 'airtable';
import { Talent } from '../types';
import { Seniority } from '../enums/seniority.enum';
import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';

export default function formatTalents(records: Records<FieldSet>): Talent[] {
  const formattedTalent = records.map((record) => {
    return {
      id: record.id,
      name: record.fields.Name as string,
      seniority: record.fields.Seniority as Seniority,
      email: record.fields.Email as string,
      englishLevel: record.fields.English as EnglishLevel,
      role: record.fields['Job Title'] as Role,
      yearsOfExperience: record.fields['Years of Experience'] as number,
      linkedinUrl: record.fields.Linkedin as string,
    } satisfies Talent;
  });

  return formattedTalent;
}
