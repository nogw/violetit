import { MdClose } from 'react-icons/md';

import { Heading } from './Heading';
import { Button } from './Button';
import { Card } from './Card';
import { Flex } from './Flex';
import { Box } from './Box';

type PopupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  handleClose: () => void;
};

export const Popup = ({ children, title, handleClose }: PopupProps) => {
  return (
    <Box className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform shadow">
      <Card className="flex-col">
        <Flex className="mb-2 items-center justify-between border-b pb-2">
          <Heading variant="h5">{title}</Heading>
          <Button variant="neutral" onClick={handleClose}>
            <MdClose className="h-5 w-5 text-gray-500" />
          </Button>
        </Flex>
        {children}
      </Card>
    </Box>
  );
};
