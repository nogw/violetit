import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { cacheHandler } from './RelayNetwork';

export const RelayEnvironment = new Environment({
  network: Network.create(cacheHandler),
  store: new Store(new RecordSource()),
});
