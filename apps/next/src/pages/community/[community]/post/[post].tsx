import { Box, ErrorText, Flex } from '@violetit/ui';

import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { graphql } from 'relay-runtime';

import { NextPageWithLayout } from 'src/relay/ReactRelayContainer';
import { getPreloadedQuery } from 'src/relay/RelayNetwork';
import { getHeadersCookie } from 'src/utils/cookies';
import { PostDetail } from 'src/components/Post/PostDetail';

import rootLayoutQuery, { RootLayoutQuery } from 'src/__generated__/RootLayoutQuery.graphql';
import layoutQuery, { CommunityLayoutQuery } from 'src/__generated__/CommunityLayoutQuery.graphql';
import pageQuery, { Post_PostQuery } from 'src/__generated__/Post_PostQuery.graphql';
import CommunityLayout from 'src/layouts/CommunityLayout';
import RootLayout from 'src/layouts/RootLayout';

interface ContextProps extends ParsedUrlQuery {
  community: string;
  post: string;
}

interface PostProps {
  queryRefs: {
    rootLayoutQuery: PreloadedQuery<RootLayoutQuery>;
    layoutQuery: PreloadedQuery<CommunityLayoutQuery>;
    pageQuery: PreloadedQuery<Post_PostQuery>;
  };
}

const PostQuery = graphql`
  query Post_PostQuery($id: ID!) {
    post: node(id: $id) {
      ...PostDetail_post
    }
  }
`;

const Post: NextPageWithLayout<PostProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery<Post_PostQuery>(PostQuery, queryRefs.pageQuery);

  if (!data || !data.post) {
    return (
      <Box className="mx-4">
        <ErrorText>Post not found</ErrorText>
      </Box>
    );
  }

  return (
    <Flex fullWidth>
      <PostDetail isDetail fragmentKey={data.post} />
    </Flex>
  );
};

Post.getLayout = page => {
  return (
    <RootLayout queryRef={page.props.queryRefs.rootLayoutQuery}>
      <CommunityLayout withInfo queryRef={page.props.queryRefs.layoutQuery}>
        {page}
      </CommunityLayout>
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

  const { community, post } = context.params as ContextProps;

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
        pageQuery: await getPreloadedQuery(pageQuery, { id: post }, token),
        layoutQuery: await getPreloadedQuery(layoutQuery, { id: community }, token),
        rootLayoutQuery: await getPreloadedQuery(rootLayoutQuery, {}, token),
      },
    },
  };
};

export default Post;
