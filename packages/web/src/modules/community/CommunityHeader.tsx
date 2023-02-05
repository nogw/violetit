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

    setJoined(!joined);

    const mutation = joined ? exitCommunity : joinCommunity;

    mutation({
      variables: config.variables,
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          return setJoined(!joined);
        }
      },
    });
  };

  return (
    <Flex className="flex-col w-full h-36">
      <Box className="bg-blue-500 h-3/6" />
      <Flex className="bg-white h-3/6 py-2 justify-center">
        <Flex className="flex-col mr-4">
          <h1 className="text-xl font-semibold">{community.title}</h1>
          <p className="text-sm text-gray-500 font-medium">{community.name}</p>
        </Flex>
        {joined ? (
          <Button className="rounded-full h-min py-1" onClick={e => handleJoin(e)}>
            Joined
          </Button>
        ) : (
          <Button
            className="text-white bg-blue-500 rounded-full border-none h-min py-1 hover:text-white"
            onClick={e => handleJoin(e)}
          >
            Join
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
