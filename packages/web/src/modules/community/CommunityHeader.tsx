import { Flex, Box, Button } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';

import { CommunityHeader_community$key } from './__generated__/CommunityHeader_community.graphql';

type CommunityHeaderProps = {
  community: CommunityHeader_community$key;
};

export const CommunityHeader = (props: CommunityHeaderProps) => {
  const community = useFragment<CommunityHeader_community$key>(
    graphql`
      fragment CommunityHeader_community on Community {
        name
        title
        joined
      }
    `,
    props.community,
  );

  return (
    <Flex className="flex-col w-full h-36">
      <Box className="bg-blue-500 h-3/6" />
      <Flex className="bg-white h-3/6 py-2 justify-center">
        <Flex className="flex-col mr-4">
          <h1 className="text-xl font-semibold">{community.title}</h1>
          <p className="text-sm text-gray-500 font-medium">{community.name}</p>
        </Flex>
        <Button className="rounded-full h-min py-1">
          {community.joined ? 'Joined' : 'Join'}
        </Button>
      </Flex>
    </Flex>
  );
};
