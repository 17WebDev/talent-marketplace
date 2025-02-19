/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import { cn } from '../helpers/cn';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputProperties {
  label?: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<any>;
  onBlur?: React.FocusEventHandler<any>;
  valid?: boolean;
  showErrorMessage?: boolean;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassName?: string;
  autoComplete?: string;
  required?: boolean;
  children?: React.ReactNode;
  dark?: boolean;
  description?: string;
  minRows?: number;
  defaultValue?: string;
  maxLength?: number;
}

export default function Input({
  label,
  type = 'text',
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  valid = true,
  showErrorMessage = true,
  error = `Please enter a valid ${label?.toLocaleLowerCase()}`,
  helper,
  disabled = false,
  className,
  inputClassname,
  labelClassName,

  autoComplete = 'off',
  required = false,
  children,
  description,
  minRows,
  defaultValue,
  maxLength,
}: Readonly<InputProperties>) {
  const inputReference = useRef<HTMLTextAreaElement>(null);
  const [viewPassword, setViewPassword] = useState(false);

  const getDisabledClasses = (disabled: boolean): string => {
    return disabled ? 'bg-gray-100 text-neutral-500 cursor-not-allowed' : '';
  };

  const getValidClasses = (valid: boolean): string => {
    return valid
      ? 'text-black placeholder:text-black focus:ring-1 ring-neutral-500'
      : 'text-black placeholder:text-black ring-1 ring-red-500';
  };

  const calculateRowCount = (value: string) => {
    // calculate inputRef width and find out how many characters fit in a row, taking into account that the font size is 16px
    const charCount = Math.floor(
      (inputReference.current?.offsetWidth ?? 1) / 7.8
    );

    let rowCount = 0;
    const lines = value.split(/\r?\n/);
    for (const line of lines) {
      rowCount += line.length === 0 ? 1 : Math.ceil(line.length / charCount);
    }

    return Math.max(rowCount, minRows ?? 0);
  };

  const renderTextArea = () => {
    return (
      <div>
        <textarea
          name={name}
          id={id}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
          required={required}
          ref={inputReference}
          className={`no-scrollbar relative block max-h-44 w-full border resize-none shadow-sm rounded-lg bg-white px-3 py-1.5  outline-hidden sm:leading-6 ${getDisabledClasses(
            disabled
          )} ${getValidClasses(valid)}  ${!valid ? 'pr-12' : ''} ${
            inputClassname ?? ''
          } `}
          placeholder={placeholder}
          aria-describedby={`${id}-description ${id}-error`}
          aria-invalid={!valid}
          disabled={disabled}
        />
        {maxLength && (
          <p
            className={cn(
              'absolute bottom-0 right-0 mb-1 mr-2 text-xs text-black',
              value?.length && value?.length > maxLength && 'text-red-500'
            )}
          >
            {value?.length}/{maxLength}
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (type === 'textarea' && inputReference.current) {
      inputReference.current.rows = calculateRowCount(value ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, type, minRows]);

  const checkValidityOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!onChange) return;
    onChange(event);
    if (!valid && onBlur) {
      onBlur(event as unknown as React.FocusEvent<unknown>);
    }
  };

  const renderInput = () => {
    return (
      <input
        type={viewPassword ? 'text' : type}
        name={name}
        id={id}
        value={value}
        autoComplete={autoComplete}
        onChange={checkValidityOnChange}
        readOnly={!onChange}
        onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
        required={required}
        defaultValue={defaultValue}
        className={`block w-full rounded-lg bg-white px-3 py-1.5 border shadow-sm outline-hidden sm:leading-6 ${getDisabledClasses(
          disabled
        )} ${getValidClasses(valid)} ${!valid ? 'pr-10' : ''} ${
          inputClassname ?? ''
        } `}
        placeholder={placeholder}
        aria-describedby={`${id}-description ${id}-error`}
        aria-invalid={!valid}
        disabled={disabled}
      />
    );
  };

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'flex items-center gap-1 font-medium leading-6 text-sm text-neutral-700',
            labelClassName
          )}
        >
          {label}
          {required && label && <span className='text-red-500'>*</span>}
        </label>
      )}
      {description && (
        <p className='mt-1 text-sm text-neutral-500'>{description}</p>
      )}
      <div
        className={cn(
          'relative rounded-md shadow-xs',
          className,
          (label || description) && 'mt-2'
        )}
      >
        {type === 'textarea' ? renderTextArea() : renderInput()}
        {!valid && type !== 'password' && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-alert-400'
              aria-hidden='true'
            />
          </div>
        )}
        {type === 'password' && (
          <button
            className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3'
            type='button'
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? (
              <EyeSlashIcon className='h-5 w-5 text-black' aria-hidden='true' />
            ) : (
              <EyeIcon className='h-5 w-5 text-black' aria-hidden='true' />
            )}
          </button>
        )}
        {children}
      </div>
      {helper && valid && (
        <p className='mt-2 text-sm text-neutral-600' id={`${id}-description`}>
          {helper}
        </p>
      )}
      {!valid && showErrorMessage && (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
