import { useState } from 'react';
import Modal from './Modal';
import { Talent } from '../types/Talent';
import { getSeniorityPrefix } from '../helpers/getSeniorityPrefix';
import PillSection from './PillSection';
import { numberOfSkillsToShow } from '../constants';
import { formatName } from '../helpers/forrmatName';

export default function ViewMoreButton({ talent }: { talent: Talent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, role, yearsOfExperience, pastCompanies, seniority, skills } =
    talent;

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
      <Modal open={isModalOpen} onClose={closeModal} title={formatName(name)}>
        <div className='flex flex-col items-start'>
          <p className='text-sm text-gray-600'>
            {getSeniorityPrefix(seniority)} {role}
          </p>
          <p className='text-sm text-gray-500 mt-1'>
            {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'} of
            experience
          </p>
          <PillSection title='Top Skills'>
            {skills.slice(0, numberOfSkillsToShow).map((skill) => (
              <span
                key={skill}
                className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
              >
                {skill}
              </span>
            ))}
          </PillSection>
          {pastCompanies && pastCompanies.length > 0 && (
            <PillSection title='Past Companies'>
              {pastCompanies.slice(0, 3).map((company) => (
                <span
                  key={company}
                  className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                >
                  {company}
                </span>
              ))}
            </PillSection>
          )}
        </div>
      </Modal>
    </>
  );
}
