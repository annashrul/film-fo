import React, { useState } from 'react';
import { SEOProps } from 'components/SEO';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./Header'), { ssr: false });
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const SEO = dynamic(() => import('components/SEO'), { ssr: false });

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { title } = rest;

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      <SEO {...rest} />
      {title !== 'Login' && <Sidebar isOpen={open} toggleSidebar={() => setOpen(!open)} />}
      <div className="flex flex-col flex-1 w-1/2" style={{ zoom: '90%' }}>
        {title !== 'Login' && (
          <Header
            openProfile={openProfile}
            toggleProfile={(toggle: boolean) => setOpenProfile(toggle)}
            toggleSidebar={() => setOpen(!open)}
          />
        )}

        <main className="h-full overflow-y-auto" onClick={() => setOpenProfile(false)}>
          <div className="container grid  mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
