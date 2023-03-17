import { Flex, Box, Button, Heading, Text } from '@violetit/ui';

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
    setJoined(!joined);

    const config = {
      variables: {
        input: {
          communityId: community.id,
        },
      },
    };

    const mutation = joined ? exitCommunity : joinCommunity;

    mutation({
      variables: config.variables,
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          return setJoined(joined);
        }
      },
    });
  };

  const joinedButtonProps: { text: string; variant: 'primary' | 'secondary' } = joined
    ? { text: 'Joined', variant: 'primary' }
    : { text: 'Join', variant: 'secondary' };

  return (
    <Flex className="mb-2 h-36 w-full flex-col">
      <Box className="h-3/6 bg-blue-500" />
      <Flex className="h-3/6 justify-center bg-white py-2">
        <Flex className="mr-4 flex-col">
          <Heading variant="h4">{community.title}</Heading>
          <Text color="secondary">r/{community.name}</Text>
        </Flex>
        <Box>
          <Button variant={joinedButtonProps.variant} onClick={e => handleJoin(e)}>
            {joinedButtonProps.text}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
