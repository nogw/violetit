import clsx from 'clsx';
import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'flex w-full p-2',
        'bg-white dark:bg-neutral-900',
        'rounded border border-gray-300 dark:border-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
