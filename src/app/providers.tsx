'use client';

import {NextUIProvider} from '@nextui-org/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {PropsWithChildren, useState} from 'react';
import {Toaster} from 'react-hot-toast';
import {AuthProvider, SocketProvider} from '../context';

type ProviderProps = PropsWithChildren<{
  user: any;
  accessToken: any;
}>;

const Provider = ({children, user, accessToken}: ProviderProps) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={client}>
      <AuthProvider initialUser={user} initialAccessToken={accessToken}>
        <SocketProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              {children}
              <Toaster />
            </NextThemesProvider>
          </NextUIProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Provider;
