import clsx from 'clsx';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, ...props }, ref) => {
    const styles = {
      effects: 'hover:border-sky-400 focus:border-sky-400',
    };

    return (
      <textarea
        ref={ref}
        className={clsx(
          'bg-white dark:bg-neutral-800',
          'text-black dark:text-white',
          'rounded border border-solid dark:border-neutral-700',
          'w-full px-2 py-2 text-sm outline-none',
          styles.effects,
          className,
        )}
        rows={6}
        {...props}
      />
    );
  },
);
