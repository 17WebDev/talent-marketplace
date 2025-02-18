import { useState, useEffect } from 'react';
import TalentCard from './components/TalentCard';
import FilterSidebar from './components/FilterSidebar';
import LeadForm from './components/LeadForm';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import toast from 'react-hot-toast';
import airtableService from './services/airtable.service';
import formatTalents from './helpers/formatTalents';
import { Talent } from './types';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formSubmitted = localStorage.getItem('formSubmitted') === 'true';
    setHasAccess(formSubmitted);
  }, []);

  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true);
      try {
        const records = await airtableService.getAllTalent();

        setTalents(formatTalents(records));
      } catch {
        toast.error('Failed to fetch talent pool');
      } finally {
        setLoading(false);
      }
    };

    fetchTalent();
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
              {loading ? (
                <div>Loading talent pool...</div>
              ) : (
                <>
                  {talents.map((t) => (
                    <TalentCard key={t.id} talent={t} />
                  ))}
                </>
              )}
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
