interface ButtonProps {
  onClick: () => void;
  title: string;
  variant: 'primary' | 'outline';
}

function Button({ onClick, title, variant }: ButtonProps) {
  const baseClasses = 'rounded-lg px-4 py-2 font-medium hover:cursor-pointer';

  const variantClasses = {
    primary: 'bg-red-800 text-white',
    outline: 'border-2 border-red-800 text-red-800 bg-white',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]}`.trim();

  return (
    <button onClick={onClick} className={finalClassName}>
      {title}
    </button>
  );
}

export default Button;
