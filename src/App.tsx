import { useState, useEffect } from 'react';
import TalentCard from './components/TalentCard';
import FilterSidebar from './components/FilterSidebar';
import LeadForm from './components/LeadForm';
import { Engineer } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

const engineers: Engineer[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    experience: '5 years experience',
    skills: ['React', 'TypeScript', 'Next.js'],
    available: true,
    location: 'San Francisco',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'AI Engineer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    experience: '7 years experience',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    available: true,
    location: 'New York',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Backend Engineer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    experience: '4 years experience',
    skills: ['Node.js', 'MongoDB', 'AWS'],
    available: true,
    location: 'Seattle',
  },
];

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
    <div className='min-h-screen bg-gray-50'>
      <Header setShowForm={setShowForm} />
      <HeroSection />
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative'>
        <div className={`flex gap-8 ${!hasAccess ? 'filter blur-sm' : ''}`}>
          <FilterSidebar />

          <div className='flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {engineers.map((engineer) => (
                <TalentCard key={engineer.id} engineer={engineer} />
              ))}
            </div>
          </div>
        </div>

        {!hasAccess && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={() => setShowForm(true)}
              className='bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 z-10'
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
