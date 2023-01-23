import clsx from 'clsx';

import { Flex } from './Flex';

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <Flex className={clsx('flex-col p-2', className)} {...props}>
      {children}
    </Flex>
  );
};
