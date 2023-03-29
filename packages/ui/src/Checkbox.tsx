import React from 'react';
import { Flex } from './Flex';

type CheckboxProps = {
  label: string;
  isChecked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
};

export const Checkbox = ({ label, isChecked, onCheckedChange }: CheckboxProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onCheckedChange(event.target.checked);
  }

  return (
    <Flex className="align-center">
      <input
        className="form-checkbox h-5 w-5 cursor-pointer text-indigo-600"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="ml-2 text-gray-700">{label}</label>
    </Flex>
  );
};
