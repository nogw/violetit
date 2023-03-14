import clsx from 'clsx';

import { CardContent } from './CardContent';
import { Card } from './Card';
import { Flex } from './Flex';

type CardTitledProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const CardTitled = ({ title, className, children, ...props }: CardTitledProps) => {
  return (
    <Card className={clsx('flex h-min max-w-xs flex-col p-0 pt-0', className)} {...props}>
      <Flex className="mb-2 rounded-t bg-blue-500 p-2">
        <h1 className="text-sm font-semibold text-white">{title}</h1>
      </Flex>
      <CardContent className="gap-3">{children}</CardContent>
    </Card>
  );
};
