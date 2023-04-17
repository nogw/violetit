import clsx from 'clsx';
import React from 'react';

type NavProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode | React.ReactNode[];
};

export const Nav = React.forwardRef<HTMLElement, NavProps>(({ children, className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={clsx(
        'h-12 w-full px-4',
        'bg-white dark:bg-neutral-900',
        'flex items-center justify-between',
        'border-b border-gray-300 dark:border-neutral-700',
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
});
