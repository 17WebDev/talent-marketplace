import { Talent } from '../types/Talent';
import ViewMoreButton from './ViewMoreButton';

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-md transition-shadow p-4'>
      <h3 className='text-lg font-semibold text-gray-900'>{talent.name}</h3>
      <p className='text-sm text-gray-600'>{talent.role}</p>
      <p className='text-sm text-gray-500 mt-1'>
        {talent.yearsOfExperience}{' '}
        {talent.yearsOfExperience === 1 ? 'year' : 'years'} of experience
      </p>
      <div className='mt-3 flex flex-wrap gap-2'>
        {talent.skills.map((skill) => (
          <span
            key={skill}
            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
          >
            {skill}
          </span>
        ))}
      </div>
      <ViewMoreButton talent={talent} />
    </div>
  );
}
