import clsx from 'clsx';
import React from 'react';

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: 'initial' | 'neutral';
  padding?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
};

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ children, className, variant = 'initial', padding = 'md', isFullWidth, ...props }, ref) => {
    const styles = {
      variant: {
        initial: 'text-black bg-white',
        neutral: 'text-neutral-500 bg-neutral-100',
      },
      padding: {
        sm: 'px-1 py-0 text-sm',
        md: 'py-1 px-2 text-md',
        lg: 'py-2 px-4 text-lg',
      },
      isFullWidth: 'w-full',
    };

    return (
      <select
        ref={ref}
        className={clsx(
          'appearance-none rounded border p-1 transition-colors',
          'border-neutral-200 dark:border-neutral-700',
          'text-black dark:text-neutral-200',
          'bg-white dark:bg-neutral-800',
          'w-full cursor-pointer',
          'cursor-pointer',
          { [styles.isFullWidth]: isFullWidth },
          styles.variant[variant],
          styles.padding[padding],
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

export type { SelectInputProps };
