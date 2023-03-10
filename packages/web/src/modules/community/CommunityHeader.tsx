import { Flex, Box, Button } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { useState } from 'react';

import { CommunityExit } from './mutations/CommunityExitMutation';
import { CommunityJoin } from './mutations/CommunityJoinMutation';

import { CommunityHeader_community$key } from './__generated__/CommunityHeader_community.graphql';
import { CommunityJoinMutation } from './mutations/__generated__/CommunityJoinMutation.graphql';
import { CommunityExitMutation } from './mutations/__generated__/CommunityExitMutation.graphql';

type CommunityHeaderProps = {
  community: CommunityHeader_community$key;
};

export const CommunityHeader = (props: CommunityHeaderProps) => {
  const community = useFragment<CommunityHeader_community$key>(
    graphql`
      fragment CommunityHeader_community on Community {
        id
        name
        title
        joined
      }
    `,
    props.community,
  );

  const [joined, setJoined] = useState<boolean>(community.joined);

  const [joinCommunity] = useMutation<CommunityJoinMutation>(CommunityJoin);
  const [exitCommunity] = useMutation<CommunityExitMutation>(CommunityExit);

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();

    const config = {
      variables: {
        input: {
          communityId: community.id,
        },
      },
    };

    const mutation = joined ? exitCommunity : joinCommunity;

    setJoined(!joined);

    mutation({
      variables: config.variables,
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          return setJoined(!joined);
        }
      },
    });
  };

  const joinedButtonProps = joined
    ? { text: 'Joined', className: 'rounded-full h-min py-1' }
    : { text: 'Join', className: 'text-white bg-blue-500 rounded-full border-none h-min py-1' };

  return (
    <Flex className="mb-2 h-36 w-full flex-col">
      <Box className="h-3/6 bg-blue-500" />
      <Flex className="h-3/6 justify-center bg-white py-2">
        <Flex className="mr-4 flex-col">
          <h1 className="text-xl font-semibold">{community.title}</h1>
          <p className="text-sm font-medium text-gray-500">{community.name}</p>
        </Flex>
        <Button className={joinedButtonProps.className} onClick={e => handleJoin(e)}>
          {joinedButtonProps.text}
        </Button>
      </Flex>
    </Flex>
  );
};
