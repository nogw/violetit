import { Box, Button } from '@violetit/ui';
import { useState } from 'react';

import { TagComposer } from './TagComposer';
import { Popup } from '../Shared/Popup';

type TagPopupProps = {
  callbackTag: (tag: { id: string; color: string; label: string }) => void;
  communityId: string;
};

export const TagPopup = (props: TagPopupProps) => {
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
      <Popup title="Create a community" isOpen={showPopup} handleClose={handleClosePopup}>
        <TagComposer handleClose={handleClosePopup} {...props} />
      </Popup>
    </Box>
  );
};
