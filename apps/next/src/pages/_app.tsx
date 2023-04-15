import 'src/styles/globals.css';

import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

import { ReactRelayContainer } from 'src/relay/ReactRelayContainer';
import { AuthProvider } from 'src/contexts/AuthContext';
import { Loading } from '@violetit/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <AuthProvider>
        <SnackbarProvider>
          <Suspense fallback={<Loading />}>
            <ReactRelayContainer Component={Component} props={pageProps} />
          </Suspense>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
