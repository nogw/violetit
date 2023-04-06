import clsx from 'clsx';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  border?: 'default' | 'warning' | 'error';
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, border = 'default', ...props }, ref) => {
    const styles = {
      border: {
        default: 'border dark:border-neutral-700',
        warning: 'border-yellow-500 dark:border-yellow-500',
        error: 'border-red-500 dark:border-red-500',
      },
    };

    return (
      <textarea
        ref={ref}
        className={clsx(
          'bg-white dark:bg-neutral-800',
          'text-black dark:text-white',
          'rounded border border-solid dark:border-neutral-700',
          'w-full px-2 py-2 text-sm outline-none',
          'hover:border-sky-400 focus:border-sky-400',
          styles.border[border],
        )}
        rows={6}
        {...props}
      />
    );
  },
);
