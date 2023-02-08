import clsx from 'clsx';

import { CardContent } from './CardContent';
import { Card } from './Card';
import { Flex } from './Flex';

type CardTitledProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
};

export const CardTitled = ({ title, className, children, ...props }: CardTitledProps) => {
  return (
    <Card className={clsx('flex flex-col p-0 h-min max-w-xs', className)} {...props}>
      <Flex className="rounded-t bg-blue-500 p-2">
        <h1 className="font-semibold text-sm text-white">{title}</h1>
      </Flex>
      <CardContent className="gap-3">{children}</CardContent>
    </Card>
  );
};
