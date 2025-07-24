interface ButtonProps {
  onClick: () => void;
  title: string;
  className?: string;
}

function Button({ onClick, title, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-red-800 text-white rounded-md px-4 py-2 ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
