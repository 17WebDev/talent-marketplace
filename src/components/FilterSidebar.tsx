import { useState } from 'react';
import { Role, roles } from '../enums/roles.enum';
import { techStack, techStackByRole } from '../enums/tech-stack.enum';
import Checkbox from './inputs/Checkbox';

export default function FilterSidebar() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const handleRoleChange = (role: Role) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      }
      return [...prev, role];
    });
  };

  const filteredTechStack =
    selectedRoles.length > 0
      ? Array.from(
          new Set(selectedRoles.flatMap((role) => techStackByRole[role]))
        )
      : techStack;

  return (
    <div className={`w-64 flex-shrink-0 block`}>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h2 className='text-lg font-semibold mb-4'>Filters</h2>

        {/* Role Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Role</h3>
          <div className='space-y-2'>
            {roles.map((role) => (
              <Checkbox
                key={role}
                id={`role-${role}`}
                name={`role-${role}`}
                checked={selectedRoles.includes(role)}
                onChange={() => handleRoleChange(role)}
                size='sm'
              >
                {role}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
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
