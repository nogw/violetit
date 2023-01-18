import { Flex, VoteButton } from '@violetit/ui';

import { useMutation } from 'react-relay';
import { useState } from 'react';

import { VoteCreate } from './VoteCreateMutation';

import {
  VoteCreateMutation,
  VoteType,
} from './__generated__/VoteCreateMutation.graphql';

type VoteButtonsProps = {
  votes: number;
  postId: string;
};

export const VoteButtons = ({ votes, postId }: VoteButtonsProps) => {
  const [votesCount, setVotesCount] = useState(votes);

  const [commit] = useMutation<VoteCreateMutation>(VoteCreate);

  const onSubmit = (e: React.MouseEvent, type: VoteType) => {
    e.preventDefault();

    commit({
      variables: {
        input: {
          postId,
          type,
        },
      },
      onCompleted: ({ VoteCreate }, error) => {
        if (VoteCreate?.post)
          setVotesCount(VoteCreate.post?.votesCount || votesCount);
        // todo: error handling
        // eslint-disable-next-line
        else console.log(error);
      },
    });
  };

  return (
    <Flex className="shrink-0 w-10">
      <Flex className="flex-col grow items-center">
        <VoteButton
          aria-label="upvote"
          direction="up"
          onClick={e => onSubmit(e, 'UPVOTE')}
        />
        <p className="text-xs font-semibold my-1">
          {votes ? votesCount : 'Vote'}
        </p>
        <VoteButton
          aria-label="down"
          direction="down"
          onClick={e => onSubmit(e, 'DOWNVOTE')}
        />
      </Flex>
    </Flex>
  );
};
