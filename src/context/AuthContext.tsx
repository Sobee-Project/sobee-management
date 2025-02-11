'use client';
import {IAdmin, IUser} from '@/lib/interfaces';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: IUser<IAdmin> | null;
  isAuthenticated: boolean;
  setUser: (user: IUser<IAdmin> | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

type AuthProviderProps = PropsWithChildren<{
  initialUser?: any;
  initialAccessToken?: any;
}>;
export const AuthProvider = ({
  children,
  initialUser,
  initialAccessToken,
}: AuthProviderProps) => {
  const [user, setUser] = useState(initialUser);
  const [accessToken, setAccessToken] = useState<string | null>(
    initialAccessToken,
  );

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setAccessToken(initialAccessToken);
  }, [initialAccessToken]);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    accessToken,
    setAccessToken,
  } satisfies AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
