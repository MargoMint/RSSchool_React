import type { PropsWithChildren } from 'react';
import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto pt-4 px-4">{children}</div>
    </>
  );
}

export default Layout;
