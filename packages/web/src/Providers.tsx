import { BrowserRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';

import { RelayEnvironment } from './relay/RelayEnvironment';
import { AuthProvider } from './modules/auth/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  </RelayEnvironmentProvider>
);
