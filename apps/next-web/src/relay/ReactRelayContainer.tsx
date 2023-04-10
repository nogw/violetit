import { ReactRelayContext, useRelayEnvironment } from 'react-relay';
import { Fragment, Suspense, useMemo } from 'react';
import type { NextPage } from 'next';

import { createRelayEnvironment } from './RelayEnvironment';
import { PreloadedQueries, QueryRefs } from './RelayTypes';
import { Loading } from '@violetit/ui';

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
  const relayEnvironment = createRelayEnvironment();

  return (
    <ReactRelayContext.Provider value={{ environment: relayEnvironment }}>
      <Suspense fallback={<Loading />}>
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
      const queryId = params.id || params.text;

      if (queryId) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        environment.getNetwork().responseCache.set(params.id, variables, response);

        queryRefs[queryName] = {
          environment,
          fetchKey: queryId,
          fetchPolicy: 'store-or-network',
          isDisposed: false,
          name: params.name,
          kind: 'PreloadedQuery',
          variables,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          dispose: () => {},
        };
      }
    }

    return { ...otherProps, queryRefs };
  }, [environment, props]);

  return <Fragment>{getLayout(<Component {...(transformedProps as any)} />)}</Fragment>;
}

export type { NextPageWithLayout };
