import clsx from 'clsx';
import React from 'react';

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'text-sm text-black dark:text-white',
          'bg-white dark:bg-neutral-800',
          'rounded border border-gray-300 dark:border-neutral-700',
          'w-full cursor-pointer p-2 outline-none sm:w-64',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
