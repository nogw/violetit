import { Button, Box, Flex, Text, Stack, Tag } from '@violetit/ui';

import { graphql, useFragment, useMutation } from 'react-relay';
import { BsTrashFill } from 'react-icons/bs';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { TagPanel_community$key } from './__generated__/TagPanel_community.graphql';
import { DeleteTag } from './mutations/DeleteTagMutation';
import { TagCreatePopup } from './TagCreatePopup';
import { DeleteTagMutation } from './mutations/__generated__/DeleteTagMutation.graphql';

type TagPanelProps = {
  community: TagPanel_community$key;
};

export const TagPanel = (props: TagPanelProps) => {
  const community = useFragment<TagPanel_community$key>(
    graphql`
      fragment TagPanel_community on Community {
        id
        tags {
          edges {
            node {
              id
              label
              color
            }
          }
        }
      }
    `,
    props.community,
  );

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [currentTags, setCurrentTags] = useState(community.tags.edges.flatMap(edge => (edge?.node ? edge.node : [])));

  const [commit] = useMutation<DeleteTagMutation>(DeleteTag);

  const handleDelete = (e: React.MouseEvent, tagId: string) => {
    e.preventDefault();
    closeSnackbar();

    commit({
      variables: {
        input: {
          tagId,
          communityId: community.id,
        },
      },
      onCompleted: ({ tagDeleteMutation }) => {
        if (tagDeleteMutation?.error && tagDeleteMutation.error.message) {
          enqueueSnackbar(tagDeleteMutation.error.message, { variant: 'error' });
        }

        if (tagDeleteMutation?.success) {
          const filteredTags = currentTags.filter(tag => tag.id !== tagId);
          setCurrentTags(filteredTags);
        }
      },
    });
  };

  const handleCreate = (tag: { id: string; color: string; label: string }) => {
    setCurrentTags([...currentTags, tag]);
  };

  return (
    <Flex className="w-full flex-col rounded bg-white p-2">
      <Box className="ml-auto mb-2">
        <TagCreatePopup onCreateTag={handleCreate} communityId={community.id} />
      </Box>
      <Flex className="flex-col rounded border border-slate-300">
        <Box className="bg-gray-200 p-2">
          <Text color="secondary" weight="semibold">
            User tags preview
          </Text>
        </Box>
        <Box className="mx-2">
          <Stack direction="col" divide>
            {currentTags.map(({ id, label, color }) => (
              <Flex key={id} className="items-center justify-between py-2">
                <Tag label={label} color={color} />
                <Button variant="neutral" onClick={e => handleDelete(e, id)} aria-label="Delete tag">
                  <BsTrashFill />
                </Button>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};
