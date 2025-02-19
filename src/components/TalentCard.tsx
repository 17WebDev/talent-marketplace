import { numberOfSkillsToShow } from '../constants';
import { formatName } from '../helpers/forrmatName';
import { getSeniorityPrefix } from '../helpers/getSeniorityPrefix';
import { Talent } from '../types/Talent';
import PillSection from './PillSection';
import ViewMoreButton from './ViewMoreButton';

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow p-4'>
      <h3 className='text-lg font-semibold text-gray-900'>
        {formatName(talent.name)}
      </h3>
      <p className='text-sm text-gray-600'>
        {getSeniorityPrefix(talent.seniority)} {talent.role}
      </p>
      <p className='text-sm text-gray-500 mt-1'>
        {talent.yearsOfExperience}{' '}
        {talent.yearsOfExperience === 1 ? 'year' : 'years'} of experience
      </p>
      <PillSection title='Top Skills'>
        {talent.skills.slice(0, numberOfSkillsToShow).map((skill) => (
          <span
            key={skill}
            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
          >
            {skill}
          </span>
        ))}
      </PillSection>
      {talent.pastCompanies && talent.pastCompanies.length > 0 && (
        <PillSection title='Past Companies'>
          {talent.pastCompanies.slice(0, 3).map((company) => (
            <span
              key={company}
              className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
            >
              {company}
            </span>
          ))}
        </PillSection>
      )}
      <ViewMoreButton talent={talent} />
    </div>
  );
}
