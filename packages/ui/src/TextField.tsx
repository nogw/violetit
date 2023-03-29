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
      base: 'rounded items-center border border-solid bg-white outline-none inline-flex shrink-0',
      effects: 'hover:border-sky-400 focus:border-sky-400',
      variant: {
        sm: 'w-full px-1 py-0 text-sm',
        md: 'w-full py-1 px-2 text-md',
      },
    };

    return (
      <Flex className="flex-col">
        {label ? <Label>{label}</Label> : null}
        <input ref={ref} className={clsx(styles.base, styles.effects, styles.variant[variant])} {...props} />
      </Flex>
    );
  },
);
