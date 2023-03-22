import { Flex, Text, VoteButton } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { VoteCreateMutation, VoteType } from './mutations/__generated__/VoteCreateMutation.graphql';
import { VoteButtons_post$key } from './__generated__/VoteButtons_post.graphql';
import { VoteCreate } from './mutations/VoteCreateMutation';

type VoteButtonsProps = {
  post: VoteButtons_post$key;
};

export const VoteButtons = (props: VoteButtonsProps) => {
  const post = useFragment<VoteButtons_post$key>(
    graphql`
      fragment VoteButtons_post on Post {
        id
        votesCount
        meHasVoted {
          type
        }
      }
    `,
    props.post,
  );

  const [votesCount, setVotesCount] = useState<number>(post.votesCount);
  const [meHasVoted, setMeHasVoted] = useState(post.meHasVoted?.type);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [commit] = useMutation<VoteCreateMutation>(VoteCreate);

  const handleVote = (e: React.MouseEvent, type: VoteType) => {
    e.preventDefault();
    closeSnackbar();

    commit({
      variables: {
        input: {
          postId: post.id,
          type,
        },
      },
      onCompleted: ({ voteCreate }) => {
        if (voteCreate?.error && voteCreate.error.message) {
          enqueueSnackbar(voteCreate.error.message, { variant: 'error' });
        }

        if (voteCreate?.post && voteCreate.post.votesCount !== undefined) {
          setMeHasVoted(voteCreate.post.meHasVoted?.type || meHasVoted);
          setVotesCount(voteCreate.post.votesCount);
        }
      },
    });
  };

  return (
    <Flex className="w-10 shrink-0 rounded-l-sm bg-gray-100 py-2">
      <Flex className="grow flex-col items-center">
        <VoteButton aria-label="upvote" direction="up" voted={meHasVoted} onClick={e => handleVote(e, 'UPVOTE')} />
        <Text variant="p4" weight="semibold">
          {votesCount ? votesCount : 'Vote'}
        </Text>
        <VoteButton aria-label="down" direction="down" voted={meHasVoted} onClick={e => handleVote(e, 'DOWNVOTE')} />
      </Flex>
    </Flex>
  );
};
