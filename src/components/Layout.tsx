import React, { Component } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className="max-w-4xl mx-auto pt-4 px-4">{this.props.children}</div>
    );
  }
}
