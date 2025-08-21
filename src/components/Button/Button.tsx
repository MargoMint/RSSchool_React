import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  title?: string;
  variant: 'primary' | 'modal';
}>;

function Button({ onClick, title, variant, children }: ButtonProps) {
  const buttonClassName = twMerge(
    clsx('rounded-lg px-4 py-2 font-medium hover:cursor-pointer', {
      'bg-red-800 text-[var(--primary-white)]': variant === 'primary',
      'absolute top-3 right-3 text-gray-500 hover:text-black':
        variant === 'modal',
    })
  );

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children ?? title}
    </button>
  );
}

export default Button;
