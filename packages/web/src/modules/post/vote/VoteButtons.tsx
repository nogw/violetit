import { VoteButton } from '@violetit/ui';

import { useMutation } from 'react-relay';
import { useState } from 'react';

import {
  VoteCreateMutation,
  VoteType,
} from './__generated__/VoteCreateMutation.graphql';

import { VoteCreate } from './VoteCreateMutation';

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
        else {
          // todo: error handling
          // eslint-disable-next-line
          console.log(error);
        }
      },
    });
  };

  return (
    <div className="w-10 flex flex-col justify-around items-center px-px">
      <VoteButton
        aria-label="upvote"
        direction="up"
        onClick={e => onSubmit(e, 'UPVOTE')}
      />
      <p className="text-xs font-semibold">{votes ? votesCount : votesCount}</p>
      <VoteButton
        aria-label="down"
        direction="down"
        onClick={e => onSubmit(e, 'DOWNVOTE')}
      />
    </div>
  );
};
