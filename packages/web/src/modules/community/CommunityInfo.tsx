import { CardTitled, Flex } from '@violetit/ui';
import { formatDate } from '@/lib/formatDate';

import { BiCake } from 'react-icons/bi';
import { graphql, useFragment } from 'react-relay';

import { CommunityInfo_community$key } from './__generated__/CommunityInfo_community.graphql';

type CommunityInfoProps = {
  community: CommunityInfo_community$key;
};

export const CommunityInfo = (props: CommunityInfoProps) => {
  const community = useFragment<CommunityInfo_community$key>(
    graphql`
      fragment CommunityInfo_community on Community {
        name
        createdAt
        members {
          count
        }
      }
    `,
    props.community,
  );

  return (
    <CardTitled title="About Community">
      <h1 className="font-medium">r\{`${community.name}`}</h1>

      <Flex className="items-center">
        <BiCake className="text-lg mr-1" />
        <p className="text-sm text-gray-600">
          {formatDate(new Date(community.createdAt || ''))}
        </p>
      </Flex>

      <Flex className="border-y py-2">
        <Flex className="flex-col">
          <h3 className="font-medium">{community.members.count}</h3>
          <p className="text-sm text-gray-500">Members</p>
        </Flex>
      </Flex>
    </CardTitled>
  );
};
