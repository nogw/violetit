import clsx from 'clsx';
import React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx('flex', className)} {...props}>
      {children}
    </div>
  );
});
