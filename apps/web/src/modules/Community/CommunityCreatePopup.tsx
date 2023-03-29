import { Box, Button, Popup } from '@violetit/ui';

import { createPortal } from 'react-dom';
import { useState } from 'react';

import { CommunityComposer } from './CommunityComposer';

export const CommunityCreatePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box>
      <Button size="md" variant="neutral" onClick={handleOpenPopup}>
        New community
      </Button>
      {showPopup &&
        createPortal(
          <Popup title="Create a community" handleClose={handleClosePopup}>
            <CommunityComposer />
          </Popup>,
          document.body,
        )}
    </Box>
  );
};
