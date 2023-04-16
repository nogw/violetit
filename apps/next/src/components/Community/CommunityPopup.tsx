import { Box, Button } from '@violetit/ui';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiPlus } from 'react-icons/fi';

import { CommunityComposer } from './CommunityComposer';
import { useIsMounted } from 'src/hooks/useIsMounted';
import { Popup } from 'src/components/Shared/Popup';

export const CommunityPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = useRouter();

  const isMounted = useIsMounted();

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    handleClosePopup();
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <Box className="w-auto">
      <Button className="flex h-full sm:hidden" variant="neutral" aria-label="New community" onClick={handleOpenPopup}>
        <FiPlus />
      </Button>
      <Button className="hidden sm:flex" aria-label="New community" variant="neutral" onClick={handleOpenPopup}>
        New community
      </Button>
      <Popup title="Create a community" isOpen={showPopup} handleClose={handleClosePopup}>
        <CommunityComposer />
      </Popup>
    </Box>
  );
};
