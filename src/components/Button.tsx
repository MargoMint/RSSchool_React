import clsx from 'clsx';

interface ButtonProps {
  onClick?: () => void;
  title: string;
  variant: 'primary' | 'outline';
}

function Button({ onClick, title, variant }: ButtonProps) {
  const buttonClassName = clsx(
    'rounded-lg px-4 py-2 font-medium hover:cursor-pointer',
    {
      'bg-red-800 text-white': variant === 'primary',
      'border-2 border-red-800 text-red-800 bg-white': variant === 'outline',
    }
  );

  return (
    <button onClick={onClick} className={buttonClassName}>
      {title}
    </button>
  );
}

export default Button;
