import { Button, InfoText, Flex, Box, Checkbox, Tag } from '@violetit/ui';

import { IoMdPricetags } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';

import { PostComposerTags_query$key } from 'src/__generated__/PostComposerTags_query.graphql';
import { Popup } from 'src/components/Shared/Popup';

type TagValue = {
  id: string;
  label: string;
  color: string;
};

type PostComposerTagsProps = {
  community: PostComposerTags_query$key;
  selectedTags: Array<TagValue>;
  onSelectedChange: (selectedValues: Array<TagValue>) => void;
};

const QueryPostComposerTags = graphql`
  fragment PostComposerTags_query on Community {
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
`;

export const PostComposerTags = ({ community, selectedTags, onSelectedChange }: PostComposerTagsProps) => {
  const data = useFragment<PostComposerTags_query$key>(QueryPostComposerTags, community);

  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    setShowPopup(false);
  }, [pathname]);

  const handleChange = (value: TagValue, isChecked: boolean) => {
    const select = isChecked
      ? [...selectedTags, value]
      : selectedTags.filter(selectedValue => selectedValue.id !== value.id);
    onSelectedChange(select);
  };

  const handleClear = () => {
    onSelectedChange([]);
    setShowPopup(false);
  };

  const handleSave = () => {
    setShowPopup(false);
  };

  if (!data?.tags || data.tags.edges.length === 0) {
    return <InfoText>This community has not created tags for posts</InfoText>;
  }

  const communities = data.tags.edges.flatMap(edge => (edge?.node ? edge.node : []));

  const options = communities.map(node => ({ id: node.id, label: node.label, color: node.color }));

  return (
    <Box>
      {selectedTags.length ? (
        <Flex className="mb-4 gap-1">
          {selectedTags.map(value => {
            return <Tag key={value.id} label={value.label} color={value.color} />;
          })}
        </Flex>
      ) : null}
      <Button
        type="button"
        size="md"
        variant="neutral"
        onClick={() => setShowPopup(true)}
        aria-label="Choose the tags for the post"
      >
        <IoMdPricetags />
        Choose the tags
      </Button>
      <Popup title="Choose the appropriate tags" isOpen={showPopup} handleClose={() => setShowPopup(false)}>
        <Flex direction="col" className="gap-2">
          <Flex direction="col">
            {options.map(option => (
              <Checkbox
                key={option.id}
                label={option.label}
                isChecked={selectedTags.some(tag => option.id === tag.id)}
                onCheckedChange={isChecked => handleChange(option, isChecked)}
              />
            ))}
          </Flex>
          <Flex className="gap-2 border-t pt-3">
            <Button variant="secondary" onClick={handleClear} aria-label="Clear tags">
              Clear
            </Button>
            <Button variant="primary" onClick={handleSave} aria-label="Save tags">
              Save
            </Button>
          </Flex>
        </Flex>
      </Popup>
    </Box>
  );
};
