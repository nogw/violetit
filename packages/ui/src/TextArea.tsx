import clsx from 'clsx';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ children, className, ...props }, ref) => {
    const styles = {
      base: 'rounded border border-solid text-sm outline-none w-full px-2 py-2',
      effects: 'hover:border-sky-400 focus:border-sky-400',
    };

    return <textarea ref={ref} className={clsx(styles.base, styles.effects, className)} rows={6} {...props} />;
  },
);
