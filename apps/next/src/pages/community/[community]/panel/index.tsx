import { Box, ErrorText } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { graphql } from 'relay-runtime';

import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { getPreloadedQuery } from 'src/relay/RelayNetwork';
import { getHeadersCookie } from 'src/utils/cookies';
import { TagPanel } from 'src/components/Tag/TagPanel';

import rootLayoutQuery, { RootLayoutQuery } from 'src/__generated__/RootLayoutQuery.graphql';
import layoutQuery, { PanelLayoutQuery as PanelLayoutQueryType } from 'src/__generated__/PanelLayoutQuery.graphql';
import pageQuery, { panelQuery as panelQueryType } from 'src/__generated__/panelQuery.graphql';
import PanelLayout from 'src/layouts/PanelLayout';
import RootLayout from 'src/layouts/RootLayout';

interface ContextProps extends ParsedUrlQuery {
  community: string;
}

interface PanelProps {
  queryRefs: {
    rootLayoutQuery: PreloadedQuery<RootLayoutQuery>;
    layoutQuery: PreloadedQuery<PanelLayoutQueryType>;
    pageQuery: PreloadedQuery<panelQueryType>;
  };
}

const panelQuery = graphql`
  query panelQuery($id: ID!) {
    community: node(id: $id) {
      ...TagPanel_community
    }
  }
`;

const Panel: NextPageWithLayout<PanelProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery<panelQueryType>(panelQuery, queryRefs.pageQuery);

  if (!data || !data.community) {
    return (
      <Box className="mx-4">
        <ErrorText>Community not found</ErrorText>;
      </Box>
    );
  }

  return <TagPanel fragmentKey={data.community} />;
};

Panel.getLayout = page => {
  return (
    <RootLayout queryRef={page.props.queryRefs.rootLayoutQuery}>
      <PanelLayout queryRef={page.props.queryRefs.layoutQuery}>{page}</PanelLayout>
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = getHeadersCookie(context.req.headers);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
      props: {},
    };
  }

  const { community } = context.params as ContextProps;

  if (!community) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, { id: community }, token),
        layoutQuery: await getPreloadedQuery(layoutQuery, { id: community }, token),
        rootLayoutQuery: await getPreloadedQuery(rootLayoutQuery, {}, token),
      },
    },
  };
};

export default Panel;
