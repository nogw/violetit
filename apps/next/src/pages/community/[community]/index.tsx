import { Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { graphql } from 'relay-runtime';

import { FeedQueryVariables, useFeedFilter } from 'src/hooks/useFeedFilter';
import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { getPreloadedQuery } from 'src/relay/RelayNetwork';
import { getHeadersCookie } from 'src/utils/cookies';
import { PostCreate } from 'src/components/Post/PostCreate';
import { FeedFilter } from 'src/components/Feed/FeedFilter';
import { FeedList } from 'src/components/Feed/FeedList';

import pageQuery, { CommunityQuery as CommunityQueryType } from 'src/__generated__/CommunityQuery.graphql';
import layoutQuery, { CommunityLayoutQuery } from 'src/__generated__/CommunityLayoutQuery.graphql';
import rootLayoutQuery, { RootLayoutQuery } from 'src/__generated__/RootLayoutQuery.graphql';
import CommunityLayout from 'src/layouts/CommunityLayout';
import RootLayout from 'src/layouts/RootLayout';

interface CommunityProps {
  queryFilters: FeedQueryVariables;
  queryRefs: {
    rootLayoutQuery: PreloadedQuery<RootLayoutQuery>;
    layoutQuery: PreloadedQuery<CommunityLayoutQuery>;
    pageQuery: PreloadedQuery<CommunityQueryType>;
  };
}

const CommunityQuery = graphql`
  query CommunityQuery($filters: PostFilter) {
    ...FeedListFragment @arguments(filters: $filters)
  }
`;

const Community: NextPageWithLayout<CommunityProps> = ({ queryFilters, queryRefs }) => {
  const data = usePreloadedQuery<CommunityQueryType>(CommunityQuery, queryRefs.pageQuery);

  const { feedFilter, ...handlers } = useFeedFilter(queryFilters);
  const { variables } = feedFilter;

  return (
    <Flex direction="col" fullWidth>
      <PostCreate />
      <FeedFilter feedFilter={feedFilter} {...handlers} />
      <FeedList fragmentKey={data} queryVariables={variables} />
    </Flex>
  );
};

Community.getLayout = page => {
  return (
    <RootLayout queryRef={page.props.queryRefs.rootLayoutQuery}>
      <CommunityLayout withInfo queryRef={page.props.queryRefs.layoutQuery}>
        {page}
      </CommunityLayout>
    </RootLayout>
  );
};

interface ContextProps extends ParsedUrlQuery {
  community: string;
}

interface ContextParams extends ParsedUrlQuery {
  tags?: string;
}

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
  const { tags } = context.query as ContextParams;

  if (!community) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  const queryFilters = {
    filters: {
      ...(tags ? { tags } : {}),
      community,
    },
  };

  return {
    props: {
      queryFilters: queryFilters.filters,
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, queryFilters, token),
        layoutQuery: await getPreloadedQuery(layoutQuery, { id: community }, token),
        rootLayoutQuery: await getPreloadedQuery(rootLayoutQuery, {}, token),
      },
    },
  };
};

export default Community;
