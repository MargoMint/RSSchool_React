import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  accept?: string;
  variant?: 'base' | 'error';
}

function Input({ id, name, type, placeholder, accept, variant }: InputProps) {
  const inputClassName = twMerge(
    clsx('rounded-lg border-2 p-2 w-full bg-[var(--primary-white)]', {
      'text-[var(--primary-dark)] border-[var(--primary-pink)]':
        variant === 'base',
      'text-red-700 border-red-700': variant === 'error',
    })
  );

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      accept={accept}
      className={inputClassName}
    />
  );
}

export default Input;
