import { Role, roles } from '../enums/roles.enum';
import {
  TechStack,
  techStack,
  techStackByRole,
} from '../enums/tech-stack.enum';
import Checkbox from './inputs/Checkbox';

interface IFilterSidebar {
  selectedTechStack: TechStack[];
  setSelectedTechStack: React.Dispatch<React.SetStateAction<TechStack[]>>;
  selectedRoles: Role[];
  setSelectedRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

export default function FilterSidebar({
  selectedTechStack,
  setSelectedTechStack,
  selectedRoles,
  setSelectedRoles,
}: IFilterSidebar) {
  const handleRoleChange = (role: Role) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      }
      return [...prev, role];
    });
  };

  const handleTechStackChange = (tech: TechStack) => {
    setSelectedTechStack((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech);
      }
      return [...prev, tech];
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
      <div className='bg-white p-6 rounded-lg shadow-sm space-y-4'>
        <h2 className='text-lg font-semibold'>Filters</h2>
        <div className='space-y-6'>
          <Section title='Role'>
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
          </Section>
          <Section title='Tech Stack'>
            {filteredTechStack.map((tech) => (
              <Checkbox
                key={tech}
                id={`tech-${tech}`}
                name={`tech-${tech}`}
                checked={selectedTechStack.includes(tech)}
                onChange={() => handleTechStackChange(tech)}
                size='sm'
              >
                {tech}
              </Checkbox>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium text-gray-700'>{title}</h3>
      <div className='space-y-2'>{children}</div>
    </div>
  );
}
