import clsx from 'clsx';
import React from 'react';

import { CardContent } from './CardContent';
import { Card } from './Card';
import { Flex } from './Flex';

type CardTitledProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const CardTitled = React.forwardRef<HTMLDivElement, CardTitledProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <Card ref={ref} className={clsx('flex h-min max-w-xs flex-col p-0 pt-0', className)} {...props}>
        <Flex className="mb-2 rounded-t bg-blue-500 p-2">
          <h1 className="text-sm font-semibold text-white">{title}</h1>
        </Flex>
        <CardContent className="gap-3">{children}</CardContent>
      </Card>
    );
  },
);
