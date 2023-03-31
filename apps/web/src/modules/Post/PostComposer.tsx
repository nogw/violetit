import { Card, Flex, TextField, TextArea, Button, SelectInput, ErrorText, Box } from '@violetit/ui';

import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { PostCreateMutation } from './mutations/__generated__/PostCreateMutation.graphql';
import { PostCreate } from './mutations/PostCreateMutation';
import { PostComposerTags } from './PostComposerTags';
import { PostComposerQuery } from './__generated__/PostComposerQuery.graphql';

type TagValue = {
  id: string;
  label: string;
  color: string;
};

export const QueryPostComposer = graphql`
  query PostComposerQuery {
    me {
      communities {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export const PostComposer = () => {
  const navigate = useNavigate();

  const [tags, setTags] = useState<TagValue[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [community, setCommunity] = useState<string>('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);

  const onSubmit = () => {
    closeSnackbar();

    const tagsId = tags.map(tag => tag.id);

    postCreate({
      variables: {
        tags: tagsId,
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

        navigate(`/r/${communityId}/p/${postId}`, {
          replace: true,
        });
      },
    });
  };

  const data = useLazyLoadQuery<PostComposerQuery>(QueryPostComposer, {});

  if (!data.me) {
    return <ErrorText>You are not logged!</ErrorText>;
  }

  if (!data.me.communities) {
    return <ErrorText>No communities found</ErrorText>;
  }

  const isDisabled = title.length <= 3 || content.length < 3 || isPending;

  const communities = data.me.communities.edges.flatMap(edge => (edge?.node ? edge.node : []));
  const options = communities.map(node => ({ value: node.id, text: `r/${node.name}` }));

  return (
    <Box className="m-2">
      <SelectInput
        initial="Select a community"
        options={options}
        value={community}
        onChange={e => setCommunity(e.target.value)}
      />
      <Card className="mt-2 px-4 py-4">
        <Flex className="w-full flex-col gap-4">
          <TextField placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextArea value={content} onChange={e => setContent(e.target.value)} />
          <PostComposerTags community={community} selectedTags={tags} onSelectedChange={setTags} />
          <Box className="ml-auto">
            <Button disabled={isDisabled} size="md" variant="primary" onClick={onSubmit} aria-label="Create post">
              Create post
            </Button>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};
