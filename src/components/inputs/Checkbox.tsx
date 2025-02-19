import { CheckIcon } from '@heroicons/react/24/outline';
import { getValidClassesBorder } from './helper';
import { cn } from '../../helpers/cn';
import { Size } from '../../enums/sizes';

interface CheckboxProperties {
  id?: string;
  name?: string;
  value?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  valid?: boolean;
  error?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: Size;
  checked?: boolean;
}

export default function Checkbox({
  id,
  name,
  value,
  onChange,
  valid = true,
  error = 'Please check this box to continue',
  children,
  disabled = false,
  size = 'md',
  checked = value,
}: Readonly<CheckboxProperties>) {
  const getInputSize = () => {
    switch (size) {
      case 'sm': {
        return 'h-4 w-4 rounded-xs';
      }
      case 'md': {
        return 'h-6 w-6 rounded-md';
      }
      default: {
        return 'h-6 w-6 rounded-md';
      }
    }
  };

  const getCheckSize = () => {
    switch (size) {
      case 'sm': {
        return 'h-3 w-3';
      }
      case 'md': {
        return 'h-5 w-5';
      }
      default: {
        return 'h-5 w-5';
      }
    }
  };

  return (
    <div>
      <legend className='sr-only'>{name}</legend>
      <div className='relative flex'>
        <div className='flex h-6 items-center'>
          <div className='relative flex cursor-pointer items-center rounded-full'>
            <input
              className={`${getInputSize()} before:content[''] peer relative cursor-pointer appearance-none border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:size-6 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-transparent before:opacity-0 before:transition-opacity checked:border-none checked:bg-blue-600 hover:before:opacity-10 disabled:border-neutral-700 ${getValidClassesBorder(
                valid
              )}`}
              id={id}
              value={typeof value === 'boolean' ? value.toString() : value}
              onChange={onChange}
              disabled={disabled}
              aria-describedby={`${id}-description`}
              name={name}
              type='checkbox'
              checked={checked}
              readOnly={onChange === undefined}
            />
            <div className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <CheckIcon className={getCheckSize()} aria-hidden='true' />
            </div>
          </div>
        </div>
        <div
          className={cn(
            'ml-3 text-sm leading-6 text-gray-600',
            disabled && 'text-neutral-700'
          )}
        >
          <label htmlFor={name}>{children}</label>{' '}
          {!valid && (
            <p className='text-red-500' id={`${id}-description`}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
