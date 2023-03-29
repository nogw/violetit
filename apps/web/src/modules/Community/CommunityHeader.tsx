import { Flex, Box, Button, Heading, Text } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { BsFillGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { CommunityHeader_community$key } from './__generated__/CommunityHeader_community.graphql';
import { CommunityJoinMutation } from './mutations/__generated__/CommunityJoinMutation.graphql';
import { CommunityExitMutation } from './mutations/__generated__/CommunityExitMutation.graphql';

import { CommunityExit } from './mutations/CommunityExitMutation';
import { CommunityJoin } from './mutations/CommunityJoinMutation';
import { Link } from 'src/common/Link';

type CommunityHeaderProps = {
  community: CommunityHeader_community$key;
};

export const CommunityHeader = (props: CommunityHeaderProps) => {
  const navigate = useNavigate();

  const community = useFragment<CommunityHeader_community$key>(
    graphql`
      fragment CommunityHeader_community on Community {
        id
        name
        title
        joined
        amIOwner
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
          <Link to={`/r/${community.id}`}>
            <Heading variant="h4">{community.title}</Heading>
          </Link>
          <Text color="secondary">r/{community.name}</Text>
        </Flex>
        <Flex className="h-min gap-2">
          <Button variant={joinedButtonProps.variant} onClick={e => handleJoin(e)}>
            {joinedButtonProps.text}
          </Button>
          {community.amIOwner ? (
            <Button variant="neutral" onClick={() => navigate(`/r/panel/${community.id}`)}>
              <BsFillGearFill /> Mod Tools
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};
