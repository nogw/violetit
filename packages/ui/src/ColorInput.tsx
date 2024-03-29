import React from 'react';
import clsx from 'clsx';

import { Label } from './Label';
import { Flex } from './Flex';

export type ColorInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(({ label, ...props }, ref) => {
  return (
    <Flex direction="col">
      {label ? <Label>{label}</Label> : null}
      <input
        ref={ref}
        type="color"
        className={clsx(
          'bg-gray-100 dark:bg-neutral-900',
          'border-2 border-gray-200 dark:border-neutral-700',
          'focus:border-blue-500 focus:outline-none',
          'block h-6 w-full cursor-pointer appearance-none rounded-sm',
        )}
        {...props}
      />
    </Flex>
  );
});
