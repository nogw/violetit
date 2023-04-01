import clsx from 'clsx';
import React from 'react';

import { Flex } from './Flex';
import { Label } from './Label';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: 'sm' | 'md';
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, variant = 'md', ...props }, ref) => {
    const styles = {
      effects: 'hover:border-sky-400 focus:border-sky-400',
      variant: {
        sm: 'w-full px-1 py-0 text-sm',
        md: 'w-full py-1 px-2 text-md',
      },
    };

    return (
      <Flex className="flex-col">
        {label ? <Label>{label}</Label> : null}
        <input
          ref={ref}
          className={clsx(
            'bg-white dark:bg-neutral-800',
            'text-black dark:text-white',
            'border border-solid dark:border-neutral-700',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            'inline-flex shrink-0 items-center rounded outline-none',
            styles.effects,
            styles.variant[variant],
          )}
          {...props}
        />
      </Flex>
    );
  },
);
