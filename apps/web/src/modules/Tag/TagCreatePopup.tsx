import { Box, Button } from '@violetit/ui';

import { createPortal } from 'react-dom';
import { useState } from 'react';

import { TagComposer } from './TagComposer';
import { Popup } from '../../common/Popup';

type TagCreatePopupProps = {
  callbackTag: (tag: { id: string; color: string; label: string }) => void;
  communityId: string;
};

export const TagCreatePopup = (props: TagCreatePopupProps) => {
  const [showPopup, setShowPopup] = useState(false);

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
            <TagComposer handleClose={handleClosePopup} {...props} />
          </Popup>,
          document.body,
        )}
    </Box>
  );
};
