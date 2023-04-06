import { Box, Button } from '@violetit/ui';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import { CommunityComposer } from './CommunityComposer';
import { Popup } from '../../common/Popup';

export const CommunityCreatePopup = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    handleClosePopup();
  }, [location]);

  return (
    <Box>
      <Button size="md" aria-label="New community" variant="neutral" onClick={handleOpenPopup}>
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
