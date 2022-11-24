import Head from 'next/head';
import React, { useState } from 'react';
import { Nav, PageHeader } from '../';

export const Page: React.FC = ({ children }) => {
  const [DrawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerVisible((current) => !current);
  };

  return (
    <>
      <div className="relative h-screen">
        <Head>
          <title>Sei lá bixo</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="flex h-screen">
          <Nav visible={DrawerVisible} />

          <div className="w-full flex-1">
            <PageHeader onToggleDrawer={handleOpenDrawer} drawerVisible={DrawerVisible} />

            <div className="p-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
