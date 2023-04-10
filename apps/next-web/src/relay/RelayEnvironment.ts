import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { cacheHandler } from './RelayNetwork';

const IS_SERVER = typeof window === typeof undefined;

export const createRelayEnvironment = () => {
  const network = Network.create(cacheHandler);

  const environment = new Environment({
    network,
    store: new Store(new RecordSource()),
    isServer: IS_SERVER,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  environment.getNetwork().responseCache = network.responseCache;

  return environment;
};
