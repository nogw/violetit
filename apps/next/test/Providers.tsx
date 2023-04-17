import { RelayEnvironmentProvider, Environment } from 'react-relay';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '../src/contexts/AuthContext';

interface Props {
  children: React.ReactElement;
  relayEnvironment: Environment;
}

export const WithProviders = ({ children, relayEnvironment }: Props) => {
  const environment = relayEnvironment;

  return (
    <RelayEnvironmentProvider environment={environment}>
      <SnackbarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </RelayEnvironmentProvider>
  );
};
