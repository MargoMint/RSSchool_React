import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="max-w-4xl mx-auto pt-4 px-4">{children}</div>;
}

export default Layout;
