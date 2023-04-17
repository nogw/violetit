import { RelayEnvironmentProvider, Environment } from 'react-relay';

import { createRelayEnvironment } from '../src/relay/RelayEnvironment';
import { AuthProvider } from '../src/contexts/AuthContext';

interface Props {
  children: React.ReactElement;
  relayEnvironment?: Environment;
}

export const WithProviders = ({ children, relayEnvironment }: Props) => {
  const environment = relayEnvironment ?? createRelayEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>{children}</AuthProvider>
    </RelayEnvironmentProvider>
  );
};
