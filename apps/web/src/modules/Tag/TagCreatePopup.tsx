import { Box, Button, ColorField, Flex, Popup, Tag, TextField } from '@violetit/ui';

import { createPortal } from 'react-dom';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-relay';
import { useState } from 'react';

import { CreateTagMutation } from './mutations/__generated__/CreateTagMutation.graphql';
import { CreateTag } from './mutations/CreateTagMutation';

type TagCreatePopupProps = {
  onCreateTag: (tag: { id: string; color: string; label: string }) => void;
  communityId: string;
};

export const TagCreatePopup = ({ onCreateTag, communityId }: TagCreatePopupProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showPopup, setShowPopup] = useState(false);
  const [tagLabel, setTagLabel] = useState('');
  const [tagColor, setTagColor] = useState('');

  const [commit] = useMutation<CreateTagMutation>(CreateTag);

  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    closeSnackbar();

    commit({
      variables: {
        input: {
          label: tagLabel,
          color: tagColor,
          communityId,
        },
      },
      onCompleted: ({ tagCreateMutation }) => {
        if (tagCreateMutation?.error && tagCreateMutation.error.message) {
          enqueueSnackbar(tagCreateMutation.error.message, { variant: 'error' });
        }

        if (tagCreateMutation?.success && tagCreateMutation?.tagEdge?.node) {
          onCreateTag(tagCreateMutation.tagEdge.node);
          setShowPopup(false);
        }
      },
    });
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box>
      <Button variant="secondary" onClick={handleOpenPopup} aria-label="Create tag">
        Create tag
      </Button>
      {showPopup &&
        createPortal(
          <Popup title="Create a community" handleClose={handleClosePopup}>
            <Flex className="flex-col gap-2 border-b py-2 dark:border-neutral-700">
              <TextField
                placeholder="label"
                value={tagLabel}
                onChange={e => setTagLabel(e.target.value)}
                label="Tag label"
                aria-required
                aria-label="Tag label"
              />
              <ColorField
                value={tagColor}
                onChange={e => setTagColor(e.target.value)}
                label="Tag color"
                aria-required={false}
                aria-label="Tag color"
              />
              <Tag label={tagLabel} color={tagColor} />
            </Flex>
            <Flex className="ml-auto gap-2 pt-2">
              <Button variant="secondary" onClick={handleClosePopup} aria-label="Cancel tag creation">
                Cancel
              </Button>
              <Button variant="primary" onClick={e => handleCreate(e)} aria-label="Create tag">
                Create
              </Button>
            </Flex>
          </Popup>,
          document.body,
        )}
    </Box>
  );
};
