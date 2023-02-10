import { Flex, VoteButton } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { useState } from 'react';

import { VoteCreate } from './mutations/VoteCreateMutation';

import { VoteCreateMutation, VoteType } from './mutations/__generated__/VoteCreateMutation.graphql';
import { VoteButtons_post$key } from './mutations/__generated__/VoteButtons_post.graphql';

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

  const [commit] = useMutation<VoteCreateMutation>(VoteCreate);

  const handleVote = (e: React.MouseEvent, type: VoteType) => {
    e.preventDefault();

    commit({
      variables: {
        input: {
          postId: post.id,
          type,
        },
      },
      onCompleted: ({ VoteCreate }, error) => {
        if (VoteCreate?.post) {
          setVotesCount(VoteCreate.post?.votesCount || votesCount);
          setMeHasVoted(VoteCreate.post?.meHasVoted?.type || meHasVoted);
        }
        // eslint-disable-next-line
        else console.log(error);
      },
    });
  };

  return (
    <Flex className="shrink-0 w-10">
      <Flex className="flex-col grow items-center">
        <VoteButton aria-label="upvote" voted={meHasVoted} direction="up" onClick={e => handleVote(e, 'UPVOTE')} />
        <p className="text-xs font-semibold my-1">{votesCount ? votesCount : 'Vote'}</p>
        <VoteButton aria-label="down" voted={meHasVoted} direction="down" onClick={e => handleVote(e, 'DOWNVOTE')} />
      </Flex>
    </Flex>
  );
};
