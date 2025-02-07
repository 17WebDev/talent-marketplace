import React, { useState } from 'react';
import Input from './Input';

interface LeadFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedinUrl: '',
    companyUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.setItem('formSubmitted', 'true');
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 max-w-xl w-full'>
        <h2 className='text-2xl font-bold mb-6'>Access Talent Pool</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex gap-4'>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              label='First Name'
              required
            />
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              label='Last Name'
              required
            />
          </div>
          <Input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label='Email'
            type='email'
            required
          />
          <Input
            value={formData.linkedinUrl}
            onChange={(e) =>
              setFormData({ ...formData, linkedinUrl: e.target.value })
            }
            label='LinkedIn URL'
            type='url'
            required
          />
          <Input
            value={formData.companyUrl}
            onChange={(e) =>
              setFormData({ ...formData, companyUrl: e.target.value })
            }
            label='Company URL'
            type='url'
            required
          />
          <div className='flex gap-4 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400'
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
