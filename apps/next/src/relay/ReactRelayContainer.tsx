import { ReactRelayContext, useRelayEnvironment } from 'react-relay';
import { Fragment, Suspense, useMemo } from 'react';
import type { NextPage } from 'next';

import { NetworkWithResponseCache, PreloadedQueries, QueryRefs } from './RelayTypes';
import { createRelayEnvironment } from './RelayEnvironment';

type NextPageWithLayout<T = undefined> = NextPage<{ queryRefs: QueryRefs } & T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type ReactRelayProps<T, P extends { preloadedQueries?: PreloadedQueries }> = {
  Component: NextPageWithLayout<T>;
  props: P;
};

export function ReactRelayContainer<T, P extends { preloadedQueries?: PreloadedQueries }>({
  Component,
  props,
}: ReactRelayProps<T, P>) {
  const environment = useMemo(() => createRelayEnvironment(), []);

  return (
    <ReactRelayContext.Provider value={{ environment }}>
      <Suspense fallback={null}>
        <Hyderate Component={Component} props={props} />
      </Suspense>
    </ReactRelayContext.Provider>
  );
}

function Hyderate<T, P extends { preloadedQueries?: PreloadedQueries }>({ Component, props }: ReactRelayProps<T, P>) {
  const environment = useRelayEnvironment();
  const getLayout = Component.getLayout ?? (page => page);

  const transformedProps = useMemo(() => {
    if (props == null) {
      return props;
    }

    const { preloadedQueries, ...otherProps } = props;

    if (preloadedQueries == null) {
      return props;
    }

    const queryRefs: QueryRefs = {};
    for (const [queryName, { params, variables, response }] of Object.entries(preloadedQueries)) {
      const network = environment.getNetwork() as NetworkWithResponseCache;
      const queryId = params.id || params.text || '';

      network.responseCache.set(queryId, variables, response);

      queryRefs[queryName] = {
        variables,
        environment,
        name: params.name,
        kind: 'PreloadedQuery',
        fetchKey: queryId,
        fetchPolicy: 'store-or-network',
        isDisposed: false,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        dispose: () => {},
      };
    }

    return { ...otherProps, queryRefs };
  }, [props, environment]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Fragment>{getLayout(<Component {...(transformedProps as any)} />)}</Fragment>;
}

export type { NextPageWithLayout };
