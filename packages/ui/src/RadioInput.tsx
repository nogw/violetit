import React from 'react';
import { Flex } from './Flex';

type RadioInputProps = React.SelectHTMLAttributes<HTMLDivElement> & {
  options: Array<{ value: string; text: string }>;
};

export const RadioInput = React.forwardRef<HTMLDivElement, RadioInputProps>(({ options }, ref) => {
  return (
    <Flex className="flex-col" ref={ref}>
      {options.map(({ value, text }) => (
        <Flex className="align-center">
          <input
            value={value}
            type="checkbox"
            name="checkbox-group"
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label className="ml-2 text-gray-700">{text}</label>
        </Flex>
      ))}
    </Flex>
  );
});
