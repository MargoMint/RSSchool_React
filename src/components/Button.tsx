import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { onClick, children } = this.props;
    return (
      <button
        onClick={onClick}
        className={'bg-red-800 text-white rounded-md px-4 py-2 mt-4'}
      >
        {children}
      </button>
    );
  }
}
