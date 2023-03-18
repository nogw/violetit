import { Box, Button, Card, Flex, Heading } from '@violetit/ui';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

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
          <Box className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform shadow">
            <Card className="flex-col">
              <Flex className="mb-2 items-center justify-between border-b pb-2">
                <Heading variant="h5">Create a community</Heading>
                <Button variant="neutral" onClick={handleClosePopup}>
                  <MdClose className="h-5 w-5 text-gray-500" />
                </Button>
              </Flex>
              <CommunityComposer />
            </Card>
          </Box>,
          document.body,
        )}
    </Box>
  );
};
