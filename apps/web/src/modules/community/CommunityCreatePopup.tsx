import { Box, Button, Popup } from '@violetit/ui';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import { CommunityComposer } from './CommunityComposer';

export const CommunityComposerPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setShowPopup(false);
  }, [location]);

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
