import { useState } from 'react';
import { Role, roles } from '../enums/roles.enum';
import { techStack, techStackByRole } from '../enums/tech-stack.enum';
import { cn } from '../helpers/cn';

export default function FilterSidebar() {
  const [role, setRole] = useState<Role>();

  const filteredTechStack = role ? techStackByRole[role] : techStack;

  return (
    <div className={`w-64 flex-shrink-0 block`}>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h2 className='text-lg font-semibold mb-4'>Filters</h2>

        {/* Role Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Role</h3>
          <div className='space-y-2'>
            {roles.map((r) => (
              <label key={r} className='flex items-center'>
                <input
                  type='checkbox'
                  onChange={() => setRole(r)}
                  className={cn(
                    'rounded border-gray-300 text-indigo-600 ',
                    r === role && ' ring-indigo-500'
                  )}
                />
                <span className='ml-2 text-sm text-gray-600'>{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Tech Stack</h3>
          <div className='space-y-2'>
            {filteredTechStack.map((tech) => (
              <label key={tech} className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{tech}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
