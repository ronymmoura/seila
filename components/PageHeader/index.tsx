import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface IProps {
  onToggleDrawer: () => void;
  drawerVisible: boolean;
}

export const PageHeader: React.FC<IProps> = ({ onToggleDrawer, drawerVisible }) => {
  return (
    <header className="bg-[color:var(--color-nav)] p-4 text-white lg:hidden">
      <button onClick={onToggleDrawer}>{drawerVisible ? <FaTimes /> : <FaBars />}</button>
    </header>
  );
};
