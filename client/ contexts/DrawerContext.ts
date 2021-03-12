import { createContext } from 'react';

const defaultValue = {
  drawerIsOpen: false,
  setDrawerIsOpen: (_drawerIsOpen: boolean) => {},
};

export const DrawerContext = createContext(defaultValue);
