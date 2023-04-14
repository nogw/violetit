import { Environment, RecordSource, Store } from 'relay-runtime';

import { NetworkWithResponseCache } from './RelayTypes';
import { createNetwork } from './RelayNetwork';

const IS_SERVER = typeof window === typeof undefined;

export const createRelayEnvironment = () => {
  const network = createNetwork();

  const environment = new Environment({
    network,
    store: new Store(new RecordSource()),
    isServer: IS_SERVER,
  });

  const environmentNetwork = environment.getNetwork() as NetworkWithResponseCache;
  environmentNetwork.responseCache = network.responseCache;

  return environment;
};
