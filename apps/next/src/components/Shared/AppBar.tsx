import { RiMagicFill } from 'react-icons/ri';
import clsx from 'clsx';

import { Flex } from '@violetit/ui';
import { Link } from './Link';

type AppBarProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
};

export const AppBar = ({ title, children }: AppBarProps) => {
  return (
    <Flex
      className={clsx(
        'sticky top-0 h-12 w-full px-4',
        'bg-white dark:bg-neutral-900',
        'items-center justify-between',
        'border-b border-gray-300 dark:border-neutral-700',
      )}
    >
      <Link href={'/'} underline={false}>
        <Flex className="items-center justify-between gap-3">
          <RiMagicFill className="mr-4 h-6 w-6 text-orange-700 sm:mr-0" />
          <h1 className="semibold hidden text-lg text-black dark:text-white sm:block">{title}</h1>
        </Flex>
      </Link>
      <Flex isFullHeight className="gap-2">
        {children}
      </Flex>
    </Flex>
  );
};
