---
title: Airtable Connection
---
# Introduction

This document will walk you through the Airtable connection implementation, focusing on how we pull talent data from Airtable and format it for use in our application.

We will cover:

1. How the Airtable service is configured and utilized.
2. How talent data is fetched from Airtable.
3. How the fetched data is formatted for application use.
4. How the formatted data is integrated into the <SwmToken path="/src/components/TalentGrid.tsx" pos="19:6:6" line-data="export default function TalentGrid({ hasAccess, openForm }: ITalentGrid) {">`TalentGrid`</SwmToken> component.

# Airtable service configuration

<SwmSnippet path="/src/services/airtable.service.ts" line="1">

---

The Airtable service is configured in <SwmPath>[src/services/airtable.service.ts](/src/services/airtable.service.ts)</SwmPath>. This setup is crucial because it establishes the connection to the Airtable API using the provided API key and base ID. The service is responsible for interacting with the Airtable database, specifically the 'Talent Pool Marketplace' table.

```
import Airtable from 'airtable';

class AirtableService {
  private talentPoolBase: Airtable.Base;
  private talentPoolTableName: string;

  constructor() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
    });
    this.talentPoolBase = Airtable.base('appqWN527HNxajNlR');
    this.talentPoolTableName = 'Talent Pool Marketplace';
  }
```

---

</SwmSnippet>

# Fetching talent data

<SwmSnippet path="/src/services/airtable.service.ts" line="16">

---

The <SwmToken path="/src/services/airtable.service.ts" pos="16:1:1" line-data="  getAllTalent() {">`getAllTalent`</SwmToken> method in the Airtable service retrieves all records from the specified table. This method is essential as it provides the raw data needed for further processing and display in the application.

```
  getAllTalent() {
    return this.talentPoolBase(this.talentPoolTableName)
      .select({
        view: 'Grid view',
      })
      .all();
  }
}
```

---

</SwmSnippet>

# Formatting talent data

<SwmSnippet path="/src/helpers/formatTalents.ts" line="1">

---

The <SwmToken path="/src/helpers/formatTalents.ts" pos="8:6:6" line-data="export default function formatTalents(records: Records&lt;FieldSet&gt;): Talent[] {">`formatTalents`</SwmToken> function in <SwmPath>[src/helpers/formatTalents.ts](/src/helpers/formatTalents.ts)</SwmPath> is responsible for transforming the raw Airtable records into a structured format that aligns with our application's data model. This step is important because it ensures that the data is usable and consistent across the application.

```
import { Attachment, FieldSet, Records } from 'airtable';
import { Talent } from '../types/Talent';
import { Seniority } from '../enums/seniority.enum';
import { EnglishLevel } from '../enums/english-levels.enum';
import { Role } from '../enums/roles.enum';
import { TechStack } from '../enums/tech-stack.enum';

export default function formatTalents(records: Records<FieldSet>): Talent[] {
  const formattedTalent = records.map((record) => {
    const { id, fields } = record;

    const headshot = fields.Headshot as Attachment[];

    return {
      id,
      firstName: fields['First Name'] as string,
      lastName: fields['Last Name'] as string,
      seniority: fields.Seniority as Seniority,
      email: fields.Email as string,
      englishLevel: fields['English Level'] as EnglishLevel,
      role: fields.Role as Role,
      yearsOfExperience: fields['Years of Experience'] as number,
      linkedinUrl: fields['Linkedin URL'] as string,
      chargesHourly: !!fields['Charges Hourly'],
      hourlyRate: fields['Hourly Rate'] as number,
      monthlyRate: fields['Monthly Rate'] as number,
      skills: (fields.Skills as TechStack[]) ?? [],
      pastCompanies: (fields['Past Companies'] as string[]) ?? [],
      status: fields.Status as string,
      headshotUrl: headshot?.[0]?.url,
      location: fields.Location as string,
      description: fields.Description as string,
      pastRoles: (fields['Top 1-5 most notable past roles'] as string[]) ?? [],
      vetted: !!fields.Vetted,
    } satisfies Talent;
  });

  return formattedTalent;
}
```

---

</SwmSnippet>

# Integrating formatted data into <SwmToken path="/src/components/TalentGrid.tsx" pos="19:6:6" line-data="export default function TalentGrid({ hasAccess, openForm }: ITalentGrid) {">`TalentGrid`</SwmToken>

<SwmSnippet path="/src/components/TalentGrid.tsx" line="1">

---

The <SwmToken path="/src/components/TalentGrid.tsx" pos="19:6:6" line-data="export default function TalentGrid({ hasAccess, openForm }: ITalentGrid) {">`TalentGrid`</SwmToken> component in <SwmPath>[src/components/TalentGrid.tsx](/src/components/TalentGrid.tsx)</SwmPath> utilizes the formatted talent data. It fetches the data using the Airtable service, formats it, and then displays it in a grid layout. This integration is key to presenting the talent information to users in a structured and interactive manner.

```
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
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBdGFsZW50LW1hcmtldHBsYWNlJTNBJTNBMTdXZWJEZXY=" repo-name="talent-marketplace"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
