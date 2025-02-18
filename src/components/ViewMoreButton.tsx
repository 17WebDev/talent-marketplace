import { useState } from 'react';
import Modal from './Modal';
import { Talent } from '../types';

export default function ViewMoreButton({ talent }: { talent: Talent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    name,
    email,
    linkedinUrl,
    chargesHourly,
    hourlyRate,
    monthlyRate,
    englishLevel,
    seniority,
    skills,
  } = talent;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
      >
        View More
      </button>
      <Modal open={isModalOpen} onClose={closeModal} title={name}>
        <div className='flex flex-col gap-3 w-full items-start'>
          <p>Email: {email}</p>
          <div className='flex items-center'>
            <span className='mr-1'>Linkedin URL:</span>
            <a
              href={linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sky-600 hover:underline'
            >
              {linkedinUrl}
            </a>
          </div>
          <p>Charges Hourly: {chargesHourly ? 'Yes' : 'No'}</p>
          {hourlyRate && <p>Hourly Rate: {hourlyRate}</p>}
          {monthlyRate && <p>Monthly Rate: ${monthlyRate}</p>}
          <p>English Level: {englishLevel}</p>
          <p>Seniority: {seniority}</p>
          <div className='flex gap-2'>
            {skills.map((skill) => (
              <span
                key={skill}
                className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
