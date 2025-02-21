import { numberOfSkillsToShow } from '../constants';
import { formatName } from '../helpers/formatName';
import { getSeniorityPrefix } from '../helpers/getSeniorityPrefix';
import { Talent } from '../types/Talent';
import PillSection from './PillSection';
import ViewMoreButton from './ViewMoreButton';

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col'>
      <div className='w-full h-48 bg-gray-100'>
        {talent.headshotUrl ? (
          <img
            src={talent.headshotUrl}
            alt={`${formatName(talent.firstName, talent.lastName)}'s headshot`}
            className='w-full h-full object-contain'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <svg
              className='w-20 h-20 text-gray-300'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </div>
        )}
      </div>
      <div className='p-4 flex flex-col flex-1'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {formatName(talent.firstName, talent.lastName)}
        </h3>
        <p className='text-sm text-gray-600'>
          {getSeniorityPrefix(talent.seniority)} {talent.role}
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          {talent.yearsOfExperience}{' '}
          {talent.yearsOfExperience === 1 ? 'year' : 'years'} of experience
        </p>
        <PillSection
          title={`Top ${numberOfSkillsToShow} Programming Languages`}
        >
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
            {talent.pastCompanies.map((company) => (
              <span
                key={company}
                className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
              >
                {company}
              </span>
            ))}
          </PillSection>
        )}
        <div className='flex-1 flex items-end'>
          <ViewMoreButton talent={talent} />
        </div>
      </div>
    </div>
  );
}
