import { Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GetServerSideProps } from 'next';
import { graphql } from 'relay-runtime';

import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { getPreloadedQuery } from 'src/relay/RelayNetwork';
import { getHeadersCookie } from 'src/utils/cookies';
import { PostComposer } from 'src/components/Post/PostComposer';

import rootLayoutQuery, { RootLayoutQuery as RootLayoutQueryType } from 'src/__generated__/RootLayoutQuery.graphql';
import pageQuery, { submitQuery as submitQueryType } from 'src/__generated__/submitQuery.graphql';
import RootLayout from 'src/layouts/RootLayout';

const submitQuery = graphql`
  query submitQuery {
    ...PostComposer_query
  }
`;

interface HomeProps {
  queryRefs: {
    pageQuery: PreloadedQuery<submitQueryType>;
    rootLayoutQuery: PreloadedQuery<RootLayoutQueryType>;
  };
}

const Home: NextPageWithLayout<HomeProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery(submitQuery, queryRefs.pageQuery);

  if (!data) {
    return null;
  }

  return (
    <Flex className="m-2 w-auto">
      <PostComposer query={data} />
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
