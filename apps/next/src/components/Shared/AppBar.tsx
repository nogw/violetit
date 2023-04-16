import { Box, Button, Card, Flex, Text } from '@violetit/ui';

import { RiMagicFill, RiMenuFill } from 'react-icons/ri';
import { useState } from 'react';
import clsx from 'clsx';

import { ToggleTheme } from './ToggleTheme';
import { Link } from './Link';

type AppBarProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
};

export const AppBar = ({ title, children }: AppBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="col" fullWidth className="sticky top-0">
      <Flex
        className={clsx(
          'h-12 w-full px-4',
          'bg-white dark:bg-neutral-900',
          'flex items-center justify-between',
          'border-b border-gray-300 dark:border-neutral-700',
        )}
      >
        <Link href={'/'} underline={false}>
          <Flex className="mr-4 items-center justify-between gap-2">
            <RiMagicFill className="h-6 w-6 text-orange-700 sm:mr-0" />
            <Text weight="semibold" variant="p2">
              {title}
            </Text>
          </Flex>
        </Link>
        <Box className="hidden gap-2 sm:flex">{children}</Box>
        <Box className="flex gap-2 sm:hidden">
          <ToggleTheme />
          <Button variant="neutral" type="button" className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            <RiMenuFill className="h-6 w-4" />
          </Button>
        </Box>
      </Flex>
      {isOpen && (
        <Flex fullWidth className="fixed top-12 w-full px-2 py-2">
          <Card className="flex flex-col gap-2 p-2 shadow-xl">{children}</Card>
        </Flex>
      )}
    </Flex>
  );
};
