import clsx from 'clsx';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'rounded border border-solid hover:border-sky-400',
          'text-sm outline-none	',
          'w-full px-2 py-2',
          className,
        )}
        rows={6}
        {...props}
      />
    );
  },
);
