import React, { useState } from 'react';
import Input from './Input';
import Modal from './Modal';

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function LeadForm({ open, onSubmit, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedinUrl: '',
    companyUrl: '',
    additionalNotes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_ZAPIER_WEBHOOK_URL);
    if (!import.meta.env.VITE_ZAPIER_WEBHOOK_URL) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
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
    <Modal open={open} onClose={onClose} title='Access Talent Pool'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex gap-4'>
          <Input
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            label='First Name'
            name='firstName'
            required
          />
          <Input
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            label='Last Name'
            name='lastName'
            required
          />
        </div>
        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          label='Email'
          type='email'
          name='email'
          required
        />
        <Input
          value={formData.linkedinUrl}
          onChange={(e) =>
            setFormData({ ...formData, linkedinUrl: e.target.value })
          }
          label='LinkedIn URL'
          type='url'
          name='linkedinUrl'
          required
        />
        <Input
          value={formData.companyUrl}
          onChange={(e) =>
            setFormData({ ...formData, companyUrl: e.target.value })
          }
          label='Company URL'
          type='url'
          name='companyUrl'
          required
        />
        <Input
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData({ ...formData, additionalNotes: e.target.value })
          }
          label='Additional Notes'
          name='additionalNotes'
          type='textarea'
          minRows={3}
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
    </Modal>
  );
}
