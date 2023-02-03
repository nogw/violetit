import { Card, Flex, Input, TextArea, Button, SelectInput, ErrorText } from '@violetit/ui';

import { useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import { PostCreate } from './mutations/PostCreateMutation';
import { PostCreateMutation } from './mutations/__generated__/PostCreateMutation.graphql';

import { PostComposerMe } from './queries/PostComposerMeQuery';
import { PostComposerMeQuery } from './queries/__generated__/PostComposerMeQuery.graphql';

export const PostComposerDetail = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [community, setCommunity] = useState<string>('');

  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);

  const onSubmit = () => {
    postCreate({
      variables: {
        title,
        content,
        community,
      },
      onCompleted: ({ postCreateMutation }) => {
        if (!postCreateMutation) {
          return;
        }

        const { postEdge } = postCreateMutation;

        const postId = postEdge?.node?.id;
        const communityId = postEdge?.node?.community?.id;

        navigate(`/r/${communityId}/${postId}`, {
          replace: true,
        });
      },
    });
  };

  const data = useLazyLoadQuery<PostComposerMeQuery>(PostComposerMe, {});

  if (!data.me) {
    return <ErrorText>No user found</ErrorText>;
  }

  if (!data.me.communities) {
    return <ErrorText>No communities found</ErrorText>;
  }

  const communities = data.me.communities.edges.flatMap(edge =>
    edge?.node ? { value: edge.node.id, text: `r${edge.node.name}` } : [],
  );

  const isDisabled = title.length <= 3 || content.length < 3 || isPending;

  return (
    <div className="m-2">
      <SelectInput
        initial="u/me"
        options={communities}
        value={community}
        onChange={e => setCommunity(e.target.value)}
        className="sm:w-64"
      />
      <Card className="px-4 py-4">
        <Flex className="flex-col w-full gap-4">
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextArea value={content} onChange={e => setContent(e.target.value)} />
          <Button onClick={onSubmit} disabled={isDisabled} className="w-min ml-auto rounded-full py-2">
            Post
          </Button>
        </Flex>
      </Card>
    </div>
  );
};
