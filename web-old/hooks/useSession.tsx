import { useMemo } from 'react';
import { createContext, useContext } from 'react';

interface ISessionContext {
  signUp: (name: String, email: String, password: String) => Promise<void>;
  signIn: (email: String, password: String) => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<ISessionContext | null>(null);

export const SessionProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const signUp = async (name: String, email: String, password: String) => {};

  const signIn = async (email: String, password: String) => {};

  const logout = async () => {};

  const memoedValue = useMemo(() => ({ signUp, signIn, logout }), []);

  return <SessionContext.Provider value={memoedValue}>{children}</SessionContext.Provider>;
};

export function useSession(): ISessionContext {
  const context = useContext(SessionContext);

  if (!context) throw new Error('useSession must be user within a SessionProvider');

  return context;
}
