import { useState } from 'react';
import Modal from './Modal';
import { Talent } from '../types/Talent';
import { getSeniorityPrefix } from '../helpers/getSeniorityPrefix';
import PillSection from './PillSection';
import { formatName } from '../helpers/formatName';
import {
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function ViewMoreButton({ talent }: { talent: Talent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    firstName,
    lastName,
    role,
    yearsOfExperience,
    pastCompanies,
    seniority,
    skills,
    pastRoles,
  } = talent;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='mt-4 w-full cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
      >
        View More
      </button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={formatName(firstName, lastName)}
      >
        <div className='flex flex-col items-start gap-3'>
          <div className='flex items-center gap-2'>
            <BriefcaseIcon className='h-5 w-5 text-gray-500' />
            <p className='text-sm text-gray-600'>
              {getSeniorityPrefix(seniority)} {role}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <ClockIcon className='h-5 w-5 text-gray-500' />
            <p className='text-sm text-gray-600'>
              {yearsOfExperience
                ? `${yearsOfExperience} ${
                    yearsOfExperience === 1 ? 'year' : 'years'
                  } of experience`
                : '--'}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <MapPinIcon className='h-5 w-5 text-gray-500 ' />
            <p className='text-sm text-gray-600'>{talent.location ?? '--'}</p>
          </div>
          <div className='flex items-center gap-2'>
            <ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-gray-500' />
            <p className='text-sm text-gray-600'>
              {talent.description ?? '--'}
            </p>
          </div>
          <PillSection title='Top 1-5 most notable past roles'>
            {pastRoles.length > 0 ? (
              <>
                {pastRoles.map((role) => (
                  <span
                    key={role}
                    className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                  >
                    {role}
                  </span>
                ))}
              </>
            ) : (
              <p className='text-sm text-gray-600'>--</p>
            )}
          </PillSection>
          <PillSection title='All Programming Languages and Frameworks'>
            {skills.length > 0 ? (
              <>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                  >
                    {skill}
                  </span>
                ))}
              </>
            ) : (
              <p className='text-sm text-gray-600'>--</p>
            )}
          </PillSection>
          <PillSection title='Past Companies'>
            {pastCompanies.length > 0 ? (
              <>
                {pastCompanies.map((company) => (
                  <span
                    key={company}
                    className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                  >
                    {company}
                  </span>
                ))}
              </>
            ) : (
              <p className='text-sm text-gray-600'>--</p>
            )}
          </PillSection>
        </div>
      </Modal>
    </>
  );
}
