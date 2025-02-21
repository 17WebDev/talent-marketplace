import { useState, useEffect } from 'react';
import LeadForm from './components/LeadForm';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TalentGrid from './components/TalentGrid';
import { cn } from './helpers/cn';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const formSubmitted = localStorage.getItem('formSubmitted') === 'true';
    setHasAccess(formSubmitted);
  }, []);

  const handleFormSubmit = () => {
    setShowForm(false);
    setHasAccess(true);
  };

  return (
    <div
      className={cn(
        ' bg-gray-50 overflow-hidden',
        !hasAccess ? 'h-screen' : 'min-h-screen'
      )}
    >
      <Header setShowForm={setShowForm} />
      <HeroSection />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative'>
        <TalentGrid hasAccess={hasAccess} />
        {!hasAccess && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={() => setShowForm(true)}
              className='bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 z-10'
            >
              Explore Talent Pool
            </button>
          </div>
        )}
        <LeadForm
          open={showForm}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
}
