import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RelayEnvironment } from '../relay/RelayEnvironment';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from '../modules/Auth/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <SnackbarProvider>{children}</SnackbarProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </RelayEnvironmentProvider>
);
