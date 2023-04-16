import { Flex, Text, VoteButton } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { VoteCreateMutation, VoteType } from 'src/__generated__/VoteCreateMutation.graphql';
import { VoteButtons_post$key } from 'src/__generated__/VoteButtons_post.graphql';
import { VoteCreate } from './mutations/VoteCreateMutation';

type VoteButtonsProps = {
  fragmentKey: VoteButtons_post$key;
};

export const VoteButtons = (props: VoteButtonsProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [commit, isPending] = useMutation<VoteCreateMutation>(VoteCreate);

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
    props.fragmentKey,
  );

  const [votesCount, setVotesCount] = useState<number>(post.votesCount);
  const [meHasVoted, setMeHasVoted] = useState(post.meHasVoted?.type);

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
    <Flex className="dark:bg-neutral-950 w-10 shrink-0 rounded-l bg-gray-100">
      <Flex direction="col" className="grow items-center py-2">
        <VoteButton
          aria-label="upvote"
          direction="up"
          voted={meHasVoted}
          disabled={isPending}
          onClick={e => handleVote(e, 'UPVOTE')}
        />
        <Text variant="p4" weight="semibold">
          {votesCount ? votesCount : 'Vote'}
        </Text>
        <VoteButton
          aria-label="down"
          direction="down"
          voted={meHasVoted}
          disabled={isPending}
          onClick={e => handleVote(e, 'DOWNVOTE')}
        />
      </Flex>
    </Flex>
  );
};
