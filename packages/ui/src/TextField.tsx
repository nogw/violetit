import clsx from 'clsx';
import React from 'react';

import { Flex } from './Flex';
import { Label } from './Label';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: 'sm' | 'md';
  border?: 'default' | 'warning' | 'error';
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, variant = 'md', border = 'default', className, ...props }, ref) => {
    const styles = {
      border: {
        default: 'border-solid dark:border-neutral-700',
        warning: 'border-yellow-500 dark:border-yellow-500',
        error: 'border-red-500 dark:border-red-500',
      },
      variant: {
        sm: 'w-full px-1 py-0 text-sm',
        md: 'w-full py-1 px-2 text-md',
      },
    };

    return (
      <Flex fullWidth direction="col">
        {label ? <Label>{label}</Label> : null}
        <input
          ref={ref}
          className={clsx(
            'bg-white dark:bg-neutral-800',
            'text-black dark:text-white',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            'inline-flex shrink-0 items-center rounded border outline-none',
            'hover:border-sky-400 focus:border-sky-400',
            styles.variant[variant],
            styles.border[border],
            className,
          )}
          {...props}
        />
      </Flex>
    );
  },
);
