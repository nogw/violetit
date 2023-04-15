import { Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GetServerSideProps } from 'next';
import { graphql } from 'relay-runtime';

import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { getPreloadedQuery } from 'src/relay/RelayNetwork';
import { getHeadersCookie } from 'src/utils/cookies';
import { useFeedFilter } from 'src/hooks/useFeedFilter';
import { PostCreate } from 'src/components/Post/PostCreate';
import { FeedFilter } from 'src/components/Feed/FeedFilter';
import { FeedList } from 'src/components/Feed/FeedList';

import rootLayoutQuery, { RootLayoutQuery as RootLayoutQueryType } from 'src/__generated__/RootLayoutQuery.graphql';
import pageQuery, { pagesIndexQuery as pagesIndexQueryType } from 'src/__generated__/pagesIndexQuery.graphql';
import RootLayout from 'src/layouts/RootLayout';

const pagesIndexQuery = graphql`
  query pagesIndexQuery {
    ...FeedListFragment
  }
`;

interface HomeProps {
  queryRefs: {
    pageQuery: PreloadedQuery<pagesIndexQueryType>;
    rootLayoutQuery: PreloadedQuery<RootLayoutQueryType>;
  };
}

const Home: NextPageWithLayout<HomeProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery(pagesIndexQuery, queryRefs.pageQuery);

  const { feedFilter, ...handlers } = useFeedFilter();
  const { variables } = feedFilter;

  return (
    <Flex className="m-2">
      <Flex direction="col" isFullWidth>
        <PostCreate />
        <FeedFilter feedFilter={feedFilter} {...handlers} />
        <FeedList fragmentKey={data} queryVariables={variables} />
      </Flex>
    </Flex>
  );
};

Home.getLayout = page => {
  return <RootLayout queryRef={page.props.queryRefs.rootLayoutQuery}>{page}</RootLayout>;
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

  return {
    props: {
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, {}, token),
        rootLayoutQuery: await getPreloadedQuery(rootLayoutQuery, {}, token),
      },
    },
  };
};

export default Home;
