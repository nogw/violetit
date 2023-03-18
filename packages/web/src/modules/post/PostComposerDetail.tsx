import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Card, Flex, TextField, TextArea, Button, SelectInput, ErrorText, Box } from '@violetit/ui';

import { PostCreate } from './mutations/PostCreateMutation';
import { PostCreateMutation } from './mutations/__generated__/PostCreateMutation.graphql';

import { PostComposerMe } from './queries/PostComposerMeQuery';
import { PostComposerMeQuery } from './queries/__generated__/PostComposerMeQuery.graphql';
import { useSnackbar } from 'notistack';

export const PostComposerDetail = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [community, setCommunity] = useState<string>('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);

  const onSubmit = () => {
    closeSnackbar();

    postCreate({
      variables: {
        title,
        content,
        community,
      },
      onCompleted: ({ postCreate }) => {
        if (postCreate?.error && postCreate.error.message) {
          enqueueSnackbar(postCreate.error.message, { variant: 'error' });
        }

        if (!postCreate?.postEdge) {
          return;
        }

        const { postEdge } = postCreate;

        const postId = postEdge.node?.id;
        const communityId = postEdge.node?.community?.id;

        navigate(`/r/${communityId}/${postId}`, {
          replace: true,
        });
      },
    });
  };

  const data = useLazyLoadQuery<PostComposerMeQuery>(PostComposerMe, {});

  if (!data.me) {
    return <ErrorText>You are not logged!</ErrorText>;
  }

  if (!data.me.communities) {
    return <ErrorText>No communities found</ErrorText>;
  }

  const isDisabled = title.length <= 3 || content.length < 3 || isPending;

  const communities = data.me.communities.edges.flatMap(edge =>
    edge?.node ? { value: edge.node.id, text: `r/${edge.node.name}` } : [],
  );

  return (
    <Box className="m-2">
      <SelectInput
        initial="u/me"
        options={communities}
        value={community}
        onChange={e => setCommunity(e.target.value)}
      />
      <Card className="mt-2 px-4 py-4">
        <Flex className="w-full flex-col gap-4">
          <TextField placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextArea value={content} onChange={e => setContent(e.target.value)} />
          <Box className="ml-auto">
            <Button aria-label="Create post" disabled={isDisabled} size="md" variant="primary" onClick={onSubmit}>
              Create post
            </Button>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};
