import { CardTitled, Flex, Heading, Text } from '@violetit/ui';

import { graphql, useFragment } from 'react-relay';
import { BiCake } from 'react-icons/bi';

import { CommunityInfo_community$key } from 'src/__generated__/CommunityInfo_community.graphql';
import { formatDate } from 'src/utils/date';

interface CommunityInfoProps {
  fragmentKey: CommunityInfo_community$key;
}

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
    props.fragmentKey,
  );

  const { name, members, createdAt } = community;

  return (
    <CardTitled className="hidden md:block" title="About Community">
      <Heading variant="h5">r/{`${name}`}</Heading>
      <Flex className="items-center">
        <BiCake className="mr-1 text-lg text-black dark:text-white" />
        <Text color="secondary" variant="p4">
          {formatDate(new Date(createdAt || ''))}
        </Text>
      </Flex>
      <Flex className="border-y py-2 dark:border-neutral-700">
        <Flex direction="col">
          <Text variant="p2">{members.count}</Text>
          <Text color="secondary" variant="p4">
            Members
          </Text>
        </Flex>
      </Flex>
    </CardTitled>
  );
};
