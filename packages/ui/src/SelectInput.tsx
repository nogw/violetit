import clsx from 'clsx';
import React from 'react';

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  initial: string;
  options: Array<{ value: string; text: string }>;
};

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, initial, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'rounded-lg border border-gray-300',
          'text-sm text-gray-900',
          'w-full cursor-pointer bg-white p-2 outline-none',
          className,
        )}
        {...props}
      >
        <option defaultValue={initial}>{initial}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    );
  },
);
