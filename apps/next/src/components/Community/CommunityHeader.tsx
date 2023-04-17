import { Flex, Box, Button, Heading, Text } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { BsFillGearFill } from 'react-icons/bs';
import { useState } from 'react';

import { CommunityHeader_community$key } from 'src/__generated__/CommunityHeader_community.graphql';
import { CommunityJoinMutation } from 'src/__generated__/CommunityJoinMutation.graphql';
import { CommunityExitMutation } from 'src/__generated__/CommunityExitMutation.graphql';

import { CommunityExit } from './mutations/CommunityExitMutation';
import { CommunityJoin } from './mutations/CommunityJoinMutation';
import { LinkButton } from '../Shared/LinkButton';
import { Link } from 'src/components/Shared/Link';

interface ButtonProps {
  text: string;
  aria: string;
  variant: 'primary' | 'secondary';
}

interface CommunityHeaderProps {
  fragmentKey: CommunityHeader_community$key;
}

export const CommunityHeader = (props: CommunityHeaderProps) => {
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
    props.fragmentKey,
  );

  const [joined, setJoined] = useState<boolean>(community.joined);

  const [joinCommunity] = useMutation<CommunityJoinMutation>(CommunityJoin);
  const [exitCommunity] = useMutation<CommunityExitMutation>(CommunityExit);

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    setJoined(!joined);

    const mutation = joined ? exitCommunity : joinCommunity;

    const config = {
      variables: {
        input: { communityId: community.id },
      },
    };

    mutation({
      variables: config.variables,
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          return setJoined(joined);
        }
      },
    });
  };

  const { id, name, title, amIOwner } = community;

  const buttonProps: ButtonProps = joined
    ? { text: 'Joined', aria: 'Leave the community', variant: 'primary' }
    : { text: 'Join', aria: 'Join community', variant: 'secondary' };

  return (
    <Flex direction="col" fullWidth className="mb-2 h-36">
      <Box className="h-3/6 bg-blue-500" />
      <Flex className="h-3/6 justify-center bg-white py-2 dark:bg-neutral-900">
        <Flex direction="col" className="mr-4">
          <Link href={`/community/${id}`}>
            <Heading variant="h4">{title}</Heading>
          </Link>
          <Text color="secondary">r/{name}</Text>
        </Flex>
        <Flex className="h-min gap-2">
          <Button variant={buttonProps.variant} onClick={e => handleJoin(e)} aria-label={buttonProps.aria}>
            {buttonProps.text}
          </Button>
          {amIOwner ? (
            <LinkButton href={`/community/${id}/panel`} variant="neutral" aria-label="Moderator tools">
              <BsFillGearFill /> Mod Tools
            </LinkButton>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};
