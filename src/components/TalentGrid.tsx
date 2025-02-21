import { useEffect, useState } from 'react';
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

interface ITalentGrid {
  hasAccess: boolean;
}

export default function TalentGrid({ hasAccess }: ITalentGrid) {
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);

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

  const filteredTalents = filterTalents(
    talents,
    selectedTechStack,
    selectedRoles
  );

  return (
    <div className={`flex gap-8 ${!hasAccess ? 'filter blur-xs' : ''}`}>
      <FilterSidebar
        selectedTechStack={selectedTechStack}
        setSelectedTechStack={setSelectedTechStack}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        hasAccess={hasAccess}
      />
      <div className='flex-1 relative'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
