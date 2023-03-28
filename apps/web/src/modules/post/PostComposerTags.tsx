import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLazyLoadQuery } from 'react-relay';
import { IoMdPricetags } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { graphql } from 'relay-runtime';

import { Button, InfoText, Flex, Box, Popup, Checkbox } from '@violetit/ui';
import { PostComposerTagsQuery } from './__generated__/PostComposerTagsQuery.graphql';

type PostComposerTagsProps = {
  community: string;
  selectedValues: Array<string>;
  onSelectedChange: (selectedValues: Array<string>) => void;
};

const QueryPostComposerTags = graphql`
  query PostComposerTagsQuery($id: String!) {
    community(id: $id) {
      tags {
        edges {
          node {
            id
            label
          }
        }
      }
    }
  }
`;

export const PostComposerTags = ({ community, selectedValues, onSelectedChange }: PostComposerTagsProps) => {
  const data = useLazyLoadQuery<PostComposerTagsQuery>(QueryPostComposerTags, { id: community });

  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowPopup(false);
  }, [location]);

  const handleChange = (value: string, isChecked: boolean) => {
    const selected = isChecked
      ? [...selectedValues, value]
      : selectedValues.filter(selectedValue => selectedValue !== value);
    onSelectedChange(selected);
  };

  if (!data.community?.tags || data.community.tags.edges.length === 0) {
    return <InfoText>This community has not created tags for posts</InfoText>;
  }

  const communities = data.community.tags.edges.flatMap(edge => (edge?.node ? edge.node : []));
  const options = communities.map(node => ({ value: node.id, label: node.label }));

  return (
    <Box>
      <Button size="md" variant="neutral" onClick={() => setShowPopup(true)}>
        <IoMdPricetags />
        Choose the tags
      </Button>
      {showPopup &&
        createPortal(
          <Popup title="Choose the appropriate tags" handleClose={() => setShowPopup(false)}>
            <Flex className="flex-col gap-2">
              <Flex className="flex-col">
                {options.map(({ value, label }, index) => (
                  <Checkbox
                    key={index}
                    label={label}
                    isChecked={selectedValues.includes(value)}
                    onCheckedChange={isChecked => handleChange(value, isChecked)}
                  />
                ))}
              </Flex>
              <Flex className="gap-2 border-t pt-3">
                <Button variant="secondary" onClick={() => onSelectedChange([])}>
                  Clear
                </Button>
                <Button variant="primary" onClick={() => setShowPopup(false)}>
                  Save
                </Button>
              </Flex>
            </Flex>
          </Popup>,
          document.body,
        )}
    </Box>
  );
};
