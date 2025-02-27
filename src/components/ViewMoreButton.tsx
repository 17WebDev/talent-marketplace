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
import ModalStat, { IModalStat } from './ModalStat';

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
    headshotUrl,
  } = talent;

  function closeModal() {
    setIsModalOpen(false);
  }

  const formattedName = formatName(firstName, lastName);

  const stats: IModalStat[] = [
    {
      text: role ? `${getSeniorityPrefix(seniority)} ${role}` : '--',
      icon: BriefcaseIcon,
    },
    {
      text: yearsOfExperience
        ? `${yearsOfExperience} ${
            yearsOfExperience === 1 ? 'year' : 'years'
          } of experience`
        : '--',
      icon: ClockIcon,
    },
    {
      text: talent.location ?? '--',
      icon: MapPinIcon,
    },
    {
      text: talent.description ?? '--',
      icon: ChatBubbleBottomCenterTextIcon,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='mt-4 w-full cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
      >
        View More
      </button>
      <Modal open={isModalOpen} onClose={closeModal} title={formattedName}>
        <div className='w-full h-48 bg-gray-100 mb-4 rounded-sm'>
          {headshotUrl ? (
            <img
              src={headshotUrl}
              alt={`${formattedName}'s headshot`}
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
        <div className='flex flex-col items-start gap-3'>
          {stats.map((stat, index) => (
            <ModalStat key={index} icon={stat.icon} text={stat.text} />
          ))}
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
        <div className='flex'>
          {/* Replace with calendly link */}
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-5 w-full cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
          >
            Book a meeting with CEO
          </a>
        </div>
      </Modal>
    </>
  );
}
