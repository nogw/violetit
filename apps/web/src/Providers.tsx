import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './modules/auth/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider>{children}</SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  </RelayEnvironmentProvider>
);
