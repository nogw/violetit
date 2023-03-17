import clsx from 'clsx';
import React from 'react';

import { Box } from './Box';
import { Flex } from './Flex';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  label?: string;
};

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ icon, label, children, className, ...props }, ref) => {
    return (
      <Box ref={ref}>
        {label && <label className="text-sm">{label}</label>}
        <Flex className="items-center rounded border border-solid bg-white hover:border-sky-400">
          {icon && <Box className="pl-2">{icon}</Box>}
          <input className={clsx('w-full rounded px-2 py-1 text-sm outline-none', className)} {...props} />
        </Flex>
      </Box>
    );
  },
);
