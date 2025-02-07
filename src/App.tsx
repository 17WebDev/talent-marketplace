import { useState, useEffect } from 'react';
import TalentCard from './components/TalentCard';
import FilterSidebar from './components/FilterSidebar';
import LeadForm from './components/LeadForm';
import { Engineer } from './types';

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

function App() {
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
      {/* Navigation */}
      <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <span className='text-indigo-600 text-xl font-bold'>
                TalentAI
              </span>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='text-gray-600 hover:text-gray-900'>
                Sign In
              </button>
              <button className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Find Elite Engineering Talent with AI-Powered Matching
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Connect with pre-vetted engineers, developers, and tech leaders who
          match your exact requirements.
        </p>
        <button className='bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700'>
          Explore Talent Pool
        </button>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto'>
          <div>
            <div className='text-3xl font-bold text-indigo-600'>15k+</div>
            <div className='text-gray-600'>Vetted Engineers</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-indigo-600'>98%</div>
            <div className='text-gray-600'>Successful Placements</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-indigo-600'>48h</div>
            <div className='text-gray-600'>Average Matching Time</div>
          </div>
        </div>
      </div>

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
              View Candidates
            </button>
          </div>
        )}

        {showForm && (
          <LeadForm
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
