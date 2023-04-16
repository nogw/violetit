import { Button, Flex, Text } from '@violetit/ui';

import { useFragment } from 'react-relay';
import { useSnackbar } from 'notistack';
import { BiShareAlt } from 'react-icons/bi';
import { graphql } from 'relay-runtime';

import { PostFooter_post$key } from 'src/__generated__/PostFooter_post.graphql';

type PostFooterProps = {
  post: PostFooter_post$key;
};

export const PostFooter = (props: PostFooterProps) => {
  const post = useFragment<PostFooter_post$key>(
    graphql`
      fragment PostFooter_post on Post {
        id
        community {
          id
        }
      }
    `,
    props.post,
  );

  const { id, community } = post;
  const { enqueueSnackbar } = useSnackbar();

  const handleShare = (event: React.MouseEvent) => {
    event.preventDefault();

    const baseUrl = window.location.origin;

    navigator.clipboard.writeText(`${baseUrl}/community/${community?.id}/post/${id}`);
    enqueueSnackbar('Copied link!', { variant: 'info' });
  };

  return (
    <Flex className="my-2">
      <Button size="sm" variant="neutral" onClick={e => handleShare(e)} aria-label="Share post">
        <BiShareAlt />
        <Text color="secondary" variant="p4" weight="semibold">
          Share
        </Text>
      </Button>
    </Flex>
  );
};
