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
    <div className={cn('bg-gray-50 overflow-hidden min-h-screen')}>
      <Header setShowForm={setShowForm} hasAccess={hasAccess} />
      <HeroSection />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative'>
        <TalentGrid hasAccess={hasAccess} openForm={() => setShowForm(true)} />
        <LeadForm
          open={showForm}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
}
