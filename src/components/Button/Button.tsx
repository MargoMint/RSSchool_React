import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  title?: string;
  variant: 'primary' | 'secondary' | 'outline' | 'modal';
  type?: 'button' | 'submit';
  disabled?: boolean;
}>;

function Button({
  onClick,
  title,
  variant,
  type = 'button',
  disabled = false,
  children,
}: ButtonProps) {
  const buttonClassName = twMerge(
    clsx('rounded-lg px-4 py-2 font-medium hover:cursor-pointer', {
      'text-[var(--primary-white)] bg-[var(--primary-green)] border-2 border-[var(--primary-green)]':
        variant === 'primary',
      'text-[var(--primary-dark)] bg-[var(--primary-pink)] border-2 border-[var(--primary-dark)]':
        variant === 'secondary',
      'border-2 border-[var(--primary-green)] text-[var(--primary-green)] bg-transparent':
        variant === 'outline',
      'absolute top-3 right-6 text-gray-500 bg-[var(--primary-white)]':
        variant === 'modal',
    })
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
      disabled={disabled}
    >
      {children ?? title}
    </button>
  );
}

export default Button;
