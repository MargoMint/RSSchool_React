import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={'bg-red-800 text-white rounded-md px-4 py-2'}
    >
      {children}
    </button>
  );
}

export default Button;
