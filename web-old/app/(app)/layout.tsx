'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import { Nav, PageHeader } from '@components';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [DrawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerVisible((current) => !current);
  };

  return (
    <html>
      <body>
        <div className="relative h-screen">
          <div className="flex h-screen w-full">
            <Nav visible={DrawerVisible} />

            <div className="flex-1">
              <PageHeader onToggleDrawer={handleOpenDrawer} drawerVisible={DrawerVisible} />

              <div className="p-5">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
