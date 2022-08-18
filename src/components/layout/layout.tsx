import './layout.scss';

import React from 'react';

import Header from '../header/header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
