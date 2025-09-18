import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">{children}</div>
    </div>
  );
}

export default Layout;
