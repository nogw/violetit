import clsx from 'clsx';
import React from 'react';

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('flex flex-col px-2', className)} {...props}>
        {children}
      </div>
    );
  },
);
