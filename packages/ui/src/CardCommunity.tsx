import clsx from 'clsx';

import { CardContent } from './CardContent';
import { Card } from './Card';
import { Flex } from './Flex';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
};

export const CardCommunity = ({
  title,
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <Card className={clsx('flex flex-col p-0 px-0', className)} {...props}>
      <Flex className="rounded-t bg-sky-500 p-2">
        <h1 className="font-semibold text-sm text-white">{title}</h1>
      </Flex>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
