import clsx from 'clsx';
import React from 'react';

type CardActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('flex', className)} {...props}>
        {children}
      </div>
    );
  },
);
