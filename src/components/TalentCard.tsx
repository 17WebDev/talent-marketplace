import { getSeniorityPrefix } from '../helpers/getSeniorityPrefix';
import { Talent } from '../types/Talent';
import ViewMoreButton from './ViewMoreButton';

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  const numberOfSkillsToShow = 3;

  return (
    <div className='bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow p-4'>
      <h3 className='text-lg font-semibold text-gray-900'>{talent.name}</h3>
      <p className='text-sm text-gray-600'>
        {getSeniorityPrefix(talent.seniority)} {talent.role}
      </p>
      <p className='text-sm text-gray-500 mt-1'>
        {talent.yearsOfExperience}{' '}
        {talent.yearsOfExperience === 1 ? 'year' : 'years'} of experience
      </p>
      <Section title='Top Skills'>
        {talent.skills.slice(0, numberOfSkillsToShow).map((skill) => (
          <span
            key={skill}
            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
          >
            {skill}
          </span>
        ))}
      </Section>
      {talent.pastCompanies && talent.pastCompanies.length > 0 && (
        <Section title='Past Companies'>
          {talent.pastCompanies.slice(0, 3).map((company) => (
            <span
              key={company}
              className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
            >
              {company}
            </span>
          ))}
        </Section>
      )}
      <ViewMoreButton talent={talent} />
    </div>
  );
}

function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='mt-4 space-y-2'>
      <h4 className='text-xs font-medium text-gray-600'>{title}</h4>
      <div className='flex flex-wrap gap-2'>{children}</div>
    </div>
  );
}
