import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'base' | 'error';
}

function Input({
  id,
  name,
  type,
  placeholder,
  accept,
  variant,
  ...rest
}: InputProps) {
  const inputClassName = twMerge(
    clsx('rounded-lg border-2 p-2 w-full bg-[var(--primary-white)]', {
      'text-[var(--primary-dark)] border-[var(--primary-pink)]':
        variant === 'base',
      'text-[var(--primary-dark)] border-[var(--primary-dark)]':
        variant === 'error',
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
      {...rest}
    />
  );
}

export default Input;
