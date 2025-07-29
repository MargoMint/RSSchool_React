import type { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <div className="max-w-4xl mx-auto pt-4 px-4">{children}</div>;
}

export default Layout;
