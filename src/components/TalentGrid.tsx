import { useLayoutEffect, useState } from 'react';
import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';
import filterTalents from '../helpers/filterTalents';
import { Talent } from '../types/Talent';
import FilterSidebar from './FilterSidebar';
import TalentCard from './TalentCard';
import toast from 'react-hot-toast';
import formatTalents from '../helpers/formatTalents';
import airtableService from '../services/airtable.service';
import TalentCardSkeleton from './skeletons/TalentCardSkeleton';
import { cn } from '../helpers/cn';

interface ITalentGrid {
  hasAccess: boolean;
  openForm: () => void;
}

export default function TalentGrid({ hasAccess, openForm }: ITalentGrid) {
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [showAllTalent, setShowAllTalent] = useState(true);

  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
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

  const filteredTalents = filterTalents(
    talents,
    selectedTechStack,
    selectedRoles,
    showAllTalent
  );

  return (
    <div className='flex gap-8 max-[540px]:flex-col'>
      <FilterSidebar
        selectedTechStack={selectedTechStack}
        setSelectedTechStack={setSelectedTechStack}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        hasAccess={hasAccess}
        showAllTalent={showAllTalent}
        setShowAllTalent={setShowAllTalent}
      />
      <div className='flex-1 relative'>
        {!hasAccess && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={openForm}
              className='bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 z-10'
            >
              Explore Talent Pool
            </button>
          </div>
        )}
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
            !hasAccess && 'filter blur-xs'
          )}
        >
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <TalentCardSkeleton key={index} />
              ))}
            </>
          ) : filteredTalents.length > 0 ? (
            <>
              {filteredTalents
                .slice(0, hasAccess ? filteredTalents.length : 3)
                .map((t) => (
                  <TalentCard key={t.id} talent={t} />
                ))}
            </>
          ) : (
            <p className='absolute left-1/2 top-10 -translate-x-1/2 text-gray-600'>
              There are no candidates to display with the given criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
