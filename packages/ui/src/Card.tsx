import clsx from 'clsx';
import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('flex w-full p-2 py-3', 'rounded border border-solid border-gray-300 bg-white', className)}
      {...props}
    >
      {children}
    </div>
  );
});
