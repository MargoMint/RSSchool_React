import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  title?: string;
  variant: 'primary' | 'outline' | 'modal' | 'icon' | 'darkPrimary';
}>;

function Button({ onClick, title, variant, children }: ButtonProps) {
  const buttonClassName = twMerge(
    clsx('rounded-lg px-4 py-2 font-medium hover:cursor-pointer', {
      'bg-red-800 text-white': variant === 'primary',
      'bg-red-800 text-[#1b1b1b]': variant === 'darkPrimary',
      'border-2 border-red-800 text-red-800 bg-transparent':
        variant === 'outline',
      'bg-white text-red-800 border-2 border-red-800': variant === 'modal',
      'text-xl bg-transparent': variant === 'icon',
    })
  );

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children ?? title}
    </button>
  );
}

export default Button;
