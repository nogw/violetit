import { Heading, Button, Card, Flex, Box } from '@violetit/ui';

import { useClickOutside } from 'src/hooks/useClickOutside';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

import { Backdrop } from './Backdrop';

type PopupProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode | React.ReactNode[];
};

export const Popup = ({ isOpen, handleClose, title, children }: PopupProps) => {
  const { elementRef } = useClickOutside<HTMLDivElement>(handleClose);

  return createPortal(
    <Backdrop isOpen={isOpen}>
      <Box ref={elementRef} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform shadow-md">
        <Card className="flex-col">
          <Flex className="mb-2 items-center justify-between gap-4 border-b pb-2 dark:border-neutral-700">
            <Heading variant="h5">{title}</Heading>
            <Button variant="neutral" onClick={handleClose} aria-label="Close popup">
              <MdClose className="h-5 w-5 text-gray-500" />
            </Button>
          </Flex>
          {children}
        </Card>
      </Box>
    </Backdrop>,
    document.body,
  );
};
