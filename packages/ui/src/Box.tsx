import clsx from 'clsx';
import React from 'react';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
};

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx('shrink-0 grow-0', className)} {...props}>
      {children}
    </div>
  );
});
