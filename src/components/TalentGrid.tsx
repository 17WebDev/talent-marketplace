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
      />

      <div className='flex-1'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <div>Loading talent pool...</div>
          ) : (
            <>
              {filteredTalents.map((t) => (
                <TalentCard key={t.id} talent={t} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
